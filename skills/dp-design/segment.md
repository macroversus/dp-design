# 胶囊切换 · 实现方式

> 仅在实现或修改**胶囊 / 模式切换**时阅读。普通改色、改文案、改布局不要打开本文。

对应规范 **§5.1.2**。改站或新建该控件时**按本文实现**，不要用 Ant Design `Segmented` 默认皮肤，也不要给选中按钮本身铺 Action 底。

## 架构（必须）

```
┌─────────────────────────────────────┐
│  .dp-segment（轨道 · position:relative）│
│  ┌──────────────────┐               │
│  │ .dp-segment__thumb │ ← 绝对定位滑块   │
│  └──────────────────┘               │
│  [ 选项 A ]  [ 选项 B ]  ← 透明按钮层   │
└─────────────────────────────────────┘
```

| 层级 | 职责 |
|------|------|
| **轨道** | pill 容器，`--dp-fill-2` + 边框，内边距 3px |
| **Thumb** | 绝对定位的 Action 色 pill，**唯一**承担选中背景并滑动 |
| **按钮** | 透明底，只负责文字与点击；选中加 `is-active` 变白字 |

选中背景由 thumb 滑动承担，按钮不加背景，避免双层底闪烁。

**模式切换一律用本控件**：颜色（跟随系统 / 浅色 / 深色）、语言（中文 / English）以及表单内 2–4 项互斥模式。不要做成单钮循环、矩形 tab 条或 Ant `Segmented`。

## DOM

```html
<div role="radiogroup" class="dp-segment" aria-label="运行模式">
  <span class="dp-segment__thumb" aria-hidden="true"></span>
  <button type="button" role="radio" class="dp-segment__item is-active" aria-checked="true">选项 A</button>
  <button type="button" role="radio" class="dp-segment__item" aria-checked="false">选项 B</button>
</div>
```

- 容器：`role="radiogroup"` + `aria-label`
- 选项：`role="radio"` + `aria-checked`
- Thumb：`aria-hidden`，不进无障碍树
- 建议 2–4 项；超出用 Select
- 宽度随内容：加 `dp-segment--inline`；紧凑：`dp-segment--sm`

## 测量与滑动

用 `getBoundingClientRect()` 取选中按钮相对轨道的位置与宽度，**直接写 thumb 的 inline style**（`width` + `translate3d`），动画交给 CSS `transition`。

```js
function measureThumb(group, active) {
  if (!active) return { width: 0, x: 0 };
  const groupRect = group.getBoundingClientRect();
  const rect = active.getBoundingClientRect();
  return { width: rect.width, x: rect.left - groupRect.left };
}

function applyThumb(group, thumb, active, animate) {
  const commit = () => {
    const { width, x } = measureThumb(group, active);
    thumb.style.width = `${width}px`;
    thumb.style.transform = `translate3d(${x}px, 0, 0)`;
    thumb.style.opacity = width > 0 ? '1' : '0';
  };

  if (!animate) {
    // 首屏 / resize / 文案变化：关 transition → 写入 → reflow → 恢复
    thumb.style.transition = 'none';
    commit();
    void thumb.offsetWidth;
    thumb.style.removeProperty('transition');
    return;
  }

  // 用户切换：先恢复 transition，下一帧再写入，才能滑过去
  thumb.style.removeProperty('transition');
  requestAnimationFrame(commit);
}
```

| 模式 | 何时 | 行为 |
|------|------|------|
| `animate: false` | 首屏、resize、选项文案/数量变化 | 瞬间定位 |
| `animate: true` | 用户改选中项 | `rAF` 后更新，触发 240ms 滑动 |

调度（React 用三个 `useLayoutEffect`；Vanilla 等价即可）：

1. **value 变化**：第一次无动画，之后开启动画。  
2. **选项文案/数量变化**：重测，不动画。把 options 序列化成稳定 `optionKey`（如 `value + '\\0' + label` 拼接），**不要**把 options 数组引用当依赖，否则父组件每次 render 都会重置动画。  
3. **ResizeObserver + window resize**：自适应宽度，不动画。

`applyThumb` 保持引用稳定时，用 `valueRef.current` 读最新选中值，避免闭包过期。

## CSS（要点）

```css
.dp-segment {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  padding: 3px;
  gap: 2px;
  border: var(--dp-border-width) solid var(--dp-border);
  border-radius: var(--dp-radius-pill);
  background: var(--dp-fill-2);
}

.dp-segment__thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 0;
  z-index: 0;
  width: 0;
  border-radius: var(--dp-radius-pill);
  background: var(--dp-color-action);
  pointer-events: none;
  will-change: transform, width;
  transition:
    transform var(--dp-transition-medium),
    width var(--dp-transition-medium),
    opacity var(--dp-transition-fast);
}

.dp-segment__item {
  position: relative;
  z-index: 1;
  background: transparent;
  color: var(--dp-text-1);
  font-weight: 600;
  transition: color var(--dp-transition-medium);
}

.dp-segment__item.is-active {
  color: var(--dp-text-on-primary);
  /* 禁止再写 background */
}

.dp-segment__item:hover:not(.is-active):not(:disabled) {
  background: var(--dp-fill-3);
}

@media (prefers-reduced-motion: reduce) {
  .dp-segment__thumb,
  .dp-segment__item { transition-duration: 0.01ms !important; }
}
```

- 动效：**240ms** + emphasize（`--dp-transition-medium` 已含 duration 与 easing）。  
- **不要**再追加 `--dp-ease-emphasize`，否则整条 `transition` 无效。  
- Dark：thumb 仍用 `--dp-color-action`；选中白字；未选统一 `--dp-text-1`（Token 已映射为浅色）。

| 状态 | 背景 | 文字 |
|------|------|------|
| 未选中 | 透明 | `--dp-text-1` |
| 选中 | **仅 thumb** | `--dp-text-on-primary` |
| Hover（未选） | `--dp-fill-3` | `--dp-text-1` |

## React 接口（推荐）

受控组件即可，不必绑某一 UI 库：

```tsx
<DpSegment
  className="dp-segment--inline"
  aria-label="运行模式"
  value={mode}
  onChange={setMode}
  options={[
    { label: '训练 + 预测', value: 'train_predict' },
    { label: '仅预测（服务端模型）', value: 'predict_only' },
  ]}
/>
```

| Prop | 说明 |
|------|------|
| `value` / `onChange` | 受控选中值 |
| `options` | `{ label, value, disabled? }` |
| `size` | `default` \| `sm` |
| `className` | 常用 `dp-segment--inline` |

## 禁止

| ❌ | 原因 |
|----|------|
| 给 `.is-active` 再铺 Action 底 | 与 thumb 叠两层，切换闪烁 |
| 选中做成白底 + 描边 + 深蓝字 | 违反 §5.1.2 |
| 默认用 Ant Design `Segmented` | 内置 thumb + item 双层，Dark 字色不受控 |
| `options` 数组引用当 effect 依赖 | 每次 render 重置滑动 |
| 会撑开布局的 Banner 与胶囊同一行 / 放在上方 | 切换时胶囊跳动；警告放胶囊**下方** |

## 排查

- **不滑动**：`transition` 是否写了重复 easing；`optionKey` 是否被数组引用打乱；系统是否开了减少动效。  
- **thumb 错位**：确认有 `ResizeObserver`；文案变化要进 `optionKey`。  
- **首屏宽度为 0**：控件从隐藏变为可见后再测一次（`ResizeObserver` 通常会触发）。
