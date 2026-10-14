(() => {
  const validSections = new Set(['home','about','writing','research','projects','media','contact']);
  const navItems = [...document.querySelectorAll('[data-section]')];
  const views = [...document.querySelectorAll('[data-view]')];
  const addressText = document.getElementById('addressText');
  const statusText = document.getElementById('statusText');

  function sectionFromHash() {
    const raw = location.hash.replace(/^#\/?/, '').toLowerCase();
    return validSections.has(raw) ? raw : 'home';
  }

  function showSection(section, updateHash = true) {
    if (!validSections.has(section)) section = 'home';
    views.forEach(v => v.classList.toggle('active', v.dataset.view === section));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.section === section));
    const suffix = section === 'home' ? '' : `#${section}`;
    if (addressText) addressText.textContent = `https://eta-ghostexodus.github.io/home/${suffix}`;
    if (statusText) statusText.textContent = section === 'home'
      ? 'Welcome to GHOSTEXODUS — Diary of a Threat Actor'
      : `${section.charAt(0).toUpperCase()+section.slice(1)} — GHOSTEXODUS`;
    if (updateHash) history.pushState(null, '', section === 'home' ? location.pathname : `#${section}`);
    document.querySelector('.content-area')?.scrollTo({top: 0, behavior: 'instant'});
  }

  navItems.forEach(item => item.addEventListener('click', () => showSection(item.dataset.section)));
  document.querySelectorAll('[data-section-jump]').forEach(item => item.addEventListener('click', () => showSection(item.dataset.sectionJump)));
  document.querySelectorAll('[data-go="home"]').forEach(item => item.addEventListener('click', () => showSection('home')));
  window.addEventListener('hashchange', () => showSection(sectionFromHash(), false));
  window.addEventListener('popstate', () => showSection(sectionFromHash(), false));
  document.getElementById('goButton')?.addEventListener('click', () => showSection(sectionFromHash(), false));

  const folders = [...document.querySelectorAll('[data-project]')];
  const details = [...document.querySelectorAll('[data-project-view]')];
  folders.forEach(folder => folder.addEventListener('click', () => {
    const p = folder.dataset.project;
    folders.forEach(f => f.classList.toggle('active', f === folder));
    details.forEach(d => d.classList.toggle('active', d.dataset.projectView === p));
  }));

  showSection(sectionFromHash(), false);
})();
