# DP Design（Bohrium Baseline）

统一前端视觉语言的设计系统：规范文档、样式 Token、在线指南站，以及给 AI 编程助手用的 **Agent Pack（触发词 `dpdesign`）**。

| 用途 | 入口 |
|------|------|
| 在线预览 | https://macroversus.github.io/dp-design/ |
| 源码仓库 | https://github.com/macroversus/dp-design |
| 设计规范 | [docs/设计规范.md](docs/设计规范.md) |
| 变更记录 | [docs/CHANGELOG.md](docs/CHANGELOG.md) |
| Agent Pack | [skills/dp-design/](skills/dp-design/) |

当前版本以 `docs/CHANGELOG.md` 与指南站侧栏标注为准（例如 v0.1.5）。

---

## 目录说明

```text
dp-bohrium/
├── docs/                 # GitHub Pages 发布目录（由 styleguide 同步而来，并含规范 Markdown）
├── styleguide/           # 指南站源文件（日常在这里改网页）
├── tokens/               # 业务站可引用的 Token CSS
├── skills/dp-design/     # AI Agent Pack（dpdesign）
├── assets/               # Logo 等资源占位
└── scripts/              # Pages 同步与 git hook
```

**重要：** 改指南站请编辑 `styleguide/`。`docs/` 是发布用副本，由同步脚本更新，不要只改 `docs/` 里的网页文件。

---

## 一、本地预览指南站

```bash
cd styleguide
python3 -m http.server 8765
```

浏览器打开：http://127.0.0.1:8765/

---

## 二、更新网站并发布到 GitHub Pages

日常流程：

1. 修改 `styleguide/`（HTML / CSS / JS / 图标等）
2. 提交并推送（本仓库已装 pre-commit 时会自动同步到 `docs/`）

```bash
git add styleguide
git commit -m "更新指南站"
git push
```

几分钟后刷新：https://macroversus.github.io/dp-design/

### 自动同步脚本

| 命令 | 作用 |
|------|------|
| `./scripts/sync-pages.sh` | 手动把 `styleguide/` → `docs/` |
| `./scripts/install-hooks.sh` | 安装 pre-commit（提交前自动同步） |

换电脑克隆本仓库后，先执行一次：

```bash
./scripts/install-hooks.sh
```

同步时会**保留** `docs/` 根目录下的规范 Markdown（如 `设计规范.md`、`CHANGELOG.md`），不会被删掉。

---

## 三、使用 Skills / Agent Pack（`dpdesign`）

用来让 Cursor、Claude Code 等 AI 助手按本设计系统改前端。

### 触发方式

在对话里说 **`dpdesign`**（或「按 dpdesign 改」），助手应遵循包内 **`AGENT.md`**。

### 安装方式（任选）

**方式 A：从指南站下载**

1. 打开 https://macroversus.github.io/dp-design/ →「介绍」页  
2. 下载 `dp-design-agent-pack-v*.zip` 并解压  
3. 放到目标项目，例如：

```text
your-project/docs/dp-design/          # 推荐（与编辑器解耦）
your-project/.cursor/skills/dp-design/  # Cursor 专用
```

**方式 B：直接从本仓库拷贝**

```bash
cp -a skills/dp-design /path/to/your-project/docs/dp-design
# Cursor：
# cp -a skills/dp-design /path/to/your-project/.cursor/skills/dp-design
```

### 各工具怎么接

详见 [skills/dp-design/INSTALL.md](skills/dp-design/INSTALL.md)。摘要：

| 工具 | 做法 |
|------|------|
| **任意工具** | 加载 `AGENT.md`；用户说 `dpdesign` 时按该文件执行 |
| **Cursor** | 放到 `.cursor/skills/dp-design/`（`SKILL.md` 的 name 为 `dpdesign`） |
| **Claude Code** | 在 `CLAUDE.md` 写明：说 `dpdesign` 时遵循 `AGENT.md` |
| **Copilot / 其他** | 在项目规则里指向 `AGENT.md` + 触发词 `dpdesign` |

### 包内文件

| 文件 | 作用 |
|------|------|
| `AGENT.md` | **主指令**（所有工具共用） |
| `tokens-cheatsheet.md` | Token / 圆角 / 字体速查 |
| `do-dont.md` | 正反例 |
| `SKILL.md` | Cursor 发现用（指向 AGENT.md） |
| `INSTALL.md` | 完整安装矩阵 |

---

## 许可与贡献

- 业务站只消费 Token / 组件约定，不在业务仓分叉改品牌色。  
- 规范变更请更新 `docs/设计规范.md` 与 `docs/CHANGELOG.md`，并同步 Agent Pack（`skills/dp-design/`）与指南站。  
- 更细的治理说明见设计规范「资源与治理」章节。
