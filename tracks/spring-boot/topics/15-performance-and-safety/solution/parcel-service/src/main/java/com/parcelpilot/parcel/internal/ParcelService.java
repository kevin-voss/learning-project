package com.parcelpilot.parcel.internal;

import com.parcelpilot.ParcelNotFoundException;
import com.parcelpilot.parcel.Notifier;
import com.parcelpilot.parcel.ParcelDelivered;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class ParcelService {

    private final ParcelRepository repository;
    private final Notifier notifier;

    public ParcelService(ParcelRepository repository, Notifier notifier) {
        this.repository = repository;
        this.notifier = notifier;
    }

    @Transactional
    public ParcelResponse create(CreateParcelRequest request) {
        if (repository.existsById(request.id())) {
            throw new IllegalStateException("parcel " + request.id() + " already exists");
        }
        ParcelEntity saved = repository.save(new ParcelEntity(request.id(), request.recipient(), Status.CREATED));
        return toResponse(saved);
    }

    // The sticky note: look in the "parcels" cache first; only on a miss run this method.
    @Cacheable(value = "parcels", key = "#id")
    @Transactional(readOnly = true)
    public ParcelResponse get(String id) {
        return toResponse(load(id));
    }

    @Transactional(readOnly = true)
    public List<ParcelResponse> list(Status status) {
        List<ParcelEntity> parcels = status == null ? repository.findAll() : repository.findByStatus(status);
        return parcels.stream().map(this::toResponse).toList();
    }

    // The parcel changes, so tear off its sticky note. The next read gets fresh data.
    @CacheEvict(value = "parcels", key = "#id")
    @Transactional
    public ParcelResponse changeStatus(String id, Status target, Long expectedVersion) {
        ParcelEntity parcel = load(id);

        // The client says "I saw version 3". If the label now says 4, someone was faster.
        if (expectedVersion != null && expectedVersion != parcel.version()) {
            throw new ObjectOptimisticLockingFailureException(ParcelEntity.class, id);
        }

        switch (target) {
            case PICKED_UP -> parcel.markPickedUp();
            case DELIVERED -> parcel.markDelivered();
            case CREATED -> throw new IllegalStateException("a parcel cannot go back to CREATED");
        }
        // flush now: if another request saved first, @Version makes this throw HERE
        ParcelEntity saved = repository.saveAndFlush(parcel);

        if (saved.status() == Status.DELIVERED) {
            notifier.parcelDelivered(new ParcelDelivered(
                    UUID.randomUUID(), saved.id(), saved.recipient(), Instant.now()));
        }
        return toResponse(saved);
    }

    private ParcelEntity load(String id) {
        return repository.findById(id).orElseThrow(() -> new ParcelNotFoundException(id));
    }

    private ParcelResponse toResponse(ParcelEntity parcel) {
        return new ParcelResponse(parcel.id(), parcel.recipient(), parcel.status().name(), parcel.version());
    }
}
