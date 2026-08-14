(() => {
  const root = document.documentElement;
  const PAGE_TITLES = {
    introduce: '介绍',
    values: '价值观与原则',
    dashboard: '仪表盘',
    colors: '色彩系统',
    typography: '字体排版',
    layout: '布局与栅格',
    shape: '图形细节',
    icons: '图标',
    illustrations: '插画',
    dark: '暗黑模式',
    motion: '动效',
    navigation: '导航',
    feedback: '反馈',
    copywriting: '文案',
    i18n: '无障碍 / 国际化',
    'data-format': '数据格式',
    components: '组件样式',
    'page-templates': '页面模板',
    templates: '空态 / 结果 / 异常',
    scenes: '双场景',
    catalog: '组件总览清单',
    governance: '资源与治理',
    tokens: 'Token 调整',
  };

  const DEFAULTS = {
    '--dp-color-primary': '#3b45e5',
    '--dp-color-action': '#3c49dd',
    '--dp-color-primary-hover': '#626aea',
    '--dp-color-primary-active': '#2f37b7',
    '--dp-color-accent-violet': '#5d26ff',
    '--dp-text-1': '#1d2129',
    '--dp-text-2': '#4e5969',
    '--dp-text-3': '#86909c',
    '--dp-bg-page': '#f4f5f7',
    '--dp-bg-layout': '#f4f6fb',
    '--dp-border': '#e5e6eb',
    '--dp-success': '#0ab268',
    '--dp-warning': '#ff7d00',
    '--dp-error': '#ff4747',
    '--dp-radius': '8px',
    '--dp-radius-xl': '16px',
  };

  const brandColors = [
    ['Primary', '--dp-color-primary', '主品牌蓝'],
    ['Action / CTA', '--dp-color-action', '主按钮 / 链接'],
    ['Primary Hover', '--dp-color-primary-hover', '悬停'],
    ['Primary Active', '--dp-color-primary-active', '按下'],
    ['Primary BG', '--dp-color-primary-bg', '浅蓝底'],
    ['Action BG Light', '--dp-color-action-bg-light', 'Tag / 轻底'],
    ['Accent Violet', '--dp-color-accent-violet', '展示辅色'],
    ['Accent Blue', '--dp-color-accent-blue', '营销亮蓝'],
  ];

  const textColors = [
    ['Text 1', '--dp-text-1', '主文案'],
    ['Text Strong', '--dp-text-strong', '重标题'],
    ['Text 2', '--dp-text-2', '次文案'],
    ['Text 3', '--dp-text-3', '辅助'],
    ['Text 4', '--dp-text-4', '禁用'],
    ['Secondary Alt', '--dp-text-secondary-alt', '蓝灰次文'],
  ];

  const surfaceColors = [
    ['Page BG', '--dp-bg-page', '页面灰底'],
    ['Layout BG', '--dp-bg-layout', '布局底'],
    ['White', '--dp-bg-white', '卡片'],
    ['Fill 1', '--dp-fill-1', '最浅填充'],
    ['Fill 2', '--dp-fill-2', '浅填充'],
    ['Fill 3', '--dp-fill-3', '分割'],
    ['Border', '--dp-border', '默认边框'],
    ['Border Tint', '--dp-border-primary-tint', '主题浅边'],
    ['Hero Dark', '--dp-bg-hero-dark', '深色 Hero'],
  ];

  const semanticColors = [
    ['Success', '--dp-success', '成功'],
    ['Warning', '--dp-warning', '警告'],
    ['Error', '--dp-error', '错误'],
    ['Info', '--dp-info', '信息'],
    ['Warning BG', '--dp-warning-bg', '警告底'],
  ];

  const radii = [
    ['xs', '--dp-radius-xs', '2px'],
    ['sm', '--dp-radius-sm', '4px'],
    ['default', '--dp-radius', '8px'],
    ['lg', '--dp-radius-lg', '12px'],
    ['xl', '--dp-radius-xl', '16px'],
    ['2xl', '--dp-radius-2xl', '20px'],
    ['pill', '--dp-radius-pill', '100px'],
  ];

  const spaces = [
    ['1', '--dp-space-1', '4px'],
    ['2', '--dp-space-2', '8px'],
    ['3', '--dp-space-3', '12px'],
    ['4', '--dp-space-4', '16px'],
    ['6', '--dp-space-6', '24px'],
    ['8', '--dp-space-8', '32px'],
    ['12', '--dp-space-12', '48px'],
  ];

  let charts = [];

  function cssVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  function setToken(name, value) {
    root.style.setProperty(name, value);
  }

  function normalizeHex(value) {
    if (!value) return '#000000';
    if (value.startsWith('#') && value.length === 7) return value.toLowerCase();
    const m = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (m) {
      return `#${[m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('')}`;
    }
    return value;
  }

  function renderSwatches(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items
      .map(([label, token, desc]) => {
        const value = cssVar(token);
        return `<article class="swatch" data-token="${token}">
          <div class="swatch__chip" style="background:${value}"></div>
          <div class="swatch__meta">
            <strong>${label}</strong>
            <code class="swatch__value">${value}</code>
            <div style="color:var(--dp-text-3);font-size:11px;margin-top:4px">${desc}</div>
          </div>
        </article>`;
      })
      .join('');
  }

  function renderRadii() {
    const el = document.getElementById('radiusRow');
    if (!el) return;
    el.innerHTML = radii
      .map(([label, token, fallback]) => {
        const value = cssVar(token) || fallback;
        return `<div class="radius-card" style="border-radius:${value}">
          <strong>${label}</strong>
          <code>${token}<br>${value}</code>
        </div>`;
      })
      .join('');
  }

  function renderSpaces(targetId = 'spaceRow') {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = spaces
      .map(([label, token, fallback]) => {
        const value = cssVar(token) || fallback;
        return `<div class="space-card">
          <div class="space-card__bar" style="width:${value}"></div>
          <strong>space-${label}</strong>
          <code>${value}</code>
        </div>`;
      })
      .join('');
  }

  function refreshSwatches() {
    document.querySelectorAll('.swatch').forEach((node) => {
      const token = node.getAttribute('data-token');
      const value = cssVar(token);
      const chip = node.querySelector('.swatch__chip');
      const code = node.querySelector('.swatch__value');
      if (chip) chip.style.background = value;
      if (code) code.textContent = value;
    });
    renderRadii();
    paintCharts();
  }

  let replayMotionEnter = null;

  function switchPage(page) {
    document.querySelectorAll('.sider__nav .nav-item[data-page]').forEach((btn) => {
      const on = btn.dataset.page === page;
      btn.classList.toggle('is-active', on);
      if (on) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });
    document.querySelectorAll('.page').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.pagePanel === page);
    });
    const crumb = document.querySelector('#breadcrumb strong');
    if (crumb) crumb.textContent = PAGE_TITLES[page] || page;
    if (page === 'dashboard') {
      requestAnimationFrame(() => paintCharts());
    }
    if (page === 'motion' && typeof replayMotionEnter === 'function') {
      window.setTimeout(() => replayMotionEnter(), 50);
    }
  }

  function bindNav() {
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => switchPage(btn.dataset.page));
    });

    document.getElementById('toggleSider').addEventListener('click', () => {
      const app = document.querySelector('.app');
      if (window.matchMedia('(max-width: 860px)').matches) {
        app.classList.toggle('is-sider-open');
      } else {
        app.classList.toggle('is-collapsed');
      }
      requestAnimationFrame(() => paintCharts());
    });
  }

  function paintCharts() {
    if (typeof echarts === 'undefined') return;

    charts.forEach((c) => c.dispose());
    charts = [];

    const action = cssVar('--dp-color-action') || '#3c49dd';
    const primary = cssVar('--dp-color-primary') || '#3b45e5';
    const success = cssVar('--dp-success') || '#0ab268';
    const warning = cssVar('--dp-warning') || '#ff7d00';
    const text3 = cssVar('--dp-text-3') || '#86909c';
    const border = cssVar('--dp-border') || '#e5e6eb';

    const trendEl = document.getElementById('chartTrend');
    const pieEl = document.getElementById('chartPie');
    const barEl = document.getElementById('chartBar');
    if (!trendEl || !document.querySelector('[data-page-panel="dashboard"]').classList.contains('is-active')) {
      return;
    }

    const trend = echarts.init(trendEl);
    trend.setOption({
      color: [action, primary],
      grid: { left: 40, right: 20, top: 30, bottom: 30 },
      tooltip: { trigger: 'axis' },
      legend: { data: ['已对齐组件', '待改造组件'], textStyle: { color: text3 } },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: { lineStyle: { color: border } },
        axisLabel: { color: text3 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: text3 },
        splitLine: { lineStyle: { color: border, type: 'dashed' } },
      },
      series: [
        {
          name: '已对齐组件',
          type: 'line',
          smooth: true,
          areaStyle: { color: `${action}22` },
          data: [12, 18, 22, 28, 33, 40, 48],
        },
        {
          name: '待改造组件',
          type: 'line',
          smooth: true,
          data: [40, 36, 32, 28, 24, 20, 16],
        },
      ],
    });
    charts.push(trend);

    const pie = echarts.init(pieEl);
    pie.setOption({
      color: [action, primary, success, warning, text3],
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, textStyle: { color: text3 } },
      series: [
        {
          type: 'pie',
          radius: ['42%', '68%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { color: text3 },
          data: [
            { value: 28, name: 'Brand' },
            { value: 36, name: 'Neutral' },
            { value: 14, name: 'Semantic' },
            { value: 12, name: 'Shape' },
            { value: 10, name: 'Motion' },
          ],
        },
      ],
    });
    charts.push(pie);

    const bar = echarts.init(barEl);
    bar.setOption({
      color: [action, success],
      grid: { left: 36, right: 12, top: 20, bottom: 28 },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['W1', 'W2', 'W3', 'W4'],
        axisLabel: { color: text3 },
        axisLine: { lineStyle: { color: border } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: text3 },
        splitLine: { lineStyle: { color: border, type: 'dashed' } },
      },
      series: [
        { name: '新增', type: 'bar', barWidth: 14, data: [6, 8, 5, 7] },
        { name: '废弃', type: 'bar', barWidth: 14, data: [3, 4, 2, 5] },
      ],
    });
    charts.push(bar);
  }

  function syncColorInputs() {
    document.querySelectorAll('input[type="color"][data-token]').forEach((input) => {
      const token = input.getAttribute('data-token');
      const current = cssVar(token);
      if (current) input.value = normalizeHex(current);
      const code = input.parentElement.querySelector('code');
      if (code) code.textContent = input.value;
    });
  }

  function bindColorInputs() {
    document.querySelectorAll('input[type="color"][data-token]').forEach((input) => {
      if (input.dataset.bound === '1') return;
      input.dataset.bound = '1';
      const token = input.getAttribute('data-token');
      const code = input.parentElement.querySelector('code');
      input.addEventListener('input', () => {
        setToken(token, input.value);
        if (code) code.textContent = input.value;
        refreshSwatches();
      });
    });
    syncColorInputs();
  }

  function bindRadiusControls() {
    const radiusRange = document.getElementById('radiusRange');
    const radiusXlRange = document.getElementById('radiusXlRange');
    const radiusLabel = document.getElementById('radiusLabel');
    const radiusXlLabel = document.getElementById('radiusXlLabel');
    if (!radiusRange) return;

    const sync = () => {
      const r = `${radiusRange.value}px`;
      const rx = `${radiusXlRange.value}px`;
      setToken('--dp-radius', r);
      setToken('--dp-radius-lg', `${Math.max(Number(radiusRange.value), 8)}px`);
      setToken('--dp-radius-xl', rx);
      setToken('--dp-radius-2xl', `${Math.max(Number(radiusXlRange.value), 16)}px`);
      radiusLabel.textContent = r;
      radiusXlLabel.textContent = rx;
      renderRadii();
    };

    radiusRange.addEventListener('input', sync);
    radiusXlRange.addEventListener('input', sync);
  }

  function bindButtonShape() {
    const select = document.getElementById('btnShape');
    if (!select) return;
    select.addEventListener('change', () => {
      document.body.dataset.btnShape = select.value === 'pill' ? 'pill' : 'default';
      root.style.setProperty(
        '--dp-btn-radius',
        select.value === 'pill' ? 'var(--dp-radius-pill)' : 'var(--dp-radius)',
      );
    });
  }

  function showStatus(msg) {
    const el = document.getElementById('panelStatus');
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    clearTimeout(showStatus._t);
    showStatus._t = setTimeout(() => {
      el.hidden = true;
    }, 2200);
  }

  function collectTokensCss() {
    const keys = [
      ...brandColors.map((i) => i[1]),
      ...textColors.map((i) => i[1]),
      ...surfaceColors.map((i) => i[1]),
      ...semanticColors.map((i) => i[1]),
      '--dp-radius',
      '--dp-radius-sm',
      '--dp-radius-lg',
      '--dp-radius-xl',
      '--dp-radius-2xl',
      '--dp-shadow',
      '--dp-shadow-emphasis',
      '--dp-font-sans',
      '--dp-font-display',
      '--dp-font-mono',
    ];
    const lines = [':root {'];
    [...new Set(keys)].forEach((key) => lines.push(`  ${key}: ${cssVar(key)};`));
    lines.push('}');
    return lines.join('\n');
  }

  function bindActions() {
    const copyBtn = document.getElementById('copyTokens');
    const resetBtn = document.getElementById('resetTokens');
    if (!copyBtn || !resetBtn) return;

    copyBtn.addEventListener('click', async () => {
      const css = collectTokensCss();
      try {
        await navigator.clipboard.writeText(css);
      } catch {
        const box = document.createElement('textarea');
        box.value = css;
        document.body.appendChild(box);
        box.select();
        document.execCommand('copy');
        box.remove();
      }
      showStatus('已复制当前 CSS 变量到剪贴板');
    });

    resetBtn.addEventListener('click', () => {
      Object.entries(DEFAULTS).forEach(([k, v]) => setToken(k, v));
      root.style.removeProperty('--dp-btn-radius');
      document.body.dataset.btnShape = 'default';
      const shape = document.getElementById('btnShape');
      if (shape) shape.value = 'default';
      document.getElementById('radiusRange').value = '8';
      document.getElementById('radiusXlRange').value = '16';
      document.getElementById('radiusLabel').textContent = '8px';
      document.getElementById('radiusXlLabel').textContent = '16px';
      bindColorInputs();
      refreshSwatches();
      showStatus('已重置为官网基准值');
    });
  }

  const ICON_CATEGORY_META = [
    ['all', '全部'],
    ['direction', '方向 Directional'],
    ['status', '提示 / 状态 Suggested'],
    ['editor', '编辑 Editor'],
    ['data', '数据 Data'],
    ['nav', '导航 Navigation'],
    ['action', '操作 Action'],
    ['user', '用户 User'],
    ['comm', '通讯 Communication'],
    ['time', '时间 Time'],
    ['app', '应用 Application'],
    ['science', '科学 Science'],
  ];

  const STATUS_ICON_COLORS = {
    'status-success': 'var(--dp-success)',
    'status-warning': 'var(--dp-warning)',
    'status-error': 'var(--dp-error)',
    'status-info': 'var(--dp-color-action)',
  };

  let iconRegistry = null;
  let iconActiveCategory = 'all';
  let iconQuery = '';

  function shortIconName(id) {
    const i = id.indexOf('-');
    return i === -1 ? id : id.slice(i + 1);
  }

  async function loadIconSprite() {
    const host = document.getElementById('iconSpriteHost');
    if (!host) return;
    try {
      const res = await fetch('./icons-sprite.svg', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`sprite ${res.status}`);
      const raw = await res.text();
      host.innerHTML = raw.replace(/<\?xml[^?]+\?>\s*/i, '');
    } catch (err) {
      console.error('Failed to load icons-sprite.svg', err);
      host.innerHTML = '<p class="muted">图标 sprite 加载失败</p>';
    }
  }

  function renderIconTabs() {
    const tabs = document.getElementById('iconCategoryTabs');
    if (!tabs || !iconRegistry) return;
    tabs.innerHTML = '';
    ICON_CATEGORY_META.forEach(([key, label]) => {
      const count =
        key === 'all'
          ? iconRegistry.count
          : (iconRegistry.categories[key] || []).length;
      if (key !== 'all' && !count) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = `${label} (${count})`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', key === iconActiveCategory ? 'true' : 'false');
      btn.addEventListener('click', () => {
        iconActiveCategory = key;
        renderIconTabs();
        renderIconCatalog();
      });
      tabs.appendChild(btn);
    });
  }

  function renderIconCatalog() {
    const host = document.getElementById('iconCatalogHost');
    const totalEl = document.getElementById('iconTotalCount');
    const visibleEl = document.getElementById('iconVisibleCount');
    if (!host || !iconRegistry) return;

    if (totalEl) totalEl.textContent = String(iconRegistry.count);

    const q = iconQuery.trim().toLowerCase();
    const order = ICON_CATEGORY_META.filter(([k]) => k !== 'all').map(([k]) => k);
    const cats =
      iconActiveCategory === 'all'
        ? order.filter((k) => (iconRegistry.categories[k] || []).length)
        : [iconActiveCategory];

    host.innerHTML = '';
    let visible = 0;

    cats.forEach((cat) => {
      const ids = (iconRegistry.categories[cat] || []).filter((id) => {
        if (!q) return true;
        return id.toLowerCase().includes(q) || shortIconName(id).toLowerCase().includes(q);
      });
      if (!ids.length) return;

      const section = document.createElement('div');
      const meta = ICON_CATEGORY_META.find(([k]) => k === cat);
      const head = document.createElement('div');
      head.className = 'icon-catalog__section-head';
      head.innerHTML = `<p class="subhead">${meta ? meta[1] : cat}</p><span class="muted">${ids.length}</span>`;
      const grid = document.createElement('div');
      grid.className = 'icon-catalog__grid';

      ids.forEach((id) => {
        const figure = document.createElement('figure');
        figure.title = `dp-icon-${id}`;
        const spin = id === 'status-loading' ? ' dp-icon--spin' : '';
        const color = STATUS_ICON_COLORS[id]
          ? ` style="color:${STATUS_ICON_COLORS[id]}"`
          : '';
        figure.innerHTML =
          `<svg class="dp-icon${spin}" width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"${color}>` +
          `<use href="#dp-icon-${id}"></use></svg>` +
          `<figcaption>${shortIconName(id)}</figcaption>`;
        figure.addEventListener('click', async () => {
          const name = `dp-icon-${id}`;
          try {
            await navigator.clipboard.writeText(name);
            showStatus(`已复制 ${name}`);
          } catch {
            showStatus(name);
          }
        });
        grid.appendChild(figure);
        visible += 1;
      });

      section.appendChild(head);
      section.appendChild(grid);
      host.appendChild(section);
    });

    if (!visible) {
      host.innerHTML = '<p class="muted">没有匹配的图标</p>';
    }
    if (visibleEl) visibleEl.textContent = `显示 ${visible} / ${iconRegistry.count}`;
  }

  function bindIconSearch() {
    const input = document.getElementById('iconSearch');
    if (!input) return;
    input.addEventListener('input', () => {
      iconQuery = input.value || '';
      renderIconCatalog();
    });
  }

  async function initIcons() {
    await loadIconSprite();
    try {
      const res = await fetch('./icons-registry.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`registry ${res.status}`);
      iconRegistry = await res.json();
    } catch (err) {
      console.error('Failed to load icons-registry.json', err);
      const host = document.getElementById('iconCatalogHost');
      if (host) host.innerHTML = '<p class="muted">图标注册表加载失败</p>';
      return;
    }
    renderIconTabs();
    renderIconCatalog();
    bindIconSearch();
  }

  function initMotionDemos() {
    const drawer = document.getElementById('motionDrawer');
    const mask = document.getElementById('motionDrawerMask');
    const drawerBtn = document.getElementById('motionDrawerToggle');
    if (drawerBtn && drawer && mask) {
      const setOpen = (open) => {
        drawer.classList.toggle('is-open', open);
        mask.classList.toggle('is-open', open);
        mask.hidden = !open;
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      };
      drawerBtn.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
      mask.addEventListener('click', () => setOpen(false));
    }

    const toastBtn = document.getElementById('motionToastBtn');
    const toastHost = document.getElementById('motionToastHost');
    if (toastBtn && toastHost) {
      toastBtn.addEventListener('click', () => {
        toastHost.innerHTML = '';
        const el = document.createElement('div');
        el.className = 'motion-toast';
        el.textContent = '已保存 · 240ms emphasize';
        toastHost.appendChild(el);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => el.classList.add('is-in'));
        });
        window.setTimeout(() => {
          el.classList.remove('is-in');
          window.setTimeout(() => el.remove(), 280);
        }, 1800);
      });
    }

    const collapseBtn = document.getElementById('motionCollapseBtn');
    const collapse = document.getElementById('motionCollapse');
    if (collapseBtn && collapse) {
      collapseBtn.addEventListener('click', () => {
        const open = !collapse.classList.contains('is-open');
        collapse.classList.toggle('is-open', open);
        collapseBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    const enterBtn = document.getElementById('motionEnterBtn');
    const enterRow = document.getElementById('motionEnterRow');
    replayMotionEnter = () => {
      if (!enterRow) return;
      const cards = [...enterRow.querySelectorAll('.motion-enter-card')];
      enterRow.classList.remove('is-in');
      cards.forEach((card) => {
        card.style.animation = 'none';
        card.style.opacity = '0';
        card.style.transform = `translateY(var(--dp-motion-enter-y-showcase, 16px))`;
      });
      // 强制重绘后再启动 animation，避免同帧合批导致无效果
      void enterRow.offsetWidth;
      cards.forEach((card) => {
        card.style.animation = '';
        card.style.opacity = '';
        card.style.transform = '';
      });
      void enterRow.offsetWidth;
      enterRow.classList.add('is-in');
    };
    if (enterBtn) {
      enterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        replayMotionEnter();
        showStatus('已重播 Showcase 入场');
      });
    }

    const reduceToggle = document.getElementById('motionReduceToggle');
    if (reduceToggle) {
      reduceToggle.addEventListener('change', () => {
        root.dataset.reduceMotion = reduceToggle.checked ? 'true' : 'false';
        showStatus(reduceToggle.checked ? '已模拟减少动效' : '已恢复动效');
      });
    }
  }

  const THEME_KEY = 'dp-theme';
  let themeMode = 'light';
  let systemMq = null;

  function resolveTheme(mode) {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode === 'dark' ? 'dark' : 'light';
  }

  function clearInlineTokenOverrides() {
    // Token 调整页写入的内联变量会压过主题切换，切换时清掉
    const style = root.style;
    [...style].forEach((prop) => {
      if (prop.startsWith('--dp-')) style.removeProperty(prop);
    });
  }

  function syncThemeButtons() {
    document.querySelectorAll('[data-theme-mode]').forEach((btn) => {
      const on = btn.getAttribute('data-theme-mode') === themeMode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function applyResolvedTheme(resolved) {
    root.setAttribute('data-dp-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
    const label = document.getElementById('darkThemeLabel');
    if (label) {
      label.textContent =
        themeMode === 'system' ? `System → ${resolved === 'dark' ? 'Dark' : 'Light'}` : resolved === 'dark' ? 'Dark' : 'Light';
    }
    syncThemeButtons();
    try {
      syncColorInputs();
      refreshSwatches();
    } catch (err) {
      console.warn('theme refresh failed', err);
    }
    requestAnimationFrame(() => {
      try {
        if (document.querySelector('[data-page-panel="dashboard"]')?.classList.contains('is-active')) {
          paintCharts();
        }
      } catch (err) {
        console.warn('theme chart refresh failed', err);
      }
    });
  }

  function setThemeMode(mode, { persist = true, notify = false } = {}) {
    themeMode = mode === 'dark' || mode === 'system' ? mode : 'light';
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, themeMode);
      } catch {
        /* ignore */
      }
    }
    clearInlineTokenOverrides();
    applyResolvedTheme(resolveTheme(themeMode));
    if (notify) {
      const label =
        themeMode === 'system'
          ? `跟随系统 → ${resolveTheme('system')}`
          : themeMode === 'dark'
            ? 'Dark'
            : 'Light';
      showStatus(`主题：${label}`);
    }
  }

  function initB3Demos() {
    const tree = document.getElementById('dpTreeDemo');
    if (tree) {
      tree.querySelectorAll('.dp-tree__twist').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const node = btn.closest('.dp-tree__node');
          if (!node || node.classList.contains('is-leaf')) return;
          const open = !node.classList.contains('is-open');
          node.classList.toggle('is-open', open);
          node.setAttribute('aria-expanded', open ? 'true' : 'false');
          btn.setAttribute('aria-label', open ? '折叠' : '展开');
        });
      });
      tree.querySelectorAll('.dp-tree__node').forEach((node) => {
        node.addEventListener('click', (e) => {
          if (e.target.closest('.dp-tree__twist')) return;
          tree.querySelectorAll('.is-selected').forEach((n) => n.classList.remove('is-selected'));
          node.classList.add('is-selected');
        });
      });
    }

    const slider = document.getElementById('dpSlider');
    const fill = document.getElementById('dpSliderFill');
    const valueEl = document.getElementById('dpSliderValue');
    const syncSlider = () => {
      if (!slider || !fill || !valueEl) return;
      const v = Number(slider.value);
      fill.style.width = `${v}%`;
      const exp = -2 - Math.round((v / 100) * 4);
      valueEl.textContent = `1.0e${exp}`;
    };
    slider?.addEventListener('input', syncSlider);
    syncSlider();

    const scroller = document.querySelector('.b3-affix-scroll');
    const backTop = document.getElementById('dpBackTop');
    if (scroller && backTop) {
      const syncBack = () => {
        backTop.hidden = scroller.scrollTop < 100;
      };
      scroller.addEventListener('scroll', syncBack, { passive: true });
      backTop.addEventListener('click', () => {
        scroller.scrollTo({ top: 0, behavior: 'smooth' });
      });
      syncBack();
    }
  }

  function initB2Demos() {
    const stack = document.getElementById('dpNotifyStack');
    const pushNotify = (type, title, body) => {
      if (!stack) return;
      const el = document.createElement('article');
      el.className = `dp-notify dp-notify--${type}`;
      el.innerHTML = `
        <div class="dp-notify__mark" aria-hidden="true"></div>
        <div class="dp-notify__body">
          <strong>${title}</strong>
          <p>${body}</p>
          <a href="#">查看结果</a>
        </div>
        <button type="button" class="dp-notify__close" aria-label="关闭">×</button>`;
      el.querySelector('.dp-notify__close').addEventListener('click', () => el.remove());
      stack.appendChild(el);
      window.setTimeout(() => el.remove(), 5000);
    };
    document.getElementById('dpNotifyOk')?.addEventListener('click', () => {
      pushNotify('ok', '计算完成', '任务 JOB-2048 已完成，可查看结果。');
    });
    document.getElementById('dpNotifyErr')?.addEventListener('click', () => {
      pushNotify('err', '计算失败', '参数校验未通过，请返回修改后重试。');
    });
    document.getElementById('dpNotifyInfo')?.addEventListener('click', () => {
      pushNotify('info', '正在处理', '任务已进入队列，完成后将通知你。');
    });
    document.querySelectorAll('.b2-demo .dp-notify.is-demo .dp-notify__close').forEach((btn) => {
      btn.addEventListener('click', () => btn.closest('.dp-notify')?.remove());
    });

    document.querySelectorAll('[data-dp-dropdown]:not(.is-demo)').forEach((root) => {
      const trigger = root.querySelector('.dp-dropdown__trigger');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = !root.classList.contains('is-open');
        document.querySelectorAll('[data-dp-dropdown]').forEach((n) => {
          if (!n.classList.contains('is-demo')) n.classList.remove('is-open');
        });
        root.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.querySelectorAll('[data-dp-popover]:not(.is-demo)').forEach((root) => {
      const trigger = root.querySelector('.dp-popover__trigger');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = !root.classList.contains('is-open');
        document.querySelectorAll('[data-dp-popover]').forEach((n) => {
          if (!n.classList.contains('is-demo')) n.classList.remove('is-open');
        });
        root.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    const anchorNav = document.querySelector('.b2-demo .dp-anchor');
    const anchorBox = document.querySelector('.b2-anchor-content');
    if (anchorNav && anchorBox) {
      anchorNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const id = link.getAttribute('href')?.slice(1);
          const target = id ? document.getElementById(id) : null;
          anchorNav.querySelectorAll('a').forEach((a) => a.classList.toggle('is-active', a === link));
          if (target) {
            anchorBox.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' });
          }
        });
      });
    }
  }

  function initDatePickerDemo() {
    const root = document.querySelector('.dp-datepicker');
    const trigger = document.getElementById('dpDateTrigger');
    const panel = document.getElementById('dpDatePanel');
    const valueEl = document.getElementById('dpDateValue');
    if (!root || !trigger || !panel || !valueEl) return;
    const isDemo = root.classList.contains('is-demo');

    const setOpen = (open) => {
      root.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!isDemo) panel.hidden = !open;
    };

    if (isDemo) {
      panel.hidden = false;
      setOpen(true);
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDemo) return;
      setOpen(panel.hidden);
    });
    panel.querySelectorAll('.dp-datepicker__grid span').forEach((cell) => {
      if (cell.classList.contains('is-dow') || cell.classList.contains('is-empty')) return;
      if (!cell.textContent.trim()) return;
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.querySelectorAll('.is-active').forEach((n) => n.classList.remove('is-active'));
        cell.classList.add('is-active');
        valueEl.textContent = `2026-08-${cell.textContent.trim().padStart(2, '0')}`;
        if (!isDemo) setOpen(false);
      });
    });
    document.addEventListener('click', (e) => {
      if (isDemo) return;
      if (!e.target.closest('.dp-datepicker')) setOpen(false);
    });
  }

  function initDpSelects() {
    const closeAll = () => {
      document.querySelectorAll('[data-dp-select].is-open').forEach((root) => {
        root.classList.remove('is-open');
        const trigger = root.querySelector('.dp-select__trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    };

    const openRoot = (root) => {
      const trigger = root.querySelector('.dp-select__trigger');
      root.classList.add('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    };

    // 单一委托：避免 stopPropagation / label 二次触发导致「点了又立刻关掉」
    document.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-dp-select] [role="option"]');
      if (opt) {
        const root = opt.closest('[data-dp-select]');
        const menu = root?.querySelector('.dp-select__menu');
        const valueEl = root?.querySelector('.dp-select__value');
        if (root && menu && valueEl) {
          menu.querySelectorAll('[role="option"]').forEach((o) => {
            o.classList.toggle('is-selected', o === opt);
            o.setAttribute('aria-selected', o === opt ? 'true' : 'false');
          });
          valueEl.textContent = opt.textContent.trim();
        }
        closeAll();
        return;
      }

      const trigger = e.target.closest('.dp-select__trigger');
      if (trigger) {
        e.preventDefault();
        const root = trigger.closest('[data-dp-select]');
        if (!root) return;
        const willOpen = !root.classList.contains('is-open');
        closeAll();
        if (willOpen) openRoot(root);
        return;
      }

      if (!e.target.closest('[data-dp-select]')) closeAll();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });
  }

  function initI18nDemo() {
    const card = document.getElementById('i18nDemoCard');
    const switcher = document.querySelector('.i18n-mode-switch');
    if (!card || !switcher) return;

    const copy = {
      zh: {
        lang: 'zh-CN',
        title: '任务详情',
        badge: '运行中',
        body: '提交任务后可在此查看结合能曲线。当前为 −48.2 kJ/mol（UTC+8）。',
        metaEnergyLabel: '结合能',
        metaEnergy: '−48.2 kJ/mol',
        metaTimeLabel: '更新时间',
        metaTime: '2026-08-14 13:20',
        ctaPrimary: '导出结果',
        ctaSecondary: '查看日志',
        toast: '提示：任务已进入队列',
      },
      en: {
        lang: 'en',
        title: 'Job details',
        badge: 'Running',
        body: 'After you submit a job, the binding-energy curve appears here. Current value is −48.2 kJ/mol (UTC+8).',
        metaEnergyLabel: 'Binding energy',
        metaEnergy: '−48.2 kJ/mol',
        metaTimeLabel: 'Updated',
        metaTime: '2026-08-14 13:20',
        ctaPrimary: 'Export results',
        ctaSecondary: 'View logs',
        toast: 'Toast: Job queued',
      },
    };

    const apply = (mode) => {
      const pack = copy[mode] || copy.zh;
      card.dataset.i18nActive = mode;
      card.setAttribute('lang', pack.lang);
      card.querySelectorAll('[data-i18n-key]').forEach((el) => {
        const key = el.getAttribute('data-i18n-key');
        const val = pack[key];
        if (val == null) return;
        el.textContent = val;
      });
      switcher.querySelectorAll('[data-i18n-mode]').forEach((btn) => {
        const on = btn.getAttribute('data-i18n-mode') === mode;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    };

    switcher.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-i18n-mode]');
      if (!btn) return;
      apply(btn.getAttribute('data-i18n-mode'));
    });

    apply('zh');
  }

  function initFeedbackDemos() {
    const toastHost = document.getElementById('fbToastHost');
    const showToast = (text, type = 'ok') => {
      if (!toastHost) return;
      toastHost.innerHTML = '';
      const el = document.createElement('div');
      el.className = `feedback-toast feedback-toast--${type}`;
      el.textContent = text;
      toastHost.appendChild(el);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('is-in'));
      });
      const ms = type === 'err' ? 5000 : 3000;
      window.setTimeout(() => {
        el.classList.remove('is-in');
        window.setTimeout(() => el.remove(), 280);
      }, ms);
    };
    document.getElementById('fbToastOk')?.addEventListener('click', () => {
      showToast('已保存', 'ok');
      showStatus('Toast · 成功 3s');
    });
    document.getElementById('fbToastErr')?.addEventListener('click', () => {
      showToast('计算失败，请检查参数后重试', 'err');
      showStatus('Toast · 错误 5s');
    });

    const modal = document.getElementById('fbModal');
    const openModal = () => {
      if (!modal) return;
      modal.hidden = false;
      document.getElementById('fbModalCancel')?.focus();
    };
    const closeModal = () => {
      if (!modal) return;
      modal.hidden = true;
      document.getElementById('fbModalOpen')?.focus();
    };
    document.getElementById('fbModalOpen')?.addEventListener('click', openModal);
    document.getElementById('fbModalCancel')?.addEventListener('click', closeModal);
    document.getElementById('fbModalConfirm')?.addEventListener('click', () => {
      closeModal();
      showToast('已删除', 'ok');
      showStatus('已确认删除');
    });
    // 确认类 Modal：点击遮罩不关闭（F3-A）
    modal?.querySelector('.feedback-modal__mask')?.addEventListener('click', () => {
      showStatus('确认类 Modal：点击遮罩不关闭');
    });

    const drawer = document.getElementById('fbDrawer');
    const mask = document.getElementById('fbDrawerMask');
    const setDrawer = (open) => {
      if (!drawer || !mask) return;
      drawer.classList.toggle('is-open', open);
      mask.classList.toggle('is-open', open);
      mask.hidden = !open;
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    };
    document.getElementById('fbDrawerOpen')?.addEventListener('click', () => setDrawer(true));
    document.getElementById('fbDrawerClose')?.addEventListener('click', () => setDrawer(false));
    mask?.addEventListener('click', () => setDrawer(false));

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (modal && !modal.hidden) closeModal();
      else if (drawer?.classList.contains('is-open')) setDrawer(false);
    });
  }

  function initTheme() {
    let saved = 'light';
    try {
      saved = localStorage.getItem(THEME_KEY) || 'light';
    } catch {
      saved = 'light';
    }
    if (!['light', 'dark', 'system'].includes(saved)) saved = 'light';

    document.querySelectorAll('[data-theme-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setThemeMode(btn.getAttribute('data-theme-mode'), { notify: true });
      });
    });
    document.querySelectorAll('[data-theme-quick]').forEach((btn) => {
      btn.addEventListener('click', () =>
        setThemeMode(btn.getAttribute('data-theme-quick'), { notify: true }),
      );
    });

    systemMq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystem = () => {
      if (themeMode === 'system') applyResolvedTheme(resolveTheme('system'));
    };
    if (systemMq.addEventListener) systemMq.addEventListener('change', onSystem);
    else if (systemMq.addListener) systemMq.addListener(onSystem);

    setThemeMode(saved, { persist: false });
  }

  function init() {
    // 下拉交互优先注册，避免后续初始化异常导致点不开
    try {
      initDpSelects();
    } catch (err) {
      console.error('initDpSelects failed', err);
    }
    try {
      initDatePickerDemo();
    } catch (err) {
      console.error('initDatePickerDemo failed', err);
    }
    try {
      initB2Demos();
    } catch (err) {
      console.error('initB2Demos failed', err);
    }
    try {
      initB3Demos();
    } catch (err) {
      console.error('initB3Demos failed', err);
    }
    try {
      initI18nDemo();
    } catch (err) {
      console.error('initI18nDemo failed', err);
    }
    renderSwatches('brandSwatches', brandColors);
    renderSwatches('textSwatches', textColors);
    renderSwatches('surfaceSwatches', surfaceColors);
    renderSwatches('semanticSwatches', semanticColors);
    renderRadii();
    renderSpaces('spaceRow');
    renderSpaces('spaceRowLayout');
    bindNav();
    bindColorInputs();
    bindRadiusControls();
    bindButtonShape();
    bindActions();
    initTheme();
    paintCharts();
    initIcons();
    initMotionDemos();
    document.querySelectorAll('.dp-tabs').forEach((tabs) => {
      tabs.querySelectorAll('.dp-tabs__item').forEach((btn) => {
        btn.addEventListener('click', () => {
          tabs.querySelectorAll('.dp-tabs__item').forEach((b) => {
            b.classList.toggle('is-active', b === btn);
            b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
          });
        });
      });
    });
    initFeedbackDemos();
    window.addEventListener('resize', () => {
      charts.forEach((c) => c.resize());
    });
  }

  init();
})();
