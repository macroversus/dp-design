# DP Design · Token 速查

完整变量见 `tokens/dp-bohrium.css`。改站时优先引用，勿复制数字后丢 Token 名。

## 品牌与语义

| Token | 典型值 | 用途 |
|-------|--------|------|
| `--dp-color-primary` | `#3b45e5` | 主品牌蓝 |
| `--dp-color-action` | `#3c49dd`（Dark 填充 `#6b74f2`） | **实心**主按钮 / 边框强调 |
| `--dp-color-action-fg` | Light=Action；Dark=`#d2d6ff` | **文字/链接/选中/图标**（暗色须浅） |
| `--dp-color-primary-hover` | `#626aea` | Hover |
| `--dp-color-primary-active` | `#2f37b7` | Active |
| `--dp-color-action-bg-light` | `#e8f3ff` | 浅底 / Tag |
| `--dp-color-accent-violet` | `#5d26ff` | Showcase 辅色（慎用） |
| `--dp-text-on-primary` | `#ffffff` | **实心** Primary/Action 上的字、Avatar 字母 |
| `--dp-icon-color-active` | 同 `action-fg` | 激活线型图标 |
| `--dp-success` | `#0ab268` | 成功 |
| `--dp-warning` | `#ff7d00` | 警告 |
| `--dp-error` | `#ff4747` | 错误 |

## 文本与表面

| Token | Light | Dark（须浅） | 用途 |
|-------|-------|--------------|------|
| `--dp-text-1` | `#1d2129` | `#f5f6f8` | 主文案 |
| `--dp-text-2` | `#4e5969` | `#d0d3e0` | 次文案 |
| `--dp-text-3` | `#86909c` | `#a0a6bb` | 辅助 |
| `--dp-text-4` | `#c9cdd4` | `#9aa0b5` | 最弱辅助（Dark 仍须浅） |
| `--dp-bg-page` | `#f4f5f7` | `#0c0f15` | 页面底 |
| `--dp-bg-layout` | `#f4f6fb` | `#12162a` | 布局底 |
| `--dp-bg-white` | `#ffffff` | `#1a1f36` | 卡片 |
| `--dp-border` | `#e5e6eb` | `#2e3554` | 默认边框 |

### Dark 文字规则（摘要）

深色底上的字必须浅色。正文只用 `--dp-text-*`；链接/选中/图标用 `--dp-color-action-fg`，不要用 `--dp-color-action` 当字色。实心填充与胶囊选中用 `--dp-text-on-primary`。胶囊实现见 [segment.md](segment.md)。  

## 圆角与布局（摘要）

| Token / 规则 | 值 |
|--------------|-----|
| `--dp-radius-xs` | `2px` |
| `--dp-radius-sm` | `4px` |
| `--dp-radius` | `8px`（**控件**默认） |
| `--dp-radius-lg` | `12px` |
| `--dp-radius-xl` / `--dp-radius-container` | `16px`（**Product 主容器**默认） |
| Showcase 大卡 | ≤ `20px` |
| 网格 | 8px |
| 侧栏 / 顶栏 | 220（收起 72）/ **64** |
| Logo | 高 **28–32**；**整个窗口左上角**；名 16·600；间距 8 |
| Product 壳层 | **倒 L**：侧栏通高含 Logo，顶栏只在侧栏右侧 |
| 侧栏菜单项 | 高 **40**；字 14；图标 20 |
| Product 内容宽 | **顶满工作区**（`--dp-container: 100%`，无 1200 上限） |
| Showcase 内容宽 | ≤ `1280px` |
| 站点页脚 | Showcase 用；Product 默认无；链接 Text2 / 版权 Text3 |

### 嵌套圆角（必须算，禁止偷懒同 Token）

```text
子圆角 = max(0, 父圆角 − 内边距 P)  →  再下取到上表阶梯
```

| 父 R | P | 子 R |
|------|---|------|
| **16**（容器） | 8 | **8** |
| **16** | 24 | **0** |
| 8 | 4 | 4（sm） |
| 12 | 4 | 8 |

例外：pill Chip/开关/胶囊切换；媒体裁切。规范正文 §4.1.1–4.1.2、§5.1.2。

## 字体

- 中文 UI：`PingFang SC`, `MiSans`, `Microsoft YaHei`, sans-serif  
- 代码：`JetBrains Mono` 等 mono 栈  

## 接入

```html
<link rel="stylesheet" href="path/to/dp-bohrium.css" />
```

主题：默认 `system`；`localStorage.dp-theme` = `system|light|dark`；解析后 `html[data-dp-theme="light|dark"]`。模式切换用胶囊，见 [segment.md](segment.md)。
