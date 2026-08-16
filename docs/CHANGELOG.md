# Changelog

本文件记录 DP Design（Bohrium Baseline）设计系统的变更。  
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

设计系统版本与业务站版本**解耦**；各站自行跟进升级窗口。

每条变更尽量标注影响面：`规范` · `Token` · `预览` · `资源`。

---

## [0.1.10] — 2026-08-16

### Changed

- **规范 / Token / 资源**：Product **不再锁页宽**——内容区左右顶满工作区（`--dp-container: 100%`，`--dp-container-max: none`），随窗口变宽。Showcase 仍 ≤1280；表单字段区仍 720。同步指南站与 Agent Pack

---

## [0.1.9] — 2026-08-16

### Changed

- **规范 / Token / 资源**：明确 Dark **文字须浅色**——新增 `--dp-color-action-fg`（Dark `#d2d6ff`）用于链接/侧栏选中/图标；实心按钮仍用较深 Action + 白字。写入 Agent Pack 硬约束与速查

---

## [0.1.8] — 2026-08-16

### Changed

- **规范 / 预览 / 资源**：细化导航壳层——顶栏 64、Logo 28–32、菜单/入口 14、侧栏项高 40；新增 **站点页脚**（Showcase 分区 / Product 默认无）。同步指南站「导航与页脚」与 Agent Pack

---

## [0.1.7] — 2026-08-14

### Changed

- **规范 / Token / 资源**：Product **主容器**默认圆角改为 **16px**（新增 `--dp-radius-container`）；控件仍 8/4。嵌套公式示例以父 16 为主。同步指南站、Agent Pack

---

## [0.1.6] — 2026-08-14

### Changed

- **资源**：Agent Pack 补强**嵌套圆角同心规则（S9-A）**——写入硬约束、验收清单、`do-dont`、`tokens-cheatsheet`；禁止嵌套容器偷懒同用 `--dp-radius`

---

## [0.1.5] — 2026-08-14

### Changed

- **规范 / 资源**：顶栏分工明确——**功能入口**无框菜单；**模式开关**（主题）保留按钮边框。同步 Agent Pack 与 MacroFlow

---

## [0.1.4] — 2026-08-14

### Changed

- **规范 / 资源**：顶栏**文字菜单**改为无边框（图标+字），勿用 Secondary 描边盒；主题图标须用稳定 SVG，渲染失败属实现问题不得回退汉字。同步 Agent Pack

---

## [0.1.3] — 2026-08-14

### Changed

- **规范 / 资源**：补齐易漏规则——① 实心 Action/Primary 上必须 `--dp-text-on-primary`（Avatar/Logo）；② 主题/下载等工具钮优先图标（`time-sun`/`time-moon`、`action-download`），禁「深/浅」单字；③ 顶栏同排菜单与工具钮字号字色一致（14px · Text 1）。写入 §5.1 / §5.4.3 / §5.14，并同步 Agent Pack

---

## [0.1.2] — 2026-08-14

### Changed

- **规范 / 预览 / 资源**：插画素材**暂不使用**；空态改回线型图标 48–64（§5.7 / §5.8）。预览「插画」页改为策略说明；`illustrations/*.svg` 仅存档
- **资源**：Agent Pack 同步「勿引用存档插画」；Skill / Agent **触发词定为 `dpdesign`**

---

## [0.1.1] — 2026-08-14

### Changed

- **预览 / 资源**：改站包升级为**跨工具 Agent Pack**（主指令 `AGENT.md`）；不局限于 Cursor。介绍页下载 `dp-design-agent-pack-v0.1.1.zip`；含 `INSTALL.md` 多工具接法与 `templates/AGENTS.snippet.md`
- **资源**：`SKILL.md` 仅作 Cursor 薄适配，完整规则以 `AGENT.md` 为准

### Notes

- 旧文件名 `dp-design-skill-v0.1.0.zip` 仍保留为兼容拷贝（内容同 0.1.1 包）

---

## [0.1.0] — 2026-08-14

### Added

- **规范 / 预览 / 资源**：设计资源与治理正式落地（§13）——资源清单、SemVer、变更分级、贡献准入、业务站消费约定
- **预览 / 资源**：指南站定位为可访问样式参考站；介绍页提供改站指南包下载
- **规范 / 预览**：无障碍与国际化 §5.16（`zh` / `en`；自然中文用词；a11y 基线）并验收通过
- **规范 / 预览**：文案 §5.12；组件 B1–B3（§5.13–5.15）
- **资源**：图标包 `styleguide/icons-sprite.svg` + `icons-registry.json`（约 170）
- **资源**：插画 6 张 `styleguide/illustrations/dp-illust-*.svg`
- **资源**：Agent 指南源目录 `skills/dp-design/`
- **Token**：`tokens/dp-bohrium.css`（预览站同步 `styleguide/dp-bohrium.css`）

### Changed

- `zh` 用词：简单界面词写中文（Job → 任务），勿无谓夹英文；学科专名用稳定中文译名
- 取消拟议中的 `zh-gloss` 语言模式

### Notes

- Logo 源文件待品牌提供（`assets/logo/` 为占位）
- Figma 库外链待填
- 价值观与原则暂缓

---

## 版本尚未发布时的约定

- 当前系列以 `0.x` 表示指南站建设期；`1.0.0` 建议在四站至少一站完成 Token 对齐且 Logo/Figma 就绪后发布
- Breaking 变更须升 MAJOR（`0.x` 期间可用 MINOR 提示破坏性，但须在条目中标明 **Breaking**）
