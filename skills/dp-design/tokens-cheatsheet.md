# DP Design · Token 速查

完整变量见 `tokens/dp-bohrium.css`。改站时优先引用，勿复制数字后丢 Token 名。

## 品牌与语义

| Token | 典型值 | 用途 |
|-------|--------|------|
| `--dp-color-primary` | `#3b45e5` | 主品牌蓝 |
| `--dp-color-action` | `#3c49dd` | 主按钮 / 链接 |
| `--dp-color-primary-hover` | `#626aea` | Hover |
| `--dp-color-primary-active` | `#2f37b7` | Active |
| `--dp-color-action-bg-light` | `#e8f3ff` | 浅底 / Tag |
| `--dp-color-accent-violet` | `#5d26ff` | Showcase 辅色（慎用） |
| `--dp-text-on-primary` | `#ffffff` | **实心** Primary/Action 上的字、Avatar 字母 |
| `--dp-success` | `#0ab268` | 成功 |
| `--dp-warning` | `#ff7d00` | 警告 |
| `--dp-error` | `#ff4747` | 错误 |

## 文本与表面

| Token | 典型值 | 用途 |
|-------|--------|------|
| `--dp-text-1` | `#1d2129` | 主文案 |
| `--dp-text-2` | `#4e5969` | 次文案 |
| `--dp-text-3` | `#86909c` | 辅助 |
| `--dp-bg-page` | `#f4f5f7` | 页面灰底 |
| `--dp-bg-layout` | `#f4f6fb` | 布局底 |
| `--dp-bg-white` | `#ffffff` | 卡片 |
| `--dp-border` | `#e5e6eb` | 默认边框 |

## 圆角与布局（摘要）

| Token / 规则 | 值 |
|--------------|-----|
| `--dp-radius-xs` | `2px` |
| `--dp-radius-sm` | `4px` |
| `--dp-radius` | `8px`（Product 默认） |
| `--dp-radius-lg` / `xl` | `12px` / `16px` |
| Showcase 大卡 | ≤ `20px` |
| 网格 | 8px |
| 侧栏 / 顶栏 | 220（收起 72）/ 64 |
| Product 内容宽 | 约 1200；Showcase 约 1280 |

### 嵌套圆角（必须算，禁止偷懒同 Token）

```text
子圆角 = max(0, 父圆角 − 内边距 P)  →  再下取到上表阶梯
```

| 父 R | P | 子 R |
|------|---|------|
| 16 | 8 | 8 |
| 8 | 4 | 4（sm） |
| 8 | 8 或更大 | **0** |
| 12 | 4 | 8 |

例外：pill Chip/开关；媒体裁切。规范正文 §4.1.2。

## 字体

- 中文 UI：`PingFang SC`, `MiSans`, `Microsoft YaHei`, sans-serif  
- 代码：`JetBrains Mono` 等 mono 栈  

## 接入

```html
<link rel="stylesheet" href="path/to/dp-bohrium.css" />
```

主题：`html[data-dp-theme="light|dark"]`。
