---
name: dpdesign
description: >-
  Applies DP Design (Bohrium Baseline) frontend UI rules: tokens, Product vs
  Showcase density, theme, capsule segmented controls, copy, empty states.
  Use when the user says dpdesign, DP Design, Bohrium 视觉, 设计规范, 改皮, or when
  aligning colors, typography, layout, components, i18n, or tokens to
  design-system/dp-bohrium.
---

# DP Design

触发词 **`dpdesign`**。按本文件执行；**不要**一上来读完本目录。

## 流程

1. 判定：**Product**（工具台）还是 **Showcase**（落地/营销）；语言默认 `zh`。  
2. 只打开下方路由中需要的文件。  
3. 样式用 `--dp-*`，禁止写死冲突主色。  
4. 改完用文末清单自检。  
5. 若改的是设计系统仓库：更新 `CHANGELOG.md`，Token 与指南站 CSS 双写一致。

业务专属控件可保留，须登记；禁止静默 fork 全套色板。

## 按需阅读（禁止整包塞进上下文）

| 正在做 | 打开 |
|--------|------|
| 对色 / 写 CSS / 接 Token | [tokens-cheatsheet.md](tokens-cheatsheet.md) |
| 不确定对错 | [do-dont.md](do-dont.md) 对应节 |
| 胶囊、颜色/语言模式切换 | [segment.md](segment.md) |
| 规范缺口，或改设计系统本身 | 仓库 `docs/设计规范.md`、`docs/CHANGELOG.md` |
| 视觉对照 | 指南站 `styleguide/` 对应页 |

不要打开：`INSTALL.md`、`README.md`、`templates/`（给人看的）。  
不要默认打开整本 `设计规范.md`。

无设计系统路径时：以本包速查 + 用户给的指南站 / Token 文件为准。

## 硬约束

**色**
- Primary / Action ≈ `#3b45e5` / `#3c49dd`；禁青霓虹；禁业务站改 Primary。  
- 实心填充上的字：`--dp-text-on-primary`。  
- Dark 链接 / 侧栏选中 / Tabs / 线型图标：`--dp-color-action-fg`；**禁止**用 `--dp-color-action` 当字色。

**Product / Showcase**
- Product：边框优先；壳层 **倒 L**（侧栏通高、Logo 窗口左上角）；主容器 **16**；控件 **8/4**；内容**顶满工作区**（禁 `max-width: 1200`）；一页一个主按钮。表单字段区仍可 720。  
- Showcase：通栏 ≤1280；大卡可 16–20；紫蓝渐变仅展示区块。

**结构**
- 嵌套圆角：`子 = max(0, 父 − P)` 再下取阶梯。例外：pill Chip / 开关 / 胶囊 / 媒体裁切。  
- 顶栏 **64**；Logo **28–32**，**始终在整个窗口左上角**（Product：侧栏通高、Logo 在侧栏顶；Showcase：顶栏最左）。禁止顶栏通栏把 Logo 压到顶栏下方。侧栏项高 **40**；功能入口无边框盒。  
- Showcase 分区页脚；Product 默认无页脚或单行版权。  
- 空态 / Result：线型图标 **48–64** → 标题 → 说明 → 一主按钮；**禁用** `illustrations/*.svg`。  
- Focus：Action 边 + 3px 环。按钮 Hover：变色 + 发光，禁止位移。

**模式与主题**
- 颜色 / 语言 / 2–4 项互斥模式 → **`.dp-segment`**（独立滑动 thumb，选中白字）。实现见 [segment.md](segment.md)。  
- 颜色默认 **`system`**；解析后写 `html[data-dp-theme=light|dark]`。禁止 invert、单钮循环、矩形 tab、「深/浅」单字、Ant `Segmented` 默认皮。

**文案**
- `zh`：简单词写中文（任务，不要夹 Job）；错误 = 现象 + 下一步；按钮用具体动词。

**Dark（改主题时扫一遍）**
- 深底只用 `--dp-text-1/2/3/4`；禁写死 `#1d2129` `#4e5969` `#020c1a` `#000`。  
- 主按钮：深 Action 底 + 白字。浅底徽章用近白或 `action-fg`。

## 验收

- [ ] Logo 在整个窗口左上角（Product 倒 L / Showcase 顶栏左）  
- [ ] `--dp-*` Token；未写死冲突主色  
- [ ] Product 容器 16、控件 8/4、页宽顶满；嵌套圆角已按公式  
- [ ] 实心填充为 on-primary；Dark 深底无深字  
- [ ] 模式切换为胶囊；颜色默认跟随系统  
- [ ] 空态用线型图标，未引用存档插画  
- [ ] `zh` 文案符合规则；一页一个 Primary  
