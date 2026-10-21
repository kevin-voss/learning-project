package com.parcelpilot.parcel.internal;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/parcels")
public class ParcelController {

    private static final Logger log = LoggerFactory.getLogger(ParcelController.class);
    private final ParcelService service;

    public ParcelController(ParcelService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ParcelResponse create(@Valid @RequestBody CreateParcelRequest request) {
        ParcelResponse created = service.create(request);
        log.info("Created parcel {}", created.id());
        return created;
    }

    @GetMapping("/{id}")
    public ParcelResponse getOne(@PathVariable String id) {
        return service.get(id);
    }

    @GetMapping
    public List<ParcelResponse> list(@RequestParam(required = false) Status status) {
        return service.list(status);
    }

    @PatchMapping("/{id}/status")
    public ParcelResponse changeStatus(@PathVariable String id, @Valid @RequestBody UpdateStatusRequest request) {
        ParcelResponse changed = service.changeStatus(id, Status.valueOf(request.status()), request.version());
        log.info("Parcel {} status changed to {}", id, changed.status());
        return changed;
    }
}
