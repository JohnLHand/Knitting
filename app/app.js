/* ===== Handmade™ prototype logic =====
   Everything is stored on the device with localStorage, so Anica's
   projects and patterns survive closing the app. No server, no accounts. */

(function () {
  'use strict';

  /* ---------- Storage helpers ---------- */
  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
      catch { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); }
      catch (e) { alert('Could not save — device storage may be full.'); }
    }
  };

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* ---------- Seed patterns (so the filters do something on day one) ---------- */
  const SEED_PATTERNS = [
    { id: uid(), name: 'Cozy Raglan Sweater', category: 'Sweater', needle: '4',   yarn: 'Wool' },
    { id: uid(), name: 'Simple Garter Hat',   category: 'Hat',     needle: '5',   yarn: 'Wool' },
    { id: uid(), name: 'Lace Summer Shawl',   category: 'Shawl',   needle: '3.5', yarn: 'Cotton' },
    { id: uid(), name: 'Chunky Winter Scarf', category: 'Scarf',   needle: '8',   yarn: 'Acrylic' },
    { id: uid(), name: 'Baby Booties',        category: 'Socks',   needle: '2.5', yarn: 'Merino' },
    { id: uid(), name: 'Striped Beanie',      category: 'Hat',     needle: '4',   yarn: 'Cotton' }
  ];

  let projects = store.get('handmade.projects', []);
  let editingId = null; // set when the form is editing an existing project
  let patterns = store.get('handmade.patterns', null);
  if (patterns === null) { patterns = SEED_PATTERNS; store.set('handmade.patterns', patterns); }

  /* ---------- Tiny DOM helpers ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- View routing ---------- */
  function showView(name) {
    $$('.screen').forEach(s => { s.hidden = s.dataset.view !== name; });
    // Sync the bottom tab highlight only for top-level tabs
    const tabFor = { projects: 'projects', 'new-project': 'projects',
                     'project-detail': 'projects', patterns: 'patterns', gauge: 'gauge' };
    $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === tabFor[name]));
    document.getElementById('main').scrollTop = 0;
    window.scrollTo(0, 0);
  }

  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.tab;
      if (t === 'projects') renderProjects();
      if (t === 'patterns') renderPatterns();
      if (t === 'gauge') renderGauge();
      showView(t);
    });
  });

  /* ---------- Delegated actions ---------- */
  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;
    if (action === 'new-project')       { openProjectForm(); }
    if (action === 'back-to-projects')  { editingId = null; renderProjects(); showView('projects'); }
    if (action === 'new-pattern')       { addPatternFlow(); }
  });

  /* ===================== PROJECTS ===================== */
  function renderProjects() {
    const list = $('#projects-list');
    if (!projects.length) {
      list.innerHTML = `<div class="empty">No projects yet.<br>Tap <b>+ New</b> to add your first one with a swatch.</div>`;
      return;
    }
    list.innerHTML = projects.map(p => `
      <div class="card" data-project="${p.id}">
        ${p.photo
          ? `<img class="card-thumb" src="${p.photo}" alt="">`
          : `<div class="card-thumb placeholder">🧶</div>`}
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <p>${p.yarn ? esc(p.yarn) : 'No yarn noted'}${p.needle ? ` · ${esc(p.needle)} mm` : ''}</p>
        </div>
      </div>`).join('');
    $$('#projects-list .card').forEach(card => {
      card.addEventListener('click', () => openProjectDetail(card.dataset.project));
    });
  }

  function openProjectForm(project = null) {
    const form = $('#project-form');
    form.reset();
    const prev = $('#photo-preview');
    prev.hidden = true;
    prev.removeAttribute('src');
    delete prev.dataset.value;

    editingId = project ? project.id : null;
    $('#project-form-title').textContent = project ? 'Edit Project' : 'New Project';
    $('#project-submit').textContent = project ? 'Save Changes' : 'Save Project';

    if (project) {
      form.name.value = project.name || '';
      form.stitches.value = project.stitches || '';
      form.rows.value = project.rows || '';
      form.yarn.value = project.yarn || '';
      form.needle.value = project.needle || '';
      if (project.photo) {
        prev.src = project.photo;
        prev.hidden = false;
        prev.dataset.value = project.photo; // keep existing photo unless a new one is chosen
      }
    }
    showView('new-project');
  }

  // Downscale the swatch photo before storing, so localStorage doesn't overflow.
  function resizePhoto(file, maxDim = 900, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > height && width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
          else if (height >= width && height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = ev.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Live preview when a photo is chosen
  $('#project-form [name="photo"]').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await resizePhoto(file);
    const prev = $('#photo-preview');
    prev.src = dataUrl;
    prev.hidden = false;
    prev.dataset.value = dataUrl;
  });

  $('#project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const data = {
      name: f.name.value.trim(),
      photo: $('#photo-preview').dataset.value || '',
      stitches: f.stitches.value.trim(),
      rows: f.rows.value.trim(),
      yarn: f.yarn.value.trim(),
      needle: f.needle.value.trim()
    };
    if (editingId) {
      const p = projects.find(x => x.id === editingId);
      if (p) Object.assign(p, data); // keep id and createdAt, overwrite the rest
      editingId = null;
    } else {
      projects.unshift({ id: uid(), ...data, createdAt: new Date().toISOString() });
    }
    store.set('handmade.projects', projects);
    delete $('#photo-preview').dataset.value;
    renderProjects();
    showView('projects');
  });

  function openProjectDetail(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    const gaugeText = (p.stitches || p.rows)
      ? `${p.stitches || '?'} sts &times; ${p.rows || '?'} rows / 10 cm`
      : 'No gauge recorded';
    $('#project-detail').innerHTML = `
      <h1>${esc(p.name)}</h1>
      ${p.photo ? `<img class="photo-preview" src="${p.photo}" alt="">` : ''}
      <div class="card-list">
        <div class="gauge-card">
          <div class="detail"><b>Gauge:</b> ${gaugeText}</div>
          <div class="detail"><b>Yarn:</b> ${p.yarn ? esc(p.yarn) : '—'}</div>
          <div class="detail"><b>Needle:</b> ${p.needle ? esc(p.needle) + ' mm' : '—'}</div>
        </div>
      </div>
      <button class="btn btn-primary btn-block" data-edit="${p.id}" style="margin-top:18px">Edit project</button>
      <button class="btn btn-block" data-del="${p.id}" style="margin-top:10px;background:var(--dusty-rose);color:var(--white)">Delete project</button>`;
    $('[data-edit]')?.addEventListener('click', () => openProjectForm(p));
    $('[data-del]')?.addEventListener('click', () => {
      if (confirm('Delete this project?')) {
        projects = projects.filter(x => x.id !== p.id);
        store.set('handmade.projects', projects);
        renderProjects(); showView('projects');
      }
    });
    showView('project-detail');
  }

  /* ===================== PATTERNS + FILTERING ===================== */
  function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) =>
      String(a).localeCompare(String(b), undefined, { numeric: true }));
  }

  function populateFilters() {
    const cat = $('#filter-category'), needle = $('#filter-needle'), yarn = $('#filter-yarn');
    const fill = (sel, vals, suffix = '') => {
      const current = sel.value;
      const head = sel.options[0].outerHTML;
      sel.innerHTML = head + vals.map(v => `<option value="${esc(v)}">${esc(v)}${suffix}</option>`).join('');
      sel.value = current; // keep selection if still valid
    };
    fill(cat,    uniqueSorted(patterns.map(p => p.category)));
    fill(needle, uniqueSorted(patterns.map(p => p.needle)), ' mm');
    fill(yarn,   uniqueSorted(patterns.map(p => p.yarn)));
  }

  function renderPatterns() {
    populateFilters();
    const c = $('#filter-category').value;
    const n = $('#filter-needle').value;
    const y = $('#filter-yarn').value;
    const list = $('#patterns-list');
    const shown = patterns.filter(p =>
      (!c || p.category === c) && (!n || p.needle === n) && (!y || p.yarn === y));

    if (!shown.length) {
      list.innerHTML = `<div class="empty">No patterns match these filters.</div>`;
      return;
    }
    list.innerHTML = shown.map(p => `
      <div class="card" style="cursor:default">
        <div class="card-thumb placeholder">📐</div>
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <div class="tags">
            ${p.category ? `<span class="tag">${esc(p.category)}</span>` : ''}
            ${p.needle ? `<span class="tag">${esc(p.needle)} mm</span>` : ''}
            ${p.yarn ? `<span class="tag">${esc(p.yarn)}</span>` : ''}
          </div>
        </div>
      </div>`).join('');
  }

  ['#filter-category', '#filter-needle', '#filter-yarn'].forEach(sel =>
    $(sel).addEventListener('change', renderPatterns));

  function addPatternFlow() {
    const name = prompt('Pattern name?');
    if (!name) return;
    const category = prompt('Category? (e.g. Sweater, Hat, Shawl, Scarf, Socks)') || '';
    const needle = prompt('Needle size in mm? (e.g. 4)') || '';
    const yarn = prompt('Yarn type? (e.g. Wool, Cotton, Acrylic, Merino)') || '';
    patterns.unshift({ id: uid(), name: name.trim(), category: category.trim(), needle: needle.trim(), yarn: yarn.trim() });
    store.set('handmade.patterns', patterns);
    renderPatterns();
  }

  /* ===================== GAUGE LOOKUP ===================== */
  function renderGauge() {
    // Offer the yarns Anica has actually logged as autocomplete options
    const yarns = uniqueSorted(projects.map(p => p.yarn));
    $('#yarn-options').innerHTML = yarns.map(y => `<option value="${esc(y)}">`).join('');
    runGaugeLookup();
  }

  function runGaugeLookup() {
    const q = $('#gauge-yarn').value.trim().toLowerCase();
    const result = $('#gauge-result');

    if (!projects.length) {
      result.innerHTML = `<div class="empty">Once you've saved a project with a swatch, Handmade will tell you which needle gave you the right gauge.</div>`;
      return;
    }
    if (!q) {
      result.innerHTML = `<div class="empty">Type a yarn name above to see your past gauge for it.</div>`;
      return;
    }
    const matches = projects.filter(p => p.yarn && p.yarn.toLowerCase().includes(q) && p.needle);
    if (!matches.length) {
      result.innerHTML = `<div class="empty">No swatches logged for that yarn yet.<br>Add a project with it and your needle will show up here.</div>`;
      return;
    }
    result.innerHTML = matches.map(p => `
      <div class="gauge-card">
        <div class="needle">${esc(p.needle)} mm needle</div>
        <div class="detail">On <b>${esc(p.yarn)}</b> (project “${esc(p.name)}”) you got
          ${p.stitches || '?'} sts &times; ${p.rows || '?'} rows / 10 cm.</div>
      </div>`).join('');
  }

  $('#gauge-yarn').addEventListener('input', runGaugeLookup);

  /* ---------- Boot ---------- */
  renderProjects();
  showView('projects');
})();
