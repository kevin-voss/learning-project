window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.pointer = function (container) {
  const UI = DS.demoUI;
  let sharedScore = 10;
  let selected = 'both';

  const renderMemory = () => `
    <div class="pointer-stage">
      <div class="pointer-vars">
        <button class="pointer-var${selected === 'userA' ? ' is-selected' : ''}" onclick="ptrSelect('userA')">
          <strong>userA</strong>
          <span>stores address</span>
          <code>0xA100</code>
        </button>
        <button class="pointer-var${selected === 'userB' ? ' is-selected' : ''}" onclick="ptrSelect('userB')">
          <strong>userB</strong>
          <span>stores same address</span>
          <code>0xA100</code>
        </button>
      </div>
      <div class="pointer-arrow">both references point here</div>
      <div class="pointer-object">
        <div class="pointer-object-head">Object in heap memory @ 0xA100</div>
        <div><span>name</span><strong>Ada</strong></div>
        <div><span>score</span><strong>${sharedScore}</strong></div>
      </div>
    </div>`;

  const inspectorRows = () => [
    ['userA value', '0xA100', 'The variable stores a reference, not the whole object'],
    ['userB value', '0xA100', 'Same address means same object'],
    ['Shared score', String(sharedScore), 'Changing through one reference affects the shared object'],
    ['Null meaning', 'points nowhere', 'No object address is stored'],
  ];

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Pointer/reference visual: variables point to memory',
      hint: 'The variables are small labels that store an address. The object lives in heap memory. Because both labels store the same address, they both reach the same object.',
      stage: renderMemory(),
      inspector: UI.inspector('Reference details', inspectorRows()),
      stats: [
        UI.statChip('Variables', 2),
        UI.statChip('Objects', 1),
        UI.statChip('Address', '0xA100'),
      ].join(''),
      controls: `
        <button class="demo-btn success" onclick="ptrUpdate()"><i class="fas fa-pen"></i> userB.score += 5</button>
        <button class="demo-btn" onclick="ptrSelect('both')"><i class="fas fa-eye"></i> Show Both</button>
        <button class="demo-btn danger" onclick="ptrReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'ptrMsg',
    });
  };

  window.ptrSelect = (key) => {
    selected = key;
    render();
  };

  window.ptrUpdate = () => {
    sharedScore += 5;
    selected = 'userB';
    render();
    DS.showMsg('ptrMsg', `Updated through userB. userA sees score ${sharedScore} because both point to 0xA100.`, 'success-msg');
  };

  window.ptrReset = () => {
    sharedScore = 10;
    selected = 'both';
    render();
  };

  render();
};
