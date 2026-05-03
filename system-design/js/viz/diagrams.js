window.SD = window.SD || {};

function sdGetDiagram(type, color) {
  const c = color || '#818cf8';
  const g = '#34d399';
  const dim = 'rgba(255,255,255,.15)';
  const amber = '#fbbf24';
  const rose = '#fb7185';
  const cyan = '#22d3ee';
  const svgs = {
    lb: `<svg viewBox="0 0 280 140" class="w-full max-w-xs mx-auto">
            <defs><marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${dim}" stroke="none"/></marker></defs>
            <circle cx="30" cy="35" r="10" fill="${c}" opacity=".5"/><circle cx="30" cy="70" r="10" fill="${c}" opacity=".7"/><circle cx="30" cy="105" r="10" fill="${c}" opacity=".4"/>
            <line x1="42" y1="38" x2="100" y2="68" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah)"/>
            <line x1="42" y1="70" x2="100" y2="70" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah)"/>
            <line x1="42" y1="102" x2="100" y2="72" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah)"/>
            <rect x="100" y="54" width="60" height="32" rx="6" fill="none" stroke="${c}" stroke-width="1.5"/>
            <text x="130" y="74" text-anchor="middle" fill="${c}" font-size="10" font-family="Inter">LB</text>
            <line x1="162" y1="62" x2="218" y2="35" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah)"/>
            <line x1="162" y1="70" x2="218" y2="70" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah)"/>
            <line x1="162" y1="78" x2="218" y2="105" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah)"/>
            <rect x="218" y="24" width="48" height="22" rx="4" fill="none" stroke="${g}" stroke-width="1.5"/>
            <text x="242" y="39" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">S1</text>
            <rect x="218" y="59" width="48" height="22" rx="4" fill="none" stroke="${g}" stroke-width="1.5"/>
            <text x="242" y="74" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">S2</text>
            <rect x="218" y="94" width="48" height="22" rx="4" fill="none" stroke="${g}" stroke-width="1.5"/>
            <text x="242" y="109" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">S3</text>
            <text x="30" y="130" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="8" font-family="Inter">Clients</text>
            <text x="242" y="130" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="8" font-family="Inter">Servers</text>
        </svg>`,
    cache: `<svg viewBox="0 0 280 120" class="w-full max-w-xs mx-auto">
            <defs><marker id="ah2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${dim}" stroke="none"/></marker></defs>
            <rect x="20" y="42" width="50" height="36" rx="5" fill="${c}" opacity=".15" stroke="${c}" stroke-width="1"/>
            <text x="45" y="64" text-anchor="middle" fill="${c}" font-size="9" font-family="Inter">Client</text>
            <line x1="72" y1="55" x2="108" y2="55" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah2)"/>
            <text x="90" y="48" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">1</text>
            <rect x="108" y="30" width="64" height="60" rx="6" fill="none" stroke="${g}" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="140" y="55" text-anchor="middle" fill="${g}" font-size="9" font-family="Inter" font-weight="500">Cache</text>
            <text x="140" y="68" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">Redis/Memcached</text>
            <line x1="174" y1="55" x2="208" y2="55" stroke="${dim}" stroke-width="1.5" marker-end="url(#ah2)"/>
            <text x="191" y="48" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">3 miss</text>
            <rect x="208" y="38" width="56" height="34" rx="5" fill="rgba(251,191,36,.1)" stroke="${amber}" stroke-width="1"/>
            <text x="236" y="58" text-anchor="middle" fill="${amber}" font-size="9" font-family="Inter">Database</text>
            <text x="90" y="100" text-anchor="middle" fill="${g}" font-size="7" font-family="Inter">2 ← hit</text>
            <path d="M108,72 Q80,95 72,72" fill="none" stroke="${g}" stroke-width="1" stroke-dasharray="3 2"/>
        </svg>`,
    db: `<svg viewBox="0 0 280 120" class="w-full max-w-xs mx-auto">
            <rect x="8" y="18" width="78" height="84" rx="6" fill="none" stroke="${c}" stroke-width="1.5"/>
            <text x="47" y="34" text-anchor="middle" fill="${c}" font-size="8" font-family="Inter">PostgreSQL</text>
            <line x1="8" y1="42" x2="86" y2="42" stroke="${c}" stroke-width=".8" opacity=".25"/>
            <text x="47" y="58" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">rows / joins</text>
            <text x="47" y="78" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">ACID txns</text>
            <text x="47" y="98" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">strong consistency</text>

            <rect x="101" y="22" width="78" height="76" rx="6" fill="none" stroke="${g}" stroke-width="1.5"/>
            <text x="140" y="38" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">DynamoDB</text>
            <text x="140" y="58" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">partition key</text>
            <text x="140" y="74" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">PK+SK composite</text>
            <text x="140" y="90" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">milliseconds latency</text>

            <rect x="196" y="30" width="76" height="60" rx="6" fill="rgba(251,113,133,.06)" stroke="${rose}" stroke-width="1"/>
            <text x="234" y="50" text-anchor="middle" fill="${rose}" font-size="8" font-family="Inter">Indexes</text>
            <text x="234" y="68" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">SQL: B-Tree</text>
            <text x="234" y="82" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">DDB: LSI/GSI</text>
        </svg>`,
    index: `<svg viewBox="0 0 280 120" class="w-full max-w-xs mx-auto">
            <defs><marker id="ahim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${dim}" stroke="none"/></marker></defs>
            <rect x="190" y="10" width="70" height="100" rx="5" fill="none" stroke="${dim}" stroke-width="1"/>
            <text x="225" y="26" text-anchor="middle" fill="rgba(255,255,255,.2)" font-size="7" font-family="Inter">Table Scan</text>
            <rect x="196" y="34" width="58" height="14" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" stroke-width=".5"/>
            <rect x="196" y="52" width="58" height="14" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" stroke-width=".5"/>
            <rect x="196" y="70" width="58" height="14" rx="2" fill="${c}" opacity=".2" stroke="${c}" stroke-width=".5"/>
            <rect x="196" y="88" width="58" height="14" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" stroke-width=".5"/>

            <circle cx="60" cy="30" r="18" fill="none" stroke="${g}" stroke-width="1.5"/>
            <text x="60" y="34" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">Root</text>
            <circle cx="30" cy="76" r="14" fill="none" stroke="${g}" stroke-width="1" opacity=".6"/>
            <text x="30" y="80" text-anchor="middle" fill="${g}" font-size="7" font-family="Inter" opacity=".6">L</text>
            <circle cx="90" cy="76" r="14" fill="${c}" opacity=".15" stroke="${c}" stroke-width="1.5"/>
            <text x="90" y="80" text-anchor="middle" fill="${c}" font-size="7" font-family="Inter">R</text>
            <line x1="48" y1="44" x2="38" y2="64" stroke="${g}" stroke-width="1" opacity=".5"/>
            <line x1="72" y1="44" x2="82" y2="64" stroke="${g}" stroke-width="1" opacity=".5"/>
            <text x="70" y="110" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">B-Tree Index</text>

            <path d="M104,76 L160,90" stroke="${c}" stroke-width="1" stroke-dasharray="3 2" marker-end="url(#ahim)"/>
        </svg>`,
    shard: `<svg viewBox="0 0 280 120" class="w-full max-w-xs mx-auto">
            <rect x="20" y="15" width="50" height="30" rx="4" fill="none" stroke="${c}" stroke-width="1.5"/>
            <text x="45" y="34" text-anchor="middle" fill="${c}" font-size="8" font-family="Inter">Primary</text>
            <rect x="20" y="55" width="50" height="22" rx="4" fill="none" stroke="${g}" stroke-width="1" opacity=".6"/>
            <text x="45" y="70" text-anchor="middle" fill="${g}" font-size="7" font-family="Inter">Replica 1</text>
            <rect x="20" y="85" width="50" height="22" rx="4" fill="none" stroke="${g}" stroke-width="1" opacity=".6"/>
            <text x="45" y="100" text-anchor="middle" fill="${g}" font-size="7" font-family="Inter">Replica 2</text>
            <line x1="38" y1="47" x2="38" y2="53" stroke="${dim}" stroke-width="1"/>
            <line x1="52" y1="47" x2="52" y2="53" stroke="${dim}" stroke-width="1"/>
            <line x1="38" y1="79" x2="38" y2="83" stroke="${dim}" stroke-width="1"/>
            <line x1="52" y1="79" x2="52" y2="83" stroke="${dim}" stroke-width="1"/>
            <text x="45" y="118" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">Replication</text>

            <line x1="95" y1="60" x2="115" y2="60" stroke="${dim}" stroke-width="1" stroke-dasharray="4 2"/>

            <rect x="120" y="10" width="42" height="28" rx="4" fill="#818cf8" opacity=".1" stroke="#818cf8" stroke-width="1"/>
            <text x="141" y="28" text-anchor="middle" fill="#818cf8" font-size="7" font-family="Inter">A-M</text>
            <rect x="172" y="10" width="42" height="28" rx="4" fill="#34d399" opacity=".1" stroke="#34d399" stroke-width="1"/>
            <text x="193" y="28" text-anchor="middle" fill="#34d399" font-size="7" font-family="Inter">N-Z</text>
            <rect x="224" y="10" width="42" height="28" rx="4" fill="#fbbf24" opacity=".1" stroke="#fbbf24" stroke-width="1"/>
            <text x="245" y="28" text-anchor="middle" fill="#fbbf24" font-size="7" font-family="Inter">0-9</text>

            <rect x="120" y="50" width="42" height="20" rx="3" fill="none" stroke="rgba(255,255,255,.1)" stroke-width=".5"/>
            <rect x="172" y="50" width="42" height="20" rx="3" fill="none" stroke="rgba(255,255,255,.1)" stroke-width=".5"/>
            <rect x="224" y="50" width="42" height="20" rx="3" fill="none" stroke="rgba(255,255,255,.1)" stroke-width=".5"/>

            <text x="193" y="90" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="8" font-family="Inter">Router</text>
            <path d="M193,82 L155,72 M193,82 L193,72 M193,82 L245,72" fill="none" stroke="${dim}" stroke-width="1"/>
            <text x="193" y="105" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">Sharding</text>
        </svg>`,
    mq: `<svg viewBox="0 0 280 100" class="w-full max-w-xs mx-auto">
            <defs><marker id="ahm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${dim}" stroke="none"/></marker></defs>
            <rect x="10" y="20" width="50" height="30" rx="4" fill="${c}" opacity=".15" stroke="${c}" stroke-width="1"/>
            <text x="35" y="39" text-anchor="middle" fill="${c}" font-size="8" font-family="Inter">Producer</text>
            <rect x="10" y="60" width="50" height="30" rx="4" fill="${c}" opacity=".1" stroke="${c}" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="35" y="79" text-anchor="middle" fill="${c}" font-size="7" font-family="Inter" opacity=".6">Producer</text>
            <line x1="62" y1="35" x2="95" y2="50" stroke="${dim}" stroke-width="1.5" marker-end="url(#ahm)"/>
            <line x1="62" y1="75" x2="95" y2="55" stroke="${dim}" stroke-width="1.5" marker-end="url(#ahm)"/>

            <rect x="95" y="30" width="70" height="40" rx="6" fill="none" stroke="${g}" stroke-width="1.5"/>
            <rect x="102" y="38" width="10" height="24" rx="2" fill="${g}" opacity=".15"/>
            <rect x="116" y="38" width="10" height="24" rx="2" fill="${g}" opacity=".25"/>
            <rect x="130" y="38" width="10" height="24" rx="2" fill="${g}" opacity=".35"/>
            <rect x="144" y="38" width="10" height="24" rx="2" fill="${g}" opacity=".15"/>
            <text x="130" y="82" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">Queue</text>

            <line x1="167" y1="45" x2="200" y2="30" stroke="${dim}" stroke-width="1.5" marker-end="url(#ahm)"/>
            <line x1="167" y1="55" x2="200" y2="75" stroke="${dim}" stroke-width="1.5" marker-end="url(#ahm)"/>
            <rect x="200" y="15" width="55" height="28" rx="4" fill="#fbbf24" opacity=".1" stroke="#fbbf24" stroke-width="1"/>
            <text x="227" y="33" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="Inter">Consumer</text>
            <rect x="200" y="60" width="55" height="28" rx="4" fill="#fbbf24" opacity=".1" stroke="#fbbf24" stroke-width="1"/>
            <text x="227" y="78" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="Inter">Consumer</text>
        </svg>`,
    api: `<svg viewBox="0 0 280 100" class="w-full max-w-xs mx-auto">
            <defs><marker id="aha" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${dim}" stroke="none"/></marker></defs>
            <rect x="10" y="32" width="42" height="36" rx="4" fill="none" stroke="${dim}" stroke-width="1"/>
            <text x="31" y="54" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="8" font-family="Inter">Client</text>
            <line x1="54" y1="50" x2="85" y2="50" stroke="${dim}" stroke-width="1" marker-end="url(#aha)"/>
            <rect x="85" y="25" width="48" height="50" rx="6" fill="${c}" opacity=".08" stroke="${c}" stroke-width="1.2"/>
            <text x="109" y="45" text-anchor="middle" fill="${c}" font-size="7" font-family="Inter">REST</text>
            <text x="109" y="58" text-anchor="middle" fill="${c}" font-size="7" font-family="Inter">GQL</text>
            <text x="109" y="71" text-anchor="middle" fill="${c}" font-size="7" font-family="Inter">gRPC</text>
            <line x1="135" y1="50" x2="170" y2="50" stroke="${dim}" stroke-width="1" marker-end="url(#aha)"/>
            <rect x="170" y="25" width="50" height="50" rx="6" fill="${g}" opacity=".08" stroke="${g}" stroke-width="1.2"/>
            <text x="195" y="55" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">Server</text>
            <line x1="222" y1="42" x2="248" y2="42" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3 2"/>
            <line x1="248" y1="42" x2="248" y2="60" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3 2"/>
            <line x1="248" y1="60" x2="222" y2="60" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="260" y="55" fill="#fbbf24" font-size="7" font-family="Inter">WS</text>
        </svg>`,
    micro: `<svg viewBox="0 0 280 110" class="w-full max-w-xs mx-auto">
            <rect x="90" y="5" width="80" height="28" rx="5" fill="${c}" opacity=".12" stroke="${c}" stroke-width="1.2"/>
            <text x="130" y="23" text-anchor="middle" fill="${c}" font-size="8" font-family="Inter">API Gateway</text>
            <line x1="110" y1="35" x2="60" y2="55" stroke="${dim}" stroke-width="1"/>
            <line x1="130" y1="35" x2="130" y2="55" stroke="${dim}" stroke-width="1"/>
            <line x1="150" y1="35" x2="210" y2="55" stroke="${dim}" stroke-width="1"/>
            <rect x="20" y="55" width="70" height="24" rx="4" fill="${g}" opacity=".1" stroke="${g}" stroke-width="1"/>
            <text x="55" y="71" text-anchor="middle" fill="${g}" font-size="7" font-family="Inter">User Svc</text>
            <rect x="98" y="55" width="64" height="24" rx="4" fill="#fbbf24" opacity=".1" stroke="#fbbf24" stroke-width="1"/>
            <text x="130" y="71" text-anchor="middle" fill="#fbbf24" font-size="7" font-family="Inter">Order Svc</text>
            <rect x="170" y="55" width="70" height="24" rx="4" fill="#fb7185" opacity=".1" stroke="#fb7185" stroke-width="1"/>
            <text x="205" y="71" text-anchor="middle" fill="#fb7185" font-size="7" font-family="Inter">Payment Svc</text>
            <rect x="60" y="90" width="140" height="18" rx="4" fill="none" stroke="${dim}" stroke-width="1" stroke-dasharray="4 2"/>
            <text x="130" y="103" text-anchor="middle" fill="rgba(255,255,255,.2)" font-size="7" font-family="Inter">Message Queue / Event Bus</text>
            <line x1="55" y1="81" x2="80" y2="88" stroke="${dim}" stroke-width=".5"/>
            <line x1="130" y1="81" x2="130" y2="88" stroke="${dim}" stroke-width=".5"/>
            <line x1="205" y1="81" x2="180" y2="88" stroke="${dim}" stroke-width=".5"/>
        </svg>`,
    cdn: `<svg viewBox="0 0 280 110" class="w-full max-w-xs mx-auto">
            <circle cx="140" cy="55" r="35" fill="none" stroke="${c}" stroke-width="1" stroke-dasharray="4 3" opacity=".4"/>
            <circle cx="140" cy="55" r="18" fill="${c}" opacity=".1" stroke="${c}" stroke-width="1.5"/>
            <text x="140" y="58" text-anchor="middle" fill="${c}" font-size="7" font-family="Inter">Origin</text>
            <circle cx="60" cy="25" r="10" fill="${g}" opacity=".15" stroke="${g}" stroke-width="1"/>
            <text x="60" y="28" text-anchor="middle" fill="${g}" font-size="6" font-family="Inter">Edge</text>
            <circle cx="220" cy="25" r="10" fill="${g}" opacity=".15" stroke="${g}" stroke-width="1"/>
            <text x="220" y="28" text-anchor="middle" fill="${g}" font-size="6" font-family="Inter">Edge</text>
            <circle cx="60" cy="85" r="10" fill="${g}" opacity=".15" stroke="${g}" stroke-width="1"/>
            <text x="60" y="88" text-anchor="middle" fill="${g}" font-size="6" font-family="Inter">Edge</text>
            <circle cx="220" cy="85" r="10" fill="${g}" opacity=".15" stroke="${g}" stroke-width="1"/>
            <text x="220" y="88" text-anchor="middle" fill="${g}" font-size="6" font-family="Inter">Edge</text>
            <line x1="70" y1="30" x2="110" y2="45" stroke="${dim}" stroke-width="1"/>
            <line x1="210" y1="30" x2="170" y2="45" stroke="${dim}" stroke-width="1"/>
            <line x1="70" y1="80" x2="110" y2="65" stroke="${dim}" stroke-width="1"/>
            <line x1="210" y1="80" x2="170" y2="65" stroke="${dim}" stroke-width="1"/>
        </svg>`,
    cap: `<svg viewBox="0 0 280 120" class="w-full max-w-xs mx-auto">
            <polygon points="140,15 55,95 225,95" fill="none" stroke="${dim}" stroke-width="1.5"/>
            <circle cx="140" cy="15" r="14" fill="${c}" opacity=".2" stroke="${c}" stroke-width="1.5"/>
            <text x="140" y="19" text-anchor="middle" fill="${c}" font-size="8" font-family="Inter" font-weight="600">C</text>
            <circle cx="55" cy="95" r="14" fill="${g}" opacity=".2" stroke="${g}" stroke-width="1.5"/>
            <text x="55" y="99" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter" font-weight="600">A</text>
            <circle cx="225" cy="95" r="14" fill="#fb7185" opacity=".2" stroke="#fb7185" stroke-width="1.5"/>
            <text x="225" y="99" text-anchor="middle" fill="#fb7185" font-size="8" font-family="Inter" font-weight="600">P</text>
            <text x="140" y="5" text-anchor="middle" fill="rgba(255,255,255,.2)" font-size="7" font-family="Inter">Consistency</text>
            <text x="28" y="112" text-anchor="middle" fill="rgba(255,255,255,.2)" font-size="7" font-family="Inter">Availability</text>
            <text x="252" y="112" text-anchor="middle" fill="rgba(255,255,255,.2)" font-size="7" font-family="Inter">Partition</text>
        </svg>`,
    sqlcon: `<svg viewBox="0 0 280 120" class="w-full max-w-xs mx-auto">
            <rect x="20" y="20" width="100" height="80" rx="6" fill="none" stroke="${c}" stroke-width="1.2"/>
            <text x="70" y="40" text-anchor="middle" fill="${c}" font-size="9" font-family="Inter">Row r (hot)</text>
            <rect x="35" y="52" width="70" height="22" rx="3" fill="${g}" opacity=".12" stroke="${g}" stroke-width="1"/>
            <text x="70" y="67" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">lock / version</text>
            <text x="70" y="95" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="7" font-family="Inter">UPDATE contends</text>

            <rect x="150" y="22" width="110" height="76" rx="6" fill="none" stroke="${dim}" stroke-width="1"/>
            <text x="205" y="40" text-anchor="middle" fill="rgba(255,255,255,.35)" font-size="8" font-family="Inter">Timeline</text>
            <line x1="165" y1="52" x2="245" y2="52" stroke="${dim}" stroke-width="1"/>
            <line x1="165" y1="68" x2="245" y2="68" stroke="${dim}" stroke-width="1"/>
            <text x="168" y="50" fill="${amber}" font-size="7" font-family="Inter">T1</text>
            <text x="168" y="66" fill="${rose}" font-size="7" font-family="Inter">T2</text>
            <rect x="175" y="78" width="60" height="12" rx="2" fill="${c}" opacity=".15" stroke="${c}" stroke-width=".5"/>
            <text x="205" y="87" text-anchor="middle" fill="rgba(255,255,255,.4)" font-size="6" font-family="Inter">BEGIN … COMMIT</text>
        </svg>`,
    tiers: `<svg viewBox="0 0 280 100" class="w-full max-w-xs mx-auto">
            <text x="10" y="18" fill="rgba(255,255,255,.35)" font-size="7" font-family="Inter">Latency target →</text>
            <rect x="10" y="28" width="75" height="24" rx="4" fill="${rose}" opacity=".12" stroke="${rose}" stroke-width="1"/>
            <text x="47" y="44" text-anchor="middle" fill="${rose}" font-size="8" font-family="Inter">Real-time</text>
            <text x="47" y="58" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="6" font-family="Inter">&lt;~100ms</text>

            <rect x="102" y="28" width="75" height="24" rx="4" fill="${amber}" opacity=".12" stroke="${amber}" stroke-width="1"/>
            <text x="139" y="44" text-anchor="middle" fill="${amber}" font-size="8" font-family="Inter">Near-time</text>
            <text x="139" y="58" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="6" font-family="Inter">sec–min</text>

            <rect x="194" y="28" width="76" height="24" rx="4" fill="${cyan}" opacity=".12" stroke="${cyan}" stroke-width="1"/>
            <text x="232" y="44" text-anchor="middle" fill="${cyan}" font-size="8" font-family="Inter">Batch</text>
            <text x="232" y="58" text-anchor="middle" fill="rgba(255,255,255,.3)" font-size="6" font-family="Inter">min+</text>

            <line x1="20" y1="78" x2="260" y2="78" stroke="${dim}" stroke-width="1"/>
            <rect x="20" y="72" width="40" height="10" rx="2" fill="${g}" opacity=".25"/>
            <rect x="120" y="72" width="90" height="10" rx="2" fill="${amber}" opacity=".25"/>
            <rect x="230" y="72" width="30" height="10" rx="2" fill="${cyan}" opacity=".25"/>
            <text x="140" y="95" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="Inter">Throughput vs freshness</text>
        </svg>`,
    resilience: `<svg viewBox="0 0 280 110" class="w-full max-w-xs mx-auto">
            <rect x="15" y="40" width="50" height="36" rx="5" fill="${c}" opacity=".1" stroke="${c}" stroke-width="1"/>
            <text x="40" y="62" text-anchor="middle" fill="${c}" font-size="8" font-family="Inter">Clients</text>
            <line x1="68" y1="58" x2="95" y2="58" stroke="${dim}" stroke-width="1.5"/>
            <rect x="95" y="38" width="70" height="40" rx="6" fill="${g}" opacity=".08" stroke="${g}" stroke-width="1.2"/>
            <text x="130" y="58" text-anchor="middle" fill="${g}" font-size="8" font-family="Inter">Coalesce</text>
            <text x="130" y="72" text-anchor="middle" fill="rgba(255,255,255,.28)" font-size="6" font-family="Inter">single flight</text>
            <line x1="168" y1="58" x2="198" y2="58" stroke="${dim}" stroke-width="1.5"/>
            <rect x="198" y="40" width="72" height="36" rx="5" fill="#fbbf24" opacity=".08" stroke="#fbbf24" stroke-width="1"/>
            <text x="234" y="62" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="Inter">Origin</text>

            <rect x="95" y="88" width="70" height="14" rx="3" fill="none" stroke="${rose}" stroke-width="1" stroke-dasharray="3 2" opacity=".6"/>
            <text x="130" y="99" text-anchor="middle" fill="${rose}" font-size="6" font-family="Inter">Circuit open → fail fast</text>
        </svg>`,
  };
  return svgs[type] || '';
}

window.sdGetDiagram = sdGetDiagram;
