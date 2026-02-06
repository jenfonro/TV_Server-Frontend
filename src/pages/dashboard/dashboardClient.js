export function initDashboardPage(bootstrap = {}) {
  const adminNavs = document.querySelectorAll('.admin-nav');
  const panels = document.querySelectorAll('.admin-panel');
  const videoSourceList = document.getElementById('videoSourceList');
  const videoSourceListSaveStatus = document.getElementById('videoSourceListSaveStatus');
  const videoSourceBulkActions = document.getElementById('videoSourceBulkActions');
  const videoSourceBulkEnable = document.getElementById('videoSourceBulkEnable');
  const videoSourceBulkDisable = document.getElementById('videoSourceBulkDisable');
  const panList = document.getElementById('panList');
  const panListSaveStatus = document.getElementById('panListSaveStatus');
  const panHeaderName = document.getElementById('panHeaderName');
  const panHeaderEnable = document.getElementById('panHeaderEnable');
  const panHeaderSort = document.getElementById('panHeaderSort');
  const panSettingsTabs = document.getElementById('panSettingsTabs');
  const panSettingsContent = document.getElementById('panSettingsContent');
  const panSettingsStatus = document.getElementById('panSettingsStatus');
  const panSettingsMoreBtn = document.getElementById('panSettingsMoreBtn');
  const panSettingsMoreMenu = document.getElementById('panSettingsMoreMenu');
  const panSettingsScrollLeft = document.getElementById('panSettingsScrollLeft');
  const panSettingsScrollRight = document.getElementById('panSettingsScrollRight');

  const goProxySettingsForm = document.getElementById('goProxySettingsForm');
  const goProxySaveStatus = document.getElementById('goProxySaveStatus');
  const goProxyEnabledInput = document.getElementById('goProxyEnabled');
  const goProxyAutoSelectInput = document.getElementById('goProxyAutoSelect');
  const goProxyServersJsonInput = document.getElementById('goProxyServersJson');
  const goProxyServerAdd = document.getElementById('goProxyServerAdd');
  const goProxyServerEditor = document.getElementById('goProxyServerEditor');
  const goProxyServerEditorName = document.getElementById('goProxyServerEditorName');
  const goProxyServerEditorDisplayName = document.getElementById('goProxyServerEditorDisplayName');
  const goProxyServerEditorBase = document.getElementById('goProxyServerEditorBase');
  const goProxyServerEditorConfirm = document.getElementById('goProxyServerEditorConfirm');
  const goProxyServerEditorCancel = document.getElementById('goProxyServerEditorCancel');
  const goProxyServerEditorStatus = document.getElementById('goProxyServerEditorStatus');
  const goProxyServerTableBody = document.getElementById('goProxyServerTableBody');
  const videoSourceImportFromCatPawOpenBtn = document.getElementById('videoSourceImportFromCatPawOpen');
  const videoSourceSitesToggle = document.getElementById('videoSourceSitesToggle');
  const videoSourceSitesToggleIcon = document.getElementById('videoSourceSitesToggleIcon');
  const videoSourceSitesPanel = document.getElementById('videoSourceSitesPanel');
  const catPawOpenConfigListAdd = document.getElementById('catPawOpenConfigListAdd');
  const catPawOpenConfigList = document.getElementById('catPawOpenConfigList');
  const catPawOpenConfigListJsonInput = document.getElementById('catPawOpenConfigListJson');
  const catPawOpenConfigEditor = document.getElementById('catPawOpenConfigEditor');
  const catPawOpenConfigEditorName = document.getElementById('catPawOpenConfigEditorName');
  const catPawOpenConfigEditorUrl = document.getElementById('catPawOpenConfigEditorUrl');
  const catPawOpenConfigEditorConfirm = document.getElementById('catPawOpenConfigEditorConfirm');
  const catPawOpenConfigEditorCancel = document.getElementById('catPawOpenConfigEditorCancel');
  const catPawOpenConfigEditorStatus = document.getElementById('catPawOpenConfigEditorStatus');
  const catPawOpenPansToggle = document.getElementById('catPawOpenPansToggle');
  const catPawOpenPansToggleIcon = document.getElementById('catPawOpenPansToggleIcon');
  const catPawOpenPansPanel = document.getElementById('catPawOpenPansPanel');

  const magicEpisodeRulePatternInput = document.getElementById('magicEpisodeRulePatternInput');
  const magicEpisodeRuleReplaceInput = document.getElementById('magicEpisodeRuleReplaceInput');
  const magicEpisodeRuleAdd = document.getElementById('magicEpisodeRuleAdd');
  const magicEpisodeRuleList = document.getElementById('magicEpisodeRuleList');
  const magicEpisodeRuleStatus = document.getElementById('magicEpisodeRuleStatus');
  const magicEpisodeRuleTestInput = document.getElementById('magicEpisodeRuleTestInput');
  const magicEpisodeRuleTestBtn = document.getElementById('magicEpisodeRuleTestBtn');
  const magicEpisodeRuleTestOutput = document.getElementById('magicEpisodeRuleTestOutput');
  const magicEpisodeCleanRegexRuleInput = document.getElementById('magicEpisodeCleanRegexRuleInput');
  const magicEpisodeCleanRegexRuleAdd = document.getElementById('magicEpisodeCleanRegexRuleAdd');
  const magicEpisodeCleanRegexRuleList = document.getElementById('magicEpisodeCleanRegexRuleList');
  const magicEpisodeCleanRegexRuleStatus = document.getElementById('magicEpisodeCleanRegexRuleStatus');

  const magicAggregateRuleTestInput = document.getElementById('magicAggregateRuleTestInput');
  const magicAggregateRuleTestBtn = document.getElementById('magicAggregateRuleTestBtn');
  const magicAggregateRuleTestOutput = document.getElementById('magicAggregateRuleTestOutput');

  const magicAggregateRegexRuleInput = document.getElementById('magicAggregateRegexRuleInput');
  const magicAggregateRegexRuleAdd = document.getElementById('magicAggregateRegexRuleAdd');
  const magicAggregateRegexRuleList = document.getElementById('magicAggregateRegexRuleList');
  const magicAggregateRegexRuleStatus = document.getElementById('magicAggregateRegexRuleStatus');

  const smartSourcePriorityTokensInput = document.getElementById('smartSourcePriorityTokensInput');
  const smartPanMatchTokensInput = document.getElementById('smartPanMatchTokensInput');
  const smartPanExtractModeSelect = document.getElementById('smartPanExtractModeSelect');
  const smartPanSettingsSave = document.getElementById('smartPanSettingsSave');
  const smartPanSettingsStatus = document.getElementById('smartPanSettingsStatus');

  const panelLoaded = {
    site: false,
    user: false,
    video: false,
    pan: false,
    interface: false,
    magic: false,
  };
  const panelLoading = {
    site: false,
    user: false,
    video: false,
    pan: false,
    interface: false,
    magic: false,
  };

  const CLS = {
    muted: 'text-gray-500 dark:text-gray-400',
    mutedXs: 'text-xs text-gray-500 dark:text-gray-400',
    mutedMonoXs: 'text-xs text-gray-500 dark:text-gray-400 font-mono flex-shrink-0',
  };

  let catPawOpenConfigListEditor = null;
  let catPawOpenServers = [];
  let catPawOpenServerAddMode = false;
  let catPawOpenServerPrevSelectedKey = '';
  let catPawOpenServerPrevRemoteState = { state: 'hidden', message: '' };
  let catPawOpenServerSelectSyncing = false;
  let catPawOpenSavedApiBaseNorm = '';
  let syncCatPawOpenServerAddModeButtons = () => {};
  let cancelCatPawOpenServerAddMode = async () => {};

  const normalizeCatPawOpenServers = (raw) => {
    const list = Array.isArray(raw) ? raw : [];
    const out = [];
    list.forEach((it) => {
      const n = it && typeof it.name === 'string' ? it.name.trim() : '';
      const a = it && typeof it.apiBase === 'string' ? String(it.apiBase || '').trim() : '';
      if (!n || !a) return;
      out.push({ name: n, apiBase: a });
    });
    return out;
  };

  const pickCatPawOpenActiveKey = (servers, desired) => {
    const list = Array.isArray(servers) ? servers : [];
    const k = typeof desired === 'string' ? desired.trim() : '';
    if (k) {
      const hit = list.find((s) => s && s.name === k);
      if (hit) return hit.name;
    }
    return list[0] ? list[0].name : '';
  };

  const resolveCatPawOpenApiBaseFromSettings = (settings) => {
    const servers = normalizeCatPawOpenServers(settings && settings.catPawOpenServers);
    const active = settings && typeof settings.catPawOpenActive === 'string' ? settings.catPawOpenActive : '';
    const key = pickCatPawOpenActiveKey(servers, active);
    const server = servers.find((s) => s && s.name === key) || servers[0];
    return server && server.apiBase ? String(server.apiBase || '').trim() : '';
  };

  const normalizeTvUser = (value) => {
    const raw = value != null ? String(value) : '';
    const trimmed = raw.trim();
    if (!trimmed) return '';
    // Prevent header injection and keep a single-line header value.
    return trimmed.replace(/[\r\n]+/g, '');
  };

  const resolveTvUser = () => {
    const user = bootstrap && typeof bootstrap === 'object' ? bootstrap.user : null;
    const username = user && typeof user === 'object' ? user.username : '';
    return normalizeTvUser(username);
  };

  const createEl = (tag, options = {}) => {
    const el = document.createElement(tag);
    const className = options.className != null ? String(options.className) : '';
    if (className) el.className = className;
    if (options.text != null) el.textContent = String(options.text);
    if (options.html != null) el.innerHTML = String(options.html);
    return el;
  };

  const setStyles = (el, styles) => {
    if (!el || !styles) return el;
    try {
      Object.assign(el.style, styles);
    } catch (_e) {}
    return el;
  };

  const setEllipsisCell = (el, { width, minWidth, maxWidth, flex = '0 0 auto', display = 'inline-block' } = {}) =>
    setStyles(el, {
      width,
      minWidth,
      maxWidth,
      flex,
      display,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    });

  const setCenterCell = (el, { minWidth, width, flex, display = 'inline-flex' } = {}) =>
    setStyles(el, {
      display,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth,
      width,
      flex,
    });

  const SORT_ICON = {
    up: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    down: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  };

  const appendSortButtons = (sortCell, { dirAttr, keyAttr, key, disabledUp, disabledDown } = {}) => {
    if (!sortCell) return;
    const sortGroup = createEl('div', { className: 'sort-btn-group' });
    const upBtn = createEl('button', { className: 'sort-btn', html: SORT_ICON.up });
    upBtn.type = 'button';
    upBtn.setAttribute(String(dirAttr || 'data-sort'), 'up');
    upBtn.setAttribute(String(keyAttr || 'data-site-key'), String(key || ''));
    upBtn.disabled = !!disabledUp;

    const downBtn = createEl('button', { className: 'sort-btn', html: SORT_ICON.down });
    downBtn.type = 'button';
    downBtn.setAttribute(String(dirAttr || 'data-sort'), 'down');
    downBtn.setAttribute(String(keyAttr || 'data-site-key'), String(key || ''));
    downBtn.disabled = !!disabledDown;

    sortGroup.appendChild(upBtn);
    sortGroup.appendChild(downBtn);
    sortCell.appendChild(sortGroup);
  };

  const appendEmptyItem = (listEl, text = '无数据') => {
    if (!listEl) return;
    listEl.appendChild(createEl('li', { className: CLS.muted, text }));
  };

  const setInlineStatus = (el, type, text) => {
    if (!el) return;
    const t = text != null ? String(text) : '';
    if (!t) {
      el.classList.add('hidden');
      try {
        el.hidden = true;
      } catch (_e) {}
      el.textContent = '';
      el.classList.remove('text-green-600', 'text-red-600');
      return;
    }
    el.classList.remove('hidden', 'text-green-600', 'text-red-600');
    try {
      el.hidden = false;
    } catch (_e) {}
    if (type === 'success') el.classList.add('text-green-600');
    if (type === 'error') el.classList.add('text-red-600');
    el.textContent = t;
  };

  const bindInlineStatus = (el) => (type, text) => setInlineStatus(el, type, text);

  const setInlineStatusHtml = (el, type, html) => {
    if (!el) return;
    const t = html != null ? String(html) : '';
    if (!t) {
      el.classList.add('hidden');
      try {
        el.hidden = true;
      } catch (_e) {}
      el.innerHTML = '';
      el.classList.remove('text-green-600', 'text-red-600');
      return;
    }
    el.classList.remove('hidden', 'text-green-600', 'text-red-600');
    try {
      el.hidden = false;
    } catch (_e) {}
    if (type === 'success') el.classList.add('text-green-600');
    if (type === 'error') el.classList.add('text-red-600');
    el.innerHTML = t;
  };

  const bindInlineStatusHtml = (el) => (type, html) => setInlineStatusHtml(el, type, html);

  const bindOnce = (el, fn) => {
    if (!el) return false;
    if (el.dataset && el.dataset.bound === 'true') return false;
    if (el.dataset) el.dataset.bound = 'true';
    if (typeof fn === 'function') fn(el);
    return true;
  };

  const calcMaxTextLength = (items, getText) => {
    const list = Array.isArray(items) ? items : [];
    const getter = typeof getText === 'function' ? getText : () => '';
    return list.reduce((max, item) => {
      const text = getter(item);
      return Math.max(max, (text != null ? String(text) : '').length);
    }, 0);
  };

  const calcChCell = (items, getText, { min = 1, pad = 2 } = {}) => {
    const maxLen = Math.max(calcMaxTextLength(items, getText), Number(min) || 0);
    const safePad = Number.isFinite(Number(pad)) ? Number(pad) : 2;
    return { maxLen, width: `${maxLen}ch`, maxWidth: `${maxLen + safePad}ch` };
  };

  const calcPxCell = (items, getText, { minPx = 0, maxPx = 0, className = '', padPx = 12 } = {}) => {
    const list = Array.isArray(items) ? items : [];
    const getter = typeof getText === 'function' ? getText : () => '';
    const min = Number.isFinite(Number(minPx)) ? Math.max(0, Number(minPx)) : 0;
    const max = Number.isFinite(Number(maxPx)) && Number(maxPx) > 0 ? Number(maxPx) : 0;
    const pad = Number.isFinite(Number(padPx)) ? Math.max(0, Number(padPx)) : 0;

    if (!list.length) {
      const w = min;
      return { px: w, width: `${w}px`, minWidth: `${min}px`, maxWidth: `${w}px`, flex: `0 0 ${w}px` };
    }

    const measure = createEl('span', { className });
    setStyles(measure, {
      position: 'absolute',
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      left: '-99999px',
      top: '-99999px',
      pointerEvents: 'none',
    });
    document.body.appendChild(measure);

    let maxWidthPx = 0;
    list.forEach((it) => {
      const text = getter(it);
      measure.textContent = text != null ? String(text) : '';
      maxWidthPx = Math.max(maxWidthPx, Math.ceil(measure.getBoundingClientRect().width));
    });

    document.body.removeChild(measure);

    let w = Math.max(maxWidthPx, min);
    if (max > 0) w = Math.min(w, max);
    w = Math.ceil(w);
    return { px: w, width: `${w}px`, minWidth: `${min}px`, maxWidth: `${w}px`, flex: `0 0 ${w}px` };
  };

  const fixedCell = (px) => {
    const n = Number(px);
    const v = Number.isFinite(n) ? Math.max(0, n) : 0;
    return { minWidth: `${v}px`, width: `${v}px`, flex: `0 0 ${v}px` };
  };

  const setFixedHeaderCell = (el, px) =>
    setStyles(el, { display: 'inline-block', textAlign: 'center', ...fixedCell(px) });

  const createSwitchLabel = ({ checked, disabled, title, ariaLabel, inputAttrs, onChange }) => {
    const label = createEl('label', { className: 'enable-switch' });
    if (title) label.title = String(title);
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!checked;
    input.disabled = !!disabled;
    if (ariaLabel) input.setAttribute('aria-label', String(ariaLabel));
    if (inputAttrs && typeof inputAttrs === 'object') {
      Object.entries(inputAttrs).forEach(([k, v]) => {
        if (v == null) return;
        input.setAttribute(String(k), String(v));
      });
    }
    if (typeof onChange === 'function') input.addEventListener('change', onChange);
    const slider = createEl('span', { className: 'enable-slider' });
    label.appendChild(input);
    label.appendChild(slider);
    return { label, input };
  };

  const fetchJsonSafe = async (url, options, fallback) => {
    const resp = await fetch(url, options);
    const fb = fallback == null ? {} : fallback;
    const data = await resp.json().catch(() => fb);
    return { resp, data };
  };

  const postJsonSafe = (url, body) =>
    fetchJsonSafe(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body != null ? body : {}),
      },
      {}
    );

  const getSuccessJson = async (url, options = {}) => {
    try {
      const opts = options && typeof options === 'object' ? options : {};
      const { resp, data } = await fetchJsonSafe(url, { method: 'GET', ...opts }, {});
      if (resp.ok && data && data.success) return data;
    } catch (_e) {}
    return null;
  };

  const postForm = (url, fields) => {
    const body = new URLSearchParams();
    if (fields && typeof fields === 'object') {
      Object.entries(fields).forEach(([k, v]) => {
        body.append(String(k), v != null ? String(v) : '');
      });
    }
    return fetchJsonSafe(
      url,
      { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() },
      {}
    );
  };

  const formToFields = (form) => {
    const fields = {};
    if (!form) return fields;
    try {
      const formData = new FormData(form);
      for (const [k, v] of formData.entries()) fields[k] = v != null ? String(v) : '';
    } catch (_e) {}
    return fields;
  };

  const withDatasetLock = async (el, key, fn) => {
    if (!el || !el.dataset) return (typeof fn === 'function' ? fn() : undefined);
    const k = typeof key === 'string' && key ? key : 'pending';
    if (el.dataset[k] === 'true') return undefined;
    el.dataset[k] = 'true';
    try {
      return await (typeof fn === 'function' ? fn() : undefined);
    } finally {
      try {
        delete el.dataset[k];
      } catch (_e) {}
    }
  };

  const clearStatusLater = (setStatus, delay = 1200) => {
    if (typeof setStatus !== 'function') return;
    const ms = Number(delay);
    const d = Number.isFinite(ms) ? ms : 1200;
    setTimeout(() => setStatus('', ''), d);
  };

  const swapCopy = (arr, i, j) => {
    const list = Array.isArray(arr) ? arr.slice() : [];
    const a = Number(i);
    const b = Number(j);
    if (!Number.isInteger(a) || !Number.isInteger(b)) return list;
    if (a < 0 || b < 0 || a >= list.length || b >= list.length || a === b) return list;
    const tmp = list[a];
    list[a] = list[b];
    list[b] = tmp;
    return list;
  };
  let initialPanelKey = null;
  const allowedPanels = new Set(['site', 'user', 'video', 'pan', 'interface', 'magic']);
  const normalizePanelKey = (key) => {
    const k = typeof key === 'string' ? key.trim().toLowerCase() : '';
    return allowedPanels.has(k) ? k : 'site';
  };
  const readPanelFromHash = () => {
    const hash = typeof window.location.hash === 'string' ? window.location.hash : '';
    const key = hash.replace(/^#/, '').trim();
    return normalizePanelKey(key);
  };
  const writePanelToHash = (key) => {
    const next = normalizePanelKey(key);
    const current = (window.location.hash || '').replace(/^#/, '');
    if (current === next) return;
    window.location.hash = `#${next}`;
  };
  const showPanel = (key) => {
    const safeKey = normalizePanelKey(key);
    panels.forEach((p) => p.classList.add('hidden'));
    adminNavs.forEach((n) => {
      const active = n.dataset.admin === safeKey;
      n.setAttribute('data-active', active ? 'true' : 'false');
    });
    const target = document.querySelector(
      `#admin${safeKey.charAt(0).toUpperCase()}${safeKey.slice(1)}`
    );
    if (target) target.classList.remove('hidden');
  };

  let goProxyServers = [];
  let goProxyProbes = new Map();
  let goProxySaving = false;
  let goProxyEditorMode = 'hidden'; // hidden | add | edit
  let goProxyEditorEditingKey = '';
  let goProxyServerEditorHomeParent = null;
  let goProxyServerEditorHomeNextSibling = null;

  const restoreGoProxyServerEditorHome = () => {
    if (!goProxyServerEditor) return;
    if (!goProxyServerEditorHomeParent) return;
    if (goProxyServerEditor.parentNode === goProxyServerEditorHomeParent) return;
    goProxyServerEditorHomeParent.insertBefore(goProxyServerEditor, goProxyServerEditorHomeNextSibling);
  };

  const normalizeHttpBase = (value) => {
    const raw = typeof value === 'string' ? value.trim() : '';
    if (!raw) return '';
    try {
      const u = new URL(raw);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return '';
      u.hash = '';
      u.search = '';
      return u.toString().replace(/\/+$/g, '');
    } catch (_e) {
      return '';
    }
  };

  const safeParseJsonArray = (text) => {
    try {
      const v = JSON.parse(String(text || ''));
      return Array.isArray(v) ? v : [];
    } catch (_e) {
      return [];
    }
  };

  const normalizeCatPawOpenAdminBase = (value) => {
    const raw = typeof value === 'string' ? value.trim() : '';
    if (!raw) return '';
    try {
      const u = new URL(raw);
      u.hash = '';
      u.search = '';
      let p = u.pathname || '/';
      const spiderIdx = p.indexOf('/spider/');
      if (spiderIdx >= 0) p = p.slice(0, spiderIdx) || '/';
      // If user pasted an id-prefixed spider API like "/<id>/spider/...", drop the id segment.
      if (/^\/[a-f0-9]{10}\/?$/.test(p)) p = '/';
      p = p.replace(/\/spider\/?$/, '/') || '/';
      p = p.replace(/\/(full-config|config|website)\/?$/, '/') || '/';
      if (!p.endsWith('/')) p += '/';
      u.pathname = p;
      return u.toString();
    } catch (_e) {
      return '';
    }
  };

  const syncCatPawOpenSettingsVisibility = () => {
    const form = document.getElementById('catPawOpenSettingsForm');
    const apiInput = form ? form.querySelector('input[name="catPawOpenApiBase"]') : null;
    const extrasEl = document.getElementById('catPawOpenSettingsExtras');
    const syncWrap = document.getElementById('catPawOpenSyncSaveWrap');
    const syncInput = document.getElementById('catPawOpenSyncSave');
    const syncFromRow = document.getElementById('catPawOpenSyncFromServerRow');
    const syncFromSelect = document.getElementById('catPawOpenSyncFromServerSelect');
    if (!apiInput) return;

    const rebuildSyncFromSelect = ({ includeCurrent }) => {
      if (!syncFromSelect) return;
      const prevValue = String(syncFromSelect.value || '');
      syncFromSelect.innerHTML = '';

      const addOpt = (value, label, { disabled = false, selected = false } = {}) => {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = label;
        opt.disabled = !!disabled;
        opt.selected = !!selected;
        syncFromSelect.appendChild(opt);
      };

      addOpt('', '请选择', { selected: true });
      if (includeCurrent) {
        addOpt('__current__', '当前服务器');
      }

      const serverSelect = document.getElementById('catPawOpenServerSelect');
      const selectedKey = serverSelect ? String(serverSelect.value || '') : '';
      const omitSelected = includeCurrent && !!selectedKey && selectedKey !== '__new__';

      (catPawOpenServers || []).forEach((s) => {
        if (!s || typeof s.name !== 'string') return;
        const name = s.name.trim();
        if (!name) return;
        if (omitSelected && name === selectedKey) return;
        addOpt(name, name);
      });

      const stillValid = Array.from(syncFromSelect.options || []).some((o) => o && String(o.value || '') === prevValue);
      syncFromSelect.value = stillValid ? prevValue : '';
      remountCustomSelectElement(syncFromSelect);
    };

    // When adding a new server, never show "sync save" UI.
    if (catPawOpenServerAddMode) {
      if (extrasEl) extrasEl.classList.add('hidden');
      if (syncWrap) syncWrap.classList.add('hidden');
      if (syncInput) {
        syncInput.checked = false;
        syncInput.disabled = true;
      }
      if (syncFromRow) syncFromRow.classList.remove('hidden');
      rebuildSyncFromSelect({ includeCurrent: false });
      return;
    }

    const currentRaw = typeof apiInput.value === 'string' ? apiInput.value : '';
    const currentNorm = normalizeCatPawOpenAdminBase(currentRaw);

    const showExtras = currentNorm === catPawOpenSavedApiBaseNorm;
    if (extrasEl) extrasEl.classList.toggle('hidden', !showExtras);

    const showSyncFrom = !!currentNorm && currentNorm !== catPawOpenSavedApiBaseNorm;
    if (syncWrap) syncWrap.classList.add('hidden');
    if (syncInput) {
      syncInput.checked = false;
      syncInput.disabled = true;
    }
    if (syncFromRow) syncFromRow.classList.toggle('hidden', !showSyncFrom);
    if (showSyncFrom) rebuildSyncFromSelect({ includeCurrent: true });
    else if (syncFromSelect) {
      syncFromSelect.value = '';
      remountCustomSelectElement(syncFromSelect);
    }
  };

  const normalizeHttpUrl = (value) => {
    const raw = typeof value === 'string' ? value.trim() : '';
    if (!raw) return '';
    try {
      const u = new URL(raw);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return '';
      u.hash = '';
      return u.toString();
    } catch (_e) {
      return '';
    }
  };

	  const initCatPawOpenConfigListEditor = () => {
	    if (
	      !catPawOpenConfigList ||
	      !catPawOpenConfigListAdd ||
	      !catPawOpenConfigEditor ||
	      !catPawOpenConfigEditorName ||
	      !catPawOpenConfigEditorUrl ||
	      !catPawOpenConfigEditorConfirm ||
	      !catPawOpenConfigEditorCancel ||
	      !catPawOpenConfigEditorStatus
	    )
	      return;

    const CHECK_CACHE_KEY = 'meowfilm_catpawopen_online_check_v1';
    const loadCheckCache = () => {
      try {
        const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(CHECK_CACHE_KEY) : '';
        const parsed = raw && raw.trim() ? JSON.parse(raw) : null;
        const obj = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
        const out = new Map();
        Object.entries(obj).forEach(([k, v]) => {
          const url = normalizeHttpUrl(k);
          const val = v && typeof v === 'object' && !Array.isArray(v) ? v : null;
          const sRaw = val ? val.s || val.status || '' : v;
          const pRaw = val ? val.p || val.phase || '' : '';
          const check = normalizeConfigCheckStatus(sRaw);
          const phase = normalizeConfigCheckPhase(pRaw);
          if (url && check && check !== 'unchecked') out.set(url, { status: check, phase });
        });
        return out;
      } catch (_e) {
        return new Map();
      }
    };
    const saveCheckCache = (map) => {
      try {
        if (typeof localStorage === 'undefined') return;
        const obj = {};
        (map instanceof Map ? Array.from(map.entries()) : []).forEach(([k, v]) => {
          const url = normalizeHttpUrl(k);
          const val = v && typeof v === 'object' && !Array.isArray(v) ? v : null;
          const status = normalizeConfigCheckStatus(val ? val.status : v);
          const phase = normalizeConfigCheckPhase(val ? val.phase : '');
          if (url && status && status !== 'unchecked') obj[url] = { s: status, p: phase };
        });
        localStorage.setItem(CHECK_CACHE_KEY, JSON.stringify(obj));
      } catch (_e) {}
    };

    const readCheckCacheEntry = (url) => {
      if (!(checkCache instanceof Map) || !url) return { status: 'unchecked', phase: '' };
      const v = checkCache.get(url);
      const val = v && typeof v === 'object' && !Array.isArray(v) ? v : null;
      const status = normalizeConfigCheckStatus(val ? val.status : v);
      const phase = normalizeConfigCheckPhase(val ? val.phase : '');
      return { status: status || 'unchecked', phase };
    };

    const normalizeConfigItem = (it) => {
      const obj = it && typeof it === 'object' ? it : {};
      const name = typeof obj.name === 'string' ? obj.name.trim() : '';
      const url = normalizeHttpUrl(typeof obj.url === 'string' ? obj.url : '');
      const check = normalizeConfigCheckStatus(obj.check);
      const phase = normalizeConfigCheckPhase(obj.checkPhase || obj.phase || '');
      if (!url) return null;
      return { name: name || '未命名', url, check, checkPhase: phase };
    };

    const parseInitialItems = () => {
      if (!catPawOpenConfigListJsonInput) return [];
      const raw = typeof catPawOpenConfigListJsonInput.value === 'string' ? catPawOpenConfigListJsonInput.value : '';
      if (!raw.trim()) return [];
      try {
        const arr = JSON.parse(raw);
        const list = Array.isArray(arr) ? arr : [];
        return list.map(normalizeConfigItem).filter(Boolean);
      } catch (_e) {
        return [];
      }
    };

	    let items = parseInitialItems();
	    let checkCache = loadCheckCache();
	    let editorOpen = false;
	    let editorMode = 'add'; // add | edit
	    let editorIndex = -1;

    const editorHome = {
      parent: catPawOpenConfigEditor.parentElement,
      nextSibling: catPawOpenConfigEditor.nextSibling,
    };

    const mountEditorHome = () => {
      try {
        if (!editorHome.parent) return;
        catPawOpenConfigEditor.style.width = '100%';
        if (catPawOpenConfigEditor.parentElement === editorHome.parent) return;
        editorHome.parent.insertBefore(catPawOpenConfigEditor, editorHome.nextSibling || null);
      } catch (_e) {}
    };

    const setAddBtnMode = () => {
      if (!catPawOpenConfigListAdd) return;
      const isAddOpen = editorOpen && editorMode === 'add';
      catPawOpenConfigListAdd.textContent = isAddOpen ? '取消' : '添加';
    };

    const syncJsonField = () => {
      if (!catPawOpenConfigListJsonInput) return;
      try {
        const saved = (items || []).filter(Boolean).map((it) => ({ name: it.name, url: it.url }));
        catPawOpenConfigListJsonInput.value = JSON.stringify(saved);
      } catch (_e) {
        catPawOpenConfigListJsonInput.value = '[]';
      }
    };

    const resetEditorStatus = () => {
      if (!catPawOpenConfigEditorStatus) return;
      catPawOpenConfigEditorStatus.hidden = true;
      catPawOpenConfigEditorStatus.textContent = '';
      catPawOpenConfigEditorStatus.className = 'text-sm mt-2';
    };

    const showEditorError = (msg) => {
      if (!catPawOpenConfigEditorStatus) return;
      catPawOpenConfigEditorStatus.hidden = false;
      catPawOpenConfigEditorStatus.textContent = String(msg || '');
      catPawOpenConfigEditorStatus.className = 'text-sm mt-2 text-red-600 dark:text-red-300';
    };

    const setConfirmEnabled = () => {
      if (!catPawOpenConfigEditorConfirm) return;
      const nameRaw =
        typeof catPawOpenConfigEditorName.value === 'string' ? catPawOpenConfigEditorName.value.trim() : '';
      const url = normalizeHttpUrl(catPawOpenConfigEditorUrl.value);
      const enabled = Boolean(nameRaw) && Boolean(url);
      catPawOpenConfigEditorConfirm.disabled = !enabled;
      if (enabled) {
        catPawOpenConfigEditorConfirm.classList.add('btn-green');
        catPawOpenConfigEditorConfirm.classList.remove('btn-add');
      } else {
        catPawOpenConfigEditorConfirm.classList.add('btn-add');
        catPawOpenConfigEditorConfirm.classList.remove('btn-green');
      }
    };

    const closeEditor = () => {
      editorOpen = false;
      editorMode = 'add';
      editorIndex = -1;
      mountEditorHome();
      catPawOpenConfigEditor.classList.add('hidden');
      resetEditorStatus();
      setAddBtnMode();
      setConfirmEnabled();
    };

    const openEditor = ({ mode, index }) => {
      editorOpen = true;
      editorMode = mode === 'edit' ? 'edit' : 'add';
      editorIndex = typeof index === 'number' ? index : -1;
      if (editorMode !== 'edit') mountEditorHome();
      catPawOpenConfigEditor.classList.remove('hidden');
      resetEditorStatus();
      setAddBtnMode();

      const it = editorMode === 'edit' && editorIndex >= 0 ? items[editorIndex] : null;
      catPawOpenConfigEditorName.value = it && typeof it.name === 'string' ? it.name : '';
      catPawOpenConfigEditorUrl.value = it && typeof it.url === 'string' ? it.url : '';
      catPawOpenConfigEditorConfirm.textContent = editorMode === 'add' ? '添加' : '确定';
      setConfirmEnabled();

      (catPawOpenConfigEditorName.value ? catPawOpenConfigEditorUrl : catPawOpenConfigEditorName).focus();
    };

    const mkBtn = (text, kind = '') => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `action-btn ${kind === 'red' ? 'red' : 'blue'}`;
      btn.textContent = text;
      return btn;
    };

    const render = () => {
      syncJsonField();
      catPawOpenConfigList.innerHTML = '';
      setAddBtnMode();

      const list = Array.isArray(items) ? items : [];
      if (!list.length) {
        // For "add" mode, keep the editor above the list.
        if (editorOpen && editorMode === 'add') {
          mountEditorHome();
        }
        const tr = createEl('tr', {});
        tr.appendChild(createEl('td', { className: `px-3 py-2 ${CLS.muted}`, text: '-' }));
        tr.appendChild(createEl('td', { className: `px-3 py-2 ${CLS.muted}`, text: '-' }));
        tr.appendChild(createEl('td', { className: `px-3 py-2 ${CLS.muted}`, text: '-' }));
        tr.appendChild(createEl('td', { className: `px-3 py-2 ${CLS.muted}`, text: '-' }));
        catPawOpenConfigList.appendChild(tr);
        return;
      }

      list.forEach((it, idx) => {
        const tr = createEl('tr', {});
        tr.appendChild(
          createEl('td', {
            className: 'px-3 py-2 font-semibold whitespace-nowrap',
            text: it && typeof it.name === 'string' && it.name.trim() ? it.name.trim() : '未命名',
          })
        );

        const urlTd = createEl('td', { className: 'px-3 py-2' });
        const urlSpan = createEl('span', {
          text: it && typeof it.url === 'string' ? it.url : '',
        });
        urlSpan.style.display = 'inline-block';
        urlSpan.style.minWidth = '30ch';
        urlSpan.style.maxWidth = '60ch';
        urlSpan.style.whiteSpace = 'nowrap';
        urlSpan.style.overflow = 'hidden';
        urlSpan.style.textOverflow = 'ellipsis';
        urlTd.appendChild(urlSpan);
        tr.appendChild(urlTd);

        const checkTd = createEl('td', { className: 'px-3 py-2 whitespace-nowrap' });
        checkTd.appendChild(buildConfigCheckTag(it && it.check ? it.check : 'unchecked', it && it.checkPhase ? it.checkPhase : ''));
        tr.appendChild(checkTd);

      const actionsTd = createEl('td', { className: 'px-3 py-2 whitespace-nowrap' });
      const actionsInner = createEl('div', { className: 'action-group' });

        const isEditingThisRow = editorOpen && editorMode === 'edit' && editorIndex === idx;
        const editBtn = mkBtn(isEditingThisRow ? '取消' : '修改');
        editBtn.addEventListener('click', () => {
          if (isEditingThisRow) {
            closeEditor();
            render();
            return;
          }
          openEditor({ mode: 'edit', index: idx });
          render();
        });

        const delBtn = mkBtn('删除', 'red');
        delBtn.addEventListener('click', () => {
          try {
            const cur = items && items[idx] ? items[idx] : null;
            const url = cur && typeof cur.url === 'string' ? normalizeHttpUrl(cur.url) : '';
            if (url && checkCache instanceof Map && checkCache.has(url)) {
              checkCache.delete(url);
              saveCheckCache(checkCache);
            }
          } catch (_e) {}
          items = (items || []).filter((_x, i) => i !== idx);
          if (editorOpen && editorMode === 'edit') {
            if (editorIndex === idx) closeEditor();
            else if (editorIndex > idx) editorIndex -= 1;
          }
          render();
        });

        actionsInner.appendChild(editBtn);
        actionsInner.appendChild(delBtn);
        actionsTd.appendChild(actionsInner);
        tr.appendChild(actionsTd);
        catPawOpenConfigList.appendChild(tr);

        if (editorOpen && editorMode === 'edit' && editorIndex === idx) {
          const editorRow = createEl('tr', {});
          const editorCell = createEl('td', { className: 'px-3 py-2' });
          editorCell.colSpan = 4;
          editorRow.appendChild(editorCell);
          catPawOpenConfigList.appendChild(editorRow);
          try {
            catPawOpenConfigEditor.style.width = '100%';
            editorCell.appendChild(catPawOpenConfigEditor);
          } catch (_e) {}
        }
      });

      if (!editorOpen || editorMode === 'add') {
        mountEditorHome();
      }
    };

    const onConfirmEditor = () => {
      const nameRaw =
        typeof catPawOpenConfigEditorName.value === 'string' ? catPawOpenConfigEditorName.value.trim() : '';
      if (!nameRaw) {
        showEditorError('名称不能为空');
        catPawOpenConfigEditorName.focus();
        return;
      }
      const url = normalizeHttpUrl(catPawOpenConfigEditorUrl.value);
      if (!url) {
        showEditorError('配置地址无效');
        catPawOpenConfigEditorUrl.focus();
        return;
      }
      const name = nameRaw;

      if (editorMode === 'edit' && editorIndex >= 0 && items && items[editorIndex]) {
        const prev = items[editorIndex];
        const prevCheck = prev && typeof prev.check === 'string' ? prev.check : 'unchecked';
        const prevPhase = prev && typeof prev.checkPhase === 'string' ? prev.checkPhase : '';
        items = (items || []).map((x, i) => (i === editorIndex ? { name, url, check: prevCheck, checkPhase: prevPhase } : x));
      } else {
        items = (items || []).concat([{ name, url, check: 'unchecked', checkPhase: '' }]);
      }

      closeEditor();
      render();
    };

    catPawOpenConfigListAdd.addEventListener('click', (e) => {
      e.preventDefault();
      if (editorOpen) {
        closeEditor();
        render();
      }
      else openEditor({ mode: 'add', index: -1 });
    });
    catPawOpenConfigEditorCancel.addEventListener('click', (e) => {
      e.preventDefault();
      closeEditor();
      render();
    });
    catPawOpenConfigEditorConfirm.addEventListener('click', (e) => {
      e.preventDefault();
      onConfirmEditor();
    });
    [catPawOpenConfigEditorName, catPawOpenConfigEditorUrl].forEach((el) => {
      el.addEventListener('input', () => setConfirmEnabled());
    });
    [catPawOpenConfigEditorName, catPawOpenConfigEditorUrl].forEach((el) => {
      el.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        onConfirmEditor();
      });
    });

    render();

    const api = {
      getItems: () =>
        (items || []).filter(Boolean).map((it) => ({ name: it.name, url: it.url, check: it.check })),
      setCheckingAll: () => {
        let changed = false;
        items = (items || []).map((it) => {
          if (!it) return it;
          if (normalizeConfigCheckStatus(it.check) === 'checking') return it;
          changed = true;
          return { ...it, check: 'checking', checkPhase: '' };
        });
        if (changed) render();
      },
      setItems: (nextItems = []) => {
        const prevChecksByUrl = new Map(
          (items || [])
            .filter((it) => it && typeof it.url === 'string')
            .map((it) => [
              String(it.url || ''),
              { status: typeof it.check === 'string' ? it.check : '', phase: typeof it.checkPhase === 'string' ? it.checkPhase : '' },
            ])
        );
        const arr = Array.isArray(nextItems) ? nextItems : [];
        items = arr
          .map((it) => normalizeConfigItem(it))
          .filter(Boolean)
          .map((it) => {
            const prev = prevChecksByUrl.get(it.url);
            const cached = readCheckCacheEntry(it.url);
            const status = normalizeConfigCheckStatus(it.check || (prev && prev.status) || cached.status || '');
            const phase = normalizeConfigCheckPhase(
              normalizeConfigCheckStatus(status) === 'error' ? it.checkPhase || (prev && prev.phase) || cached.phase || '' : ''
            );
            return { ...it, check: status, checkPhase: phase };
          });
        render();
      },
      setChecksFromResults: (results = []) => {
        const arr = Array.isArray(results) ? results : [];
        const statusByUrl = new Map();
        arr.forEach((r) => {
          const obj = r && typeof r === 'object' ? r : {};
          const url = normalizeHttpUrl(typeof obj.url === 'string' ? obj.url : '');
          const status = normalizeConfigCheckStatus(obj && obj.status === 'pass' ? 'pass' : 'error');
          const phase = normalizeConfigCheckPhase(obj && typeof obj.phase === 'string' ? obj.phase : '');
          if (url) statusByUrl.set(url, { status, phase });
        });
        let changed = false;
        items = (items || []).map((it) => {
          if (!it) return it;
          const url = typeof it.url === 'string' ? it.url : '';
          if (!url || !statusByUrl.has(url)) return it;
          const next = statusByUrl.get(url);
          const nextCheck = normalizeConfigCheckStatus(next && next.status ? next.status : '') || 'unchecked';
          const nextPhase = normalizeConfigCheckPhase(next && next.phase ? next.phase : '');
          const prevCheck = normalizeConfigCheckStatus(it.check);
          const prevPhase = normalizeConfigCheckPhase(it.checkPhase);
          if (prevCheck === nextCheck && prevPhase === nextPhase) return it;
          changed = true;
          return { ...it, check: nextCheck, checkPhase: nextPhase };
        });
        try {
          if (!(checkCache instanceof Map)) checkCache = loadCheckCache();
          statusByUrl.forEach((v, k) => {
            const check = normalizeConfigCheckStatus(v && v.status ? v.status : '');
            const phase = normalizeConfigCheckPhase(v && v.phase ? v.phase : '');
            if (!k) return;
            if (!check || check === 'unchecked') checkCache.delete(k);
            else checkCache.set(k, { status: check, phase });
          });
          saveCheckCache(checkCache);
        } catch (_e) {}
        if (changed) render();
      },
    };

    return api;
  };

  const getTvUserHeaders = () => {
    const tvUser = resolveTvUser();
    if (!tvUser) return {};
    return { 'X-TV-User': tvUser };
  };

  const requestCatPawOpenAdminJson = async ({ apiBase, path, method, body, timeoutMs }) => {
    const base = normalizeCatPawOpenAdminBase(apiBase);
    if (!base) throw new Error('CatPawOpen 接口地址无效');
    const cleanPath = String(path || '').replace(/^\//, '');
    const target = new URL(cleanPath, base);

    const headers = { 'Content-Type': 'application/json', ...getTvUserHeaders() };

    const ms = Number.isFinite(Number(timeoutMs)) ? Math.max(0, Math.trunc(Number(timeoutMs))) : 0;
    const controller = ms > 0 && typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), ms) : null;
    try {
      const { resp, data } = await fetchJsonSafe(
        target.toString(),
        {
          method: method || 'GET',
          headers,
          body: body != null ? JSON.stringify(body) : undefined,
          credentials: 'omit',
          signal: controller ? controller.signal : undefined,
        },
        {}
      );
      const status = resp && typeof resp.status === 'number' ? resp.status : 0;
      if (!resp.ok) {
        const msg = data && data.message ? String(data.message) : `HTTP ${status}`;
        const err = new Error(msg);
        err.status = status;
        throw err;
      }
      return data;
    } finally {
      if (timer) clearTimeout(timer);
    }
  };

  const setCatPawOpenRemoteState = (state, message = '') => {
    const remoteSettingsEl = document.getElementById('catPawOpenRemoteSettings');
    const remoteErrorEl = document.getElementById('catPawOpenRemoteError');
    const versionRow = document.getElementById('catPawOpenVersionRow');
    const versionText = document.getElementById('catPawOpenVersionText');
    try {
      if (remoteSettingsEl) remoteSettingsEl.classList.toggle('hidden', state !== 'ready');
      if (remoteErrorEl) {
        const showErr = state === 'error';
        remoteErrorEl.classList.toggle('hidden', !showErr);
        remoteErrorEl.textContent = showErr ? (message || 'CatPawOpen 接口异常') : '';
      }
      if (state === 'hidden') {
        if (remoteErrorEl) {
          remoteErrorEl.classList.add('hidden');
          remoteErrorEl.textContent = '';
        }
      }
      if (state !== 'ready') {
        if (versionRow) versionRow.classList.add('hidden');
        if (versionText) versionText.textContent = '';
      }
    } catch (_e) {}
  };

  const refreshCatPawOpenRemoteSettings = async (apiBaseOverride) => {
    const apiInput = document.querySelector('#catPawOpenSettingsForm input[name="catPawOpenApiBase"]');
    const apiBase = typeof apiBaseOverride === 'string'
      ? apiBaseOverride
      : apiInput && typeof apiInput.value === 'string'
        ? apiInput.value
        : '';
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) {
      setCatPawOpenRemoteState('hidden');
      return { ok: false, skipped: true, reason: 'unconfigured' };
    }
    try {
      const settingsResp = await requestCatPawOpenAdminJson({
        apiBase: normalizedBase,
        path: 'admin/settings',
        method: 'GET',
      });
      try {
        const versionRow = document.getElementById('catPawOpenVersionRow');
        const versionText = document.getElementById('catPawOpenVersionText');
        const raw =
          settingsResp && typeof settingsResp.version === 'string'
            ? settingsResp.version
            : settingsResp && settingsResp.settings && typeof settingsResp.settings.version === 'string'
              ? settingsResp.settings.version
              : '';
        const v = typeof raw === 'string' ? raw.trim() : '';
        if (versionRow && versionText && v) {
          versionText.textContent = `CatPawOpen版本:${v}`;
          versionRow.classList.remove('hidden');
        } else {
          if (versionText) versionText.textContent = '';
          if (versionRow) versionRow.classList.add('hidden');
        }
      } catch (_e) {}
      const proxyInput = document.querySelector('#catPawOpenSettingsForm input[name="catPawOpenProxy"]');
      if (proxyInput && settingsResp && settingsResp.settings && typeof settingsResp.settings.proxy === 'string') {
        proxyInput.value = settingsResp.settings.proxy || '';
      }
      const goProxyApiInput = document.querySelector('#catPawOpenSettingsForm input[name="catPawOpenGoProxyApi"]');
      if (goProxyApiInput && settingsResp && settingsResp.settings && typeof settingsResp.settings.goProxyApi === 'string') {
        goProxyApiInput.value = settingsResp.settings.goProxyApi || '';
      }
      const panBuiltinInput = document.getElementById('catPawOpenPanBuiltinResolverEnabled');
      if (panBuiltinInput && settingsResp && settingsResp.settings) {
        panBuiltinInput.checked = !!settingsResp.settings.panBuiltinResolverEnabled;
      }
      if (catPawOpenConfigListEditor && settingsResp && Array.isArray(settingsResp.onlineConfigs)) {
        catPawOpenConfigListEditor.setItems(
          settingsResp.onlineConfigs.map((it) => ({
            name: it && typeof it.name === 'string' ? it.name : '',
            url: it && typeof it.url === 'string' ? it.url : '',
            check: it && typeof it.status === 'string' ? it.status : '',
            phase: it && typeof it.phase === 'string' ? it.phase : '',
          }))
        );
      }
      setCatPawOpenRemoteState('ready');
      return { ok: true, data: { settingsResp } };
    } catch (e) {
      const msg = e && e.message ? String(e.message) : '';
      try {
        const versionRow = document.getElementById('catPawOpenVersionRow');
        const versionText = document.getElementById('catPawOpenVersionText');
        if (versionText) versionText.textContent = '';
        if (versionRow) versionRow.classList.add('hidden');
      } catch (_e) {}
      setCatPawOpenRemoteState('error', msg);
      return { ok: false, skipped: false, reason: 'error', error: e };
    }
  };

  const syncCatPawOpenRemoteSettings = async (apiBase) => {
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) return { ok: false, skipped: true, reason: 'unconfigured' };
    const proxyInput = document.querySelector('#catPawOpenSettingsForm input[name="catPawOpenProxy"]');
    const proxy = proxyInput && typeof proxyInput.value === 'string' ? proxyInput.value : '';
    const goProxyApiInput = document.querySelector('#catPawOpenSettingsForm input[name="catPawOpenGoProxyApi"]');
    const goProxyApi = goProxyApiInput && typeof goProxyApiInput.value === 'string' ? goProxyApiInput.value : '';
    const panBuiltinInput = document.getElementById('catPawOpenPanBuiltinResolverEnabled');
    const panBuiltinResolverEnabled = !!(panBuiltinInput && panBuiltinInput.checked);
    const onlineConfigs = catPawOpenConfigListEditor ? catPawOpenConfigListEditor.getItems().map((it) => ({ name: it.name, url: it.url })) : [];
    const parts = [];
    try {
      const resp = await requestCatPawOpenAdminJson({
        apiBase: normalizedBase,
        path: 'admin/settings',
        method: 'PUT',
        body: { proxy: String(proxy || ''), panBuiltinResolverEnabled, goProxyApi: String(goProxyApi || ''), onlineConfigs },
      });
      if (proxyInput && resp && resp.settings && typeof resp.settings.proxy === 'string') {
        proxyInput.value = resp.settings.proxy || '';
      }
      if (panBuiltinInput && resp && resp.settings) panBuiltinInput.checked = !!resp.settings.panBuiltinResolverEnabled;
      if (catPawOpenConfigListEditor && resp && Array.isArray(resp.onlineConfigs)) {
        catPawOpenConfigListEditor.setChecksFromResults(resp.onlineConfigs);
      }
      return { ok: true, parts: [], data: resp };
    } catch (err) {
      const msg = err && err.message ? String(err.message) : '同步失败';
      parts.push(msg);
      return { ok: false, parts };
    }
  };

  const unwrapCatPawOpenWebsiteData = (resp) => {
    if (!resp) throw new Error('CatPawOpen 返回为空');
    if (resp && typeof resp === 'object') {
      if (resp.code === 0) return resp.data;
      if (resp.success === true && Object.prototype.hasOwnProperty.call(resp, 'data')) return resp.data;
      if (Object.prototype.hasOwnProperty.call(resp, 'data')) return resp.data;
      const msg = typeof resp.message === 'string' ? resp.message : '';
      if (msg) throw new Error(msg);
    }
    return resp;
  };

  const getCatPawOpenApiBase = () => {
    const input = catPawOpenForm ? catPawOpenForm.querySelector('input[name="catPawOpenApiBase"]') : null;
    if (input) {
      const v = typeof input.value === 'string' ? input.value.trim() : '';
      if (v) return v;
      const attr = typeof input.getAttribute === 'function' ? String(input.getAttribute('value') || '').trim() : '';
      if (attr) return attr;
    }
    return '';
  };

  const catPawOpenApiBaseCache = { t: 0, v: '', inFlight: null };

  const readCatPawOpenApiBaseFromDom = () => {
    try {
      const form = document.getElementById('catPawOpenSettingsForm');
      const input = form ? form.querySelector('input[name="catPawOpenApiBase"]') : null;
      if (!input) return '';
      const v = typeof input.value === 'string' ? input.value.trim() : '';
      if (v) return v;
      const attr = typeof input.getAttribute === 'function' ? String(input.getAttribute('value') || '').trim() : '';
      return attr || '';
    } catch (_e) {
      return '';
    }
  };

  const resolveCatPawOpenApiBase = async (ttlMs = 10 * 1000) => {
    const direct = readCatPawOpenApiBaseFromDom() || getCatPawOpenApiBase();
    if (direct) {
      catPawOpenApiBaseCache.v = direct;
      catPawOpenApiBaseCache.t = Date.now();
      return direct;
    }

    const now = Date.now();
    if (catPawOpenApiBaseCache.v && now - catPawOpenApiBaseCache.t < ttlMs) return catPawOpenApiBaseCache.v;
    if (catPawOpenApiBaseCache.inFlight) return await catPawOpenApiBaseCache.inFlight;

    catPawOpenApiBaseCache.inFlight = (async () => {
      try {
        const settings = await getSuccessJson('/dashboard/site/settings');
        const base = resolveCatPawOpenApiBaseFromSettings(settings);
        catPawOpenApiBaseCache.v = base;
        catPawOpenApiBaseCache.t = Date.now();
        if (base) {
          try {
            const form = document.getElementById('catPawOpenSettingsForm');
            const input = form ? form.querySelector('input[name="catPawOpenApiBase"]') : null;
            if (input) input.value = base;
          } catch (_e) {}
        }
        return base;
      } catch (_e) {
        catPawOpenApiBaseCache.v = '';
        catPawOpenApiBaseCache.t = Date.now();
        return '';
      }
    })();

    try {
      return await catPawOpenApiBaseCache.inFlight;
    } finally {
      catPawOpenApiBaseCache.inFlight = null;
    }
  };

  const fetchCatPawOpenStatus = async ({ apiBase, path }) => {
    const base = normalizeCatPawOpenAdminBase(apiBase);
    if (!base) throw new Error('CatPawOpen 接口地址未设置');
    const cleanPath = String(path || '').replace(/^\//, '');
    const target = new URL(cleanPath, base);
    try {
      const targetHost = String(target.hostname || '').toLowerCase();
      const pageHost = String((window && window.location && window.location.hostname) || '').toLowerCase();
      const isTargetLocal = targetHost === 'localhost' || targetHost === '127.0.0.1' || targetHost === '::1';
      const isPageLocal = pageHost === 'localhost' || pageHost === '127.0.0.1' || pageHost === '::1';
      if (isTargetLocal && !isPageLocal) return false;
    } catch (_e) {}
    const headers = getTvUserHeaders();
    const resp = await fetch(target.toString(), { method: 'GET', headers, credentials: 'omit' });
    return resp && resp.ok;
  };

  const setGoProxyStatus = bindInlineStatus(goProxySaveStatus);

  const normalizeGoProxyProbeState = (v) => {
    const raw = typeof v === 'string' ? v.trim() : '';
    if (raw === 'online' || raw === 'offline' || raw === 'checking') return raw;
    return 'checking';
  };
  const goProxyProbeClassFor = (state) => {
    const s = normalizeGoProxyProbeState(state);
    if (s === 'online') return 'tag-green';
    if (s === 'offline') return 'tag-red';
    return 'tag-gray';
  };
  const goProxyProbeTextFor = (state) => {
    const s = normalizeGoProxyProbeState(state);
    if (s === 'online') return '在线';
    if (s === 'offline') return '离线';
    return '检测中';
  };
  const buildGoProxyProbeTag = (state) => {
    const span = document.createElement('span');
    span.className = `availability-tag ${goProxyProbeClassFor(state)}`;
    span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>${goProxyProbeTextFor(state)}`;
    return span;
  };

  const displayGoProxyBaseHost = (base) => {
    const raw = typeof base === 'string' ? base.trim() : '';
    if (!raw) return '';
    try {
      const u = new URL(raw);
      const host = String(u.host || '').trim();
      return host || raw;
    } catch (_e) {
      return raw;
    }
  };

  const buildGoProxyPanSwitch = ({ label, base, panKey, checked }) => {
    const wrap = createEl('div', { className: 'flex items-center gap-2' });
    wrap.appendChild(
      createEl('span', {
        className: 'text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap',
        text: String(label || ''),
      })
    );

    const switchLabel = createEl('label', { className: 'enable-switch' });
    switchLabel.title = String(label || '');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!checked;
    input.setAttribute('data-goproxy-pan', String(panKey || ''));
    input.setAttribute('data-goproxy-base', String(base || ''));

    const slider = createEl('span', { className: 'enable-slider' });
    switchLabel.appendChild(input);
    switchLabel.appendChild(slider);
    wrap.appendChild(switchLabel);
    return wrap;
  };

  const guessGoProxyNameFromBase = (base) => {
    try {
      const u = new URL(base);
      const host = String(u.host || '').trim();
      return host || '';
    } catch (_e) {
      return '';
    }
  };

  const normalizeGoProxyServers = (servers) => {
    const arr = Array.isArray(servers) ? servers : [];
    const out = [];
    const seen = new Set();
    arr.forEach((s) => {
      const base = typeof s === 'string' ? normalizeHttpBase(s) : normalizeHttpBase(s && s.base);
      if (!base) return;
      const key = base.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);

      const rawName = s && typeof s === 'object' && typeof s.name === 'string' ? s.name : '';
      const rawDisplayName = s && typeof s === 'object' && typeof s.displayName === 'string' ? s.displayName : '';
      const defaultName = guessGoProxyNameFromBase(base);
      const name = String(rawName || '').trim() || defaultName;
      const displayName = String(rawDisplayName || '').trim() || name;

      const pans = s && typeof s === 'object' && typeof s.pans === 'object' && s.pans ? s.pans : {};
      const hasBaidu = Object.prototype.hasOwnProperty.call(pans, 'baidu');
      const hasQuark = Object.prototype.hasOwnProperty.call(pans, 'quark');

      out.push({
        name,
        displayName,
        base,
        pans: {
          baidu: hasBaidu ? !!pans.baidu : true,
          quark: hasQuark ? !!pans.quark : true,
        },
      });
    });
    return out;
  };

  const ensureGoProxyProbeEntry = (base) => {
    const key = String(base || '').toLowerCase();
    if (!key) return;
    if (goProxyProbes.has(key)) return;
    goProxyProbes.set(key, { state: 'checking', version: '', checkedAt: 0 });
  };

  const writeGoProxyServersJson = () => {
    const serversJson = JSON.stringify(goProxyServers || []);
    if (goProxyServersJsonInput) goProxyServersJsonInput.value = serversJson;
    return serversJson;
  };

  const renderGoProxyServerTable = () => {
    if (!goProxyServerTableBody) return;
    goProxyServerTableBody.innerHTML = '';
    if (!goProxyServers.length) {
      restoreGoProxyServerEditorHome();
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.className = 'px-3 py-2 text-gray-500 dark:text-gray-400';
      td.colSpan = 7;
      td.textContent = '无数据';
      tr.appendChild(td);
      goProxyServerTableBody.appendChild(tr);
      return;
    }

    const editingKey = goProxyEditorMode === 'edit' ? String(goProxyEditorEditingKey || '').toLowerCase() : '';

    goProxyServers.forEach((server) => {
      const base = server && typeof server.base === 'string' ? server.base : '';
      const baseKey = base ? base.toLowerCase() : '';
      const probe = baseKey && goProxyProbes.has(baseKey) ? goProxyProbes.get(baseKey) : { state: 'checking', version: '', checkedAt: 0 };
      const state = probe && probe.state ? probe.state : 'checking';

      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.className = 'px-3 py-2 whitespace-nowrap font-medium';
      tdName.textContent = String(server.name || '');

      const tdDisplay = document.createElement('td');
      tdDisplay.className = 'px-3 py-2 whitespace-nowrap';
      tdDisplay.textContent = String(server.displayName || '');

      const tdBase = document.createElement('td');
      tdBase.className = 'px-3 py-2 font-mono whitespace-nowrap';
      tdBase.textContent = displayGoProxyBaseHost(base);

      const tdVersion = document.createElement('td');
      tdVersion.className = 'px-3 py-2 whitespace-nowrap';
      if (normalizeGoProxyProbeState(state) === 'checking') tdVersion.textContent = '检测中';
      else if (normalizeGoProxyProbeState(state) === 'online') tdVersion.textContent = (probe && probe.version ? String(probe.version) : '未知');
      else tdVersion.textContent = '异常';

      const tdStatus = document.createElement('td');
      tdStatus.className = 'px-3 py-2 whitespace-nowrap';
      tdStatus.appendChild(buildGoProxyProbeTag(state));

      const tdPans = document.createElement('td');
      tdPans.className = 'px-3 py-2 whitespace-nowrap';
      const pansWrap = createEl('div', { className: 'flex items-center gap-4' });
      const pans = server && typeof server.pans === 'object' && server.pans ? server.pans : {};
      pansWrap.appendChild(buildGoProxyPanSwitch({ label: '百度', base, panKey: 'baidu', checked: !!pans.baidu }));
      pansWrap.appendChild(buildGoProxyPanSwitch({ label: '夸克', base, panKey: 'quark', checked: !!pans.quark }));
      tdPans.appendChild(pansWrap);

      const tdActions = document.createElement('td');
      tdActions.className = 'px-3 py-2 whitespace-nowrap';
      const actWrap = createEl('div', { className: 'action-group' });

      const isEditingRow = !!(editingKey && baseKey && editingKey === baseKey);
      const editBtn = createEl('button', { className: 'action-btn blue', text: isEditingRow ? '取消' : '修改' });
      editBtn.type = 'button';
      editBtn.setAttribute('data-goproxy-action', isEditingRow ? 'cancel' : 'edit');
      editBtn.setAttribute('data-goproxy-base', base);

      const delBtn = createEl('button', { className: 'action-btn red', text: '删除' });
      delBtn.type = 'button';
      delBtn.setAttribute('data-goproxy-action', 'delete');
      delBtn.setAttribute('data-goproxy-base', base);

      actWrap.appendChild(editBtn);
      actWrap.appendChild(delBtn);
      tdActions.appendChild(actWrap);

      tr.appendChild(tdName);
      tr.appendChild(tdDisplay);
      tr.appendChild(tdBase);
      tr.appendChild(tdVersion);
      tr.appendChild(tdStatus);
      tr.appendChild(tdPans);
      tr.appendChild(tdActions);
      goProxyServerTableBody.appendChild(tr);

      if (isEditingRow && goProxyServerEditor) {
        const editorRow = document.createElement('tr');
        const editorTd = document.createElement('td');
        editorTd.colSpan = 7;
        editorTd.className = 'px-3 py-2';
        editorRow.appendChild(editorTd);
        try {
          goProxyServerEditor.style.width = '100%';
        } catch (_e) {}
        editorTd.appendChild(goProxyServerEditor);
        goProxyServerTableBody.appendChild(editorRow);
      }
    });

    if (goProxyEditorMode !== 'edit') {
      restoreGoProxyServerEditorHome();
    } else if (goProxyServerEditor && !goProxyServerEditor.parentNode) {
      restoreGoProxyServerEditorHome();
    }
  };

  const probeGoProxyVersion = async (base, { timeoutMs = 4000 } = {}) => {
    const normalized = normalizeHttpBase(base);
    if (!normalized) return { ok: false };
    const key = normalized.toLowerCase();
    const prev = goProxyProbes.has(key) ? goProxyProbes.get(key) : null;
    goProxyProbes.set(key, { state: 'checking', version: '', checkedAt: prev && prev.checkedAt ? prev.checkedAt : 0 });
    renderGoProxyServerTable();

    const baseWithSlash = `${normalized}/`;
    const url = new URL('version', baseWithSlash).toString();
    const ms = Number.isFinite(Number(timeoutMs)) ? Math.max(0, Math.trunc(Number(timeoutMs))) : 0;
    const controller = ms > 0 && typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), ms) : null;
    try {
      const { resp, data } = await fetchJsonSafe(
        url,
        { method: 'GET', credentials: 'omit', signal: controller ? controller.signal : undefined },
        {}
      );
      if (resp && resp.ok) {
        const version = data && typeof data.version === 'string' ? data.version.trim() : '';
        goProxyProbes.set(key, { state: 'online', version, checkedAt: Date.now() });
        renderGoProxyServerTable();
        return { ok: true, version };
      }
      goProxyProbes.set(key, { state: 'offline', version: '', checkedAt: Date.now() });
      renderGoProxyServerTable();
      return { ok: false };
    } catch (_e) {
      goProxyProbes.set(key, { state: 'offline', version: '', checkedAt: Date.now() });
      renderGoProxyServerTable();
      return { ok: false };
    } finally {
      if (timer) clearTimeout(timer);
    }
  };

  const probeAllGoProxyVersions = async () => {
    const servers = Array.isArray(goProxyServers) ? goProxyServers : [];
    await Promise.all(
      servers
        .map((s) => (s && typeof s.base === 'string' ? normalizeHttpBase(s.base) : ''))
        .filter(Boolean)
        .map((b) => probeGoProxyVersion(b, { timeoutMs: 4000 }))
    );
  };



  adminNavs.forEach((nav) => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      const key = normalizePanelKey(nav.dataset.admin || 'site');
      showPanel(key);
      writePanelToHash(key);
      ensurePanelDataLoaded(key);
    });
  });
  if (adminNavs.length && panels.length) {
    initialPanelKey = readPanelFromHash();
    showPanel(initialPanelKey);
  }

  window.addEventListener('hashchange', () => {
    const key = readPanelFromHash();
    showPanel(key);
    ensurePanelDataLoaded(key);
  });

  const dataSelect = document.getElementById('doubanDataSelect');
  const dataCustom = document.getElementById('doubanDataCustom');
  const imgSelect = document.getElementById('doubanImgSelect');
  const imgCustom = document.getElementById('doubanImgCustom');
  const toggleCustom = (selectEl, boxEl) => {
    if (!selectEl || !boxEl) return;
    const val = selectEl.value;
    boxEl.classList.toggle('hidden', val !== 'custom');
  };
  if (dataSelect) dataSelect.addEventListener('change', () => toggleCustom(dataSelect, dataCustom));
  if (imgSelect) imgSelect.addEventListener('change', () => toggleCustom(imgSelect, imgCustom));
  toggleCustom(dataSelect, dataCustom);
  toggleCustom(imgSelect, imgCustom);

  let customDropdownDocBound = false;
  const hideAllCustomDropdowns = () => {
    try {
      document.querySelectorAll('.custom-dropdown-list').forEach((el) => el.classList.add('hidden'));
    } catch (_e) {}
  };
  const ensureCustomDropdownDocBound = () => {
    if (customDropdownDocBound) return;
    customDropdownDocBound = true;
    document.addEventListener('click', () => hideAllCustomDropdowns());
  };

	  const setupCustomSelectElement = (sel) => {
	    if (!sel || !sel.parentNode) return;
	    if (sel.dataset.customDropdownMounted === 'true') return;
	    sel.dataset.customDropdownMounted = 'true';

	    const autoSizeMode = typeof sel.dataset.customDropdownAutosize === 'string' ? sel.dataset.customDropdownAutosize : '';
	    const shouldAutoSizeToMax = autoSizeMode === 'max';

	    const wrapper = document.createElement('div');
	    wrapper.className = 'custom-dropdown';
	    sel.classList.add('hidden-select');
	    sel.parentNode.insertBefore(wrapper, sel);
	    wrapper.appendChild(sel);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'custom-dropdown-btn';
    const currentText =
      (sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].text) || '请选择';
	    btn.textContent = currentText;

	    const list = document.createElement('div');
	    list.className = 'custom-dropdown-list hidden';
	    Array.from(sel.options).forEach((opt) => {
      const item = document.createElement('div');
      item.className = 'custom-dropdown-item';
      item.textContent = opt.text;
      item.dataset.value = opt.value;
      if (opt.selected) item.classList.add('active');
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        sel.value = opt.value;
        btn.textContent = opt.text;
        list.classList.add('hidden');
        list.querySelectorAll('.custom-dropdown-item').forEach((n) => n.classList.remove('active'));
        item.classList.add('active');
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      });
      list.appendChild(item);
    });

	    btn.addEventListener('click', (e) => {
	      e.stopPropagation();
	      ensureCustomDropdownDocBound();
	      const willOpen = list.classList.contains('hidden');
	      if (willOpen && shouldAutoSizeToMax) {
	        try {
	          list.classList.remove('hidden');
	          const prevVisibility = list.style.visibility;
	          const prevPointer = list.style.pointerEvents;
	          list.style.visibility = 'hidden';
	          list.style.pointerEvents = 'none';

	          let maxW = 0;
	          const btnW = typeof btn.scrollWidth === 'number' ? btn.scrollWidth : 0;
	          if (btnW > maxW) maxW = btnW;
	          list.querySelectorAll('.custom-dropdown-item').forEach((n) => {
	            const w = typeof n.scrollWidth === 'number' ? n.scrollWidth : 0;
	            if (w > maxW) maxW = w;
	          });
	          const nextW = Math.max(0, Math.ceil(maxW));
	          if (nextW) wrapper.style.width = `${nextW}px`;

	          list.style.visibility = prevVisibility;
	          list.style.pointerEvents = prevPointer;
	          list.classList.add('hidden');
	        } catch (_e) {}
	      }
	      hideAllCustomDropdowns();
	      list.classList.toggle('hidden', !willOpen);
	    });

	    wrapper.appendChild(btn);
	    wrapper.appendChild(list);

	    if (shouldAutoSizeToMax) {
	      try {
	        // Initial sizing so the button and the list share the same width.
	        list.classList.remove('hidden');
	        const prevVisibility = list.style.visibility;
	        const prevPointer = list.style.pointerEvents;
	        list.style.visibility = 'hidden';
	        list.style.pointerEvents = 'none';

	        let maxW = 0;
	        const btnW = typeof btn.scrollWidth === 'number' ? btn.scrollWidth : 0;
	        if (btnW > maxW) maxW = btnW;
	        list.querySelectorAll('.custom-dropdown-item').forEach((n) => {
	          const w = typeof n.scrollWidth === 'number' ? n.scrollWidth : 0;
	          if (w > maxW) maxW = w;
	        });
	        const nextW = Math.max(0, Math.ceil(maxW));
	        if (nextW) wrapper.style.width = `${nextW}px`;

	        list.style.visibility = prevVisibility;
	        list.style.pointerEvents = prevPointer;
	        list.classList.add('hidden');
	      } catch (_e) {}
	    }
	  };

  const remountCustomSelectElement = (sel) => {
    if (!sel) return;
    const wrapper = sel.parentNode;
    if (wrapper && wrapper.classList && wrapper.classList.contains('custom-dropdown')) {
      const parent = wrapper.parentNode;
      if (parent) parent.insertBefore(sel, wrapper);
      wrapper.remove();
    }
    try {
      delete sel.dataset.customDropdownMounted;
    } catch (_e) {
      if (sel.dataset) sel.dataset.customDropdownMounted = '';
    }
    sel.classList.remove('hidden-select');
    setupCustomSelectElement(sel);
  };

  const setupCustomSelect = (selectId) => {
    const sel = document.getElementById(selectId);
    setupCustomSelectElement(sel);
  };

  setupCustomSelect('doubanDataSelect');
  setupCustomSelect('doubanImgSelect');
  setupCustomSelect('catPawOpenServerSelect');
  setupCustomSelect('catPawOpenSyncFromServerSelect');

  const panSettingDefs = [
    { key: 'baidu', name: '百度', type: 'cookie' },
    { key: 'quark', name: '夸克', type: 'cookie' },
    { key: 'quark_tv', name: '夸克TV', type: 'quark_tv' },
    { key: 'tianyi', name: '天翼', type: 'account' },
    { key: '139', name: '移动', type: 'authorization' },
    { key: 'uc', name: 'UC', type: 'cookie' },
    { key: 'uc_tv', name: 'UC_TV', type: 'uc_tv' },
    { key: 'pan123', name: '123', type: 'account' },
    { key: '115', name: '115', type: 'cookie' },
    { key: 'bili', name: 'Bilibili', type: 'cookie' },
    { key: 'wuming', name: '观影', type: 'cookie' },
    { key: 'yunchao', name: '云巢', type: 'account' },
    { key: 'pan123ziyuan', name: '123资源网', type: 'cookie' },
  ];

  let panLoginSettings = {};
  const loadedPanSettingKeys = new Set();
  let activePanSettingKey = panSettingDefs[0] ? panSettingDefs[0].key : '';

  const setPanSettingsStatus = bindInlineStatus(panSettingsStatus);

  const baiduQrState = {
    qid: '',
    expiresAt: 0,
    imageUrl: '',
    status: '',
    message: '',
    pollTimer: null,
  };

  const quarkQrState = {
    qid: '',
    expiresAt: 0,
    imageUrl: '',
    status: '',
    message: '',
    pollTimer: null,
  };

  const ucQrState = {
    qid: '',
    expiresAt: 0,
    imageUrl: '',
    status: '',
    message: '',
    pollTimer: null,
  };

  const pan115QrState = {
    qid: '',
    expiresAt: 0,
    imageUrl: '',
    status: '',
    message: '',
    pollTimer: null,
  };

  const biliQrState = {
    qid: '',
    expiresAt: 0,
    imageUrl: '',
    status: '',
    message: '',
    pollTimer: null,
  };

  const stopBaiduQrPoll = () => {
    if (baiduQrState.pollTimer) {
      clearInterval(baiduQrState.pollTimer);
      baiduQrState.pollTimer = null;
    }
  };

  const stopQuarkQrPoll = () => {
    if (quarkQrState.pollTimer) {
      clearInterval(quarkQrState.pollTimer);
      quarkQrState.pollTimer = null;
    }
  };

  const stopUcQrPoll = () => {
    if (ucQrState.pollTimer) {
      clearInterval(ucQrState.pollTimer);
      ucQrState.pollTimer = null;
    }
  };

  const stop115QrPoll = () => {
    if (pan115QrState.pollTimer) {
      clearInterval(pan115QrState.pollTimer);
      pan115QrState.pollTimer = null;
    }
  };

  const stopBiliQrPoll = () => {
    if (biliQrState.pollTimer) {
      clearInterval(biliQrState.pollTimer);
      biliQrState.pollTimer = null;
    }
  };

  const isBaiduQrExpired = () => {
    if (!baiduQrState.qid) return true;
    const exp = Number(baiduQrState.expiresAt || 0);
    if (!Number.isFinite(exp) || exp <= 0) return false;
    return Date.now() > exp - 1500;
  };

  const isQuarkQrExpired = () => {
    if (!quarkQrState.qid) return true;
    const exp = Number(quarkQrState.expiresAt || 0);
    if (!Number.isFinite(exp) || exp <= 0) return false;
    return Date.now() > exp - 1500;
  };

  const isUcQrExpired = () => {
    if (!ucQrState.qid) return true;
    const exp = Number(ucQrState.expiresAt || 0);
    if (!Number.isFinite(exp) || exp <= 0) return false;
    return Date.now() > exp - 1500;
  };

  const is115QrExpired = () => {
    if (!pan115QrState.qid) return true;
    const exp = Number(pan115QrState.expiresAt || 0);
    if (!Number.isFinite(exp) || exp <= 0) return false;
    return Date.now() > exp - 1500;
  };

  const isBiliQrExpired = () => {
    if (!biliQrState.qid) return true;
    const exp = Number(biliQrState.expiresAt || 0);
    if (!Number.isFinite(exp) || exp <= 0) return false;
    return Date.now() > exp - 1500;
  };

  const startBaiduQrPoll = () => {
    stopBaiduQrPoll();
    if (!baiduQrState.qid || isBaiduQrExpired()) return;
    const tick = async () => {
      if (!baiduQrState.qid || isBaiduQrExpired()) {
        stopBaiduQrPoll();
        baiduQrState.status = 'expired';
        baiduQrState.imageUrl = '';
        baiduQrState.qid = '';
        baiduQrState.expiresAt = 0;
        setPanSettingsStatus('error', '二维码登录超时/已过期');
        renderPanSettingsContent();
        return;
      }
      try {
        const { resp, data } = await postJsonSafe('/dashboard/pan/baidu/qr/cookie', { qid: baiduQrState.qid });
        if (resp.ok && data && data.success === true && typeof data.cookie === 'string') {
          const cookie = String(data.cookie || '');
          const textarea = panSettingsContent
            ? panSettingsContent.querySelector('textarea[data-pan-cookie-input="baidu"]')
            : null;
          if (textarea) textarea.value = cookie;
          panLoginSettings = Object.assign({}, panLoginSettings, {
            baidu: Object.assign({}, getPanSettingValue('baidu'), { cookie }),
          });
          stopBaiduQrPoll();
          baiduQrState.status = 'confirmed';
          baiduQrState.imageUrl = '';
          baiduQrState.qid = '';
          baiduQrState.expiresAt = 0;
          setPanSettingsStatus('', 'Cookie已获取并自动保存成功');
          clearStatusLater(setPanSettingsStatus, 2200);
          renderPanSettingsContent();
          return;
        }
        if (resp.status === 409) {
          const st = data && data.status ? String(data.status) : 'pending';
          baiduQrState.status = st;
          if (st === 'scanned') setPanSettingsStatus('', '已扫码：请在手机端确认登录…');
          else setPanSettingsStatus('', '等待扫码确认…');
          return;
        }
        const msg = (data && data.message) ? String(data.message) : `HTTP ${resp.status}`;
        stopBaiduQrPoll();
        baiduQrState.status = 'error';
        baiduQrState.imageUrl = '';
        baiduQrState.qid = '';
        baiduQrState.expiresAt = 0;
        setPanSettingsStatus('error', msg);
        renderPanSettingsContent();
      } catch (e) {
        stopBaiduQrPoll();
        baiduQrState.status = 'error';
        baiduQrState.imageUrl = '';
        baiduQrState.qid = '';
        baiduQrState.expiresAt = 0;
        setPanSettingsStatus('error', (e && e.message) ? String(e.message) : '获取失败');
        renderPanSettingsContent();
      }
    };
    tick();
    baiduQrState.pollTimer = setInterval(tick, 1500);
    renderPanSettingsContent();
  };

  const startQuarkQrPoll = () => {
    stopQuarkQrPoll();
    if (!quarkQrState.qid || isQuarkQrExpired()) return;
    const tick = async () => {
      if (!quarkQrState.qid || isQuarkQrExpired()) {
        stopQuarkQrPoll();
        quarkQrState.status = 'expired';
        quarkQrState.imageUrl = '';
        quarkQrState.qid = '';
        quarkQrState.expiresAt = 0;
        setPanSettingsStatus('error', '二维码登录超时/已过期');
        renderPanSettingsContent();
        return;
      }
      try {
        const { resp, data } = await postJsonSafe('/dashboard/pan/quark/qr/cookie', { qid: quarkQrState.qid });
        if (resp.ok && data && data.success === true && typeof data.cookie === 'string') {
          const cookie = String(data.cookie || '');
          const textarea = panSettingsContent
            ? panSettingsContent.querySelector('textarea[data-pan-cookie-input="quark"]')
            : null;
          if (textarea) textarea.value = cookie;
          panLoginSettings = Object.assign({}, panLoginSettings, {
            quark: Object.assign({}, getPanSettingValue('quark'), { cookie }),
          });
          stopQuarkQrPoll();
          quarkQrState.status = 'confirmed';
          quarkQrState.imageUrl = '';
          quarkQrState.qid = '';
          quarkQrState.expiresAt = 0;
          setPanSettingsStatus('', 'Cookie已获取并自动保存成功');
          clearStatusLater(setPanSettingsStatus, 2200);
          renderPanSettingsContent();
          return;
        }
        if (resp.status === 409) {
          const st = data && data.status ? String(data.status) : 'pending';
          quarkQrState.status = st;
          if (st === 'scanned') setPanSettingsStatus('', '已扫码：请在手机端确认登录…');
          else setPanSettingsStatus('', '等待扫码确认…');
          return;
        }
        const msg = (data && data.message) ? String(data.message) : `HTTP ${resp.status}`;
        stopQuarkQrPoll();
        quarkQrState.status = 'error';
        quarkQrState.imageUrl = '';
        quarkQrState.qid = '';
        quarkQrState.expiresAt = 0;
        setPanSettingsStatus('error', msg);
        renderPanSettingsContent();
      } catch (e) {
        stopQuarkQrPoll();
        quarkQrState.status = 'error';
        quarkQrState.imageUrl = '';
        quarkQrState.qid = '';
        quarkQrState.expiresAt = 0;
        setPanSettingsStatus('error', (e && e.message) ? String(e.message) : '获取失败');
        renderPanSettingsContent();
      }
    };
    tick();
    quarkQrState.pollTimer = setInterval(tick, 1500);
    renderPanSettingsContent();
  };

  const startUcQrPoll = () => {
    stopUcQrPoll();
    if (!ucQrState.qid || isUcQrExpired()) return;
    const tick = async () => {
      if (!ucQrState.qid || isUcQrExpired()) {
        stopUcQrPoll();
        ucQrState.status = 'expired';
        ucQrState.imageUrl = '';
        ucQrState.qid = '';
        ucQrState.expiresAt = 0;
        setPanSettingsStatus('error', '二维码登录超时/已过期');
        renderPanSettingsContent();
        return;
      }
      try {
        const { resp, data } = await postJsonSafe('/dashboard/pan/uc/qr/cookie', { qid: ucQrState.qid });
        if (resp.ok && data && data.success === true && typeof data.cookie === 'string') {
          const cookie = String(data.cookie || '');
          const textarea = panSettingsContent
            ? panSettingsContent.querySelector('textarea[data-pan-cookie-input="uc"]')
            : null;
          if (textarea) textarea.value = cookie;
          panLoginSettings = Object.assign({}, panLoginSettings, {
            uc: Object.assign({}, getPanSettingValue('uc'), { cookie }),
          });
          stopUcQrPoll();
          ucQrState.status = 'confirmed';
          ucQrState.imageUrl = '';
          ucQrState.qid = '';
          ucQrState.expiresAt = 0;
          setPanSettingsStatus('', 'Cookie已获取并自动保存成功');
          clearStatusLater(setPanSettingsStatus, 2200);
          renderPanSettingsContent();
          return;
        }
        if (resp.status === 409) {
          const st = data && data.status ? String(data.status) : 'pending';
          ucQrState.status = st;
          if (st === 'scanned') setPanSettingsStatus('', '已扫码：请在手机端确认登录…');
          else setPanSettingsStatus('', '等待扫码确认…');
          return;
        }
        const msg = (data && data.message) ? String(data.message) : `HTTP ${resp.status}`;
        stopUcQrPoll();
        ucQrState.status = 'error';
        ucQrState.imageUrl = '';
        ucQrState.qid = '';
        ucQrState.expiresAt = 0;
        setPanSettingsStatus('error', msg);
        renderPanSettingsContent();
      } catch (e) {
        stopUcQrPoll();
        ucQrState.status = 'error';
        ucQrState.imageUrl = '';
        ucQrState.qid = '';
        ucQrState.expiresAt = 0;
        setPanSettingsStatus('error', (e && e.message) ? String(e.message) : '获取失败');
        renderPanSettingsContent();
      }
    };
    tick();
    ucQrState.pollTimer = setInterval(tick, 1500);
    renderPanSettingsContent();
  };

  const start115QrPoll = () => {
    stop115QrPoll();
    if (!pan115QrState.qid || is115QrExpired()) return;
    const tick = async () => {
      if (!pan115QrState.qid || is115QrExpired()) {
        stop115QrPoll();
        pan115QrState.status = 'expired';
        pan115QrState.imageUrl = '';
        pan115QrState.qid = '';
        pan115QrState.expiresAt = 0;
        setPanSettingsStatus('error', '二维码登录超时/已过期');
        renderPanSettingsContent();
        return;
      }
      try {
        const { resp, data } = await postJsonSafe('/dashboard/pan/115/qr/cookie', { qid: pan115QrState.qid });
        if (resp.ok && data && data.success === true && typeof data.cookie === 'string') {
          const cookie = String(data.cookie || '');
          const textarea = panSettingsContent
            ? panSettingsContent.querySelector('textarea[data-pan-cookie-input="115"]')
            : null;
          if (textarea) textarea.value = cookie;
          panLoginSettings = Object.assign({}, panLoginSettings, {
            '115': Object.assign({}, getPanSettingValue('115'), { cookie }),
          });
          stop115QrPoll();
          pan115QrState.status = 'confirmed';
          pan115QrState.imageUrl = '';
          pan115QrState.qid = '';
          pan115QrState.expiresAt = 0;
          setPanSettingsStatus('', 'Cookie已获取并自动保存成功');
          clearStatusLater(setPanSettingsStatus, 2200);
          renderPanSettingsContent();
          return;
        }
        if (resp.status === 409) {
          const st = data && data.status ? String(data.status) : 'pending';
          pan115QrState.status = st;
          if (st === 'scanned') setPanSettingsStatus('', '已扫码：请在手机端确认登录…');
          else setPanSettingsStatus('', '等待扫码确认…');
          return;
        }
        const msg = (data && data.message) ? String(data.message) : `HTTP ${resp.status}`;
        stop115QrPoll();
        pan115QrState.status = 'error';
        pan115QrState.imageUrl = '';
        pan115QrState.qid = '';
        pan115QrState.expiresAt = 0;
        setPanSettingsStatus('error', msg);
        renderPanSettingsContent();
      } catch (e) {
        stop115QrPoll();
        pan115QrState.status = 'error';
        pan115QrState.imageUrl = '';
        pan115QrState.qid = '';
        pan115QrState.expiresAt = 0;
        setPanSettingsStatus('error', (e && e.message) ? String(e.message) : '获取失败');
        renderPanSettingsContent();
      }
    };
    tick();
    pan115QrState.pollTimer = setInterval(tick, 1500);
    renderPanSettingsContent();
  };

  const startBiliQrPoll = () => {
    stopBiliQrPoll();
    if (!biliQrState.qid || isBiliQrExpired()) return;
    const tick = async () => {
      if (!biliQrState.qid || isBiliQrExpired()) {
        stopBiliQrPoll();
        biliQrState.status = 'expired';
        biliQrState.imageUrl = '';
        biliQrState.qid = '';
        biliQrState.expiresAt = 0;
        setPanSettingsStatus('error', '二维码登录超时/已过期');
        renderPanSettingsContent();
        return;
      }
      try {
        const { resp, data } = await postJsonSafe('/dashboard/pan/bili/qr/cookie', { qid: biliQrState.qid });
        if (resp.ok && data && data.success === true && typeof data.cookie === 'string') {
          const cookie = String(data.cookie || '');
          const textarea = panSettingsContent
            ? panSettingsContent.querySelector('textarea[data-pan-cookie-input="bili"]')
            : null;
          if (textarea) textarea.value = cookie;
          panLoginSettings = Object.assign({}, panLoginSettings, {
            bili: Object.assign({}, getPanSettingValue('bili'), { cookie }),
          });
          stopBiliQrPoll();
          biliQrState.status = 'confirmed';
          biliQrState.imageUrl = '';
          biliQrState.qid = '';
          biliQrState.expiresAt = 0;
          setPanSettingsStatus('', 'Cookie已获取并自动保存成功');
          clearStatusLater(setPanSettingsStatus, 2200);
          renderPanSettingsContent();
          return;
        }
        if (resp.status === 409) {
          const st = data && data.status ? String(data.status) : 'pending';
          biliQrState.status = st;
          if (st === 'scanned') setPanSettingsStatus('', '已扫码：请在手机端确认登录…');
          else setPanSettingsStatus('', '等待扫码确认…');
          return;
        }
        const msg = (data && data.message) ? String(data.message) : `HTTP ${resp.status}`;
        stopBiliQrPoll();
        biliQrState.status = 'error';
        biliQrState.imageUrl = '';
        biliQrState.qid = '';
        biliQrState.expiresAt = 0;
        setPanSettingsStatus('error', msg);
        renderPanSettingsContent();
      } catch (e) {
        stopBiliQrPoll();
        biliQrState.status = 'error';
        biliQrState.imageUrl = '';
        biliQrState.qid = '';
        biliQrState.expiresAt = 0;
        setPanSettingsStatus('error', (e && e.message) ? String(e.message) : '获取失败');
        renderPanSettingsContent();
      }
    };
    tick();
    biliQrState.pollTimer = setInterval(tick, 1500);
    renderPanSettingsContent();
  };

  const fetchPanSettings = async (key) => {
    const qs = key ? `?key=${encodeURIComponent(String(key))}` : '';
    const data = await getSuccessJson(`/dashboard/pan/settings${qs}`);
    if (data && data.settings && typeof data.settings === 'object') return data.settings;
    return {};
  };

  const ensurePanSettingLoaded = async (key) => {
    const k = typeof key === 'string' ? key.trim() : '';
    if (!k) return;
    if (loadedPanSettingKeys.has(k)) return;
    setPanSettingsStatus('', '加载中...');
    const partial = await fetchPanSettings(k);
    panLoginSettings = Object.assign({}, panLoginSettings, partial);
    loadedPanSettingKeys.add(k);
    setPanSettingsStatus('', '');
  };

  const savePanCookie = async (key, cookie) => {
    return savePanSettings(key, 'cookie', { cookie: cookie != null ? String(cookie) : '' });
  };

  const savePanAccount = async (key, username, password) => {
    return savePanSettings(key, 'account', {
      username: username != null ? String(username) : '',
      password: password != null ? String(password) : '',
    });
  };

  const savePanAuthorization = async (key, authorization) => {
    return savePanSettings(key, 'authorization', { authorization: authorization != null ? String(authorization) : '' });
  };

  const savePanTv = async (key, tvType, refreshToken, deviceId) => {
    const t = tvType === 'uc_tv' ? 'uc_tv' : 'quark_tv';
    return savePanSettings(key, t, {
      refresh_token: refreshToken != null ? String(refreshToken) : '',
      device_id: deviceId != null ? String(deviceId) : '',
    });
  };

  const savePanSettings = async (key, type, fields) => {
    const t =
      type === 'account' || type === 'authorization' || type === 'cookie' || type === 'quark_tv' || type === 'uc_tv'
        ? type
        : 'cookie';
    const payload = Object.assign({ key, type: t }, fields && typeof fields === 'object' ? fields : {});
    const { resp, data } = await postForm('/dashboard/pan/settings', payload);
    if (resp.ok && data && data.success) return { ok: true, settings: data.settings || {} };
    return { ok: false, message: (data && data.message) || '保存失败', settings: (data && data.settings) || null };
  };

  const syncAllPanLoginSettingsToCatPawOpen = async () => {
    const apiBase = await resolveCatPawOpenApiBase();
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) return { ok: false, skipped: true, reason: 'unconfigured' };

    const store = await fetchPanSettings('');
    const entries = store && typeof store === 'object' ? Object.entries(store) : [];
    if (!entries.length) return { ok: true, skipped: false, okCount: 0, failCount: 0 };

    try {
      const typeByKey = new Map();
      panSettingDefs.forEach((def) => {
        if (def && def.key && def.type) typeByKey.set(def.key, def.type);
      });
      const pans = {};
      entries.forEach(([k, v]) => {
        const key = typeof k === 'string' ? k.trim() : '';
        if (!key) return;
        const typ = typeByKey.get(key);
        const remoteKey = key;
        const cur = v && typeof v === 'object' ? v : {};
        // CatPawOpen `/admin/pan/sync` accepts:
        // - {cookie} or {username,password} for online runtime sync
        // - {authorization} for builtin 139 resolver
        // - {refresh_token, device_id} for builtin quark_tv/uc_tv resolver
        // For "authorization" types, send it as a cookie-equivalent value.
        const payload = {};
        if (typ === 'account') {
          if (typeof cur.username === 'string') payload.username = cur.username;
          if (typeof cur.password === 'string') payload.password = cur.password;
        } else if (typ === 'quark_tv' || typ === 'uc_tv') {
          if (typeof cur.refresh_token === 'string') payload.refresh_token = cur.refresh_token;
          if (typeof cur.device_id === 'string') payload.device_id = cur.device_id;
        } else if (typ === 'authorization') {
          if (typeof cur.authorization === 'string') payload.authorization = cur.authorization;
        } else {
          if (typeof cur.cookie === 'string') payload.cookie = cur.cookie;
        }
        pans[remoteKey] = payload;
      });
      const resp = await requestCatPawOpenAdminJson({
        apiBase: normalizedBase,
        path: 'admin/pan/sync',
        method: 'POST',
        body: { pans },
      });
      const okCount = resp && typeof resp.okCount === 'number' ? resp.okCount : 0;
      const failCount = resp && typeof resp.failCount === 'number' ? resp.failCount : 0;
      return { ok: failCount <= 0 && resp && resp.success !== false, skipped: false, okCount, failCount };
    } catch (_e) {
      return { ok: false, skipped: false, okCount: 0, failCount: 0 };
    }
  };

  const savePanLoginSettingToServer = async ({ key, save }) => {
    setPanSettingsStatus('', '保存中...');
    const result = await (typeof save === 'function' ? save() : null);

    if (result && result.settings) panLoginSettings = result.settings;
    if (key) loadedPanSettingKeys.add(key);

    if (result && result.ok) {
      setPanSettingsStatus('success', '保存成功');
      setTimeout(() => setPanSettingsStatus('', ''), 1200);
    } else {
      setPanSettingsStatus('error', (result && result.message) || '保存失败');
    }
  };

  const renderPanSettingsTabs = () => {
    if (!panSettingsTabs) return;
    panSettingsTabs.innerHTML = '';
    const isDark = document && document.documentElement && document.documentElement.classList
      ? document.documentElement.classList.contains('dark')
      : false;
    panSettingDefs.forEach((def) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-white/10';
      const active = def.key === activePanSettingKey;
      if (active) {
        btn.style.backgroundColor = isDark ? 'rgba(34, 197, 94, 0.22)' : 'rgba(34, 197, 94, 0.20)';
        btn.style.border = isDark ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(34, 197, 94, 0.30)';
      } else {
        btn.style.backgroundColor = '';
        btn.style.border = '1px solid transparent';
      }
      btn.dataset.panTab = def.key;
      btn.textContent = def.name;
      panSettingsTabs.appendChild(btn);
    });
  };

  const updatePanMoreMenu = () => {
    if (!panSettingsTabs || !panSettingsMoreBtn || !panSettingsMoreMenu) return;

    const containerRect = panSettingsTabs.getBoundingClientRect();
    if (!containerRect || containerRect.width <= 0) return;
    const epsilon = 2;
    const tabs = Array.from(panSettingsTabs.querySelectorAll('button[data-pan-tab]'));
    const hiddenRightDefs = [];
    tabs.forEach((btn) => {
      const key = btn.dataset ? btn.dataset.panTab : '';
      const btnRect = btn.getBoundingClientRect();
      const hiddenOnRight = btnRect.right > containerRect.right + epsilon;
      if (hiddenOnRight) {
        const def = panSettingDefs.find((d) => d.key === key);
        if (def) hiddenRightDefs.push(def);
      }
    });

    const overflowRight = hiddenRightDefs.length > 0;
    panSettingsMoreBtn.classList.toggle('hidden', !overflowRight);
    if (!overflowRight) {
      hidePanMoreMenu();
      panSettingsMoreMenu.innerHTML = '';
      return;
    }

    panSettingsMoreMenu.innerHTML = '';
    hiddenRightDefs.forEach((def) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className =
        'w-full text-left px-3 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150';
      item.textContent = def.name;
      item.dataset.panTab = def.key;
      if (def.key === activePanSettingKey) {
        item.style.backgroundColor = 'rgba(34, 197, 94, 0.12)';
      } else {
        item.style.backgroundColor = '';
      }
      panSettingsMoreMenu.appendChild(item);
    });
  };

  let panMoreMenuRaf = 0;
  const scheduleUpdatePanMoreMenu = () => {
    if (!panSettingsTabs || !panSettingsMoreBtn || !panSettingsMoreMenu) return;
    if (panMoreMenuRaf) cancelAnimationFrame(panMoreMenuRaf);
    panMoreMenuRaf = requestAnimationFrame(() => {
      panMoreMenuRaf = 0;
      updatePanMoreMenu();
      updatePanTabsHints();
    });
  };

  const updatePanTabsHints = () => {
    if (!panSettingsTabs) return;
    const left = panSettingsTabs.scrollLeft || 0;
    const clientWidth = panSettingsTabs.clientWidth || 0;
    const scrollWidth = panSettingsTabs.scrollWidth || 0;
    const epsilon = 2;
    const hasOverflow = scrollWidth > clientWidth + epsilon;
    const atStart = left <= epsilon;
    const atEnd = left + clientWidth >= scrollWidth - epsilon;

    if (panSettingsScrollLeft) {
      panSettingsScrollLeft.classList.toggle('hidden', !hasOverflow || atStart);
    }
    if (panSettingsScrollRight) {
      panSettingsScrollRight.classList.toggle('hidden', !hasOverflow || atEnd);
    }
    if (panSettingsMoreBtn) {
      // 滚到最右侧时隐藏“>”和“...”。
      if (!hasOverflow || atEnd) panSettingsMoreBtn.classList.add('hidden');
    }
  };

  const scrollPanTabsBy = (delta) => {
    if (!panSettingsTabs) return;
    const next = (panSettingsTabs.scrollLeft || 0) + delta;
    panSettingsTabs.scrollTo({ left: next, behavior: 'smooth' });
  };

  const getPanSettingValue = (key) => {
    const v = panLoginSettings && Object.prototype.hasOwnProperty.call(panLoginSettings, key) ? panLoginSettings[key] : {};
    return v && typeof v === 'object' ? v : {};
  };

	  const renderPanSettingsContent = () => {
	    if (!panSettingsContent) return;
	    const def = panSettingDefs.find((d) => d.key === activePanSettingKey) || panSettingDefs[0];
	    if (!def) return;
	    panSettingsContent.innerHTML = '';

	    if (def.type === 'quark_tv' || def.type === 'uc_tv') {
	      const v = getPanSettingValue(def.key);
	      const form = createEl('div', { className: 'space-y-4 max-w-[640px]' });

	      const rtRow = createEl('div');
	      const rtLabel = createEl('label', {
	        className: 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
	        text: '刷新令牌',
	      });
	      const rtInput = createEl('input', { className: 'tv-field' });
	      rtInput.type = 'text';
	      rtInput.autocomplete = 'off';
	      rtInput.value = (v.refresh_token || '').toString();
	      rtInput.setAttribute('data-pan-tv-refresh-token', def.key);
	      rtRow.appendChild(rtLabel);
	      rtRow.appendChild(rtInput);

	      const devRow = createEl('div');
	      const devLabel = createEl('label', {
	        className: 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
	        text: '设备ID',
	      });
	      const devInput = createEl('input', { className: 'tv-field' });
	      devInput.type = 'text';
	      devInput.autocomplete = 'off';
	      devInput.value = (v.device_id || '').toString();
	      devInput.setAttribute('data-pan-tv-device-id', def.key);
	      devRow.appendChild(devLabel);
	      devRow.appendChild(devInput);

	      const saveBtn = createEl('button', { className: 'btn-green', text: '保存' });
	      saveBtn.type = 'button';
	      saveBtn.setAttribute('data-pan-action', 'save-tv');
	      saveBtn.setAttribute('data-pan-key', def.key);

	      form.appendChild(rtRow);
	      form.appendChild(devRow);
	      form.appendChild(saveBtn);
	      panSettingsContent.appendChild(form);
	      return;
	    }

	    if (def.type === 'cookie' || def.type === 'authorization') {
        const isAuthorization = def.type === 'authorization';
	      const saveBtn = createEl('button', { className: 'btn-green', text: '保存' });
	      saveBtn.type = 'button';
	      saveBtn.setAttribute('data-pan-action', isAuthorization ? 'save-authorization' : 'save-cookie');
	      saveBtn.setAttribute('data-pan-key', def.key);

	      const stack = createEl('div', { className: 'flex flex-col items-start gap-3' });
	      setStyles(stack, { width: '100%' });

        if (def.key === 'baidu' && baiduQrState.imageUrl && !isBaiduQrExpired()) {
          const imgRow = createEl('div', { className: 'w-full flex items-center justify-center' });
          const img = createEl('img');
          img.alt = 'baidu qrcode';
          img.src = baiduQrState.imageUrl;
          setStyles(img, {
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            borderRadius: '12px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.10)',
          });
          imgRow.appendChild(img);
          stack.appendChild(imgRow);
        }
        if (def.key === 'quark' && quarkQrState.imageUrl && !isQuarkQrExpired()) {
          const imgRow = createEl('div', { className: 'w-full flex items-center justify-center' });
          const img = createEl('img');
          img.alt = 'quark qrcode';
          img.src = quarkQrState.imageUrl;
          setStyles(img, {
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            borderRadius: '12px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.10)',
          });
          imgRow.appendChild(img);
          stack.appendChild(imgRow);
        }
        if (def.key === 'uc' && ucQrState.imageUrl && !isUcQrExpired()) {
          const imgRow = createEl('div', { className: 'w-full flex items-center justify-center' });
          const img = createEl('img');
          img.alt = 'uc qrcode';
          img.src = ucQrState.imageUrl;
          setStyles(img, {
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            borderRadius: '12px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.10)',
          });
          imgRow.appendChild(img);
          stack.appendChild(imgRow);
        }
        if (def.key === '115' && pan115QrState.imageUrl && !is115QrExpired()) {
          const imgRow = createEl('div', { className: 'w-full flex items-center justify-center' });
          const img = createEl('img');
          img.alt = '115 qrcode';
          img.src = pan115QrState.imageUrl;
          setStyles(img, {
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            borderRadius: '12px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.10)',
          });
          imgRow.appendChild(img);
          stack.appendChild(imgRow);
        }
        if (def.key === 'bili' && biliQrState.imageUrl && !isBiliQrExpired()) {
          const imgRow = createEl('div', { className: 'w-full flex items-center justify-center' });
          const img = createEl('img');
          img.alt = 'bili qrcode';
          img.src = biliQrState.imageUrl;
          setStyles(img, {
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            borderRadius: '12px',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.10)',
          });
          imgRow.appendChild(img);
          stack.appendChild(imgRow);
        }

	      const textarea = createEl('textarea', { className: 'tv-field' });
	      textarea.rows = 3;
	      setStyles(textarea, { width: '100%' });
	      textarea.placeholder = isAuthorization ? `请输入${def.name} Authorization` : `请输入${def.name} Cookie`;
        if (isAuthorization) {
	        textarea.value = (getPanSettingValue(def.key).authorization || '').toString();
	        textarea.setAttribute('data-pan-authorization-input', def.key);
        } else {
	        textarea.value = (getPanSettingValue(def.key).cookie || '').toString();
	        textarea.setAttribute('data-pan-cookie-input', def.key);
        }
	      stack.appendChild(textarea);

	      const saveWrap = createEl('div');
	      setStyles(saveWrap, {
	        display: 'flex',
	        justifyContent: (def.key === 'baidu' || def.key === 'quark' || def.key === 'uc' || def.key === '115' || def.key === 'bili') ? 'flex-start' : 'center',
	        alignItems: 'center',
	        width: '100%',
	      });
        if (def.key === 'baidu' || def.key === 'quark' || def.key === 'uc' || def.key === '115' || def.key === 'bili') {
          setStyles(saveWrap, { position: 'relative' });
          const isBaidu = def.key === 'baidu';
          const isQuark = def.key === 'quark';
          const isUc = def.key === 'uc';
          const is115 = def.key === '115';
          const isBili = def.key === 'bili';
          const inFlight = isBaidu
            ? !!baiduQrState.pollTimer
            : (isQuark
              ? !!quarkQrState.pollTimer
              : (isUc ? !!ucQrState.pollTimer : (is115 ? !!pan115QrState.pollTimer : !!biliQrState.pollTimer)));
          const action = isBaidu
            ? 'baidu-qr-start'
            : (isQuark
              ? 'quark-qr-start'
              : (isUc ? 'uc-qr-start' : (is115 ? '115-qr-start' : 'bili-qr-start')));
          const qrBtn = createEl('button', { className: 'btn-ghost-blue', text: inFlight ? '二维码登录中...' : '二维码登录' });
          qrBtn.type = 'button';
          qrBtn.disabled = inFlight;
          qrBtn.setAttribute('data-pan-action', action);
          qrBtn.setAttribute('data-pan-key', def.key);
          saveWrap.appendChild(qrBtn);

          const center = createEl('div');
          setStyles(center, {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            width: 'max-content',
          });
          center.appendChild(saveBtn);
          saveWrap.appendChild(center);
        } else {
          saveWrap.appendChild(saveBtn);
        }
	      stack.appendChild(saveWrap);

	      panSettingsContent.appendChild(stack);
	      return;
	    }

	    const v = getPanSettingValue(def.key);
	    const form = createEl('div', { className: 'space-y-4 max-w-[640px]' });

	    const userRow = createEl('div');
	    const userLabel = createEl('label', {
	      className: 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
	      text: '账号',
	    });
	    const userInput = createEl('input', { className: 'tv-field' });
	    userInput.type = 'text';
	    userInput.value = (v.username || '').toString();
	    userInput.setAttribute('data-pan-account-username', def.key);
	    userRow.appendChild(userLabel);
	    userRow.appendChild(userInput);

	    const passRow = createEl('div');
	    const passLabel = createEl('label', {
	      className: 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
	      text: '密码',
	    });
	    const passInput = createEl('input', { className: 'tv-field' });
	    passInput.type = 'password';
	    passInput.value = (v.password || '').toString();
	    passInput.setAttribute('data-pan-account-password', def.key);
	    passRow.appendChild(passLabel);
	    passRow.appendChild(passInput);

	    const saveBtn = createEl('button', { className: 'btn-green', text: '保存' });
	    saveBtn.type = 'button';
	    saveBtn.setAttribute('data-pan-action', 'save-account');
	    saveBtn.setAttribute('data-pan-key', def.key);

	    form.appendChild(userRow);
	    form.appendChild(passRow);
	    form.appendChild(saveBtn);
	    panSettingsContent.appendChild(form);
	  };

  bindOnce(panSettingsTabs, () => {
    panSettingsTabs.addEventListener('click', async (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const btn = target.closest('button[data-pan-tab]');
      if (!btn) return;
      const key = btn.dataset.panTab || '';
      if (!key || key === activePanSettingKey) return;
      if (activePanSettingKey === 'baidu') stopBaiduQrPoll();
      if (activePanSettingKey === 'quark') stopQuarkQrPoll();
      if (activePanSettingKey === 'uc') stopUcQrPoll();
      if (activePanSettingKey === '115') stop115QrPoll();
      if (activePanSettingKey === 'bili') stopBiliQrPoll();
      activePanSettingKey = key;
      setPanSettingsStatus('', '');
      renderPanSettingsTabs();
      scheduleUpdatePanMoreMenu();
      await ensurePanSettingLoaded(activePanSettingKey);
      renderPanSettingsContent();
    });

    panSettingsTabs.addEventListener(
      'wheel',
      (e) => {
        if (!panSettingsTabs) return;
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        panSettingsTabs.scrollLeft += e.deltaY;
        e.preventDefault();
      },
      { passive: false }
    );

    panSettingsTabs.addEventListener('scroll', () => scheduleUpdatePanMoreMenu());
    window.addEventListener('resize', () => scheduleUpdatePanMoreMenu());
  });

  const hidePanMoreMenu = () => {
    if (!panSettingsMoreMenu) return;
    panSettingsMoreMenu.classList.add('hidden');
  };

  bindOnce(panSettingsScrollLeft, () => {
    panSettingsScrollLeft.addEventListener('click', (e) => {
      e.preventDefault();
      scrollPanTabsBy(-220);
    });
  });
  bindOnce(panSettingsScrollRight, () => {
    panSettingsScrollRight.addEventListener('click', (e) => {
      e.preventDefault();
      scrollPanTabsBy(220);
    });
  });

  bindOnce(panSettingsMoreBtn, () => {
    if (!panSettingsMoreMenu) return;
    panSettingsMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scheduleUpdatePanMoreMenu();
      panSettingsMoreMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!target) return;
      if (panSettingsMoreBtn.contains(target)) return;
      if (panSettingsMoreMenu.contains(target)) return;
      hidePanMoreMenu();
    });
    panSettingsMoreMenu.addEventListener('click', async (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const btn = target.closest('button[data-pan-tab]');
      if (!btn) return;
      const key = btn.dataset.panTab || '';
      if (!key) return;
      if (activePanSettingKey === 'baidu') stopBaiduQrPoll();
      if (activePanSettingKey === 'quark') stopQuarkQrPoll();
      if (activePanSettingKey === 'uc') stopUcQrPoll();
      if (activePanSettingKey === '115') stop115QrPoll();
      if (activePanSettingKey === 'bili') stopBiliQrPoll();
      activePanSettingKey = key;
      hidePanMoreMenu();
      setPanSettingsStatus('', '');
      renderPanSettingsTabs();
      scheduleUpdatePanMoreMenu();
      await ensurePanSettingLoaded(activePanSettingKey);
      renderPanSettingsContent();
    });
  });

  bindOnce(panSettingsContent, () => {
    panSettingsContent.addEventListener('click', async (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const actionEl = target.closest('[data-pan-action]');
      if (!actionEl) return;
      const action = actionEl.getAttribute('data-pan-action') || '';
      const key = actionEl.getAttribute('data-pan-key') || '';
      if (!key) return;
      const def = panSettingDefs.find((d) => d.key === key);
      if (!def) return;

      if (action === 'save-cookie') {
        const textarea = panSettingsContent.querySelector(`textarea[data-pan-cookie-input="${key}"]`);
        const value = textarea ? textarea.value : '';
        await savePanLoginSettingToServer({
          key,
          save: () => savePanCookie(key, value),
        });
        return;
      }

      if (action === 'save-tv') {
        const rtEl = panSettingsContent.querySelector(`input[data-pan-tv-refresh-token="${key}"]`);
        const devEl = panSettingsContent.querySelector(`input[data-pan-tv-device-id="${key}"]`);
        const refreshToken = rtEl ? rtEl.value : '';
        const deviceId = devEl ? devEl.value : '';
        await savePanLoginSettingToServer({
          key,
          save: () => savePanTv(key, def.type, refreshToken, deviceId),
        });
        return;
      }

      if (action === 'save-authorization') {
        const textarea = panSettingsContent.querySelector(`textarea[data-pan-authorization-input="${key}"]`);
        const value = textarea ? textarea.value : '';
        await savePanLoginSettingToServer({
          key,
          save: () => savePanAuthorization(key, value),
        });
        return;
      }

      if (action === 'baidu-qr-start' && key === 'baidu') {
        await withDatasetLock(actionEl, 'baiduQrStartPending', async () => {
          stopBaiduQrPoll();
          baiduQrState.status = '';
          baiduQrState.message = '';
          baiduQrState.imageUrl = '';
          baiduQrState.qid = '';
          baiduQrState.expiresAt = 0;
          renderPanSettingsContent();
          setPanSettingsStatus('', '生成二维码...');
          baiduQrState.status = 'starting';
          baiduQrState.message = '';
          const { resp, data } = await postJsonSafe('/dashboard/pan/baidu/qr/start', {});
          if (!resp.ok || !data || data.success !== true) {
            const msg = (data && data.message) ? String(data.message) : '生成失败';
            baiduQrState.status = 'error';
            baiduQrState.message = msg;
            setPanSettingsStatus('error', msg);
            renderPanSettingsContent();
            return;
          }
          baiduQrState.qid = (data && data.qid) ? String(data.qid) : '';
          baiduQrState.expiresAt = Number(data && data.expiresAt ? data.expiresAt : 0);
          baiduQrState.imageUrl = (data && data.imageUrl) ? String(data.imageUrl) : '';
          baiduQrState.status = 'pending';
          baiduQrState.message = '二维码已生成：请扫码并在手机端确认登录…';
          setPanSettingsStatus('', '二维码已生成，等待扫码确认…');
          renderPanSettingsContent();
          startBaiduQrPoll();
        });
        return;
      }

      if (action === 'quark-qr-start' && key === 'quark') {
        await withDatasetLock(actionEl, 'quarkQrStartPending', async () => {
          stopQuarkQrPoll();
          quarkQrState.status = '';
          quarkQrState.message = '';
          quarkQrState.imageUrl = '';
          quarkQrState.qid = '';
          quarkQrState.expiresAt = 0;
          renderPanSettingsContent();
          setPanSettingsStatus('', '生成二维码...');
          quarkQrState.status = 'starting';
          quarkQrState.message = '';
          const { resp, data } = await postJsonSafe('/dashboard/pan/quark/qr/start', {});
          if (!resp.ok || !data || data.success !== true) {
            const msg = (data && data.message) ? String(data.message) : '生成失败';
            quarkQrState.status = 'error';
            quarkQrState.message = msg;
            setPanSettingsStatus('error', msg);
            renderPanSettingsContent();
            return;
          }
          quarkQrState.qid = (data && data.qid) ? String(data.qid) : '';
          quarkQrState.expiresAt = Number(data && data.expiresAt ? data.expiresAt : 0);
          quarkQrState.imageUrl = (data && data.imageUrl) ? String(data.imageUrl) : '';
          quarkQrState.status = 'pending';
          quarkQrState.message = '二维码已生成：请使用夸克 App（已登录）扫码并在手机端确认登录…';
          setPanSettingsStatus('', '二维码已生成，等待扫码确认…');
          renderPanSettingsContent();
          startQuarkQrPoll();
        });
        return;
      }

      if (action === 'uc-qr-start' && key === 'uc') {
        await withDatasetLock(actionEl, 'ucQrStartPending', async () => {
          stopUcQrPoll();
          ucQrState.status = '';
          ucQrState.message = '';
          ucQrState.imageUrl = '';
          ucQrState.qid = '';
          ucQrState.expiresAt = 0;
          renderPanSettingsContent();
          setPanSettingsStatus('', '生成二维码...');
          ucQrState.status = 'starting';
          ucQrState.message = '';
          const { resp, data } = await postJsonSafe('/dashboard/pan/uc/qr/start', {});
          if (!resp.ok || !data || data.success !== true) {
            const msg = (data && data.message) ? String(data.message) : '生成失败';
            ucQrState.status = 'error';
            ucQrState.message = msg;
            setPanSettingsStatus('error', msg);
            renderPanSettingsContent();
            return;
          }
          ucQrState.qid = (data && data.qid) ? String(data.qid) : '';
          ucQrState.expiresAt = Number(data && data.expiresAt ? data.expiresAt : 0);
          ucQrState.imageUrl = (data && data.imageUrl) ? String(data.imageUrl) : '';
          ucQrState.status = 'pending';
          ucQrState.message = '二维码已生成：请使用 UC App（已登录）扫码并在手机端确认登录…';
          setPanSettingsStatus('', '二维码已生成，等待扫码确认…');
          renderPanSettingsContent();
          startUcQrPoll();
        });
        return;
      }

      if (action === '115-qr-start' && key === '115') {
        await withDatasetLock(actionEl, 'pan115QrStartPending', async () => {
          stop115QrPoll();
          pan115QrState.status = '';
          pan115QrState.message = '';
          pan115QrState.imageUrl = '';
          pan115QrState.qid = '';
          pan115QrState.expiresAt = 0;
          renderPanSettingsContent();
          setPanSettingsStatus('', '生成二维码...');
          pan115QrState.status = 'starting';
          pan115QrState.message = '';
          const { resp, data } = await postJsonSafe('/dashboard/pan/115/qr/start', {});
          if (!resp.ok || !data || data.success !== true) {
            const msg = (data && data.message) ? String(data.message) : '生成失败';
            pan115QrState.status = 'error';
            pan115QrState.message = msg;
            setPanSettingsStatus('error', msg);
            renderPanSettingsContent();
            return;
          }
          pan115QrState.qid = (data && data.qid) ? String(data.qid) : '';
          pan115QrState.expiresAt = Number(data && data.expiresAt ? data.expiresAt : 0);
          pan115QrState.imageUrl = (data && data.imageUrl) ? String(data.imageUrl) : '';
          pan115QrState.status = 'pending';
          pan115QrState.message = '二维码已生成：请使用 115 App（已登录）扫码并在手机端确认登录…';
          setPanSettingsStatus('', '二维码已生成，等待扫码确认…');
          renderPanSettingsContent();
          start115QrPoll();
        });
        return;
      }

      if (action === 'bili-qr-start' && key === 'bili') {
        await withDatasetLock(actionEl, 'biliQrStartPending', async () => {
          stopBiliQrPoll();
          biliQrState.status = '';
          biliQrState.message = '';
          biliQrState.imageUrl = '';
          biliQrState.qid = '';
          biliQrState.expiresAt = 0;
          renderPanSettingsContent();
          setPanSettingsStatus('', '生成二维码...');
          biliQrState.status = 'starting';
          biliQrState.message = '';
          const { resp, data } = await postJsonSafe('/dashboard/pan/bili/qr/start', {});
          if (!resp.ok || !data || data.success !== true) {
            const msg = (data && data.message) ? String(data.message) : '生成失败';
            biliQrState.status = 'error';
            biliQrState.message = msg;
            setPanSettingsStatus('error', msg);
            renderPanSettingsContent();
            return;
          }
          biliQrState.qid = (data && data.qid) ? String(data.qid) : '';
          biliQrState.expiresAt = Number(data && data.expiresAt ? data.expiresAt : 0);
          biliQrState.imageUrl = (data && data.imageUrl) ? String(data.imageUrl) : '';
          biliQrState.status = 'pending';
          biliQrState.message = '二维码已生成：请使用 Bilibili App（已登录）扫码并在手机端确认登录…';
          setPanSettingsStatus('', '二维码已生成，等待扫码确认…');
          renderPanSettingsContent();
          startBiliQrPoll();
        });
        return;
      }

      if (action === 'save-account') {
        const usernameEl = panSettingsContent.querySelector(`input[data-pan-account-username="${key}"]`);
        const passwordEl = panSettingsContent.querySelector(`input[data-pan-account-password="${key}"]`);
        const username = usernameEl ? usernameEl.value : '';
        const password = passwordEl ? passwordEl.value : '';
        await savePanLoginSettingToServer({
          key,
          save: () => savePanAccount(key, username, password),
        });
        return;
      }

      return;
    });
  });

  let currentPans = [];

  const setPanListStatus = bindInlineStatus(panListSaveStatus);

  const normalizePans = (pans) => {
    if (!Array.isArray(pans)) return [];
    return pans
      .map((p) => ({
        key: p && typeof p.key === 'string' ? p.key : '',
        name: p && typeof p.name === 'string' ? p.name : '',
        enable: !!(p && p.enable),
      }))
      .filter((p) => p.key);
  };

  async function cachePansListToServer(pans) {
    const { resp, data } = await postForm('/dashboard/video/pans/list', {
      list: JSON.stringify(Array.isArray(pans) ? pans : []),
    });
    if (resp.ok && data && data.success) return { ok: true, pans: Array.isArray(data.pans) ? data.pans : [] };
    return { ok: false, message: (data && data.message) || '保存失败' };
  }

  const fetchPansList = async () => {
    const apiBase = await resolveCatPawOpenApiBase();
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (normalizedBase) {
      try {
        const resp = await requestCatPawOpenAdminJson({
          apiBase: normalizedBase,
          path: 'website/pans/list',
          method: 'GET',
        });
        const data = unwrapCatPawOpenWebsiteData(resp);
        const pans = normalizePans(data);
        try {
          await cachePansListToServer(pans);
        } catch (_e) {}
        return pans;
      } catch (_e) {}
    }
    try {
      const { resp: r, data } = await fetchJsonSafe('/dashboard/video/pans/list', { method: 'GET' }, {});
      if (r.ok && data && data.success && Array.isArray(data.pans)) return data.pans;
    } catch (_e) {}
    return [];
  };

  const savePansList = async (pans) => {
    const apiBase = await resolveCatPawOpenApiBase();
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) return { ok: false, message: 'CatPawOpen 接口地址未设置' };
    const list = normalizePans(pans);
    try {
      const putResp = await requestCatPawOpenAdminJson({
        apiBase: normalizedBase,
        path: 'website/pans/list',
        method: 'PUT',
        body: { list },
      });
      const putData = unwrapCatPawOpenWebsiteData(putResp);
      const updated = Array.isArray(putData) ? normalizePans(putData) : null;
      const next = updated || (await fetchPansList());
      await cachePansListToServer(next);
      return { ok: true, pans: next };
    } catch (e) {
      return { ok: false, message: 'CatPawOpen 接口异常' };
    }
  };

  function renderPanList(pans) {
    if (!panList) return;
    currentPans = normalizePans(pans);
	    panList.innerHTML = '';
	    if (!currentPans.length) {
	      appendEmptyItem(panList);
	      return;
	    }
	    const measure = createEl('span', { className: 'text-sm font-medium' });
	    setStyles(measure, {
	      position: 'absolute',
	      visibility: 'hidden',
	      whiteSpace: 'nowrap',
	      left: '-99999px',
	      top: '-99999px',
	    });
	    document.body.appendChild(measure);

    let maxNamePx = 0;
    currentPans.forEach((p) => {
      const text = (p && (p.name || p.key)) || '';
      measure.textContent = text;
      maxNamePx = Math.max(maxNamePx, Math.ceil(measure.getBoundingClientRect().width));
    });
    document.body.removeChild(measure);

    const nameWidthPx = Math.max(maxNamePx, 80);

    if (panHeaderName) {
      setStyles(panHeaderName, { width: `${nameWidthPx}px`, flex: '0 0 auto', display: 'inline-block', whiteSpace: 'nowrap' });
    }
    if (panHeaderEnable) {
      setFixedHeaderCell(panHeaderEnable, 72);
    }
    if (panHeaderSort) {
      setFixedHeaderCell(panHeaderSort, 72);
    }

	    currentPans.forEach((p, idx) => {
	      const li = createEl('li', { className: 'tv-row' });

      const key = p.key || '';
      const enabled = !!p.enable;

      const name = document.createElement('span');
      name.className = 'text-sm font-medium text-gray-800 dark:text-gray-100';
      name.textContent = p.name || p.key || '';
      setStyles(name, { width: `${nameWidthPx}px`, flex: '0 0 auto', display: 'inline-block', whiteSpace: 'nowrap' });

      const { label: switchLabel } = createSwitchLabel({
        checked: enabled,
        title: enabled ? '已启用' : '已禁用',
        ariaLabel: enabled ? '已启用' : '已禁用',
        inputAttrs: { 'data-pan-enable-key': key },
      });

      const enableCell = document.createElement('span');
      setCenterCell(enableCell, fixedCell(72));
      enableCell.appendChild(switchLabel);

      const sortCell = document.createElement('span');
      setCenterCell(sortCell, fixedCell(72));
      appendSortButtons(sortCell, {
        dirAttr: 'data-pan-sort',
        keyAttr: 'data-pan-key',
        key,
        disabledUp: idx === 0,
        disabledDown: idx === currentPans.length - 1,
      });

      li.appendChild(name);
      li.appendChild(enableCell);
      li.appendChild(sortCell);
      panList.appendChild(li);
    });
  }

  bindOnce(catPawOpenPansToggle, () => {
    if (!catPawOpenPansPanel) return;
    let open = false;
    let loading = false;

    const setOpen = (next) => {
      open = !!next;
      catPawOpenPansPanel.classList.toggle('hidden', !open);
      if (catPawOpenPansToggleIcon && catPawOpenPansToggleIcon.dataset) {
        catPawOpenPansToggleIcon.dataset.open = open ? 'true' : 'false';
      }
    };

    setOpen(false);

    catPawOpenPansToggle.addEventListener('click', async (e) => {
      e.preventDefault();
      if (loading) return;
      const next = !open;
      setOpen(next);
      if (!next) return;

      loading = true;
      setPanListStatus('', '加载中...');
      try {
        renderPanList(await fetchPansList());
        setPanListStatus('', '');
      } finally {
        loading = false;
      }
    });
  });

  bindOnce(videoSourceSitesToggle, () => {
    if (!videoSourceSitesPanel) return;
    let open = false;
    const setOpen = (next) => {
      open = !!next;
      videoSourceSitesPanel.classList.toggle('hidden', !open);
      if (videoSourceSitesToggleIcon && videoSourceSitesToggleIcon.dataset) {
        videoSourceSitesToggleIcon.dataset.open = open ? 'true' : 'false';
      }
    };
    setOpen(false);
    videoSourceSitesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!open);
    });
  });

  let currentVideoSourceSites = [];
  let videoSourceCoverSite =
    bootstrap && bootstrap.settings && typeof bootstrap.settings.searchCoverSite === 'string'
      ? String(bootstrap.settings.searchCoverSite || '').trim()
      : '';
  let videoSourceCoverSaving = false;
  const selectedVideoSourceKeys = new Set();
  const videoSourceHeaderName = document.getElementById('videoSourceHeaderName');
  const videoSourceHeaderApi = document.getElementById('videoSourceHeaderApi');
  const videoSourceHeaderAvailability = document.getElementById('videoSourceHeaderAvailability');
  const videoSourceHeaderStatus = document.getElementById('videoSourceHeaderStatus');
  const videoSourceHeaderHome = document.getElementById('videoSourceHeaderHome');
  const videoSourceHeaderSearch = document.getElementById('videoSourceHeaderSearch');
  const videoSourceHeaderCover = document.getElementById('videoSourceHeaderCover');
  const videoSourceHeaderSort = document.getElementById('videoSourceHeaderSort');
  const videoSourceHeaderError = document.getElementById('videoSourceHeaderError');
  const videoSourceHeaderCheckbox = document.getElementById('videoSourceHeaderCheckbox');
  const videoSourceResetOrder = document.getElementById('videoSourceResetOrder');
  const videoSourceJsonImport = document.getElementById('videoSourceJsonImport');
  const videoSourceJsonExport = document.getElementById('videoSourceJsonExport');
  const videoSourceJsonImportFile = document.getElementById('videoSourceJsonImportFile');
  const videoSourceBulkCheckDisable = document.getElementById('videoSourceBulkCheckDisable');

  const formatVideoSourceApi = (api) => {
    const raw = typeof api === 'string' ? api : '';
    const trimmed = raw.trim();
    if (!trimmed) return '';
    if (trimmed.indexOf('/spider/') === 0) {
      const parts = trimmed.split('/').filter(Boolean);
      if (parts.length >= 2 && parts[0] === 'spider') return parts[1];
    }
    return trimmed.replace(/^\/spider\//, '').replace(/\/\d+\/?$/, '');
  };

  const normalizeAvailability = (v) => {
    const raw = typeof v === 'string' ? v.trim() : '';
    if (
      raw === 'valid' ||
      raw === 'invalid' ||
      raw === 'unknown' ||
      raw === 'skipped' ||
      raw === 'unchecked' ||
      raw === 'category_error' ||
      raw === 'search_error'
    )
      return raw;
    return 'unchecked';
  };
  const formatAvailabilityText = (status) => {
    const s = normalizeAvailability(status);
    if (s === 'valid') return '有效';
    if (s === 'invalid') return '无效';
    if (s === 'category_error') return '分类异常';
    if (s === 'search_error') return '搜索异常';
    if (s === 'unknown') return '未知';
    if (s === 'skipped') return '跳过';
    return '未检测';
  };
  const availabilityClassFor = (status) => {
    const s = normalizeAvailability(status);
    if (s === 'valid') return 'tag-green';
    if (s === 'invalid') return 'tag-red';
    if (s === 'unknown' || s === 'category_error' || s === 'search_error') return 'tag-yellow';
    return 'tag-gray';
  };
  const buildAvailabilityTag = (status) => {
    const span = document.createElement('span');
    span.className = `availability-tag ${availabilityClassFor(status)}`;
    span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>${formatAvailabilityText(status)}`;
    return span;
  };

  const normalizeSiteNameForMatch = (name) => {
    const raw = name != null ? String(name) : '';
    if (!raw) return '';
    // Remove emoji + variation selectors + zero-width.
    let s = raw.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\uFE0F/g, '');
    try {
      s = s.replace(/[\u{1F300}-\u{1FAFF}]/gu, '');
    } catch (_e) {
      // ignore
    }
    // Drop punctuation/symbols and whitespace.
    s = s.replace(/[^\p{L}\p{N}\u4e00-\u9fff]+/gu, '');
    return s.trim();
  };

  const shouldSkipVideoSourceCheck = (site) => {
    const api = site && typeof site.api === 'string' ? site.api.trim() : '';
    if (!api) return false;
    const apiLower = api.toLowerCase();
    const nameRaw = site && typeof site.name === 'string' ? site.name : '';
    const name = normalizeSiteNameForMatch(nameRaw);
    if (name === '豆瓣首页' && apiLower.includes('douban')) return true;
    if (name === '配置中心' && apiLower.includes('baseset')) return true;
    return false;
  };

  const normalizeConfigCheckStatus = (v) => {
    const raw = typeof v === 'string' ? v.trim() : '';
    if (raw === 'pass' || raw === 'error' || raw === 'unchecked' || raw === 'checking') return raw;
    return 'unchecked';
  };
  const formatConfigCheckText = (status) => {
    const s = normalizeConfigCheckStatus(status);
    if (s === 'pass') return '通过';
    if (s === 'error') return '异常';
    if (s === 'checking') return '检测中';
    return '未检测';
  };
  const configCheckClassFor = (status) => {
    const s = normalizeConfigCheckStatus(status);
    if (s === 'pass') return 'tag-green';
    if (s === 'error') return 'tag-yellow';
    if (s === 'checking') return 'tag-gray';
    return 'tag-gray';
  };
  const normalizeConfigCheckPhase = (phase) => {
    const p = typeof phase === 'string' ? phase.trim().toLowerCase() : '';
    if (p === 'download') return 'download';
    if (p === 'runtime') return 'runtime';
    return '';
  };
  const formatConfigCheckTextWithPhase = (status, phase) => {
    const s = normalizeConfigCheckStatus(status);
    if (s === 'error') {
      const p = normalizeConfigCheckPhase(phase);
      if (p === 'download') return '下载失败';
      if (p === 'runtime') return '运行失败';
    }
    return formatConfigCheckText(s);
  };
  const buildConfigCheckTag = (status, phase) => {
    const span = document.createElement('span');
    span.className = `availability-tag ${configCheckClassFor(status)}`;
    span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>${formatConfigCheckTextWithPhase(status, phase)}`;
    return span;
  };

  const syncVideoSourceHeaderCheckbox = () => {
    if (!videoSourceHeaderCheckbox) return;
    const keys = currentVideoSourceSites.map((s) => (s && s.key) || '').filter(Boolean);
    if (!keys.length) {
      videoSourceHeaderCheckbox.checked = false;
      videoSourceHeaderCheckbox.indeterminate = false;
      return;
    }
    let selected = 0;
    keys.forEach((k) => {
      if (selectedVideoSourceKeys.has(k)) selected += 1;
    });
    videoSourceHeaderCheckbox.checked = selected === keys.length;
    videoSourceHeaderCheckbox.indeterminate = selected > 0 && selected < keys.length;
  };

  const syncVideoSourceBulkActions = () => {
    if (!videoSourceBulkActions) return;
    const keys = currentVideoSourceSites.map((s) => (s && s.key) || '').filter(Boolean);
    let selected = 0;
    keys.forEach((k) => {
      if (selectedVideoSourceKeys.has(k)) selected += 1;
    });
    videoSourceBulkActions.classList.toggle('hidden', selected <= 0);
  };

  const normalizeVideoSourceSelection = () => {
    const keys = currentVideoSourceSites.map((s) => (s && s.key) || '').filter(Boolean);
    const existing = new Set(keys);
    Array.from(selectedVideoSourceKeys).forEach((k) => {
      if (!existing.has(k)) selectedVideoSourceKeys.delete(k);
    });
  };

	  function renderVideoSourceList(sites) {
	    if (!videoSourceList) return;
	    currentVideoSourceSites = Array.isArray(sites) ? sites : [];
	    videoSourceList.innerHTML = '';
	    normalizeVideoSourceSelection();
	    syncVideoSourceHeaderCheckbox();
	    syncVideoSourceBulkActions();
	    if (!currentVideoSourceSites.length) {
	      appendEmptyItem(videoSourceList);
	      return;
	    }
    // Use pixel-based width so header + rows align even if font-size differs.
    const nameCell = calcPxCell(
      currentVideoSourceSites,
      (site) => (site && (site.name || site.key)) || '',
      { minPx: 80, maxPx: 420, className: 'text-sm font-medium' }
    );
    const apiCell = calcPxCell(
      currentVideoSourceSites,
      (site) => formatVideoSourceApi(site && site.api),
      { minPx: 90, maxPx: 360, className: 'text-xs' }
    );
    if (videoSourceHeaderName) {
      setEllipsisCell(videoSourceHeaderName, {
        width: nameCell.width,
        minWidth: '80px',
        maxWidth: nameCell.maxWidth,
        flex: nameCell.flex,
      });
    }
    if (videoSourceHeaderApi) {
      setEllipsisCell(videoSourceHeaderApi, {
        width: apiCell.width,
        minWidth: '90px',
        maxWidth: apiCell.maxWidth,
        flex: apiCell.flex,
      });
    }
    if (videoSourceHeaderStatus) {
      setFixedHeaderCell(videoSourceHeaderStatus, 72);
    }
	    if (videoSourceHeaderHome) {
	      setFixedHeaderCell(videoSourceHeaderHome, 72);
	    }
	    if (videoSourceHeaderSearch) {
	      setFixedHeaderCell(videoSourceHeaderSearch, 72);
	    }
	    if (videoSourceHeaderCover) {
	      setFixedHeaderCell(videoSourceHeaderCover, 96);
	    }
	    if (videoSourceHeaderSort) {
	      setFixedHeaderCell(videoSourceHeaderSort, 72);
	    }
	    if (videoSourceHeaderError) {
	      setStyles(videoSourceHeaderError, { display: 'inline-block', minWidth: '240px', flex: '1 1 240px' });
	    }
	    if (videoSourceHeaderAvailability) {
	      setFixedHeaderCell(videoSourceHeaderAvailability, 96);
    }

	    currentVideoSourceSites.forEach((site, idx) => {
	      const li = createEl('li', { className: 'tv-row' });

      const key = (site && site.key) || '';
	      const enabled = site && site.enabled !== false;
	      const homeShown = site && site.home !== false;
	      const searchEnabled = site && site.search !== false;
	      const coverShown = !!(key && videoSourceCoverSite === key);

      const selectBox = document.createElement('input');
      selectBox.type = 'checkbox';
      selectBox.className =
        'h-4 w-4 rounded border-gray-300 dark:border-white/20 text-green-600 focus:ring-green-500';
      selectBox.setAttribute('data-select-key', key);
      selectBox.checked = key ? selectedVideoSourceKeys.has(key) : false;

      const name = document.createElement('span');
      name.className = 'text-sm font-medium text-gray-800 dark:text-gray-100 truncate';
      name.textContent = (site && (site.name || site.key)) || '';
      setEllipsisCell(name, {
        width: nameCell.width,
        minWidth: '80px',
        maxWidth: nameCell.maxWidth,
        flex: nameCell.flex,
      });

      const keyEl = document.createElement('span');
      keyEl.className = `${CLS.mutedXs} truncate`;
      keyEl.textContent = formatVideoSourceApi(site && site.api) || '';
      setEllipsisCell(keyEl, {
        width: apiCell.width,
        minWidth: '90px',
        maxWidth: apiCell.maxWidth,
        flex: apiCell.flex,
      });

      const availabilityCell = document.createElement('span');
      setCenterCell(availabilityCell, fixedCell(96));
      availabilityCell.appendChild(buildAvailabilityTag(site && site.availability));

      const { label: switchLabel } = createSwitchLabel({
        checked: !!enabled,
        title: enabled ? '已启用' : '已禁用',
        ariaLabel: enabled ? '已启用' : '已禁用',
        inputAttrs: { 'data-enable-key': key },
      });

      const enableCell = document.createElement('span');
      setCenterCell(enableCell, fixedCell(72));
      enableCell.appendChild(switchLabel);

	      const { label: homeSwitchLabel } = createSwitchLabel({
	        checked: !!homeShown,
	        disabled: !enabled,
	        title: homeShown ? '首页显示' : '首页隐藏',
	        ariaLabel: homeShown ? '首页显示' : '首页隐藏',
	        inputAttrs: { 'data-home-key': key },
	      });

	      const homeCell = document.createElement('span');
	      setCenterCell(homeCell, fixedCell(72));
	      homeCell.appendChild(homeSwitchLabel);

      const { label: searchSwitchLabel } = createSwitchLabel({
        checked: !!searchEnabled,
        disabled: !enabled,
        title: searchEnabled ? '搜索启用' : '搜索禁用',
        ariaLabel: searchEnabled ? '搜索启用' : '搜索禁用',
        inputAttrs: { 'data-search-key': key },
      });

      const searchCell = document.createElement('span');
      setCenterCell(searchCell, fixedCell(72));
      searchCell.appendChild(searchSwitchLabel);

	      const { label: coverSwitchLabel } = createSwitchLabel({
	        checked: coverShown,
	        disabled: videoSourceCoverSaving || !enabled,
	        title: coverShown ? '已启用' : '未启用',
	        ariaLabel: coverShown ? '已启用' : '未启用',
	        inputAttrs: { 'data-cover-key': key },
	      });

	      const coverCell = document.createElement('span');
	      setCenterCell(coverCell, fixedCell(96));
	      coverCell.appendChild(coverSwitchLabel);

      const sortCell = document.createElement('span');
      setCenterCell(sortCell, fixedCell(72));
      appendSortButtons(sortCell, {
        dirAttr: 'data-sort',
        keyAttr: 'data-site-key',
        key,
        disabledUp: idx === 0,
        disabledDown: idx === currentVideoSourceSites.length - 1,
      });

      const errorCell = document.createElement('span');
      errorCell.className = `${CLS.mutedXs}`;
      const rawError =
        site && typeof site.error === 'string'
          ? site.error
          : site && typeof site.errorMessage === 'string'
            ? site.errorMessage
            : site && typeof site.err === 'string'
              ? site.err
              : '';
      errorCell.textContent = rawError || '';
      setStyles(errorCell, {
        minWidth: '240px',
        flex: '1 1 240px',
        whiteSpace: 'normal',
        overflowWrap: 'anywhere',
        wordBreak: 'break-word',
      });

      li.appendChild(selectBox);
      li.appendChild(name);
      li.appendChild(keyEl);
      li.appendChild(availabilityCell);
      li.appendChild(enableCell);
      li.appendChild(homeCell);
      li.appendChild(searchCell);
      li.appendChild(coverCell);
      li.appendChild(sortCell);
      li.appendChild(errorCell);
      videoSourceList.appendChild(li);
    });
  }

  if (videoSourceList) {
    renderVideoSourceList([]);
  }

  const setVideoSourceListStatus = bindInlineStatus(videoSourceListSaveStatus);

  const updateVideoSourceSiteStatus = async (key, enabled) => {
    const { resp, data } = await postForm('/dashboard/video/source/sites/status', {
      key,
      enabled: enabled ? '1' : '0',
    });
    if (resp.ok && data && data.success) return { ok: true, enabled: !!data.enabled };
    return { ok: false, message: (data && data.message) || '保存失败' };
  };

  const updateVideoSourceSiteHome = async (key, home) => {
    const { resp, data } = await postForm('/dashboard/video/source/sites/home', {
      key,
      home: home ? '1' : '0',
    });
    if (resp.ok && data && data.success) return { ok: true, home: !!data.home };
    return { ok: false, message: (data && data.message) || '保存失败' };
  };

  const updateVideoSourceSiteSearch = async (key, search) => {
    const { resp, data } = await postForm('/dashboard/video/source/sites/search', {
      key,
      search: search ? '1' : '0',
    });
    if (resp.ok && data && data.success) return { ok: true, search: !!data.search };
    return { ok: false, message: (data && data.message) || '保存失败' };
  };

  const updateVideoSourceCoverSite = async (key) => {
    const { resp, data } = await postForm('/dashboard/video/source/sites/cover', { key });
    if (resp.ok && data && data.success) {
      return { ok: true, coverSite: typeof data.coverSite === 'string' ? data.coverSite : '' };
    }
    return { ok: false, message: (data && data.message) || '保存失败' };
  };

  const saveVideoSourceOrder = async (sites) => {
    const order = (Array.isArray(sites) ? sites : [])
      .map((s) => (s && s.key) || '')
      .filter(Boolean);
    const { resp, data } = await postForm('/dashboard/video/source/sites/order', {
      order: JSON.stringify(order),
    });
    if (resp.ok && data && data.success) return { ok: true };
    return { ok: false, message: (data && data.message) || '保存失败' };
  };

  const exportVideoSourceSitesToJson = () => {
    const safeSites = Array.isArray(currentVideoSourceSites) ? currentVideoSourceSites : [];
    const orderKeys = safeSites.map((s) => (s && s.key) || '').filter(Boolean);
    const payload = {
      format: 'meowfilm.video_source.sites.v1',
      exportedAt: new Date().toISOString(),
      coverSite: videoSourceCoverSite || '',
      order: orderKeys,
      sites: safeSites.map((site, idx) => {
        const key = (site && site.key) || '';
        const rawError =
          site && typeof site.error === 'string'
            ? site.error
            : site && typeof site.errorMessage === 'string'
              ? site.errorMessage
              : site && typeof site.err === 'string'
                ? site.err
                : '';
        return {
          key,
          name: (site && site.name) || '',
          api: (site && site.api) || '',
          type: site && site.type != null ? site.type : undefined,
          availability: (site && site.availability) || 'unchecked',
          enabled: site && site.enabled !== false,
          home: site && site.home !== false,
          search: site && site.search !== false,
          cover: !!(key && videoSourceCoverSite === key),
          order: idx + 1,
          error: rawError || '',
        };
      }),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meowfilm_sites_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const normalizeImportedVideoSourcePayload = (input) => {
    if (!input) return { sites: [], order: [], coverSite: '' };
    if (Array.isArray(input)) return { sites: input, order: [], coverSite: '' };
    const sites = Array.isArray(input.sites) ? input.sites : [];
    const order = Array.isArray(input.order) ? input.order : [];
    const coverSite = typeof input.coverSite === 'string' ? input.coverSite : '';
    return { sites, order, coverSite };
  };

  const restoreVideoSourceSitesFromJson = async (rawText) => {
    const text = typeof rawText === 'string' ? rawText : '';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (_e) {
      setVideoSourceListStatus('error', 'JSON 解析失败');
      return;
    }

    const { sites: importedSites, order: importedOrder, coverSite: importedCoverSite } =
      normalizeImportedVideoSourcePayload(parsed);
    if (!Array.isArray(importedSites) || importedSites.length === 0) {
      setVideoSourceListStatus('error', '导入数据无站点');
      return;
    }

    let currentSites = Array.isArray(currentVideoSourceSites) ? currentVideoSourceSites : [];
    let existing = new Set(currentSites.map((s) => (s && s.key) || '').filter(Boolean));
    if (existing.size === 0) {
      try {
        const data = await getSuccessJson('/dashboard/video/source/sites');
        if (data && typeof data.coverSite === 'string') {
          videoSourceCoverSite = String(data.coverSite || '').trim();
        }
        renderVideoSourceList(data && Array.isArray(data.sites) ? data.sites : []);
        currentSites = Array.isArray(currentVideoSourceSites) ? currentVideoSourceSites : [];
        existing = new Set(currentSites.map((s) => (s && s.key) || '').filter(Boolean));
      } catch (_e) {}
    }
    if (existing.size === 0) {
      setVideoSourceListStatus('error', '当前站点列表为空，请先导入站源');
      return;
    }

    const results = {};
    const errors = {};
    const desiredStatus = {};
    const desiredHome = {};
    const desiredSearch = {};
    const desiredOrder = [];
    const coverCandidates = [];

    importedSites.forEach((it, idx) => {
      if (!it) return;
      const key = typeof it.key === 'string' ? it.key.trim() : '';
      if (!key || !existing.has(key)) return;

      desiredOrder.push({
        key,
        order: Number.isFinite(Number(it.order)) ? Number(it.order) : idx + 1,
        idx,
      });

      const availability =
        typeof it.availability === 'string'
          ? it.availability
          : typeof it.siteAvailability === 'string'
            ? it.siteAvailability
            : 'unchecked';
      results[key] = String(availability || 'unchecked');

      const err =
        typeof it.error === 'string'
          ? it.error
          : typeof it.errorMessage === 'string'
            ? it.errorMessage
            : typeof it.err === 'string'
              ? it.err
              : '';
      if (err && String(err).trim()) errors[key] = String(err).trim();

      desiredStatus[key] = it.enabled !== false;
      desiredHome[key] = it.home !== false;
      desiredSearch[key] = it.search !== false;

      const cover = !!(it.cover || it.coverShown);
      if (cover) coverCandidates.push(key);
    });

    const keys = Object.keys(desiredStatus);
    if (keys.length === 0) {
      setVideoSourceListStatus('error', '没有可导入的站点（key 不匹配当前列表）');
      return;
    }

    const coverKey = (() => {
      const raw = typeof importedCoverSite === 'string' ? importedCoverSite.trim() : '';
      if (raw && existing.has(raw)) return raw;
      return coverCandidates.length ? coverCandidates[0] : '';
    })();

    // Prefer imported explicit order list (if present and valid), otherwise use per-item `order`.
    let orderKeys = [];
    if (Array.isArray(importedOrder) && importedOrder.length) {
      orderKeys = importedOrder
        .map((k) => (typeof k === 'string' ? k.trim() : ''))
        .filter((k) => k && existing.has(k));
    } else {
      desiredOrder.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.idx - b.idx;
      });
      orderKeys = desiredOrder.map((it) => it.key).filter(Boolean);
    }

    setVideoSourceListStatus('', '导入中...');
    try {
      // Restore availability + error first (may have side effects we override below).
      await postForm('/dashboard/video/source/sites/check', {
        results: JSON.stringify(results),
        errors: JSON.stringify(errors),
      }).catch(() => {});

      // Restore ordering.
      if (orderKeys.length) {
        await postForm('/dashboard/video/source/sites/order', { order: JSON.stringify(orderKeys) }).catch(() => {});
      }

      // Restore cover site.
      if (coverKey) {
        await updateVideoSourceCoverSite(coverKey).catch(() => {});
      }

      // Restore per-site switches.
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        await updateVideoSourceSiteStatus(k, !!desiredStatus[k]).catch(() => {});
        await updateVideoSourceSiteHome(k, !!desiredHome[k]).catch(() => {});
        await updateVideoSourceSiteSearch(k, !!desiredSearch[k]).catch(() => {});
      }

      const data = await getSuccessJson('/dashboard/video/source/sites');
      if (data && typeof data.coverSite === 'string') {
        videoSourceCoverSite = String(data.coverSite || '').trim();
      }
      renderVideoSourceList(data && Array.isArray(data.sites) ? data.sites : []);

      setVideoSourceListStatus('success', `导入完成（${keys.length} 个站点）`);
      clearStatusLater(setVideoSourceListStatus, 1800);
    } catch (e) {
      const status = e && typeof e.status === 'number' ? e.status : 0;
      const msg = e && e.message ? String(e.message) : '导入失败';
      if (status) setVideoSourceListStatus('error', `HTTP ${status}：${msg}`);
      else setVideoSourceListStatus('error', msg);
    }
  };

  bindOnce(videoSourceJsonExport, (btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        if (!Array.isArray(currentVideoSourceSites) || currentVideoSourceSites.length === 0) {
          const data = await getSuccessJson('/dashboard/video/source/sites');
          if (data && typeof data.coverSite === 'string') {
            videoSourceCoverSite = String(data.coverSite || '').trim();
          }
          renderVideoSourceList(data && Array.isArray(data.sites) ? data.sites : []);
        }
      } catch (_e) {}
      exportVideoSourceSitesToJson();
    });
  });

  bindOnce(videoSourceJsonImport, (btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!videoSourceJsonImportFile) return;
      try {
        videoSourceJsonImportFile.value = '';
      } catch (_e) {}
      videoSourceJsonImportFile.click();
    });
  });

  bindOnce(videoSourceJsonImportFile, (input) => {
    input.addEventListener('change', async () => {
      const file = input.files && input.files[0] ? input.files[0] : null;
      if (!file) return;
      try {
        const text = await file.text();
        await restoreVideoSourceSitesFromJson(text);
      } catch (_e) {
        setVideoSourceListStatus('error', '读取文件失败');
      } finally {
        try {
          input.value = '';
        } catch (_e) {}
      }
    });
  });

  const resetVideoSourceOrderFromCatPawOpen = async () => {
    const apiBase = await resolveCatPawOpenApiBase();
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) {
      setVideoSourceListStatus('error', 'CatPawOpen 接口地址未设置');
      return;
    }

    setVideoSourceListStatus('', '对齐中...');
    try {
      const fullConfig = await requestCatPawOpenAdminJson({
        apiBase: normalizedBase,
        path: 'admin/full-config',
        method: 'GET',
      });
      const remote = fullConfig && fullConfig.video && Array.isArray(fullConfig.video.sites) ? fullConfig.video.sites : [];
      const remoteOrderKeys = remote
        .map((s) => (s && typeof s.key === 'string' ? s.key.trim() : ''))
        .filter(Boolean);
      if (!remoteOrderKeys.length) {
        setVideoSourceListStatus('error', '未获取到排序');
        return;
      }

      const byKey = new Map();
      (currentVideoSourceSites || []).forEach((s) => {
        if (s && s.key) byKey.set(s.key, s);
      });

      const used = new Set();
      const nextSites = [];
      for (let i = 0; i < remoteOrderKeys.length; i += 1) {
        const k = remoteOrderKeys[i];
        if (!k || used.has(k)) continue;
        const s = byKey.get(k);
        if (!s) continue;
        used.add(k);
        nextSites.push(s);
      }
      // Append any local-only sites at the end, keeping their existing relative order.
      (currentVideoSourceSites || []).forEach((s) => {
        const k = s && s.key ? String(s.key) : '';
        if (!k || used.has(k)) return;
        used.add(k);
        nextSites.push(s);
      });

      if (!nextSites.length) {
        setVideoSourceListStatus('error', '未获取到站源');
        return;
      }

      const saved = await saveVideoSourceOrder(nextSites);
      if (!saved || !saved.ok) {
        setVideoSourceListStatus('error', (saved && saved.message) || '保存失败');
        return;
      }

      renderVideoSourceList(nextSites);
      setVideoSourceListStatus('success', '排序已对齐');
      clearStatusLater(setVideoSourceListStatus, 1200);
    } catch (e) {
      const status = e && typeof e.status === 'number' ? e.status : 0;
      const msg = e && e.message ? String(e.message) : '对齐失败';
      if (status) setVideoSourceListStatus('error', `HTTP ${status}：${msg}`);
      else setVideoSourceListStatus('error', msg);
    }
  };

  const checkVideoSourceSites = async (keys) => {
    const apiBase = await resolveCatPawOpenApiBase();
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) return { ok: false, message: 'CatPawOpen 接口地址未设置' };

    const uniq = (Array.isArray(keys) ? keys : [])
      .map((k) => (typeof k === 'string' ? k.trim() : ''))
      .filter(Boolean);
    if (!uniq.length) return { ok: true, sites: currentVideoSourceSites || [], results: {} };

    const byKey = new Map();
    (currentVideoSourceSites || []).forEach((s) => {
      if (s && s.key) byKey.set(s.key, s);
    });

    const extractList = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.list)) return data.list;
      if (data.data && Array.isArray(data.data)) return data.data;
      if (data.data && Array.isArray(data.data.list)) return data.data.list;
      if (data.data && Array.isArray(data.data.vod_list)) return data.data.vod_list;
      if (data.data && Array.isArray(data.data.items)) return data.data.items;
      return [];
    };

    const extractClasses = (data) => {
      if (!data) return [];
      if (Array.isArray(data.class)) return data.class;
      if (Array.isArray(data.classes)) return data.classes;
      if (data.data && Array.isArray(data.data.class)) return data.data.class;
      if (data.data && Array.isArray(data.data.classes)) return data.data.classes;
      if (data.data && Array.isArray(data.data.types)) return data.data.types;
      if (Array.isArray(data.types)) return data.types;
      return [];
    };

    const extractClassId = (c) => {
      if (!c) return '';
      const pick = (v) => (v != null ? String(v).trim() : '');
      return (
        pick(c.type_id) ||
        pick(c.tid) ||
        pick(c.id) ||
        pick(c.typeId) ||
        ''
      );
    };

    const normalizeStatusCode = (resp) => {
      if (resp && typeof resp.statusCode === 'number') return resp.statusCode;
      if (resp && resp.data && typeof resp.data.statusCode === 'number') return resp.data.statusCode;
      return 0;
    };

    const normalizeMessage = (resp) => {
      if (resp && typeof resp.message === 'string') return resp.message;
      if (resp && typeof resp.msg === 'string') return resp.msg;
      if (resp && resp.data && typeof resp.data.message === 'string') return resp.data.message;
      return '';
    };

    const formatHttpError = (e) => {
      const status = e && typeof e.status === 'number' ? e.status : 0;
      const msg = e && e.message ? String(e.message) : '请求失败';
      if (!status) return msg;
      if (msg.startsWith(`HTTP ${status}`)) return msg;
      return `HTTP ${status}：${msg}`;
    };

    const extractSpiderNameFromApi = (api) => {
      const raw = typeof api === 'string' ? api.trim() : '';
      if (!raw) return '';
      try {
        const u = raw.startsWith('http://') || raw.startsWith('https://') ? new URL(raw) : null;
        const p = u ? u.pathname : raw;
        if (p.indexOf('/spider/') === 0) {
          const parts = p.split('/').filter(Boolean);
          return parts.length >= 2 ? parts[1] : '';
        }
      } catch (_e) {}
      if (raw.indexOf('/spider/') === 0) {
        const parts = raw.split('/').filter(Boolean);
        return parts.length >= 2 ? parts[1] : '';
      }
      return '';
    };

    const results = {};
    const errors = {};
    const disableSearchKeys = [];

	    const isMyPanSite = (site) => {
	      const nameRaw = site && typeof site.name === 'string' ? site.name : '';
	      const name = normalizeSiteNameForMatch(nameRaw);
	      if (!name) return false;
	      if (!name.includes('我的')) return false;
	      const keys = ['夸克', '百度', '天逸', '115', '123', 'quark', 'baidu'];
	      const lower = name.toLowerCase();
	      return keys.some((k) => (/[a-z]/i.test(k) ? lower.includes(k) : name.includes(k)));
	    };

	    for (let i = 0; i < uniq.length; i += 1) {
	      const key = uniq[i];
	      const site = byKey.get(key);
	      if (!site || !site.api) {
	        results[key] = 'invalid';
	        errors[key] = '分类接口:站点配置无效';
	        continue;
	      }
	      try {
	        const apiRaw = String(site.api || '').trim();
	        const spiderPath = apiRaw.replace(/\/+$/, '').replace(/^\//, '');

          if (shouldSkipVideoSourceCheck(site)) {
            results[key] = 'skipped';
            continue;
          }

	        const spiderName = extractSpiderNameFromApi(site.api);
	        if (spiderName === 'baseset') {
	          // `baseset` is a non-content settings site; keep it enabled and avoid full probing here.
	          results[key] = 'valid';
	          continue;
	        }
	        if (isMyPanSite(site)) {
	          // "我的xxx" pan browsing sources depend on user storage and may not be probe-able here.
	          results[key] = 'valid';
	          disableSearchKeys.push(key);
	          continue;
	        }

	        const isFatalHttpProbeError = (err) => {
	          const status = err && typeof err.status === 'number' ? err.status : 0;
	          const msg = err && err.message ? String(err.message) : '';
	          if (status === 403 || status === 404) return true;
          if (status === 500 && /ECONNREFUSED/i.test(msg)) return true;
          return false;
        };

        const extractVodId = (vod) => {
          if (!vod) return '';
          const pick = (v) => (v != null ? String(v).trim() : '');
          return pick(vod.vod_id) || pick(vod.vodId) || pick(vod.id) || pick(vod.ID) || '';
        };

        const parsePlayCandidate = (fromStr, urlStr) => {
          const fromRaw = typeof fromStr === 'string' ? fromStr : '';
          const urlRaw = typeof urlStr === 'string' ? urlStr : '';
          const from = String(fromRaw.split('$$$')[0] || '').trim();
          const urlBlock = String(urlRaw.split('$$$')[0] || '').trim();
          if (!from || !urlBlock) return null;
          const firstLine = String(urlBlock.split('#')[0] || '').trim();
          if (!firstLine) return null;
          const parts = firstLine.split('$');
          const epUrl = parts.length >= 2 ? parts.slice(1).join('$') : firstLine;
          const id = String(epUrl || '').trim();
          if (!id) return null;
          return { flag: from, id };
        };

        const extractPlayFromVod = (vod) => {
          if (!vod || typeof vod !== 'object') return null;
          const from =
            (typeof vod.vod_play_from === 'string' ? vod.vod_play_from : '') ||
            (typeof vod.play_from === 'string' ? vod.play_from : '') ||
            (typeof vod.playFrom === 'string' ? vod.playFrom : '');
          const url =
            (typeof vod.vod_play_url === 'string' ? vod.vod_play_url : '') ||
            (typeof vod.play_url === 'string' ? vod.play_url : '') ||
            (typeof vod.playUrl === 'string' ? vod.playUrl : '');
          return parsePlayCandidate(from, url);
        };

	        const extractPlayUrl = (resp) => {
	          if (!resp) return '';
	          const pickStr = (v) => (typeof v === 'string' ? v.trim() : '');
	          const pickUrlLike = (v) => {
	            const direct = pickStr(v);
	            if (direct) return direct;
	            if (!Array.isArray(v)) return '';
	            // CatPawOpen may return `url: ["原画", "https://..."]` (or other array shapes).
	            // Prefer an http(s) URL, starting from the end.
	            for (let i = v.length - 1; i >= 0; i -= 1) {
	              const s = pickStr(v[i]);
	              if (s && /^https?:\/\//i.test(s)) return s;
	            }
	            for (let i = 0; i < v.length; i += 1) {
	              const s = pickStr(v[i]);
	              if (s) return s;
	            }
	            return '';
	          };
	          return pickUrlLike(resp.url) || pickUrlLike(resp.playUrl) || (resp.data && pickUrlLike(resp.data.url)) || '';
	        };

	        // 1) Home probe
	        let homeOk = false;
	        let homeErr = '';
	        let homeClasses = [];
	        try {
	          const homeResp = await requestCatPawOpenAdminJson({
	            apiBase: normalizedBase,
	            path: `${spiderPath}/home`,
            method: 'POST',
            body: {},
          });
          const sc = normalizeStatusCode(homeResp);
          if (sc >= 400) {
            const msg = normalizeMessage(homeResp) || '请求失败';
            homeErr = msg.startsWith('HTTP') ? msg : `HTTP ${sc}：${msg}`;
	          } else {
	            homeOk = true;
	            homeClasses = extractClasses(homeResp);
	          }
	        } catch (e) {
	          homeErr = formatHttpError(e);
	        }

        // 2) Category probe (collect candidates)
        let categoryOk = false;
        let categoryErr = '';
        let categoryEmpty = false;
        let vodCandidates = [];
        if (homeOk) {
          const firstWithId = Array.isArray(homeClasses) ? homeClasses.find((c) => !!extractClassId(c)) : null;
          const tid = extractClassId(firstWithId);
          const body = tid ? { id: tid, page: 1, filter: true, filters: {} } : { id: '0', page: 1, filter: true, filters: {} };
          try {
            const catResp = await requestCatPawOpenAdminJson({
              apiBase: normalizedBase,
              path: `${spiderPath}/category`,
              method: 'POST',
              body,
            });
            const sc2 = normalizeStatusCode(catResp);
            if (sc2 >= 400) {
              const msg = normalizeMessage(catResp) || '请求失败';
              categoryErr = msg.startsWith('HTTP') ? msg : `HTTP ${sc2}：${msg}`;
            } else {
              categoryOk = true;
              const list = extractList(catResp);
              vodCandidates = Array.isArray(list) ? list.slice(0, 10) : [];
              categoryEmpty = vodCandidates.length === 0;
            }
	          } catch (e) {
	            categoryErr = formatHttpError(e);
	          }
	        }

	        // 3) Play probe (use category candidates; up to 3)
	        let playOkFromCategory = false;
	        let playOkFromSearch = false;
	        let playErr = '';

	        const tryPlayFromCandidates = async (items, meta) => {
	          const state = meta && typeof meta === 'object' ? meta : null;
	          const candidates = (Array.isArray(items) ? items : [])
	            .filter((v) => v && typeof v === 'object')
	            .slice(0, 3);
	          for (let j = 0; j < candidates.length; j += 1) {
	            const vod = candidates[j];
	            let playCandidate = extractPlayFromVod(vod);
	            try {
	              if (!playCandidate) {
	                const vodId = extractVodId(vod);
	                if (!vodId) continue;
	                const detailResp = await requestCatPawOpenAdminJson({
	                  apiBase: normalizedBase,
	                  path: `${spiderPath}/detail`,
	                  method: 'POST',
	                  body: { id: vodId, vod_id: vodId },
	                });
	                const dsc = normalizeStatusCode(detailResp);
	                if (dsc >= 400) continue;
	                const detailList = extractList(detailResp);
	                const first = Array.isArray(detailList) && detailList.length ? detailList[0] : null;
	                playCandidate = extractPlayFromVod(first);
	              }
	              if (!playCandidate) {
	                if (state) state.missingPlayMeta = true;
	                if (!playErr) playErr = '缺少播放信息';
	                continue;
	              }
	              const playResp = await requestCatPawOpenAdminJson({
	                apiBase: normalizedBase,
	                path: `play`,
	                method: 'POST',
	                body: {
	                  flag: playCandidate.flag,
	                  id: playCandidate.id,
	                  siteApi: `/${spiderPath}`.replace(/\/{2,}/g, '/'),
	                },
	              });
	              const psc = normalizeStatusCode(playResp);
	              if (psc >= 400) continue;
	              const url = extractPlayUrl(playResp);
	              if (url) return true;
	              playErr = '未提取到地址';
	            } catch (e) {
	              playErr = formatHttpError(e);
	              if (isFatalHttpProbeError(e)) break;
	            }
	          }
	          return false;
	        };

          const categoryPlayMeta = { missingPlayMeta: false };
	        if (categoryOk && !categoryEmpty) {
	          playOkFromCategory = await tryPlayFromCandidates(vodCandidates, categoryPlayMeta);
	        }

	        // 4) Search probe
	        // - If category failed/empty => use search to find candidates, then play them.
	        // - If category+play ok => lastly test search endpoint (no need to play from search).
	        let searchOk = false;
	        let searchErr = '';
	        let searchCandidates = [];
	        const shouldUseSearchForPlay =
	          !categoryOk || categoryEmpty || (!playOkFromCategory && categoryPlayMeta.missingPlayMeta);
	        const shouldProbeSearchFinally = playOkFromCategory;
	        if (shouldUseSearchForPlay || shouldProbeSearchFinally) {
	          try {
	            const searchResp = await requestCatPawOpenAdminJson({
	              apiBase: normalizedBase,
	              path: `${spiderPath}/search`,
	              method: 'POST',
	              body: { wd: '斗破', page: 1 },
	            });
	            const sc = normalizeStatusCode(searchResp);
	            if (sc >= 400) {
	              const msg = normalizeMessage(searchResp) || '请求失败';
	              searchErr = msg.startsWith('HTTP') ? msg : `HTTP ${sc}：${msg}`;
	            } else {
	              searchCandidates = extractList(searchResp);
	              searchOk = true;
	            }
	          } catch (e) {
	            searchErr = formatHttpError(e);
	            if (isFatalHttpProbeError(e)) searchOk = false;
	          }
	        }

	        if (shouldUseSearchForPlay && searchOk && Array.isArray(searchCandidates) && searchCandidates.length) {
	          playOkFromSearch = await tryPlayFromCandidates(searchCandidates);
	        }

	        // Final decision.
	        // - Category flow yields playable => valid (and optionally mark search_error when search probe fails)
	        // - Category failed/empty but search play yields playable => category_error (disable homepage but keep search)
	        // - Otherwise => invalid
	        if (playOkFromCategory) {
	          results[key] = searchOk ? 'valid' : 'search_error';
	        } else if (playOkFromSearch) {
	          results[key] = 'category_error';
	        } else {
	          results[key] = 'invalid';
	        }

	        const parts = [];
	        if (homeErr) parts.push(`首页接口:${homeErr}`);
	        if (categoryErr) parts.push(`分类接口:${categoryErr}`);
	        if (playErr) parts.push(`播放接口:${playErr}`);
        if (searchErr) parts.push(`搜索接口:${searchErr}`);
        if (parts.length) errors[key] = parts.join('  ');
      } catch (_e) {
        results[key] = 'invalid';
        errors[key] = '首页接口:检测失败  分类接口:检测失败  播放接口:检测失败  搜索接口:检测失败';
      }
    }

    const { resp, data } = await postForm('/dashboard/video/source/sites/check', {
      results: JSON.stringify(results),
      errors: JSON.stringify(errors),
    });

    // Apply search disable for "我的xxx" sources (best-effort).
    if (resp.ok && data && data.success && disableSearchKeys.length) {
      for (let i = 0; i < disableSearchKeys.length; i += 1) {
        const k = disableSearchKeys[i];
        // Disable homepage for these sources so category browsing won't be triggered by the UI.
        // eslint-disable-next-line no-await-in-loop
        await postForm('/dashboard/video/source/sites/home', { key: k, home: '0' }).catch(() => {});
        // eslint-disable-next-line no-await-in-loop
        await postForm('/dashboard/video/source/sites/search', { key: k, search: '0' }).catch(() => {});
      }
    }
    if (resp.ok && data && data.success) {
      return { ok: true, sites: Array.isArray(data.sites) ? data.sites : [], results: data.results || {} };
    }
    return { ok: false, message: (data && data.message) || '检测失败' };
  };

  if (videoSourceHeaderCheckbox) {
    videoSourceHeaderCheckbox.addEventListener('change', () => {
      const checked = !!videoSourceHeaderCheckbox.checked;
      currentVideoSourceSites.forEach((s) => {
        const k = (s && s.key) || '';
        if (!k) return;
        if (checked) selectedVideoSourceKeys.add(k);
        else selectedVideoSourceKeys.delete(k);
      });
      renderVideoSourceList(currentVideoSourceSites);
    });
  }

  const applyVideoSourceBulkEnabled = async (enabled) => {
    const keys = currentVideoSourceSites
      .map((s) => (s && s.key) || '')
      .filter((k) => k && selectedVideoSourceKeys.has(k));
    if (!keys.length) return;

    if (videoSourceBulkCheckDisable) videoSourceBulkCheckDisable.disabled = true;
    if (videoSourceBulkEnable) videoSourceBulkEnable.disabled = true;
    if (videoSourceBulkDisable) videoSourceBulkDisable.disabled = true;
    setVideoSourceListStatus('', '保存中...');
    try {
      let okCount = 0;
      let errCount = 0;
      for (let i = 0; i < keys.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const result = await updateVideoSourceSiteStatus(keys[i], enabled);
        if (result && result.ok) okCount += 1;
        else errCount += 1;
      }
      currentVideoSourceSites = currentVideoSourceSites.map((s) => {
        if (!s || !s.key || !selectedVideoSourceKeys.has(s.key)) return s;
        return { ...s, enabled };
      });
      renderVideoSourceList(currentVideoSourceSites);
      if (errCount <= 0) {
        setVideoSourceListStatus('success', '保存成功');
        clearStatusLater(setVideoSourceListStatus, 1200);
      } else if (okCount > 0) {
        setVideoSourceListStatus('error', `部分失败：${errCount}/${keys.length}`);
      } else {
        setVideoSourceListStatus('error', '保存失败');
      }
    } catch (_e) {
      setVideoSourceListStatus('error', '保存失败');
    } finally {
      if (videoSourceBulkCheckDisable) videoSourceBulkCheckDisable.disabled = false;
      if (videoSourceBulkEnable) videoSourceBulkEnable.disabled = false;
      if (videoSourceBulkDisable) videoSourceBulkDisable.disabled = false;
    }
  };

  const applyVideoSourceBulkCheckDisable = async () => {
    const keys = currentVideoSourceSites
      .map((s) => (s && s.key) || '')
      .filter((k) => k && selectedVideoSourceKeys.has(k));
    if (!keys.length) return;

    if (videoSourceBulkCheckDisable) videoSourceBulkCheckDisable.disabled = true;
    if (videoSourceBulkEnable) videoSourceBulkEnable.disabled = true;
    if (videoSourceBulkDisable) videoSourceBulkDisable.disabled = true;
    setVideoSourceListStatus('', `检测中... 0/${keys.length}`);
    try {
      let validCount = 0;
      let invalidCount = 0;
      let categoryErrCount = 0;
      let searchErrCount = 0;
      let skippedCount = 0;
      for (let i = 0; i < keys.length; i += 1) {
        setVideoSourceListStatus('', `检测中... ${i + 1}/${keys.length}`);
        // eslint-disable-next-line no-await-in-loop
        const result = await checkVideoSourceSites([keys[i]]);
        if (result && result.ok) {
          const sites = Array.isArray(result.sites) ? result.sites : [];
          renderVideoSourceList(sites);
          const status =
            result.results && result.results[keys[i]]
              ? normalizeAvailability(result.results[keys[i]])
              : 'unchecked';
          if (status === 'valid') validCount += 1;
          else if (status === 'invalid') invalidCount += 1;
          else if (status === 'category_error') categoryErrCount += 1;
          else if (status === 'search_error') searchErrCount += 1;
          else if (status === 'skipped') skippedCount += 1;
        } else {
          invalidCount += 1;
        }
      }
      setVideoSourceListStatus(
        invalidCount > 0 ? 'error' : 'success',
        `检测完成：有效${validCount} 无效${invalidCount} 跳过${skippedCount} 分类异常${categoryErrCount} 搜索异常${searchErrCount}`
      );
    } catch (_e) {
      setVideoSourceListStatus('error', '检测失败');
    } finally {
      if (videoSourceBulkCheckDisable) videoSourceBulkCheckDisable.disabled = false;
      if (videoSourceBulkEnable) videoSourceBulkEnable.disabled = false;
      if (videoSourceBulkDisable) videoSourceBulkDisable.disabled = false;
    }
  };

  if (videoSourceResetOrder) {
    videoSourceResetOrder.addEventListener('click', async (e) => {
      e.preventDefault();
      await withDatasetLock(videoSourceResetOrder, 'pending', async () => {
        videoSourceResetOrder.disabled = true;
        try {
          await resetVideoSourceOrderFromCatPawOpen();
        } finally {
          videoSourceResetOrder.disabled = false;
        }
      });
    });
  }

  if (videoSourceBulkCheckDisable) {
    videoSourceBulkCheckDisable.addEventListener('click', (e) => {
      e.preventDefault();
      applyVideoSourceBulkCheckDisable();
    });
  }
  if (videoSourceBulkEnable) {
    videoSourceBulkEnable.addEventListener('click', (e) => {
      e.preventDefault();
      applyVideoSourceBulkEnabled(true);
    });
  }
  if (videoSourceBulkDisable) {
    videoSourceBulkDisable.addEventListener('click', (e) => {
      e.preventDefault();
      applyVideoSourceBulkEnabled(false);
    });
  }

  if (videoSourceList) {
    const saveVideoSourceCheckbox = async ({ target, keyAttr, save, updateSite }) => {
      if (!target || !target.getAttribute) return;
      const key = target.getAttribute(keyAttr) || '';
      if (!key) return;
      const nextValue = !!target.checked;
      const prevValue = !nextValue;

      target.disabled = true;
      setVideoSourceListStatus('', '保存中...');
      try {
        const result = await (typeof save === 'function' ? save(key, nextValue) : null);
        if (result && result.ok) {
          currentVideoSourceSites = currentVideoSourceSites.map((s) => {
            if (!s || s.key !== key) return s;
            return typeof updateSite === 'function' ? updateSite(s, result) : s;
          });
          setVideoSourceListStatus('success', '保存成功');
          renderVideoSourceList(currentVideoSourceSites);
          clearStatusLater(setVideoSourceListStatus, 1200);
        } else {
          target.checked = prevValue;
          setVideoSourceListStatus('error', (result && result.message) || '保存失败');
        }
      } catch (_err) {
        target.checked = prevValue;
        setVideoSourceListStatus('error', '保存失败');
      } finally {
        target.disabled = false;
      }
    };

    videoSourceList.addEventListener('change', (e) => {
      const target = e.target;
      if (!target || !target.matches) return;
      if (!target.matches('input[type="checkbox"][data-select-key]')) return;
      const key = target.getAttribute('data-select-key') || '';
      if (!key) return;
      if (target.checked) selectedVideoSourceKeys.add(key);
      else selectedVideoSourceKeys.delete(key);
      syncVideoSourceHeaderCheckbox();
      syncVideoSourceBulkActions();
    });

    videoSourceList.addEventListener('click', async (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const btn = target.closest('button[data-sort][data-site-key]');
      if (!btn) return;
      const dir = btn.getAttribute('data-sort') || '';
      const key = btn.getAttribute('data-site-key') || '';
      if (!key || (dir !== 'up' && dir !== 'down')) return;

      const idx = currentVideoSourceSites.findIndex((s) => s && s.key === key);
      if (idx < 0) return;
      const nextIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (nextIdx < 0 || nextIdx >= currentVideoSourceSites.length) return;

      const next = swapCopy(currentVideoSourceSites, idx, nextIdx);
      currentVideoSourceSites = next;
      renderVideoSourceList(currentVideoSourceSites);

      btn.disabled = true;
      setVideoSourceListStatus('', '保存中...');
      try {
        const result = await saveVideoSourceOrder(currentVideoSourceSites);
        if (result && result.ok) {
          setVideoSourceListStatus('success', '保存成功');
          clearStatusLater(setVideoSourceListStatus, 1200);
        } else {
          setVideoSourceListStatus('error', (result && result.message) || '保存失败');
        }
      } catch (_err) {
        setVideoSourceListStatus('error', '保存失败');
      } finally {
        btn.disabled = false;
      }
    });

    videoSourceList.addEventListener('change', async (e) => {
      const target = e.target;
      if (!target || !target.matches) return;
      if (!target.matches('input[type="checkbox"][data-enable-key]')) return;
      await saveVideoSourceCheckbox({
        target,
        keyAttr: 'data-enable-key',
        save: updateVideoSourceSiteStatus,
        updateSite: (site, result) => ({ ...site, enabled: !!result.enabled }),
      });
    });

	    videoSourceList.addEventListener('change', async (e) => {
	      const target = e.target;
	      if (!target || !target.matches) return;
	      if (!target.matches('input[type="checkbox"][data-home-key]')) return;
	      await saveVideoSourceCheckbox({
	        target,
	        keyAttr: 'data-home-key',
	        save: updateVideoSourceSiteHome,
	        updateSite: (site, result) => ({ ...site, home: !!result.home }),
	      });
	    });

    videoSourceList.addEventListener('change', async (e) => {
      const target = e.target;
      if (!target || !target.matches) return;
      if (!target.matches('input[type="checkbox"][data-search-key]')) return;
      await saveVideoSourceCheckbox({
        target,
        keyAttr: 'data-search-key',
        save: updateVideoSourceSiteSearch,
        updateSite: (site, result) => ({ ...site, search: !!result.search }),
      });
    });

	    videoSourceList.addEventListener('change', async (e) => {
	      const target = e.target;
	      if (!target || !target.matches) return;
	      if (!target.matches('input[type="checkbox"][data-cover-key]')) return;
	      const key = (target.getAttribute('data-cover-key') || '').trim();
	      if (!key) return;
	      if (videoSourceCoverSaving) {
	        renderVideoSourceList(currentVideoSourceSites);
	        return;
	      }
	      if (!target.checked) {
	        renderVideoSourceList(currentVideoSourceSites);
	        return;
	      }

	      const prevCover = videoSourceCoverSite;
	      videoSourceCoverSite = key;
	      videoSourceCoverSaving = true;
	      renderVideoSourceList(currentVideoSourceSites);
	      setVideoSourceListStatus('', '保存中...');
	      try {
	        const result = await updateVideoSourceCoverSite(key);
	        if (result && result.ok) {
	          videoSourceCoverSite = (result.coverSite || key).trim();
	          setVideoSourceListStatus('success', '保存成功');
	          clearStatusLater(setVideoSourceListStatus, 1200);
	        } else {
	          videoSourceCoverSite = prevCover;
	          setVideoSourceListStatus('error', (result && result.message) || '保存失败');
	        }
	      } catch (_err) {
	        videoSourceCoverSite = prevCover;
	        setVideoSourceListStatus('error', '保存失败');
	      } finally {
	        videoSourceCoverSaving = false;
	        renderVideoSourceList(currentVideoSourceSites);
	      }
	    });
	  }

  if (panList) {
    panList.addEventListener('click', async (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const btn = target.closest('button[data-pan-sort][data-pan-key]');
      if (!btn) return;
      const dir = btn.getAttribute('data-pan-sort') || '';
      const key = btn.getAttribute('data-pan-key') || '';
      if (!key || (dir !== 'up' && dir !== 'down')) return;

      const idx = currentPans.findIndex((p) => p && p.key === key);
      if (idx < 0) return;
      const nextIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (nextIdx < 0 || nextIdx >= currentPans.length) return;

      const prev = currentPans.slice();
      const next = swapCopy(currentPans, idx, nextIdx);
      currentPans = next;
      renderPanList(currentPans);

      const rollback = (message) => {
        currentPans = prev;
        renderPanList(currentPans);
        setPanListStatus('error', message || '保存失败');
      };

      btn.disabled = true;
      setPanListStatus('', '保存中...');
      try {
        const result = await savePansList(currentPans);
        if (result && result.ok) {
          renderPanList(result.pans);
          setPanListStatus('success', '保存成功');
          clearStatusLater(setPanListStatus, 1200);
        } else {
          rollback((result && result.message) || '保存失败');
        }
      } catch (_err) {
        rollback('保存失败');
      } finally {
        btn.disabled = false;
      }
    });

    panList.addEventListener('change', async (e) => {
      const target = e.target;
      if (!target || !target.matches) return;
      if (!target.matches('input[type="checkbox"][data-pan-enable-key]')) return;
      const key = target.getAttribute('data-pan-enable-key') || '';
      if (!key) return;
      const nextEnabled = !!target.checked;
      const prevEnabled = !nextEnabled;

      const prev = currentPans.slice();
      currentPans = currentPans.map((p) => {
        if (!p || p.key !== key) return p;
        return { ...p, enable: nextEnabled };
      });

      const rollback = (message) => {
        target.checked = prevEnabled;
        currentPans = prev;
        renderPanList(currentPans);
        setPanListStatus('error', message || '保存失败');
      };

      target.disabled = true;
      setPanListStatus('', '保存中...');
      try {
        const result = await savePansList(currentPans);
        if (result && result.ok) {
          renderPanList(result.pans);
          setPanListStatus('success', '保存成功');
          clearStatusLater(setPanListStatus, 1200);
        } else {
          rollback((result && result.message) || '保存失败');
        }
      } catch (_err) {
        rollback('保存失败');
      } finally {
        target.disabled = false;
      }
    });
  }

  const fetchVideoSourceSites = async () => {
    const data = await getSuccessJson('/dashboard/video/source/sites');
    return {
      sites: data && Array.isArray(data.sites) ? data.sites : [],
      coverSite: data && typeof data.coverSite === 'string' ? data.coverSite : '',
    };
  };

  const loadVideoPanel = async () => {
    if (panelLoaded.video || panelLoading.video) return;
    panelLoading.video = true;
    try {
      const data = await fetchVideoSourceSites();
      if (data && typeof data.coverSite === 'string') {
        videoSourceCoverSite = String(data.coverSite || '').trim();
      }
      renderVideoSourceList(data && Array.isArray(data.sites) ? data.sites : []);
      panelLoaded.video = true;
    } finally {
      panelLoading.video = false;
    }
  };

  const loadPanPanel = async () => {
    if (panelLoaded.pan || panelLoading.pan) return;
    panelLoading.pan = true;
    try {
      const first = panSettingDefs[0] ? panSettingDefs[0].key : '';
      if (first && !activePanSettingKey) activePanSettingKey = first;
      renderPanSettingsTabs();
      scheduleUpdatePanMoreMenu();
      await ensurePanSettingLoaded(activePanSettingKey);
      renderPanSettingsContent();
      panelLoaded.pan = true;
    } finally {
      panelLoading.pan = false;
    }
  };

  const loadInterfacePanel = async () => {
    if (panelLoaded.interface || panelLoading.interface) return;
    panelLoading.interface = true;
    try {
	      const settings = await fetchSiteSettings();
	        if (settings) {
	          const catForm = document.getElementById('catPawOpenSettingsForm');
	          const serverSelect = document.getElementById('catPawOpenServerSelect');
	          const serverAddBtn = document.getElementById('catPawOpenServerAdd');
          const serverDeleteBtn = document.getElementById('catPawOpenServerDelete');
          const serverDeleteCancelBtn = document.getElementById('catPawOpenServerDeleteCancel');
          const nameRow = document.getElementById('catPawOpenNameRow');
          const apiRow = document.getElementById('catPawOpenApiRow');
          const extrasEl = document.getElementById('catPawOpenSettingsExtras');
          const nameInput = catForm ? catForm.querySelector('input[name="catPawOpenName"]') : null;
          const apiInput = catForm ? catForm.querySelector('input[name="catPawOpenApiBase"]') : null;
          const syncConfigToOtherBtn = document.getElementById('catPawOpenSyncConfigToOtherBtn');
          const syncConfigToOtherPicker = document.getElementById('catPawOpenSyncConfigToOtherPicker');
          const syncConfigToOtherSelect = document.getElementById('catPawOpenSyncConfigToOtherSelect');
          const syncConfigToOtherConfirm = document.getElementById('catPawOpenSyncConfigToOtherConfirm');
          const syncConfigToOtherCancel = document.getElementById('catPawOpenSyncConfigToOtherCancel');
          const syncConfigToOtherStatus = document.getElementById('catPawOpenSyncConfigToOtherStatus');

          const setRowVisible = (el, visible) => {
            if (!el || !el.classList) return;
            el.classList.toggle('hidden', !visible);
          };

          const setInputEnabled = (el, enabled) => {
            if (!el) return;
            try {
              el.disabled = !enabled;
            } catch (_e) {}
          };

          const syncServerEditorVisibility = () => {
            const hasServers = !!(catPawOpenServers && catPawOpenServers.length);
            const showEditor = !!catPawOpenServerAddMode || hasServers;
            setRowVisible(nameRow, showEditor);
            setRowVisible(apiRow, showEditor);
            setInputEnabled(nameInput, showEditor);
            setInputEnabled(apiInput, showEditor);
            const syncFromRow = document.getElementById('catPawOpenSyncFromServerRow');
            if (!showEditor) setRowVisible(syncFromRow, false);
            // Extras are only meaningful once a server exists and we're not in "add" mode.
            setRowVisible(extrasEl, hasServers && !catPawOpenServerAddMode);
          };

          let catPawOpenServerDeleteConfirming = false;

          const setDeleteConfirming = (value) => {
            catPawOpenServerDeleteConfirming = !!value;
            if (serverDeleteBtn) serverDeleteBtn.textContent = catPawOpenServerDeleteConfirming ? '确定' : '删除';
            if (serverDeleteCancelBtn) serverDeleteCancelBtn.classList.toggle('hidden', !catPawOpenServerDeleteConfirming);
          };

          const syncDeleteButtonsVisibility = () => {
            const selected = serverSelect ? String(serverSelect.value || '') : '';
            const hasServers = !!(catPawOpenServers && catPawOpenServers.length);
            const canShow = hasServers && !catPawOpenServerAddMode && !!selected && selected !== '__new__';
            if (serverDeleteBtn) serverDeleteBtn.classList.toggle('hidden', !canShow);
            if (!canShow) setDeleteConfirming(false);
          };

          const normalizeServers = (raw) => {
            return normalizeCatPawOpenServers(raw);
          };

          catPawOpenServers = normalizeServers(settings.catPawOpenServers);
          const initialKey = pickCatPawOpenActiveKey(catPawOpenServers, settings.catPawOpenActive);

          const syncCustomDropdownDisplayOnly = (sel) => {
            if (!sel) return;
            const wrapper = sel.parentNode;
            if (!(wrapper && wrapper.classList && wrapper.classList.contains('custom-dropdown'))) return;
            const btn = wrapper.querySelector('.custom-dropdown-btn');
            const list = wrapper.querySelector('.custom-dropdown-list');
            const opt = sel.options[sel.selectedIndex];
            if (btn) btn.textContent = (opt && opt.text) || '请选择';
            if (list) {
              list.querySelectorAll('.custom-dropdown-item').forEach((n) => {
                const v = n && n.dataset ? n.dataset.value : '';
                n.classList.toggle('active', v === sel.value);
              });
            }
          };

	          const setAddButtonLabel = (isAdd) => {
	            if (!serverAddBtn) return;
	            serverAddBtn.textContent = isAdd ? '取消' : '添加服务器';
	          };

          const setSyncConfigToOtherStatus = (msg) => {
            if (!syncConfigToOtherStatus) return;
            const text = typeof msg === 'string' ? msg.trim() : '';
            syncConfigToOtherStatus.textContent = text;
            syncConfigToOtherStatus.classList.toggle('hidden', !text);
          };

          const hideSyncConfigToOtherPicker = () => {
            if (syncConfigToOtherPicker) syncConfigToOtherPicker.classList.add('hidden');
            if (syncConfigToOtherSelect) syncConfigToOtherSelect.value = '';
            if (syncConfigToOtherConfirm) syncConfigToOtherConfirm.disabled = true;
            setSyncConfigToOtherStatus('');
            try {
              remountCustomSelectElement(syncConfigToOtherSelect);
            } catch (_e) {}
          };

          const buildCatPawOpenRemoteSettingsPayload = () => {
            const proxyInput = document.querySelector('#catPawOpenSettingsForm input[name=\"catPawOpenProxy\"]');
            const proxy = proxyInput && typeof proxyInput.value === 'string' ? proxyInput.value : '';
            const goProxyApiInput = document.querySelector('#catPawOpenSettingsForm input[name=\"catPawOpenGoProxyApi\"]');
            const goProxyApi = goProxyApiInput && typeof goProxyApiInput.value === 'string' ? goProxyApiInput.value : '';
            const panBuiltinInput = document.getElementById('catPawOpenPanBuiltinResolverEnabled');
            const panBuiltinResolverEnabled = !!(panBuiltinInput && panBuiltinInput.checked);
	            const rawItems = catPawOpenConfigListEditor ? catPawOpenConfigListEditor.getItems() : [];
	            const onlineConfigs = Array.isArray(rawItems)
	              ? rawItems
	                  .map((it) => ({ name: String(it.name || ''), url: String(it.url || '') }))
	                  .filter((it) => it.name && it.url)
	              : [];
	            return { proxy: String(proxy || ''), panBuiltinResolverEnabled, goProxyApi: String(goProxyApi || ''), onlineConfigs };
	          };

          const renderSyncConfigToOtherTargets = () => {
            if (!syncConfigToOtherSelect) return;
            const current = serverSelect ? String(serverSelect.value || '') : '';
            const targets = (catPawOpenServers || []).filter((s) => s && s.name && s.name !== current);

            syncConfigToOtherSelect.innerHTML = '';
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = '请选择';
            placeholder.selected = true;
            syncConfigToOtherSelect.appendChild(placeholder);

            targets.forEach((s) => {
              const opt = document.createElement('option');
              opt.value = s.name;
              opt.textContent = s.name;
              syncConfigToOtherSelect.appendChild(opt);
            });

            remountCustomSelectElement(syncConfigToOtherSelect);
            syncCustomDropdownDisplayOnly(syncConfigToOtherSelect);
            if (syncConfigToOtherConfirm) syncConfigToOtherConfirm.disabled = true;
          };

          const captureRemoteState = () => {
            const remoteErrorEl = document.getElementById('catPawOpenRemoteError');
            const remoteSettingsEl = document.getElementById('catPawOpenRemoteSettings');
            const errorVisible = !!(remoteErrorEl && !remoteErrorEl.classList.contains('hidden') && remoteErrorEl.textContent);
            if (errorVisible) {
              return { state: 'error', message: String(remoteErrorEl.textContent || '') };
            }
            const ready = !!(remoteSettingsEl && !remoteSettingsEl.classList.contains('hidden'));
            if (ready) return { state: 'ready', message: '' };
            return { state: 'hidden', message: '' };
          };

          const renderServerOptions = (selectedKey) => {
            if (!serverSelect) return;
            const targetKey = typeof selectedKey === 'string' ? selectedKey : '';
            const prev = serverSelect.value;
            serverSelect.innerHTML = '';

            if (catPawOpenServerAddMode) {
              const opt = document.createElement('option');
              opt.value = '__new__';
              opt.textContent = '新建服务器';
              opt.selected = true;
              serverSelect.appendChild(opt);
            }

            if (!catPawOpenServers.length) {
              if (!catPawOpenServerAddMode) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.disabled = true;
                opt.selected = true;
                opt.textContent = '暂无数据';
                serverSelect.appendChild(opt);
              }
              remountCustomSelectElement(serverSelect);
              return;
            }

            catPawOpenServers.forEach((s) => {
              const opt = document.createElement('option');
              opt.value = s.name;
              opt.textContent = s.name;
              serverSelect.appendChild(opt);
            });

            const next =
              targetKey ||
              prev ||
              (catPawOpenServerAddMode ? '__new__' : '') ||
              (catPawOpenServers[0] ? catPawOpenServers[0].name : '');
            if (next) serverSelect.value = next;
            remountCustomSelectElement(serverSelect);
            syncCustomDropdownDisplayOnly(serverSelect);
          };

          const selectServer = async (key, { refreshRemote = true } = {}) => {
            const k = typeof key === 'string' ? key : '';
            const server = catPawOpenServers.find((s) => s && s.name === k) || catPawOpenServers[0];
            if (!server) {
              if (nameInput) nameInput.value = '';
              if (apiInput) apiInput.value = '';
              catPawOpenSavedApiBaseNorm = '';
              syncCatPawOpenSettingsVisibility();
              setCatPawOpenRemoteState('hidden');
              syncServerEditorVisibility();
              hideSyncConfigToOtherPicker();
              return;
            }
            if (serverSelect) {
              catPawOpenServerSelectSyncing = true;
              serverSelect.value = server.name;
              syncCustomDropdownDisplayOnly(serverSelect);
              catPawOpenServerSelectSyncing = false;
            }
            if (nameInput) nameInput.value = server.name;
            if (apiInput) apiInput.value = server.apiBase;
            catPawOpenSavedApiBaseNorm = normalizeCatPawOpenAdminBase(server.apiBase || '');
            syncCatPawOpenSettingsVisibility();
            if (refreshRemote) {
              await refreshCatPawOpenRemoteSettings(server.apiBase || '');
            }
            syncServerEditorVisibility();
            hideSyncConfigToOtherPicker();
          };

	          renderServerOptions();
	          if (catPawOpenServers.length) {
	            await selectServer(initialKey, { refreshRemote: true });
	          } else {
            if (nameInput) nameInput.value = '';
            if (apiInput) apiInput.value = '';
            catPawOpenSavedApiBaseNorm = '';
            syncCatPawOpenSettingsVisibility();
            setCatPawOpenRemoteState('hidden');
            syncServerEditorVisibility();
	          }
	          syncDeleteButtonsVisibility();

	          const enterAddMode = () => {
	            if (!serverSelect) return;
	            catPawOpenServerAddMode = true;
	            catPawOpenServerPrevSelectedKey = serverSelect.value || '';
	            catPawOpenServerPrevRemoteState = captureRemoteState();
	            setAddButtonLabel(true);
	            syncDeleteButtonsVisibility();
	            hideSyncConfigToOtherPicker();

	            renderServerOptions('__new__');

	            if (nameInput) nameInput.value = '';
	            if (apiInput) apiInput.value = '';
	            setCatPawOpenRemoteState('hidden');

	            syncServerEditorVisibility();
	            syncCatPawOpenSettingsVisibility();
	            const syncWrap = document.getElementById('catPawOpenSyncSaveWrap');
	            const syncInput = document.getElementById('catPawOpenSyncSave');
	            if (syncWrap) syncWrap.classList.add('hidden');
	            if (syncInput) {
	              syncInput.checked = false;
	              syncInput.disabled = true;
	            }

	            try {
	              syncCatPawOpenServerAddModeButtons();
	            } catch (_e) {}
	          };

	          const exitAddMode = async () => {
	            if (!serverSelect) return;
	            catPawOpenServerAddMode = false;
	            setAddButtonLabel(false);
	            hideSyncConfigToOtherPicker();

	            renderServerOptions(catPawOpenServerPrevSelectedKey);

	            if (catPawOpenServerPrevSelectedKey) {
	              await selectServer(catPawOpenServerPrevSelectedKey, { refreshRemote: false });
	            } else if (catPawOpenServers.length) {
	              await selectServer(catPawOpenServers[0].name, { refreshRemote: false });
	            }

	            const syncInput = document.getElementById('catPawOpenSyncSave');
	            if (syncInput) syncInput.disabled = false;

	            setCatPawOpenRemoteState(catPawOpenServerPrevRemoteState.state, catPawOpenServerPrevRemoteState.message);
	            syncCatPawOpenSettingsVisibility();
	            syncServerEditorVisibility();
	            syncDeleteButtonsVisibility();

	            try {
	              syncCatPawOpenServerAddModeButtons();
	            } catch (_e) {}
	          };

	          cancelCatPawOpenServerAddMode = async () => {
	            if (!catPawOpenServerAddMode) return;
	            await exitAddMode();
	          };

	          bindOnce(serverSelect, () => {
	            serverSelect.addEventListener('change', async () => {
	              if (catPawOpenServerSelectSyncing) return;
	              setDeleteConfirming(false);
	              hideSyncConfigToOtherPicker();

	              const k = serverSelect.value || '';
	              if (catPawOpenServerAddMode) {
	                if (!k || k === '__new__') return;

	                catPawOpenServerAddMode = false;
	                setAddButtonLabel(false);

	                const syncInput = document.getElementById('catPawOpenSyncSave');
	                if (syncInput) syncInput.disabled = false;

	                renderServerOptions(k);

	                const reusePrev = !!catPawOpenServerPrevSelectedKey && k === catPawOpenServerPrevSelectedKey;
	                await selectServer(k, { refreshRemote: !reusePrev });
	                if (reusePrev) {
	                  setCatPawOpenRemoteState(catPawOpenServerPrevRemoteState.state, catPawOpenServerPrevRemoteState.message);
	                }

	                syncCatPawOpenSettingsVisibility();
	                syncServerEditorVisibility();
	                syncDeleteButtonsVisibility();

	                try {
	                  syncCatPawOpenServerAddModeButtons();
	                } catch (_e) {}
	                return;
	              }

	              await selectServer(k, { refreshRemote: true });
	              syncServerEditorVisibility();
	              syncDeleteButtonsVisibility();
            });
	          });

	          bindOnce(serverAddBtn, () => {
	            serverAddBtn.addEventListener('click', async () => {
	              if (!serverSelect) return;
	              if (!catPawOpenServerAddMode) enterAddMode();
	              else await exitAddMode();
	            });
	          });

	          bindOnce(syncConfigToOtherBtn, () => {
            if (!syncConfigToOtherBtn) return;
            syncConfigToOtherBtn.addEventListener('click', () => {
              if (!syncConfigToOtherPicker || !syncConfigToOtherSelect) return;
              const currentlyHidden = syncConfigToOtherPicker.classList.contains('hidden');
              if (!currentlyHidden) {
                hideSyncConfigToOtherPicker();
                return;
              }
              renderSyncConfigToOtherTargets();
              syncConfigToOtherPicker.classList.remove('hidden');
            });
          });

          bindOnce(syncConfigToOtherSelect, () => {
            if (!syncConfigToOtherSelect) return;
            syncConfigToOtherSelect.addEventListener('change', () => {
              const v = String(syncConfigToOtherSelect.value || '');
              if (syncConfigToOtherConfirm) syncConfigToOtherConfirm.disabled = !v;
              setSyncConfigToOtherStatus('');
            });
          });

          bindOnce(syncConfigToOtherCancel, () => {
            if (!syncConfigToOtherCancel) return;
            syncConfigToOtherCancel.addEventListener('click', () => {
              hideSyncConfigToOtherPicker();
            });
          });

          bindOnce(syncConfigToOtherConfirm, () => {
            if (!syncConfigToOtherConfirm) return;
            syncConfigToOtherConfirm.addEventListener('click', async () => {
              if (!syncConfigToOtherSelect) return;
              const key = String(syncConfigToOtherSelect.value || '');
              const server = (catPawOpenServers || []).find((s) => s && s.name === key);
              if (!server) return;
              const apiBase = server.apiBase || '';
              const payload = buildCatPawOpenRemoteSettingsPayload();

              const prevDisabled = {
                btn: !!(syncConfigToOtherBtn && syncConfigToOtherBtn.disabled),
                select: !!(syncConfigToOtherSelect && syncConfigToOtherSelect.disabled),
                ok: !!syncConfigToOtherConfirm.disabled,
                cancel: !!(syncConfigToOtherCancel && syncConfigToOtherCancel.disabled),
              };

              try {
                if (syncConfigToOtherBtn) syncConfigToOtherBtn.disabled = true;
                if (syncConfigToOtherSelect) syncConfigToOtherSelect.disabled = true;
                if (syncConfigToOtherConfirm) syncConfigToOtherConfirm.disabled = true;
                if (syncConfigToOtherCancel) syncConfigToOtherCancel.disabled = true;
                setSyncConfigToOtherStatus('同步中...');

                await requestCatPawOpenAdminJson({
                  apiBase,
                  path: 'admin/settings',
                  method: 'PUT',
                  body: payload,
                  timeoutMs: 12000,
                });

                setSyncConfigToOtherStatus('同步成功');
                setTimeout(() => {
                  hideSyncConfigToOtherPicker();
                }, 800);
              } catch (e) {
                const msg = e && e.message ? String(e.message) : '同步失败';
                setSyncConfigToOtherStatus(msg);
              } finally {
                if (syncConfigToOtherBtn) syncConfigToOtherBtn.disabled = prevDisabled.btn;
                if (syncConfigToOtherSelect) syncConfigToOtherSelect.disabled = prevDisabled.select;
                if (syncConfigToOtherConfirm) syncConfigToOtherConfirm.disabled = prevDisabled.ok || !String(syncConfigToOtherSelect.value || '');
                if (syncConfigToOtherCancel) syncConfigToOtherCancel.disabled = prevDisabled.cancel;
              }
            });
          });

          bindOnce(serverDeleteBtn, () => {
            serverDeleteBtn.addEventListener('click', async () => {
              const key = serverSelect ? String(serverSelect.value || '') : '';
              if (!key || key === '__new__') return;
              if (!catPawOpenServerDeleteConfirming) {
                setDeleteConfirming(true);
                syncDeleteButtonsVisibility();
                return;
              }

              if (!serverDeleteBtn || serverDeleteBtn.disabled) return;
              serverDeleteBtn.disabled = true;
              if (serverDeleteCancelBtn) serverDeleteCancelBtn.disabled = true;
              try {
                const { resp, data } = await postForm('/dashboard/catpawopen/delete', { catPawOpenServerKey: key });
                if (!(resp.ok && data && data.success)) {
                  setCatPawOpenSaveStatus('error', (data && data.message) || '删除失败');
                  setDeleteConfirming(false);
                  syncDeleteButtonsVisibility();
                  return;
                }

                catPawOpenServers = normalizeServers(data.servers);
                catPawOpenServerAddMode = false;
                setAddButtonLabel(false);
                setDeleteConfirming(false);

                renderServerOptions();
                if (catPawOpenServers.length) {
                  await selectServer(catPawOpenServers[0].name, { refreshRemote: true });
                } else {
                  if (nameInput) nameInput.value = '';
                  if (apiInput) apiInput.value = '';
                  catPawOpenSavedApiBaseNorm = '';
                  syncCatPawOpenSettingsVisibility();
                  setCatPawOpenRemoteState('hidden');
                  syncServerEditorVisibility();
                }
                syncDeleteButtonsVisibility();
                setCatPawOpenSaveStatus('success', '删除成功');
                clearStatusLater(setCatPawOpenSaveStatus, 1200);
              } catch (_e) {
                setCatPawOpenSaveStatus('error', '删除失败');
                setDeleteConfirming(false);
                syncDeleteButtonsVisibility();
              } finally {
                serverDeleteBtn.disabled = false;
                if (serverDeleteCancelBtn) serverDeleteCancelBtn.disabled = false;
              }
            });
          });

          bindOnce(serverDeleteCancelBtn, () => {
            serverDeleteCancelBtn.addEventListener('click', () => {
              setDeleteConfirming(false);
              syncDeleteButtonsVisibility();
            });
          });

        if (goProxyEnabledInput) goProxyEnabledInput.checked = !!settings.goProxyEnabled;
        if (goProxyAutoSelectInput) goProxyAutoSelectInput.checked = !!settings.goProxyAutoSelect;
        const parsedServers = normalizeGoProxyServers(
          safeParseJsonArray(settings.goProxyServersJson || settings.goProxyServers || '[]')
        );
        goProxyServers = parsedServers;
        goProxyServers.forEach((s) => ensureGoProxyProbeEntry(s && s.base));
        writeGoProxyServersJson();
        renderGoProxyServerTable();
        probeAllGoProxyVersions().catch(() => {});
	      }
	      panelLoaded.interface = true;
    } finally {
      panelLoading.interface = false;
    }
  };

  const siteForm = document.getElementById('siteSettingsForm');
  const saveStatus = document.getElementById('saveStatus');
  const setSiteSaveStatus = bindInlineStatus(saveStatus);
  bindOnce(siteForm, () => {
    siteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await withDatasetLock(siteForm, 'pending', async () => {
        setSiteSaveStatus('', '保存中...');
        try {
          const { resp, data } = await postForm(siteForm.action, formToFields(siteForm));
          if (resp.ok && data && data.success) setSiteSaveStatus('success', '保存成功');
          else setSiteSaveStatus('error', (data && data.message) || '保存失败');
        } catch (_err) {
          setSiteSaveStatus('error', '保存失败');
        }
      });
    });
  });

	  const catPawOpenForm = document.getElementById('catPawOpenSettingsForm');
	  const catPawOpenSaveStatus = document.getElementById('catPawOpenSaveStatus');
	  const setCatPawOpenSaveStatus = bindInlineStatus(catPawOpenSaveStatus);
	  const setCatPawOpenSaveStatusHtml = bindInlineStatusHtml(catPawOpenSaveStatus);
	  bindOnce(catPawOpenForm, () => {
    const apiInput = catPawOpenForm ? catPawOpenForm.querySelector('input[name="catPawOpenApiBase"]') : null;
    const nameInput = catPawOpenForm ? catPawOpenForm.querySelector('input[name="catPawOpenName"]') : null;
	    const serverSelect = document.getElementById('catPawOpenServerSelect');
	    const serverAddBtn = document.getElementById('catPawOpenServerAdd');
	    const serverAddCancelBottomBtn = document.getElementById('catPawOpenServerAddCancelBottom');
	    catPawOpenConfigListEditor = initCatPawOpenConfigListEditor();
	    const syncSaveInput = document.getElementById('catPawOpenSyncSave');

    catPawOpenSavedApiBaseNorm = normalizeCatPawOpenAdminBase(
      apiInput && typeof apiInput.value === 'string' ? apiInput.value : ''
    );
    syncCatPawOpenSettingsVisibility();
    if (apiInput) {
      apiInput.addEventListener('input', () => {
        syncCatPawOpenSettingsVisibility();
      });
	    }

	    const submitBtn = catPawOpenForm ? catPawOpenForm.querySelector('button[type="submit"]') : null;
	    const submitBtnOriginalHtml = submitBtn ? submitBtn.innerHTML : '';
	    let submitBtnLoading = false;
	    const getSubmitLabelHtml = () => (catPawOpenServerAddMode ? '添加' : submitBtnOriginalHtml || '保存');
	    const setSubmitBtnLoading = (loading) => {
	      if (!submitBtn) return;
	      submitBtnLoading = !!loading;
	      if (loading) {
	        submitBtn.disabled = true;
	        submitBtn.innerHTML = `<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>`;
	      } else {
	        submitBtn.disabled = false;
	        submitBtn.innerHTML = getSubmitLabelHtml();
	      }
	    };

	    const syncServerAddModeButtons = () => {
	      if (serverAddCancelBottomBtn) {
	        serverAddCancelBottomBtn.classList.toggle('hidden', !catPawOpenServerAddMode);
	        serverAddCancelBottomBtn.disabled = false;
	      }
	      if (submitBtn && !submitBtnLoading) submitBtn.innerHTML = getSubmitLabelHtml();
	    };

	    syncCatPawOpenServerAddModeButtons = syncServerAddModeButtons;
	    syncServerAddModeButtons();

	    bindOnce(serverAddCancelBottomBtn, () => {
	      serverAddCancelBottomBtn.addEventListener('click', async () => {
	        if (!catPawOpenServerAddMode) return;
	        if (serverSelect && serverSelect.value) {
	          // ensure custom dropdown highlights are not stuck
	          try {
	            serverSelect.blur();
	          } catch (_e) {}
	        }
	        try {
	          await cancelCatPawOpenServerAddMode();
	        } catch (_e) {
	          if (serverAddBtn) serverAddBtn.click();
	        }
	      });
	    });

	    let checkingDotsTimer = null;
	    let restartDotsTimer = null;
    let restartPollTimer = null;
    let restartStartedAt = 0;
    let restartToken = 0;

    const stopRestartWatch = () => {
      restartToken += 1;
      if (checkingDotsTimer) clearInterval(checkingDotsTimer);
      if (restartDotsTimer) clearInterval(restartDotsTimer);
      if (restartPollTimer) clearInterval(restartPollTimer);
      checkingDotsTimer = null;
      restartDotsTimer = null;
      restartPollTimer = null;
      restartStartedAt = 0;
    };

    const renderCheckingStatus = ({ dots = 0, failed = false } = {}) => {
      const dotText = failed ? '' : '.'.repeat(Math.max(0, Math.min(3, dots)));
      const inner = failed
        ? `<span class="text-red-600">CatPawOpen检测配置异常</span>`
        : `<span class="text-gray-500 dark:text-gray-400">CatPawOpen检测配置中${dotText}</span>`;
      setCatPawOpenSaveStatusHtml('success', `保存成功(${inner})`);
    };

    const renderRestartingStatus = ({ dots = 0, failed = false } = {}) => {
      const dotText = failed ? '' : '.'.repeat(Math.max(0, Math.min(3, dots)));
      const inner = failed
        ? `<span class="text-red-600">Catpawopen启动异常</span>`
        : `<span class="text-gray-500 dark:text-gray-400">CatPawOpen重启中${dotText}</span>`;
      setCatPawOpenSaveStatusHtml('success', `保存成功(${inner})`);
    };

    const renderRestartDoneStatus = () => {
      setCatPawOpenSaveStatusHtml('success', `保存成功(<span class="text-gray-500 dark:text-gray-400">CatPawOpen重启完成</span>)`);
    };

    const startCheckingWatch = () => {
      const token = restartToken;
      if (checkingDotsTimer) clearInterval(checkingDotsTimer);
      let dots = 0;
      renderCheckingStatus({ dots, failed: false });
      checkingDotsTimer = setInterval(() => {
        if (token !== restartToken) return;
        dots = (dots + 1) % 4;
        renderCheckingStatus({ dots, failed: false });
      }, 500);
    };

    const startRestartWatch = (apiBase) => {
      stopRestartWatch();
      const token = restartToken;
      restartStartedAt = Date.now();

      let dots = 0;
      renderRestartingStatus({ dots, failed: false });
      restartDotsTimer = setInterval(() => {
        dots = (dots + 1) % 4;
        renderRestartingStatus({ dots, failed: false });
      }, 500);

      setTimeout(() => {
        if (token !== restartToken) return;
        const startPoll = () => {
          const checkOnce = async () => {
            if (token !== restartToken) return;
            const elapsed = Date.now() - restartStartedAt;
            if (elapsed > 60000) {
              stopRestartWatch();
              renderRestartingStatus({ failed: true });
              return;
            }
            try {
              await requestCatPawOpenAdminJson({
                apiBase,
                path: 'admin/settings',
                method: 'GET',
                timeoutMs: 4000,
              });
              stopRestartWatch();
              renderRestartDoneStatus();
            } catch (_e) {
              // keep polling
            }
          };
          checkOnce();
          restartPollTimer = setInterval(checkOnce, 2000);
        };
        startPoll();
      }, 1000);
    };

    const syncPanLoginBtn = document.getElementById('catPawOpenSyncPanLoginSettingsBtn');
    const syncPanLoginStatus = document.getElementById('catPawOpenSyncPanLoginSettingsStatus');
    const setSyncPanLoginStatus = bindInlineStatus(syncPanLoginStatus);
    bindOnce(syncPanLoginBtn, () => {
      syncPanLoginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await withDatasetLock(syncPanLoginBtn, 'pending', async () => {
          setSyncPanLoginStatus('', '同步中...');
          try {
            const sync = await syncAllPanLoginSettingsToCatPawOpen();
            if (sync && sync.ok === false && sync.skipped === true && sync.reason === 'unconfigured') {
              setSyncPanLoginStatus('error', 'CatPawOpen 接口地址未设置');
              return;
            }

            const okCount = sync && typeof sync.okCount === 'number' ? sync.okCount : 0;
            const failCount = sync && typeof sync.failCount === 'number' ? sync.failCount : 0;

            if (sync && sync.ok === false) {
              setSyncPanLoginStatus('error', `同步完成：成功 ${okCount}，失败 ${failCount}`);
              return;
            }
            if (!okCount && !failCount) {
              setSyncPanLoginStatus('success', '无可同步账号');
              setTimeout(() => setSyncPanLoginStatus('', ''), 1200);
              return;
            }
            if (failCount > 0) {
              setSyncPanLoginStatus('error', `同步完成：成功 ${okCount}，失败 ${failCount}`);
              return;
            }
            setSyncPanLoginStatus('success', `同步完成：成功 ${okCount}`);
            setTimeout(() => setSyncPanLoginStatus('', ''), 1200);
          } catch (_err) {
            setSyncPanLoginStatus('error', '同步失败');
          }
        });
      });
    });

    catPawOpenForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await withDatasetLock(catPawOpenForm, 'pending', async () => {
        stopRestartWatch();
        setSubmitBtnLoading(true);
        setCatPawOpenSaveStatus('', '保存中...');
        try {
          const selectedServerKeyBefore = serverSelect ? String(serverSelect.value || '') : '';
          const isAddingServer = catPawOpenServerAddMode || selectedServerKeyBefore === '__new__';
          const syncFromSelect = document.getElementById('catPawOpenSyncFromServerSelect');
          const syncFromKey = syncFromSelect ? String(syncFromSelect.value || '') : '';
          const apiBaseRaw = apiInput && typeof apiInput.value === 'string' ? apiInput.value : '';
          const normalizedBase = normalizeCatPawOpenAdminBase(apiBaseRaw);
          const savedBaseBefore = catPawOpenSavedApiBaseNorm;
          const baseChanged = normalizedBase !== savedBaseBefore;
          const wantsSyncSave = !!(syncSaveInput && syncSaveInput.checked) && !isAddingServer;

          const { resp, data } = await postForm(catPawOpenForm.action, formToFields(catPawOpenForm));
          if (!(resp.ok && data && data.success)) {
            setCatPawOpenSaveStatus('error', (data && data.message) || '保存失败');
            return;
          }
          // "保存成功" only indicates the dashboard setting was persisted.
          setCatPawOpenSaveStatus('success', '保存成功');

          // If we were adding a server, update the dropdown immediately to the saved name.
          if (serverSelect && nameInput) {
            const savedName = String(nameInput.value || '').trim();
            const savedApi = normalizedBase || normalizeCatPawOpenAdminBase(apiInput && apiInput.value ? apiInput.value : '');
            const rebuildServerOptions = (selectedKey) => {
              if (!serverSelect) return;
              serverSelect.innerHTML = '';
              if (!catPawOpenServers.length) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.disabled = true;
                opt.selected = true;
                opt.textContent = '暂无数据';
                serverSelect.appendChild(opt);
                remountCustomSelectElement(serverSelect);
                return;
              }
              catPawOpenServers.forEach((s) => {
                const opt = document.createElement('option');
                opt.value = s.name;
                opt.textContent = s.name;
                serverSelect.appendChild(opt);
              });
              serverSelect.value = selectedKey || (catPawOpenServers[0] ? catPawOpenServers[0].name : '');
              remountCustomSelectElement(serverSelect);
            };

            if (isAddingServer && savedName) {
              catPawOpenServerAddMode = false;
              if (serverAddBtn) serverAddBtn.textContent = '添加服务器';

              const entry = { name: savedName, apiBase: savedApi || '' };
              const next = Array.isArray(catPawOpenServers) ? catPawOpenServers.slice() : [];
              const existsIdx = next.findIndex((s) => s && s.name === savedName);
              if (existsIdx >= 0) next[existsIdx] = entry;
              else next.push(entry);
              catPawOpenServers = next;

              rebuildServerOptions(savedName);

              const extrasEl = document.getElementById('catPawOpenSettingsExtras');
              if (extrasEl) extrasEl.classList.remove('hidden');
              if (syncSaveInput) syncSaveInput.disabled = false;
            } else if (!isAddingServer && savedName) {
              const next = Array.isArray(catPawOpenServers) ? catPawOpenServers.slice() : [];
              const idx = next.findIndex((s) => s && s.name === selectedServerKeyBefore);
              if (idx >= 0) next[idx] = { name: savedName, apiBase: savedApi || '' };
              catPawOpenServers = next;

              rebuildServerOptions(savedName);
            }
          }

          // If API base changed, hide previous remote block immediately and only show it again after the new server responds.
          if (baseChanged) {
            setCatPawOpenRemoteState('hidden');
          }

          if (!normalizedBase) {
            await refreshCatPawOpenRemoteSettings(apiBaseRaw);
            return;
          }

          if (apiInput) apiInput.value = normalizedBase;
          catPawOpenSavedApiBaseNorm = normalizedBase;
          syncCatPawOpenSettingsVisibility();

          if ((isAddingServer || baseChanged) && syncFromKey) {
            const resolveSourceApiBase = () => {
              if (syncFromKey === '__current__') return savedBaseBefore;
              const s = (catPawOpenServers || []).find((it) => it && it.name === syncFromKey);
              return s && typeof s.apiBase === 'string' ? s.apiBase : '';
            };
            const sourceBase = normalizeCatPawOpenAdminBase(resolveSourceApiBase());
            if (!sourceBase) {
              setCatPawOpenSaveStatus('error', '同步来源服务器无效（已保存）');
            } else {
              try {
                const sourceSettings = await requestCatPawOpenAdminJson({
                  apiBase: sourceBase,
                  path: 'admin/settings',
                  method: 'GET',
                  timeoutMs: 8000,
                });
                const proxy =
                  sourceSettings && sourceSettings.settings && typeof sourceSettings.settings.proxy === 'string'
                    ? sourceSettings.settings.proxy
                    : '';
                const goProxyApi =
                  sourceSettings && sourceSettings.settings && typeof sourceSettings.settings.goProxyApi === 'string'
                    ? sourceSettings.settings.goProxyApi
                    : '';
                const panBuiltinResolverEnabled = !!(
                  sourceSettings &&
                  sourceSettings.settings &&
                  sourceSettings.settings.panBuiltinResolverEnabled
                );
                const onlineConfigs = Array.isArray(sourceSettings && sourceSettings.onlineConfigs)
                  ? sourceSettings.onlineConfigs
                      .map((it) => ({
                        name: it && typeof it.name === 'string' ? it.name : '',
                        url: it && typeof it.url === 'string' ? it.url : '',
                      }))
                      .filter((it) => it && it.name && it.url)
                  : [];

                await requestCatPawOpenAdminJson({
                  apiBase: normalizedBase,
                  path: 'admin/settings',
                  method: 'PUT',
                  timeoutMs: 12000,
                  body: {
                    proxy: String(proxy || ''),
                    panBuiltinResolverEnabled,
                    goProxyApi: String(goProxyApi || ''),
                    onlineConfigs,
                  },
                });

                await refreshCatPawOpenRemoteSettings(normalizedBase);
                setCatPawOpenSaveStatus('success', '保存成功');
                return;
              } catch (err) {
                const msg = err && err.message ? String(err.message) : '同步失败';
                setCatPawOpenSaveStatus('error', `${msg}（已保存）`);
              }
            }
          }

          if (baseChanged && !wantsSyncSave) {
            await refreshCatPawOpenRemoteSettings(normalizedBase);
            return;
          }

          if (baseChanged && wantsSyncSave) {
            try {
              await requestCatPawOpenAdminJson({
                apiBase: normalizedBase,
                path: 'admin/settings',
                method: 'GET',
                timeoutMs: 4000,
              });
              setCatPawOpenRemoteState('ready');
            } catch (err) {
              const msg = err && err.message ? String(err.message) : 'CatPawOpen 接口异常';
              setCatPawOpenRemoteState('error', msg);
              return;
            }
          }

          if (!baseChanged) {
            const remoteSettingsEl = document.getElementById('catPawOpenRemoteSettings');
            const canSync = !!(remoteSettingsEl && !remoteSettingsEl.classList.contains('hidden'));
            if (!canSync) {
              await refreshCatPawOpenRemoteSettings(normalizedBase);
              return;
            }
          }

          if (catPawOpenConfigListEditor && typeof catPawOpenConfigListEditor.setCheckingAll === 'function') {
            catPawOpenConfigListEditor.setCheckingAll();
          }
          startCheckingWatch();
          const sync = await syncCatPawOpenRemoteSettings(normalizedBase);
          if (checkingDotsTimer) {
            clearInterval(checkingDotsTimer);
            checkingDotsTimer = null;
          }
          if (sync && sync.ok === false) {
            renderCheckingStatus({ failed: true });
            return;
          }
          setCatPawOpenSaveStatus('success', '保存成功');
        } catch (_err) {
          stopRestartWatch();
          setCatPawOpenSaveStatus('error', '保存失败');
        } finally {
          setSubmitBtnLoading(false);
        }
      });
    });
  });

  bindOnce(goProxySettingsForm, () => {
    if (goProxyServerEditor && !goProxyServerEditorHomeParent) {
      goProxyServerEditorHomeParent = goProxyServerEditor.parentNode;
      goProxyServerEditorHomeNextSibling = goProxyServerEditor.nextSibling;
    }

    const setEditorStatus = bindInlineStatus(goProxyServerEditorStatus);

    const setEditorConfirmEnabled = (enabled) => {
      if (!goProxyServerEditorConfirm) return;
      goProxyServerEditorConfirm.disabled = !enabled;
      if (enabled) {
        goProxyServerEditorConfirm.classList.add('btn-green');
        goProxyServerEditorConfirm.classList.remove('btn-add');
      } else {
        goProxyServerEditorConfirm.classList.add('btn-add');
        goProxyServerEditorConfirm.classList.remove('btn-green');
      }
    };

    const hideEditor = () => {
      restoreGoProxyServerEditorHome();
      goProxyEditorMode = 'hidden';
      goProxyEditorEditingKey = '';
      if (goProxyServerEditor) goProxyServerEditor.classList.add('hidden');
      if (goProxyServerEditorName) goProxyServerEditorName.value = '';
      if (goProxyServerEditorDisplayName) goProxyServerEditorDisplayName.value = '';
      if (goProxyServerEditorBase) goProxyServerEditorBase.value = '';
      setEditorStatus('', '');
      setEditorConfirmEnabled(false);
      if (goProxyServerAdd) goProxyServerAdd.textContent = '添加';
      if (goProxyServerEditorConfirm) goProxyServerEditorConfirm.textContent = '添加';
    };

    const showEditorAdd = () => {
      restoreGoProxyServerEditorHome();
      goProxyEditorMode = 'add';
      goProxyEditorEditingKey = '';
      if (goProxyServerEditor) goProxyServerEditor.classList.remove('hidden');
      if (goProxyServerEditorName) goProxyServerEditorName.value = '';
      if (goProxyServerEditorDisplayName) goProxyServerEditorDisplayName.value = '';
      if (goProxyServerEditorBase) goProxyServerEditorBase.value = '';
      setEditorStatus('', '');
      setEditorConfirmEnabled(false);
      if (goProxyServerAdd) goProxyServerAdd.textContent = '取消';
      if (goProxyServerEditorConfirm) goProxyServerEditorConfirm.textContent = '添加';
      try {
        if (goProxyServerEditorName) goProxyServerEditorName.focus();
      } catch (_e) {}
    };

    const showEditorEdit = (server) => {
      const base = server && typeof server.base === 'string' ? server.base : '';
      const key = base ? base.toLowerCase() : '';
      if (!key) return;
      goProxyEditorMode = 'edit';
      goProxyEditorEditingKey = key;
      if (goProxyServerEditor) goProxyServerEditor.classList.remove('hidden');
      if (goProxyServerEditorName) goProxyServerEditorName.value = String(server.name || '');
      if (goProxyServerEditorDisplayName) goProxyServerEditorDisplayName.value = String(server.displayName || '');
      if (goProxyServerEditorBase) goProxyServerEditorBase.value = String(server.base || '');
      setEditorStatus('', '');
      if (goProxyServerAdd) goProxyServerAdd.textContent = '添加';
      if (goProxyServerEditorConfirm) goProxyServerEditorConfirm.textContent = '确定';
      syncEditorConfirmState();
      renderGoProxyServerTable();
      try {
        if (goProxyServerEditorName) goProxyServerEditorName.focus();
      } catch (_e) {}
    };

    const getEditorDraft = () => {
      const name = goProxyServerEditorName ? String(goProxyServerEditorName.value || '').trim() : '';
      const displayName = goProxyServerEditorDisplayName ? String(goProxyServerEditorDisplayName.value || '').trim() : '';
      const baseRaw = goProxyServerEditorBase ? String(goProxyServerEditorBase.value || '').trim() : '';
      const base = normalizeHttpBase(baseRaw);
      return { name, displayName, baseRaw, base };
    };

    const validateEditorDraft = (draft) => {
      if (!draft.name) return { ok: false, message: '' };
      if (!draft.base) return { ok: false, message: '' };
      return { ok: true, message: '' };
    };

    const syncEditorConfirmState = () => {
      if (!goProxyServerEditorConfirm) return;
      const draft = getEditorDraft();
      const v = validateEditorDraft(draft);
      setEditorConfirmEnabled(!!v.ok);
    };

    if (goProxyServerEditorName) goProxyServerEditorName.addEventListener('input', () => {
      setEditorStatus('', '');
      syncEditorConfirmState();
    });
    if (goProxyServerEditorDisplayName) goProxyServerEditorDisplayName.addEventListener('input', () => {
      setEditorStatus('', '');
      syncEditorConfirmState();
    });
    if (goProxyServerEditorBase) goProxyServerEditorBase.addEventListener('input', () => {
      setEditorStatus('', '');
      syncEditorConfirmState();
    });

    if (goProxyServerAdd) {
      goProxyServerAdd.addEventListener('click', () => {
        if (goProxyEditorMode === 'add') {
          hideEditor();
          renderGoProxyServerTable();
          return;
        }
        showEditorAdd();
      });
    }

    if (goProxyServerEditorCancel) {
      goProxyServerEditorCancel.addEventListener('click', () => {
        hideEditor();
        renderGoProxyServerTable();
      });
    }

    const findServerIndexByBaseKey = (baseKey) => {
      const key = String(baseKey || '').toLowerCase();
      if (!key) return -1;
      return goProxyServers.findIndex((s) => (s && typeof s.base === 'string' ? s.base.toLowerCase() : '') === key);
    };

    const isBaseTaken = (baseKey, { exceptKey = '' } = {}) => {
      const key = String(baseKey || '').toLowerCase();
      if (!key) return false;
      const ex = String(exceptKey || '').toLowerCase();
      return goProxyServers.some((s) => {
        const b = s && typeof s.base === 'string' ? s.base.toLowerCase() : '';
        if (!b) return false;
        if (ex && b === ex) return false;
        return b === key;
      });
    };

    if (goProxyServerEditorConfirm) {
      goProxyServerEditorConfirm.addEventListener('click', async () => {
        const draft = getEditorDraft();
        if (!draft.name) {
          setEditorStatus('error', '名称不能为空');
          return;
        }
        if (!draft.base) {
          setEditorStatus('error', '接口地址不是合法 URL');
          return;
        }

        const baseKey = draft.base.toLowerCase();
        const displayName = draft.displayName || draft.name;

        if (goProxyEditorMode === 'add') {
          if (isBaseTaken(baseKey)) {
            setEditorStatus('error', '服务器已存在');
            return;
          }
          goProxyServers = normalizeGoProxyServers(
            goProxyServers.concat([{ name: draft.name, displayName, base: draft.base, pans: { baidu: true, quark: true } }])
          );
          ensureGoProxyProbeEntry(draft.base);
          writeGoProxyServersJson();
          hideEditor();
          renderGoProxyServerTable();
          probeGoProxyVersion(draft.base, { timeoutMs: 4000 }).catch(() => {});
          return;
        }

        if (goProxyEditorMode === 'edit') {
          const idx = findServerIndexByBaseKey(goProxyEditorEditingKey);
          if (idx < 0) {
            hideEditor();
            return;
          }
          if (isBaseTaken(baseKey, { exceptKey: goProxyEditorEditingKey })) {
            setEditorStatus('error', '接口地址已被占用');
            return;
          }
          const prev = goProxyServers[idx];
          const next = goProxyServers.slice();
          next[idx] = {
            name: draft.name,
            displayName,
            base: draft.base,
            pans: prev && prev.pans ? prev.pans : { baidu: true, quark: true },
          };
          goProxyServers = normalizeGoProxyServers(next);
          ensureGoProxyProbeEntry(draft.base);
          writeGoProxyServersJson();
          hideEditor();
          renderGoProxyServerTable();
          probeGoProxyVersion(draft.base, { timeoutMs: 4000 }).catch(() => {});
        }
      });
    }

    if (goProxyServerTableBody) {
      goProxyServerTableBody.addEventListener('click', (e) => {
        const target = e && e.target && e.target.closest ? e.target.closest('button[data-goproxy-action]') : null;
        if (!target) return;
        const action = String(target.getAttribute('data-goproxy-action') || '');
        const base = String(target.getAttribute('data-goproxy-base') || '');
        const baseKey = base ? base.toLowerCase() : '';
        if (!baseKey) return;
        if (action === 'cancel') {
          if (goProxyEditorMode === 'edit' && goProxyEditorEditingKey === baseKey) {
            hideEditor();
            renderGoProxyServerTable();
          }
          return;
        }
        if (action === 'delete') {
          goProxyServers = goProxyServers.filter((s) => (s && s.base ? s.base.toLowerCase() : '') !== baseKey);
          goProxyProbes.delete(baseKey);
          if (goProxyEditorMode === 'edit' && goProxyEditorEditingKey === baseKey) hideEditor();
          writeGoProxyServersJson();
          renderGoProxyServerTable();
          return;
        }
        if (action === 'edit') {
          const idx = findServerIndexByBaseKey(baseKey);
          if (idx < 0) return;
          showEditorEdit(goProxyServers[idx]);
        }
      });

      goProxyServerTableBody.addEventListener('change', (e) => {
        const input = e && e.target && e.target.closest ? e.target.closest('input[type="checkbox"][data-goproxy-pan]') : null;
        if (!input) return;
        const panKey = String(input.getAttribute('data-goproxy-pan') || '').trim();
        const base = String(input.getAttribute('data-goproxy-base') || '');
        const baseKey = base ? base.toLowerCase() : '';
        if (!panKey || !baseKey) return;
        const idx = findServerIndexByBaseKey(baseKey);
        if (idx < 0) return;
        const next = goProxyServers.slice();
        const prev = next[idx] || {};
        const prevPans = prev && typeof prev.pans === 'object' && prev.pans ? prev.pans : { baidu: true, quark: true };
        next[idx] = { ...prev, pans: { ...prevPans, [panKey]: !!input.checked } };
        goProxyServers = normalizeGoProxyServers(next);
        writeGoProxyServersJson();
      });
    }

	    goProxySettingsForm.addEventListener('submit', async (e) => {
	      e.preventDefault();
	      if (goProxySaving) return;
	      goProxySaving = true;
	      setGoProxyStatus('', '保存中...');
	      try {
        const serversJson = writeGoProxyServersJson();
        const { resp, data } = await postForm(goProxySettingsForm.action, {
          goProxyEnabled: goProxyEnabledInput && goProxyEnabledInput.checked ? '1' : '0',
          goProxyAutoSelect: goProxyAutoSelectInput && goProxyAutoSelectInput.checked ? '1' : '0',
          goProxyServersJson: serversJson,
        });
        if (resp.ok && data && data.success) {
          setGoProxyStatus('success', '保存成功');
        } else {
          setGoProxyStatus('error', (data && data.message) || '保存失败');
        }
	      } catch (_e) {
        setGoProxyStatus('error', '保存失败');
      } finally {
        goProxySaving = false;
      }
    });

    renderGoProxyServerTable();
    if (goProxyServerEditor && !goProxyServerEditor.classList.contains('hidden') && goProxyEditorMode === 'hidden') {
      hideEditor();
    }
  });


  const videoSourceSaveStatus = document.getElementById('videoSourceSaveStatus');
  const setVideoSourceSaveStatus = bindInlineStatus(videoSourceSaveStatus);

  const importVideoSourceSitesFromCatPawOpen = async () => {
    const apiBase = await resolveCatPawOpenApiBase();
    const normalizedBase = normalizeCatPawOpenAdminBase(apiBase);
    if (!normalizedBase) {
      setVideoSourceSaveStatus('error', 'CatPawOpen 接口地址未设置');
      return;
    }
    setVideoSourceSaveStatus('', '导入中...');
    try {
	      const fullConfig = await requestCatPawOpenAdminJson({
	        apiBase: normalizedBase,
	        path: 'admin/full-config',
	        method: 'GET',
	      });
      const list = fullConfig && fullConfig.video && Array.isArray(fullConfig.video.sites) ? fullConfig.video.sites : [];
      const sitesPayload = list
        .map((s) => ({
          key: s && typeof s.key === 'string' ? s.key : '',
          name: s && typeof s.name === 'string' ? s.name : '',
          api: s && typeof s.api === 'string' ? s.api : '',
          type: s && typeof s.type === 'number' ? s.type : undefined,
        }))
        .filter((s) => s.key && s.api);
      if (!sitesPayload.length) {
        setVideoSourceSaveStatus('error', '未获取到站源');
        return;
      }
	      const { resp: r2, data: d2 } = await postForm('/dashboard/video/source/sites/import', {
	        sites: JSON.stringify(sitesPayload),
	      });
	      if (r2.ok && d2 && d2.success && Array.isArray(d2.sites)) {
	        if (d2 && typeof d2.coverSite === 'string') {
	          videoSourceCoverSite = String(d2.coverSite || '').trim();
	        }
	        // Mark special "skipped check" sources and `baseset` settings sources on import
          // so the UI doesn't keep showing "未检测".
	        try {
	          const sites = d2.sites || [];
	          const skippedKeys = sites
	            .filter((s) => s && typeof s.key === 'string' && shouldSkipVideoSourceCheck(s))
	            .map((s) => s.key)
	            .filter(Boolean);
            const basesetKeys = sites
              .filter(
                (s) =>
                  s &&
                  typeof s.key === 'string' &&
                  typeof s.api === 'string' &&
                  !shouldSkipVideoSourceCheck(s) &&
                  /^\/(?:[a-f0-9]{10}\/)?spider\/baseset(?:\/|$)/.test(s.api)
              )
              .map((s) => s.key)
              .filter(Boolean);

	          if (basesetKeys.length || skippedKeys.length) {
	            const results = {};
	            basesetKeys.forEach((k) => {
	              results[k] = 'valid';
	            });
	            skippedKeys.forEach((k) => {
	              results[k] = 'skipped';
	            });
	            const { resp: r3, data: d3 } = await postForm('/dashboard/video/source/sites/check', {
	              results: JSON.stringify(results),
	            });
	            if (r3.ok && d3 && d3.success && Array.isArray(d3.sites)) {
	              renderVideoSourceList(d3.sites);
	            } else {
	              renderVideoSourceList(d2.sites);
	            }
	          } else {
	            renderVideoSourceList(d2.sites);
	          }
	        } catch (_e) {
	          renderVideoSourceList(d2.sites);
	        }
	        setVideoSourceSaveStatus('success', '导入成功');
	        clearStatusLater(setVideoSourceSaveStatus, 1200);
	        return;
	      }
      setVideoSourceSaveStatus('error', (d2 && d2.message) || '导入失败');
    } catch (_e) {
      setVideoSourceSaveStatus('error', '导入失败');
    }
  };

  bindOnce(videoSourceImportFromCatPawOpenBtn, () => {
    videoSourceImportFromCatPawOpenBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await withDatasetLock(videoSourceImportFromCatPawOpenBtn, 'pending', async () => {
        videoSourceImportFromCatPawOpenBtn.disabled = true;
        videoSourceImportFromCatPawOpenBtn.classList.add('opacity-60', 'cursor-not-allowed');
        try {
          await importVideoSourceSitesFromCatPawOpen();
        } finally {
          videoSourceImportFromCatPawOpenBtn.disabled = false;
          videoSourceImportFromCatPawOpenBtn.classList.remove('opacity-60', 'cursor-not-allowed');
        }
      });
    });
  });

  const addUserBtn = document.getElementById('openAddUser');
  const addUserForm = document.getElementById('addUserForm');
  const addUserStatus = document.getElementById('addUserStatus');
  const addUserName = document.getElementById('addUserName');
  const addUserPassword = document.getElementById('addUserPassword');
  const addUserRole = document.getElementById('addUserRole');
  const addUserCatApiBase = document.getElementById('addUserCatApiBase');
  const addUserCatProxy = document.getElementById('addUserCatProxy');
  const confirmAddUser = document.getElementById('confirmAddUser');
  const userCountEl = document.getElementById('userCount');
  const userTableBody = document.getElementById('userTableBody');

  const clearEl = (el) => {
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
  };

  const tagSpan = (className, text) => createEl('span', { className, text });

  const renderTag = (cell, className, text) => {
    if (!cell) return;
    clearEl(cell);
    cell.appendChild(tagSpan(className, text));
  };

  const roleLabel = (role) => {
    if (role === 'admin') return { className: 'tag-yellow', text: '管理员' };
    if (role === 'shared') return { className: 'tag-green', text: '共享' };
    return { className: 'tag-gray', text: '用户' };
  };

  const renderRole = (cell, role) => {
    const { className, text } = roleLabel(role);
    renderTag(cell, className, text);
  };

  const renderConfigured = (cell, value, { whenSet, whenEmpty }) => {
    const has = typeof value === 'string' ? value.trim().length > 0 : !!value;
    const cls = has ? whenSet.className : whenEmpty.className;
    const text = has ? whenSet.text : whenEmpty.text;
    renderTag(cell, cls, text);
  };

  const refreshUserRowCells = (row) => {
    if (!row) return;
    const username = row.getAttribute('data-username') || '';
    const role = row.getAttribute('data-role') || 'user';
    const status = row.getAttribute('data-status') || 'active';
    const catApiBase = row.getAttribute('data-cat-api-base') || '';
    const catProxy = row.getAttribute('data-cat-proxy') || '';

    const nameCell = row.querySelector('td[data-col="username"]') || row.querySelector('td');
    if (nameCell) nameCell.textContent = username;

    renderRole(row.querySelector('td[data-col="role"]'), role);
    renderConfigured(row.querySelector('td[data-col="catApiBase"]'), catApiBase, {
      whenSet: { className: 'tag-green', text: '已设置' },
      whenEmpty: { className: 'tag-red', text: '未设置' },
    });
    renderConfigured(row.querySelector('td[data-col="catProxy"]'), catProxy, {
      whenSet: { className: 'tag-yellow', text: '已设置' },
      whenEmpty: { className: 'tag-green', text: '未设置' },
    });
    renderStatus(row.querySelector('td[data-col="status"]'), status);
  };

  const renderStatus = (cell, status) => {
    if (!cell) return;
    if (status === 'active') {
      renderTag(cell, 'tag-green', '正常');
    } else if (status === 'banned') {
      renderTag(cell, 'tag-red', '封禁');
    } else {
      renderTag(cell, 'tag-gray', status || '');
    }
  };

  const appendUserRow = (user) => {
    if (!userTableBody) return;
    const tr = document.createElement('tr');
    tr.setAttribute('data-username', user.username || '');
    tr.setAttribute('data-role', user.role || 'user');
    tr.setAttribute('data-status', user.status || 'active');
    tr.setAttribute('data-cat-api-base', user.cat_api_base || user.catApiBase || '');
    tr.setAttribute('data-cat-proxy', user.cat_proxy || user.catProxy || '');

    const tdUser = document.createElement('td');
    tdUser.className = 'px-3 py-2 font-semibold whitespace-nowrap';
    tdUser.setAttribute('data-col', 'username');
    tdUser.textContent = user.username || '';

    const tdRole = document.createElement('td');
    tdRole.className = 'px-3 py-2 whitespace-nowrap';
    tdRole.setAttribute('data-col', 'role');
    renderRole(tdRole, user.role || 'user');

    const tdStatus = document.createElement('td');
    tdStatus.className = 'px-3 py-2 whitespace-nowrap';
    tdStatus.setAttribute('data-col', 'status');
    renderStatus(tdStatus, user.status || 'active');

    const tdCatApi = document.createElement('td');
    tdCatApi.className = 'px-3 py-2 whitespace-nowrap';
    tdCatApi.setAttribute('data-col', 'catApiBase');
    renderConfigured(tdCatApi, tr.getAttribute('data-cat-api-base') || '', {
      whenSet: { className: 'tag-green', text: '已设置' },
      whenEmpty: { className: 'tag-red', text: '未设置' },
    });

    const tdCatProxy = document.createElement('td');
    tdCatProxy.className = 'px-3 py-2 whitespace-nowrap';
    tdCatProxy.setAttribute('data-col', 'catProxy');
    renderConfigured(tdCatProxy, tr.getAttribute('data-cat-proxy') || '', {
      whenSet: { className: 'tag-yellow', text: '已设置' },
      whenEmpty: { className: 'tag-green', text: '未设置' },
    });

    const tdActions = document.createElement('td');
    tdActions.className = 'px-3 py-2 whitespace-nowrap';
    const actionGroup = document.createElement('div');
    actionGroup.className = 'action-group';
    const makeBtn = (cls, action, text) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `action-btn ${cls}`;
      b.setAttribute('data-action', action);
      b.textContent = text;
      return b;
    };
    actionGroup.appendChild(makeBtn('blue', 'edit', '修改'));
    if (user.role !== 'admin') {
      const banText = user.status === 'active' ? '封禁' : '解封';
      actionGroup.appendChild(makeBtn('rose', 'ban', banText));
      actionGroup.appendChild(makeBtn('red', 'delete', '删除'));
    }
    tdActions.appendChild(actionGroup);

    tr.appendChild(tdUser);
    tr.appendChild(tdRole);
    tr.appendChild(tdCatApi);
    tr.appendChild(tdCatProxy);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    userTableBody.appendChild(tr);
  };

  const loadUserPanel = async () => {
    if (panelLoaded.user || panelLoading.user) return;
    if (!userTableBody) return;
    panelLoading.user = true;
    try {
      const data = await getSuccessJson('/dashboard/user/list');
      if (!(data && Array.isArray(data.users))) return;

      userTableBody.innerHTML = '';
      data.users.forEach((u) => appendUserRow(u || {}));
      if (userCountEl) {
        const count =
          typeof data.userCount === 'number'
            ? data.userCount
            : Array.isArray(data.users)
              ? data.users.length
              : 0;
        userCountEl.textContent = String(count);
      }
      panelLoaded.user = true;
    } finally {
      panelLoading.user = false;
    }
  };

  const fetchSiteSettings = async () => getSuccessJson('/dashboard/site/settings');

  const setInputValueByName = (name, value) => {
    const el = document.querySelector(`input[name="${name}"]`);
    if (!el) return;
    el.value = value != null ? String(value) : '';
  };

  const syncCustomSelectValue = (selectId, value) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.value = value != null ? String(value) : '';

    const wrapper = sel.parentNode;
    if (wrapper && wrapper.classList && wrapper.classList.contains('custom-dropdown')) {
      const btn = wrapper.querySelector('.custom-dropdown-btn');
      const list = wrapper.querySelector('.custom-dropdown-list');
      const opt = sel.options[sel.selectedIndex];
      if (btn) btn.textContent = (opt && opt.text) || '请选择';
      if (list) {
        list.querySelectorAll('.custom-dropdown-item').forEach((n) => {
          const v = n && n.dataset ? n.dataset.value : '';
          n.classList.toggle('active', v === sel.value);
        });
      }
    }

    sel.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const loadSitePanel = async () => {
    if (panelLoaded.site || panelLoading.site) return;
    panelLoading.site = true;
    try {
      const settings = await fetchSiteSettings();
      if (!settings) return;

      setInputValueByName('siteName', settings.siteName || '');
      setInputValueByName('doubanDataCustom', settings.doubanDataCustom || '');
      setInputValueByName('doubanImgCustom', settings.doubanImgCustom || '');
      syncCustomSelectValue('doubanDataSelect', settings.doubanDataProxy || 'direct');
      syncCustomSelectValue('doubanImgSelect', settings.doubanImgProxy || 'direct-browser');

      panelLoaded.site = true;
    } finally {
      panelLoading.site = false;
    }
  };

  // 魔法匹配：剧集列表清理规则 + 集数匹配规则
  let magicEpisodeRules = [];
  let magicEpisodeCleanRegexRules = [];
  let magicAggregateRegexRules = [];
  let smartSourcePriorityTokens = [];
  let smartPanMatchTokens = [];
  let smartPanExtractMode = 'rule-first';
  let magicSaving = false;

  const normalizeCommaTokenLine = (text) => {
    const raw = typeof text === 'string' ? text : String(text || '');
    if (!raw.trim()) return [];
    const normalized = raw.replaceAll('，', ',');
    const parts = normalized.split(',').map((x) => String(x || '').trim()).filter(Boolean);
    const seen = new Set();
    const out = [];
    parts.forEach((p) => {
      const key = p.toLowerCase();
      if (!key || seen.has(key)) return;
      seen.add(key);
      out.push(p);
    });
    return out;
  };

  const renderSmartPanSettings = () => {
    if (smartSourcePriorityTokensInput) {
      smartSourcePriorityTokensInput.value = Array.isArray(smartSourcePriorityTokens) ? smartSourcePriorityTokens.join(',') : '';
      smartSourcePriorityTokensInput.disabled = magicSaving;
    }
    if (smartPanMatchTokensInput) {
      smartPanMatchTokensInput.value = Array.isArray(smartPanMatchTokens) ? smartPanMatchTokens.join(',') : '';
      smartPanMatchTokensInput.disabled = magicSaving;
    }
    if (smartPanExtractModeSelect) {
      smartPanExtractModeSelect.value = smartPanExtractMode === 'pan-first' ? 'pan-first' : 'rule-first';
      smartPanExtractModeSelect.disabled = magicSaving;
    }
    if (smartPanSettingsSave) smartPanSettingsSave.disabled = magicSaving;
  };

  // Normalize common escapes from pasted regex strings (e.g. `\\d` -> `\d`).
  const normalizeRegexText = (text) => {
    const raw = typeof text === 'string' ? text : '';
    if (!raw) return '';
    return raw.replace(/\\\\(?=[dDsSwWbB.()[\]{}+*?^$|\\\-_/])/g, '\\');
  };

  const decodeEpisodeRule = (rule) => {
    const raw = typeof rule === 'string' ? rule.trim() : '';
    if (!raw) return null;
    if (raw.startsWith('{') && raw.endsWith('}')) {
      try {
        const obj = JSON.parse(raw);
        if (obj && typeof obj === 'object' && typeof obj.pattern === 'string' && obj.pattern.trim()) {
          return {
            pattern: normalizeRegexText(String(obj.pattern || '').trim()),
            replace: typeof obj.replace === 'string' ? obj.replace : '',
            flags: typeof obj.flags === 'string' ? obj.flags : '',
          };
        }
      } catch (_e) {}
    }
    if (raw.startsWith('/') && raw.lastIndexOf('/') > 0) {
      const last = raw.lastIndexOf('/');
      const pattern = raw.slice(1, last);
      const flags = raw.slice(last + 1);
      if (pattern.trim()) return { pattern: normalizeRegexText(pattern.trim()), replace: '', flags: flags || '' };
    }
    return { pattern: normalizeRegexText(raw), replace: '', flags: '' };
  };

  const encodeEpisodeRule = (rule) => {
    const patternRaw = rule && typeof rule.pattern === 'string' ? rule.pattern.trim() : '';
    const pattern = normalizeRegexText(patternRaw);
    if (!pattern) return '';
    const replace = rule && typeof rule.replace === 'string' ? rule.replace : '';
    const flags = rule && typeof rule.flags === 'string' ? rule.flags.trim() : '';
    const obj = { pattern, replace: replace || '' };
    if (flags) obj.flags = flags;
    try {
      return JSON.stringify(obj);
    } catch (_e) {
      return '';
    }
  };

  const normalizePatternInput = (text) => {
    const raw = typeof text === 'string' ? text.trim() : '';
    if (!raw) return null;
    if (raw.startsWith('/') && raw.lastIndexOf('/') > 0) {
      const last = raw.lastIndexOf('/');
      const pattern = normalizeRegexText(raw.slice(1, last).trim());
      const flags = raw.slice(last + 1).trim();
      if (!pattern) return null;
      return { pattern, flags };
    }
    return { pattern: normalizeRegexText(raw) };
  };

  const buildRegexFromInput = (raw, { defaultFlags = '', forceGlobal = false } = {}) => {
    const parsed = normalizePatternInput(raw);
    if (!parsed || !parsed.pattern) return null;
    const fRaw = typeof parsed.flags === 'string' ? parsed.flags : '';
    let flags = fRaw || (typeof defaultFlags === 'string' ? defaultFlags : '');
    if (forceGlobal && !flags.includes('g')) flags += 'g';
    try {
      return new RegExp(parsed.pattern, flags);
    } catch (_e) {
      return null;
    }
  };

  const normalizeAggregateRegexRuleInput = (text) => {
    const p = normalizePatternInput(text);
    if (!p || !p.pattern) return '';
    const flags = typeof p.flags === 'string' ? p.flags.trim() : '';
    if (flags) return `/${p.pattern}/${flags}`;
    return p.pattern;
  };

  const setMagicStatus = (el, type, text) => setInlineStatus(el, type, text);

  const setMagicTestOutput = bindInlineStatus(magicEpisodeRuleTestOutput);
  const setMagicAggregateTestOutput = bindInlineStatus(magicAggregateRuleTestOutput);

  const normalizeReplaceTemplate = (replaceRaw) => {
    const r = typeof replaceRaw === 'string' ? replaceRaw : '';
    return r ? r.replace(/\\(\d+)/g, '$$$1') : '';
  };

	  const runMagicEpisodeRuleTest = () => {
	    if (!magicEpisodeRuleTestInput) return;
	    const filename = (magicEpisodeRuleTestInput.value || '').trim();
	    if (!filename) {
	      setMagicTestOutput('', '请输入文件名');
      return;
    }
    const list = Array.isArray(magicEpisodeRules) ? magicEpisodeRules : [];
    if (!list.length) {
      setMagicTestOutput('error', '无匹配规则');
      return;
	    }
	
	    let cleaned = filename;
	    const cleanRules = Array.isArray(magicEpisodeCleanRegexRules) ? magicEpisodeCleanRegexRules : [];
	    cleanRules.forEach((r) => {
	      const raw = typeof r === 'string' ? r.trim() : '';
	      if (!raw) return;
	      const re = buildRegexFromInput(raw, { defaultFlags: 'g', forceGlobal: true });
	      if (!re) return;
	      cleaned = cleaned.replace(re, '');
	    });
	    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    const failures = [];
    for (let i = 0; i < list.length; i += 1) {
      const rule = list[i] && typeof list[i] === 'object' ? list[i] : null;
      const pattern = rule && typeof rule.pattern === 'string' ? rule.pattern.trim() : '';
      if (!pattern) continue;
      const flags = rule && typeof rule.flags === 'string' && rule.flags.trim() ? rule.flags.trim() : 'i';
      let re = null;
      try {
        re = new RegExp(pattern, flags);
      } catch (e) {
        failures.push(`#${i + 1} 正则无效`);
        continue;
      }
      if (!re.test(cleaned)) continue;
      const replace = normalizeReplaceTemplate(rule && typeof rule.replace === 'string' ? rule.replace : '');
      if (!replace) {
        setMagicTestOutput('success', `命中第 ${i + 1} 条：未设置 replace（无改写）`);
        return;
      }
      let out = '';
      try {
        out = cleaned.replace(re, replace);
      } catch (_e) {
        out = '';
      }
      if (!out) {
        setMagicTestOutput('error', `命中第 ${i + 1} 条，但改写失败`);
        return;
      }
      setMagicTestOutput('success', `命中第 ${i + 1} 条：${out}`);
      return;
    }

    if (failures.length) {
      setMagicTestOutput('error', `未命中（${failures.join('，')}）`);
      return;
    }
    setMagicTestOutput('error', '未命中');
  };

  const runMagicAggregateRuleTest = () => {
    if (!magicAggregateRuleTestInput) return;
    const raw = (magicAggregateRuleTestInput.value || '').trim();
    if (!raw) {
      setMagicAggregateTestOutput('', '请输入文本');
      return;
    }

    const regexRules = Array.isArray(magicAggregateRegexRules) ? magicAggregateRegexRules : [];
    if (!regexRules.length) {
      setMagicAggregateTestOutput('error', '无清洗规则');
      return;
    }

    let out = String(raw);

    const failures = [];
    regexRules.forEach((rule, idx) => {
      const s = typeof rule === 'string' ? rule.trim() : '';
      if (!s) return;
      try {
        const re = buildRegexFromInput(s, { defaultFlags: 'g', forceGlobal: true });
        if (!re) throw new Error('invalid');
        out = out.replace(re, '');
      } catch (_e) {
        failures.push(`#${idx + 1} 正则无效`);
      }
    });

    if (failures.length) {
      setMagicAggregateTestOutput('error', `清洗失败（${failures.join('，')}）`);
      return;
    }

    setMagicAggregateTestOutput('success', `清洗后：${out}`);
  };

  const fetchMagicSettings = async () => getSuccessJson('/dashboard/magic/settings');

	  const saveMagicSettings = async (episodeCleanRegexRules, episodeRules, aggregateRegexRules, smartSettings = {}) => {
	    const cleanRules = Array.isArray(episodeCleanRegexRules) ? episodeCleanRegexRules : [];
	    const { resp, data } = await postJsonSafe('/dashboard/magic/settings', {
	      episodeCleanRegex: cleanRules[0] || '',
	      episodeCleanRegexRules: cleanRules,
	      episodeRules,
	      aggregateRegexRules,
        smartSourcePriorityTokens: Array.isArray(smartSettings.smartSourcePriorityTokens) ? smartSettings.smartSourcePriorityTokens : [],
        smartPanMatchTokens: Array.isArray(smartSettings.smartPanMatchTokens) ? smartSettings.smartPanMatchTokens : [],
        smartPanExtractMode: typeof smartSettings.smartPanExtractMode === 'string' ? smartSettings.smartPanExtractMode : 'rule-first',
	    });
	    if (!resp.ok || !data || data.success !== true) {
	      throw new Error((data && data.message) || `HTTP ${resp.status}`);
    }
    return data;
  };

		  const renderMagicRuleList = (listEl, rules, kind) => {
		    if (!listEl) return;
		    listEl.innerHTML = '';
		    const list = Array.isArray(rules) ? rules : [];
		    if (!list.length) {
		      appendEmptyItem(listEl);
		      return;
		    }

		    list.forEach((rule, idx) => {
		      const li = createEl('li', { className: 'tv-row tv-row-fit' });
		      const seq = createEl('span', { className: CLS.mutedMonoXs, text: `${idx + 1}.` });

		      if (kind === 'episode') {
		        const r = rule && typeof rule === 'object' ? rule : { pattern: '', replace: '', flags: '' };

		        const inputs = createEl('div', { className: 'flex items-center gap-2 min-w-0' });
		        setStyles(inputs, { width: 'min(900px, 70vw)', maxWidth: '100%', minWidth: '240px' });

		        const patternInput = createEl('input', { className: 'tv-field min-w-0' });
		        setStyles(patternInput, { flex: '5 1 0', minWidth: '0' });
		        patternInput.value = typeof r.pattern === 'string' ? r.pattern : '';
	        patternInput.disabled = magicSaving;
	        patternInput.setAttribute('data-magic-kind', kind);
	        patternInput.setAttribute('data-magic-idx', String(idx));
	        patternInput.setAttribute('data-magic-field', 'pattern');

	        const replaceInput = createEl('input', { className: 'tv-field min-w-0' });
	        setStyles(replaceInput, { flex: '1 1 0', minWidth: '0' });
	        replaceInput.value = typeof r.replace === 'string' ? r.replace : '';
	        replaceInput.placeholder = 'replace（可空）';
	        replaceInput.disabled = magicSaving;
	        replaceInput.setAttribute('data-magic-kind', kind);
	        replaceInput.setAttribute('data-magic-idx', String(idx));
	        replaceInput.setAttribute('data-magic-field', 'replace');

	        inputs.appendChild(patternInput);
	        inputs.appendChild(replaceInput);
	        li.appendChild(seq);
		        li.appendChild(inputs);
		      } else {
		        const inputs = createEl('div', { className: 'min-w-0' });
		        setStyles(inputs, { width: 'min(900px, 70vw)', maxWidth: '100%', minWidth: '240px' });

		        const input = createEl('input', { className: 'tv-field min-w-0' });
		        input.value = typeof rule === 'string' ? rule : '';
		        input.disabled = magicSaving;
	        input.setAttribute('data-magic-kind', kind);
	        input.setAttribute('data-magic-idx', String(idx));
	        inputs.appendChild(input);

	        li.appendChild(seq);
	        li.appendChild(inputs);
	      }

	      if (kind === 'episode') {
	        const save = createEl('button', { className: 'action-btn green', text: '保存' });
	        save.type = 'button';
	        save.disabled = magicSaving;
	        save.setAttribute('data-magic-save', kind);
	        save.setAttribute('data-magic-idx', String(idx));
	        li.appendChild(save);
	      }

	      const del = createEl('button', { className: 'action-btn red', text: '删除' });
	      del.type = 'button';
	      del.disabled = magicSaving;
	      del.setAttribute('data-magic-del', kind);
	      del.setAttribute('data-magic-idx', String(idx));
	      li.appendChild(del);
	      listEl.appendChild(li);
	    });
	  };

	  const renderMagicPanels = () => {
	    renderMagicRuleList(magicEpisodeCleanRegexRuleList, magicEpisodeCleanRegexRules, 'episodeCleanRegex');
	    renderMagicRuleList(magicEpisodeRuleList, magicEpisodeRules, 'episode');
	    renderMagicRuleList(magicAggregateRegexRuleList, magicAggregateRegexRules, 'aggregateRegex');
      renderSmartPanSettings();
	    setMagicTestOutput('', '');
	    setMagicAggregateTestOutput('', '');
	  };

	  const persistMagic = async () => {
	    if (magicSaving) return;
	    magicSaving = true;
	    setMagicStatus(magicEpisodeCleanRegexRuleStatus, '', '保存中...');
	    setMagicStatus(magicEpisodeRuleStatus, '', '保存中...');
	    setMagicStatus(magicAggregateRegexRuleStatus, '', '保存中...');
      setMagicStatus(smartPanSettingsStatus, '', '保存中...');
	    try {
        smartSourcePriorityTokens = normalizeCommaTokenLine(smartSourcePriorityTokensInput ? smartSourcePriorityTokensInput.value : '');
        smartPanMatchTokens = normalizeCommaTokenLine(smartPanMatchTokensInput ? smartPanMatchTokensInput.value : '');
        smartPanExtractMode = smartPanExtractModeSelect && smartPanExtractModeSelect.value === 'pan-first' ? 'pan-first' : 'rule-first';

	      const episodeRulesForSave = (Array.isArray(magicEpisodeRules) ? magicEpisodeRules : [])
	        .map(encodeEpisodeRule)
	        .filter(Boolean);
	      const data = await saveMagicSettings(
	        magicEpisodeCleanRegexRules,
	        episodeRulesForSave,
	        Array.isArray(magicAggregateRegexRules) ? magicAggregateRegexRules : [],
          { smartSourcePriorityTokens, smartPanMatchTokens, smartPanExtractMode }
	      );
	      magicEpisodeCleanRegexRules = Array.isArray(data.episodeCleanRegexRules)
	        ? data.episodeCleanRegexRules
	        : typeof data.episodeCleanRegex === 'string' && data.episodeCleanRegex.trim()
	          ? [data.episodeCleanRegex.trim()]
	          : magicEpisodeCleanRegexRules;
	      magicEpisodeRules = Array.isArray(data.episodeRules)
	        ? data.episodeRules.map(decodeEpisodeRule).filter(Boolean)
	        : magicEpisodeRules;
      magicAggregateRegexRules = Array.isArray(data.aggregateRegexRules)
        ? data.aggregateRegexRules
        : magicAggregateRegexRules;
      smartSourcePriorityTokens = Array.isArray(data.smartSourcePriorityTokens) ? data.smartSourcePriorityTokens : smartSourcePriorityTokens;
      smartPanMatchTokens = Array.isArray(data.smartPanMatchTokens) ? data.smartPanMatchTokens : smartPanMatchTokens;
      smartPanExtractMode = typeof data.smartPanExtractMode === 'string' && data.smartPanExtractMode === 'pan-first' ? 'pan-first' : 'rule-first';
	      renderMagicPanels();
	      setMagicStatus(magicEpisodeCleanRegexRuleStatus, 'success', '已保存');
	      setMagicStatus(magicEpisodeRuleStatus, 'success', '已保存');
	      setMagicStatus(magicAggregateRegexRuleStatus, 'success', '已保存');
        setMagicStatus(smartPanSettingsStatus, 'success', '已保存');
	    } catch (err) {
	      const msg = (err && err.message) || '保存失败';
	      setMagicStatus(magicEpisodeCleanRegexRuleStatus, 'error', msg);
	      setMagicStatus(magicEpisodeRuleStatus, 'error', msg);
	      setMagicStatus(magicAggregateRegexRuleStatus, 'error', msg);
        setMagicStatus(smartPanSettingsStatus, 'error', msg);
	    } finally {
	      magicSaving = false;
      renderMagicPanels();
    }
  };

	  const loadMagicPanel = async () => {
	    if (panelLoaded.magic || panelLoading.magic) return;
	    if (!magicEpisodeRuleList && !magicAggregateRegexRuleList) return;
	    panelLoading.magic = true;
	    setMagicStatus(magicEpisodeCleanRegexRuleStatus, '', '加载中...');
	    setMagicStatus(magicEpisodeRuleStatus, '', '加载中...');
	    setMagicStatus(magicAggregateRegexRuleStatus, '', '加载中...');
      setMagicStatus(smartPanSettingsStatus, '', '加载中...');
	    try {
	      const data = await fetchMagicSettings();
	      if (!data) {
	        setMagicStatus(magicEpisodeCleanRegexRuleStatus, 'error', '加载失败');
	        setMagicStatus(magicEpisodeRuleStatus, 'error', '加载失败');
	        setMagicStatus(magicAggregateRegexRuleStatus, 'error', '加载失败');
          setMagicStatus(smartPanSettingsStatus, 'error', '加载失败');
	        return;
      }
	      magicEpisodeRules = Array.isArray(data.episodeRules)
	        ? data.episodeRules.map(decodeEpisodeRule).filter(Boolean)
	        : [];
	      magicEpisodeCleanRegexRules = Array.isArray(data.episodeCleanRegexRules)
	        ? data.episodeCleanRegexRules
	        : typeof data.episodeCleanRegex === 'string' && data.episodeCleanRegex.trim()
	          ? [data.episodeCleanRegex.trim()]
	          : [];
	      magicAggregateRegexRules = Array.isArray(data.aggregateRegexRules) ? data.aggregateRegexRules : [];
        smartSourcePriorityTokens = Array.isArray(data.smartSourcePriorityTokens) ? data.smartSourcePriorityTokens : [];
        smartPanMatchTokens = Array.isArray(data.smartPanMatchTokens) ? data.smartPanMatchTokens : [];
        smartPanExtractMode = typeof data.smartPanExtractMode === 'string' && data.smartPanExtractMode === 'pan-first' ? 'pan-first' : 'rule-first';
	      renderMagicPanels();
	      setMagicStatus(magicEpisodeCleanRegexRuleStatus, '', '');
	      setMagicStatus(magicEpisodeRuleStatus, '', '');
	      setMagicStatus(magicAggregateRegexRuleStatus, '', '');
        setMagicStatus(smartPanSettingsStatus, '', '');
	      panelLoaded.magic = true;
	    } finally {
      panelLoading.magic = false;
    }
  };

  if (magicEpisodeRuleAdd && magicEpisodeRulePatternInput && magicEpisodeRuleReplaceInput) {
    magicEpisodeRuleAdd.addEventListener('click', async () => {
      const p = normalizePatternInput(magicEpisodeRulePatternInput.value || '');
      if (!p) return;
      const replace = (magicEpisodeRuleReplaceInput.value || '').trim();
      magicEpisodeRulePatternInput.value = '';
      magicEpisodeRuleReplaceInput.value = '';
      magicEpisodeRules = (Array.isArray(magicEpisodeRules) ? magicEpisodeRules : []).concat([
        { pattern: p.pattern, replace, flags: p.flags || '' },
      ]);
      renderMagicPanels();
      await persistMagic();
    });
  }

  if (magicEpisodeRuleTestBtn) {
    magicEpisodeRuleTestBtn.addEventListener('click', () => runMagicEpisodeRuleTest());
  }
  if (magicEpisodeRuleTestInput) {
    magicEpisodeRuleTestInput.addEventListener('keydown', (e) => {
      if (!e) return;
      const key = e.key || '';
      if (key === 'Enter') {
        e.preventDefault();
        runMagicEpisodeRuleTest();
      }
    });
  }

	  if (magicEpisodeCleanRegexRuleAdd && magicEpisodeCleanRegexRuleInput) {
	    magicEpisodeCleanRegexRuleAdd.addEventListener('click', async () => {
	      const v = normalizeAggregateRegexRuleInput(magicEpisodeCleanRegexRuleInput.value || '');
	      if (!v) return;
	      magicEpisodeCleanRegexRuleInput.value = '';
	      magicEpisodeCleanRegexRules = (Array.isArray(magicEpisodeCleanRegexRules) ? magicEpisodeCleanRegexRules : []).concat([v]);
	      renderMagicPanels();
	      await persistMagic();
	    });
	  }

  if (magicAggregateRegexRuleAdd && magicAggregateRegexRuleInput) {
    magicAggregateRegexRuleAdd.addEventListener('click', async () => {
      const v = normalizeAggregateRegexRuleInput(magicAggregateRegexRuleInput.value || '');
      if (!v) return;
      magicAggregateRegexRuleInput.value = '';
      magicAggregateRegexRules = (Array.isArray(magicAggregateRegexRules) ? magicAggregateRegexRules : []).concat([v]);
      renderMagicPanels();
      await persistMagic();
    });
  }

  if (magicAggregateRuleTestBtn) {
    magicAggregateRuleTestBtn.addEventListener('click', () => runMagicAggregateRuleTest());
  }
  if (magicAggregateRuleTestInput) {
    magicAggregateRuleTestInput.addEventListener('keydown', (e) => {
      if (!e) return;
      const key = e.key || '';
      if (key === 'Enter') {
        e.preventDefault();
        runMagicAggregateRuleTest();
      }
    });
  }

  if (smartPanSettingsSave) {
    smartPanSettingsSave.addEventListener('click', async () => {
      if (magicSaving) return;
      renderMagicPanels();
      await persistMagic();
    });
  }
  const smartSettingsEnterToSave = (el) => {
    if (!el) return;
    el.addEventListener('keydown', (e) => {
      if (!e) return;
      const key = e.key || '';
      if (key === 'Enter') {
        e.preventDefault();
        if (!magicSaving) void persistMagic();
      }
    });
  };
  smartSettingsEnterToSave(smartSourcePriorityTokensInput);
  smartSettingsEnterToSave(smartPanMatchTokensInput);
  if (smartPanExtractModeSelect) smartPanExtractModeSelect.addEventListener('change', () => void persistMagic());

	  const onMagicListClick = async (e) => {
	    const target = e && e.target ? e.target : null;
	    const saveBtn = target && target.closest ? target.closest('button[data-magic-save][data-magic-idx]') : null;
	    if (saveBtn) {
	      if (magicSaving) return;
	      await persistMagic();
	      return;
	    }
	    const btn = target && target.closest ? target.closest('button[data-magic-del][data-magic-idx]') : null;
	    if (!btn) return;
	    const kind = (btn.getAttribute('data-magic-del') || '').trim();
	    const idx = Number(btn.getAttribute('data-magic-idx') || -1);
	    if (!Number.isFinite(idx) || idx < 0) return;
	    if (magicSaving) return;
	    if (kind === 'episodeCleanRegex')
	      magicEpisodeCleanRegexRules = magicEpisodeCleanRegexRules.filter((_r, i) => i !== idx);
	    if (kind === 'episode') magicEpisodeRules = magicEpisodeRules.filter((_r, i) => i !== idx);
	    if (kind === 'aggregateRegex') magicAggregateRegexRules = magicAggregateRegexRules.filter((_r, i) => i !== idx);
	    renderMagicPanels();
	    await persistMagic();
	  };

	  const onMagicListChange = async (e) => {
	    const target = e && e.target ? e.target : null;
	    const input = target && target.closest ? target.closest('input[data-magic-kind][data-magic-idx]') : null;
	    if (!input) return;
	    const kind = (input.getAttribute('data-magic-kind') || '').trim();
	    const idx = Number(input.getAttribute('data-magic-idx') || -1);
	    const val = (input.value || '').trim();
	    if (!Number.isFinite(idx) || idx < 0) return;
	    if (kind === 'episode' && idx < magicEpisodeRules.length) {
	      const field = (input.getAttribute('data-magic-field') || '').trim();
	      const r = magicEpisodeRules[idx] && typeof magicEpisodeRules[idx] === 'object' ? magicEpisodeRules[idx] : {};
	      if (field === 'replace') r.replace = val;
	      else r.pattern = normalizeRegexText(val);
	      magicEpisodeRules[idx] = r;
	      renderMagicPanels();
	      return;
	    }
	    if (kind === 'aggregateRegex' && idx < magicAggregateRegexRules.length) {
	      magicAggregateRegexRules[idx] = normalizeAggregateRegexRuleInput(val);
	      renderMagicPanels();
	      await persistMagic();
	      return;
	    }
	    if (kind === 'episodeCleanRegex' && idx < magicEpisodeCleanRegexRules.length) {
	      magicEpisodeCleanRegexRules[idx] = normalizeAggregateRegexRuleInput(val);
	      renderMagicPanels();
	      await persistMagic();
	      return;
	    }
	    await persistMagic();
	  };

	  if (magicEpisodeCleanRegexRuleList) {
	    magicEpisodeCleanRegexRuleList.addEventListener('click', onMagicListClick);
	    magicEpisodeCleanRegexRuleList.addEventListener('change', onMagicListChange);
	  }
	  if (magicEpisodeRuleList) {
	    magicEpisodeRuleList.addEventListener('click', onMagicListClick);
	    magicEpisodeRuleList.addEventListener('change', onMagicListChange);
	  }
  if (magicAggregateRegexRuleList) {
    magicAggregateRegexRuleList.addEventListener('click', onMagicListClick);
    magicAggregateRegexRuleList.addEventListener('change', onMagicListChange);
  }

  function ensurePanelDataLoaded(key) {
    if (key === 'site') return loadSitePanel();
    if (key === 'user') return loadUserPanel();
    if (key === 'video') return loadVideoPanel();
    if (key === 'pan') return loadPanPanel();
    if (key === 'interface') return loadInterfacePanel();
    if (key === 'magic') return loadMagicPanel();
    return null;
  }

  if (initialPanelKey) {
    ensurePanelDataLoaded(initialPanelKey);
  }

  if (
    addUserBtn &&
    addUserForm &&
    addUserName &&
    addUserPassword &&
    addUserRole &&
    addUserCatApiBase &&
    addUserCatProxy &&
    confirmAddUser
  ) {
    addUserBtn.type = 'button';
    addUserBtn.setAttribute('aria-controls', 'addUserForm');
    addUserBtn.setAttribute('aria-expanded', 'false');

    const setAddUserStatus = bindInlineStatus(addUserStatus);

    const syncSubmitState = () => {
      const enabled =
        (addUserName.value || '').trim().length > 0 &&
        (addUserPassword.value || '').trim().length > 0;
      confirmAddUser.disabled = !enabled;
      confirmAddUser.classList.toggle('active', enabled);
    };

    const setFormVisible = (visible) => {
      addUserForm.hidden = !visible;
      addUserBtn.textContent = visible ? '取消' : '添加用户';
      addUserBtn.setAttribute('aria-expanded', visible ? 'true' : 'false');
      if (visible) {
        addUserName.focus();
      }
      else setAddUserStatus('', '');
      syncSubmitState();
    };

    setFormVisible(false);

    setupCustomSelectElement(addUserRole);

    addUserBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setFormVisible(addUserForm.hidden);
    });

    addUserForm.addEventListener('input', () => {
      setAddUserStatus('', '');
      syncSubmitState();
    });

    addUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      syncSubmitState();
      if (confirmAddUser.disabled) return;
      const fields = formToFields(addUserForm);
      const username = (fields.username || '').trim();
      const password = (fields.password || '').trim();
      const roleRaw = (fields.role || '').trim();
      const role = roleRaw === 'shared' ? 'shared' : 'user';
      const catApiBase = (fields.catApiBase || '').trim();
      const catProxy = (fields.catProxy || '').trim();
      if (!username || !password) return;

      confirmAddUser.disabled = true;
      confirmAddUser.classList.remove('active');
      setAddUserStatus('info', '添加中...');

      try {
        const { resp, data } = await postForm('/dashboard/user/add', {
          username,
          password,
          role,
          catApiBase,
          catProxy,
        });
        if (resp.ok && data.success) {
          setAddUserStatus('success', '添加成功');
          appendUserRow({
            username,
            role,
            status: 'active',
            cat_api_base: catApiBase,
            cat_proxy: catProxy,
          });
          addUserForm.reset();
          syncCustomSelectValue('addUserRole', 'user');
          if (userCountEl) {
            const num = parseInt(userCountEl.textContent || '0', 10);
            userCountEl.textContent = (num + 1).toString();
          }
          syncSubmitState();
          setFormVisible(false);
        } else {
          setAddUserStatus('error', data.message || '添加失败');
          syncSubmitState();
        }
      } catch (err) {
        setAddUserStatus('error', '添加失败');
        syncSubmitState();
      }
    });
  }

  if (userTableBody) {
    userTableBody.addEventListener('click', async (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const btn = target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      if (!action) return;
      const row = btn.closest('tr');
      if (!row) return;
      const username = row.getAttribute('data-username') || '';
      const role = row.getAttribute('data-role') || '';
      if (!username) return;
      if (role === 'admin' && (action === 'ban' || action === 'delete')) return;

      const removeEditor = () => {
        const existing = userTableBody.querySelector('tr.user-edit-row');
        if (existing) existing.remove();
      };

      if (action === 'edit') {
        const existing = userTableBody.querySelector('tr.user-edit-row');
        const existingFor = existing ? existing.getAttribute('data-for') || '' : '';
        if (existing && existingFor === username) {
          existing.remove();
          return;
        }
        removeEditor();

        const editTr = document.createElement('tr');
        editTr.className = 'user-edit-row';
        editTr.setAttribute('data-for', username);

        const editTd = document.createElement('td');
        editTd.colSpan = 6;
        editTd.className = 'px-3 py-3';

        const box = document.createElement('div');
        box.className = 'user-edit-box';

        const grid = document.createElement('div');
        grid.className = 'grid items-center';
        grid.style.gridTemplateColumns = 'max-content 1fr';
        grid.style.gap = '14px 18px';

        const appendLabeledField = (labelText, controlEl) => {
          const labelEl = document.createElement('span');
          labelEl.className =
            'text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap';
          labelEl.textContent = labelText;

          const controlCell = document.createElement('div');
          controlCell.className = 'min-w-0';
          controlCell.appendChild(controlEl);

          grid.appendChild(labelEl);
          grid.appendChild(controlCell);
          return controlCell;
        };

	        const newUserInput = document.createElement('input');
	        newUserInput.type = 'text';
	        newUserInput.placeholder = '新用户名';
	        newUserInput.className = 'tv-field';

	        const newPassInput = document.createElement('input');
	        newPassInput.type = 'password';
	        newPassInput.placeholder = '新密码';
	        newPassInput.className = 'tv-field';

        const originalRole = (row.getAttribute('data-role') || '').trim() || 'user';
        let roleSelect = null;
	        if (role !== 'admin') {
	          roleSelect = document.createElement('select');
	          roleSelect.className = 'tv-field';
	          const optUser = document.createElement('option');
	          optUser.value = 'user';
	          optUser.textContent = '用户';
          const optShared = document.createElement('option');
          optShared.value = 'shared';
          optShared.textContent = '共享';
          roleSelect.appendChild(optUser);
          roleSelect.appendChild(optShared);
          roleSelect.value = originalRole === 'shared' ? 'shared' : 'user';
        }

	        const catApiInput = document.createElement('input');
	        catApiInput.type = 'text';
	        catApiInput.placeholder = 'CatPawOpen 接口地址（可留空）';
	        catApiInput.className = 'tv-field';
        const originalCatApi = (row.getAttribute('data-cat-api-base') || '').trim();
        catApiInput.value = originalCatApi;

	        const catProxyInput = document.createElement('input');
	        catProxyInput.type = 'text';
	        catProxyInput.placeholder = 'CatPawOpen 全局代理地址（可留空）';
	        catProxyInput.className = 'tv-field';
        const originalCatProxy = (row.getAttribute('data-cat-proxy') || '').trim();
        catProxyInput.value = originalCatProxy;

        appendLabeledField('新用户名：', newUserInput);
        appendLabeledField('新密码：', newPassInput);
        if (roleSelect) {
          appendLabeledField('角色：', roleSelect);
          setupCustomSelectElement(roleSelect);
        }
        appendLabeledField('Cat接口：', catApiInput);
        appendLabeledField('Cat代理：', catProxyInput);

        const actions = document.createElement('div');
        actions.className = 'action-group mt-3';

        const okBtn = document.createElement('button');
        okBtn.type = 'button';
        okBtn.className = 'action-btn green';
        okBtn.textContent = '确定';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'action-btn gray';
        cancelBtn.textContent = '取消';

	        const status = document.createElement('div');
	        status.className = 'text-sm mt-2 hidden';
	        const setEditStatus = bindInlineStatus(status);

	        const setButtonEnabled = (button, enabled) => {
	          if (!button) return;
	          const ok = !!enabled;
	          button.disabled = !ok;
	          button.style.opacity = ok ? '1' : '0.6';
	          button.style.cursor = ok ? 'pointer' : 'not-allowed';
	        };

        const syncOk = () => {
          const hasUser = (newUserInput.value || '').trim().length > 0;
          const hasPass = (newPassInput.value || '').trim().length > 0;
          const roleChanged = !!roleSelect && (roleSelect.value || 'user') !== (originalRole === 'shared' ? 'shared' : 'user');
          const apiChanged = ((catApiInput.value || '').trim()) !== originalCatApi;
          const proxyChanged = ((catProxyInput.value || '').trim()) !== originalCatProxy;
	          const enabled = hasUser || hasPass || roleChanged || apiChanged || proxyChanged;
	          setButtonEnabled(okBtn, enabled);
	        };

        newUserInput.addEventListener('input', () => {
          setEditStatus('', '');
          syncOk();
        });
        newPassInput.addEventListener('input', () => {
          setEditStatus('', '');
          syncOk();
        });
        if (roleSelect) {
          roleSelect.addEventListener('change', () => {
            setEditStatus('', '');
            syncOk();
          });
        }
        catApiInput.addEventListener('input', () => {
          setEditStatus('', '');
          syncOk();
        });
        catProxyInput.addEventListener('input', () => {
          setEditStatus('', '');
          syncOk();
        });
        syncOk();

        cancelBtn.addEventListener('click', () => editTr.remove());

	        okBtn.addEventListener('click', async () => {
	          syncOk();
	          if (okBtn.disabled) return;
	          okBtn.disabled = true;
	          setEditStatus('', '保存中...');
	          try {
	            const fields = { username };
	            const newU = (newUserInput.value || '').trim();
	            const newP = (newPassInput.value || '').trim();
	            if (newU) fields.newUsername = newU;
	            if (newP) fields.newPassword = newP;
	            if (roleSelect) {
	              const nextRole = (roleSelect.value || '').trim();
	              const normNext = nextRole === 'shared' ? 'shared' : 'user';
	              const normOrig = originalRole === 'shared' ? 'shared' : 'user';
	              if (normNext !== normOrig) fields.role = normNext;
	            }
	            const nextApi = (catApiInput.value || '').trim();
	            const nextProxy = (catProxyInput.value || '').trim();
	            if (nextApi !== originalCatApi) fields.catApiBase = nextApi;
	            if (nextProxy !== originalCatProxy) fields.catProxy = nextProxy;
	            const { resp, data } = await postForm('/dashboard/user/update', fields);
		            if (resp.ok && data.success) {
		              const finalUsername = data.username || username;
		              row.setAttribute('data-username', finalUsername);
		              if (roleSelect) {
		                const nextRole = (data.role || roleSelect.value || 'user').trim();
		                const roleValue = nextRole === 'shared' ? 'shared' : 'user';
		                row.setAttribute('data-role', roleValue);
		              }
		              if (Object.prototype.hasOwnProperty.call(data, 'catApiBase'))
		                row.setAttribute('data-cat-api-base', data.catApiBase || '');
		              else row.setAttribute('data-cat-api-base', nextApi);
		              if (Object.prototype.hasOwnProperty.call(data, 'catProxy'))
		                row.setAttribute('data-cat-proxy', data.catProxy || '');
		              else row.setAttribute('data-cat-proxy', nextProxy);
		              refreshUserRowCells(row);
		              setEditStatus('success', '保存成功');
		              editTr.remove();
		            } else {
		              setEditStatus('error', data.message || '保存失败');
            }
          } catch (err) {
            setEditStatus('error', '保存失败');
          } finally {
            okBtn.disabled = false;
            syncOk();
          }
        });

        actions.appendChild(okBtn);
        actions.appendChild(cancelBtn);

        box.appendChild(grid);
        box.appendChild(actions);
        box.appendChild(status);
        editTd.appendChild(box);
        editTr.appendChild(editTd);

        row.insertAdjacentElement('afterend', editTr);
        newUserInput.focus();
        return;
      }

      if (action === 'ban') {
        btn.disabled = true;
        try {
          const { resp, data } = await postForm('/dashboard/user/ban', { username });
          if (resp.ok && data.success && data.status) {
            const nextStatus = data.status;
            row.setAttribute('data-status', nextStatus);
            const statusCell = row.querySelector('td[data-col="status"]');
            renderStatus(statusCell, nextStatus);
            btn.textContent = nextStatus === 'active' ? '封禁' : '解封';
          } else {
            // eslint-disable-next-line no-alert
            alert(data.message || '操作失败');
          }
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('操作失败');
        } finally {
          btn.disabled = false;
        }
      }

      if (action === 'delete') {
        // eslint-disable-next-line no-alert
        if (!confirm(`确定删除用户：${username}？`)) return;
        btn.disabled = true;
        try {
          const { resp, data } = await postForm('/dashboard/user/delete', { username });
          if (resp.ok && data.success) {
            removeEditor();
            row.remove();
            if (userCountEl) {
              const num = parseInt(userCountEl.textContent || '0', 10);
              userCountEl.textContent = Math.max(0, num - 1).toString();
            }
          } else {
            // eslint-disable-next-line no-alert
            alert(data.message || '删除失败');
          }
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('删除失败');
        } finally {
          btn.disabled = false;
        }
      }
    });
  }
}
