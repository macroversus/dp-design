# DP Design · Agent 指南（工具无关）

指导任意 AI 编程助手 / IDE Agent 按 **DP Design（Bohrium Baseline）** 修改或新建前端界面。  
本文件为包内**主指令**；不依赖某一家编辑器。

**触发词：`dpdesign`** — 用户说出该词（或「按 dpdesign 改」）时，按本指南执行。

样式对照以 **DP Design 指南站**为准；文字与 Token 以设计系统规范为准。

## 何时使用

- 用户说出 **`dpdesign`**
- 用户要求按 DP / Bohrium / 设计规范改前端、改皮、统一视觉
- 调整主色、圆角、侧栏/顶栏、表单、表格、反馈、空态、文案、中英模式
- 接入或同步 `dp-bohrium.css` Token

## 单一事实来源（按需打开，勿整本塞入上下文）

| 内容 | 路径或位置 |
|------|------------|
| 规范正文 | 设计系统仓库 `docs/设计规范.md`（若在业务仓，向用户确认路径） |
| Changelog | `docs/CHANGELOG.md` |
| Token | `tokens/dp-bohrium.css` |
| 样式参考站 | 指南站 `styleguide/`（侧栏各页） |
| 本包速查 | [tokens-cheatsheet.md](tokens-cheatsheet.md) · [do-dont.md](do-dont.md) |

若仓库不含设计系统路径：以本包 cheatsheet + 用户提供的指南站 URL / Token 文件为准。

## 改站前判定

1. **场景**：Product（工具台 / 侧栏工作台）还是 Showcase（营销 / 落地）？双密度规则不同。  
2. **语言**：默认 `zh`（自然中文）；需要时 `en`。  
3. **例外**：业务专属控件可保留，须在站点说明中登记；禁止静默 fork 全套色板。

## 执行流程

1. 阅读本文件 + [tokens-cheatsheet.md](tokens-cheatsheet.md)。  
2. 按改动类型查阅规范对应节（色、字、布局/Shape、组件/模板、动效、文案、i18n、治理）。  
3. **优先引用 Token**（`--dp-*`），禁止写死主色替代 Token。  
4. 需要视觉对照时打开指南站对应页。  
5. 改完对照 [do-dont.md](do-dont.md) 与下方验收清单自检。  
6. 若改动了设计系统本身：更新 Changelog，并保持 Token 与预览站 CSS 双写一致。

## 硬约束

- Primary / Action 落在品牌蓝区间（约 `#3b45e5` / `#3c49dd`），禁止青霓虹主色、禁止业务站私自改 Primary  
- Product：边框优先、**主容器圆角 16px**（`--dp-radius-container`）、控件仍 8/4、一页一个主按钮、卡片克制阴影  
- Showcase：可用更大圆角与蓝味阴影；紫蓝渐变仅展示区块  
- **嵌套圆角（同心 · S9-A）**：圆角容器内再套圆角容器时，**禁止父子同用一个 radius Token 敷衍**。先算  
  `子圆角 = max(0, 父圆角 − 该侧内边距 P)`，再**就近下取**到阶梯。Product 常见：父容器 **16** + padding 8 → 子 **8**；父 **16** + padding 24 → 子 **0**。禁止内层再写 `--dp-radius-container` / 与父同大。Pill Chip / 开关除外；媒体裁切可不强制。凡「卡套卡 / 卡套结果区」必须过公式  
- Focus：Action 边 + 3px 半透明环  
- **对比度**：Action / Primary **实心填充**上的文字与字母必须用 `--dp-text-on-primary`；禁止深蓝底叠黑字 / Text 1（Avatar、Logo 色块尤易踩坑）。若全局有 `color: !important`，须专用类压过继承  
- **顶栏功能入口**（打开会话/智能体/对话/工作流等）：图标 + 文案、**无边框盒**；14px · 600 · Text 1  
- **模式开关**（浅色/深色等）：**保留按钮边框**（Secondary / 图标钮 32×32）；用稳定日月 SVG；禁「深/浅」单字；图标坏了修 path，不回退汉字  
- **壳层尺寸**：顶栏 **64**；Logo **28–32**；侧栏菜单项高 **40**；Showcase 一级菜单 14/500、热区 ≥40  
- **站点页脚**：Showcase / 落地页用分区页脚（链接 Text2 · 版权 Text3）；Product 控制台默认**无页脚**或仅单行版权；禁页脚 Primary 大按钮  
- 空态 / Result：**线型大图标 48–64**；**不要**使用当前 `illustrations/*.svg` 存档插画  
- `zh`：简单词写中文（任务，不要夹 Job）；学科专名用稳定中文译名；品牌名与单位符号可留英  
- 文案：严谨 · 正式 · 精准 · 简练；错误 = 现象 + 下一步  
- 暗色用主题 Token 重映射（如 `data-dp-theme`），禁止整页 invert  

## 验收清单（改前端时勾选）

- [ ] 已用 `--dp-*` Token，未写死冲突主色  
- [ ] Product：主容器 16（`--dp-radius-container`）；控件 8/4；Showcase 密度符合场景  
- [ ] 嵌套圆角已按同心公式（子 = max(0, 父 − P) 再下取）；无「内外同 16 / 同 8」挤缝  
- [ ] 主按钮唯一；表单 Focus / 错误说明齐全  
- [ ] 实心 Action/Primary 上的字为 on-primary；Avatar/Logo 可读  
- [ ] 主题 / 下载等为图标；无「深/浅」单字钮  
- [ ] 顶栏 64 · Logo 28–32 · 菜单/入口 14；功能入口无框、模式开关有边框  
- [ ] Showcase 页脚分区正确；Product 无页脚或单行版权  
- [ ] 空态 / Result：线型图标 → 标题 → 说明 → 一主按钮（勿用存档插画）  
- [ ] 文案与 `zh`/`en` 规则符合规范  
- [ ] 未引入违规 glow / 无谓中英混排 / 多主色  

## 安装

见 [INSTALL.md](INSTALL.md)。核心做法：把本目录放进项目，并让所用 AI 工具加载 **AGENT.md**。  
触发时用户说 **`dpdesign`** 即可。
