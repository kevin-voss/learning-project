window.DS = window.DS || {};

DS.currentSection = 0;
DS.completed = new Set(JSON.parse(localStorage.getItem('dsCompleted') || '[]'));
