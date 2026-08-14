# DP Design Agent Pack · 安装说明（任意 AI 编程工具）

版本：与指南站一致时见设计系统 `docs/CHANGELOG.md`。  
包内**主指令**始终是 **`AGENT.md`**（工具无关）。其余文件为速查或某工具的薄适配。

## 通用步骤（推荐）

1. 从指南站「介绍」页下载 zip，解压得到 `dp-design/`。  
2. 放入目标项目（路径任选其一，团队统一即可）：

```text
your-project/docs/dp-design/     # 推荐：与编辑器解耦
# 或
your-project/.ai/dp-design/
# 或
your-project/design/dp-design/
```

3. 按下方矩阵，让你的 AI 工具**加载或引用** `AGENT.md`。  
4. 改前端时说 **`dpdesign`**（推荐触发词）。  
5. 样式细节打开指南站对照。

---

## 各工具怎么接

| 工具 | 建议做法 |
|------|----------|
| **任意 / 未知工具** | 加载 `AGENT.md`；用户说 **`dpdesign`** 时按该文件执行 |
| **Cursor** | 拷到 `.cursor/skills/dp-design/`（`SKILL.md` 的 `name` 为 `dpdesign`）；对话说 **`dpdesign`** |
| **Claude Code** | `CLAUDE.md` 写明：用户说 `dpdesign` 时遵循 `docs/dp-design/AGENT.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` 中写明触发词 `dpdesign` 与路径 |
| **Windsurf** | 项目规则指向 `AGENT.md`，触发词 `dpdesign` |
| **Continue** | rules 引用 `AGENT.md`，触发词 `dpdesign` |
| **Codex / AGENTS.md** | 合并 [templates/AGENTS.snippet.md](templates/AGENTS.snippet.md) |
| **VS Code + 任意 Chat** | 工作区加入 `AGENT.md`；用户说 `dpdesign` |

---

## 包内文件

| 文件 | 作用 |
|------|------|
| `AGENT.md` | **主指令**（所有工具共用） |
| `tokens-cheatsheet.md` | Token / 圆角 / 字体速查 |
| `do-dont.md` | 正反例 |
| `SKILL.md` | 仅 Cursor 发现用（指向 AGENT.md） |
| `templates/AGENTS.snippet.md` | 合并进根目录 AGENTS.md 的片段 |
| `INSTALL.md` / `README.md` | 给人看的安装与说明 |

**不含**特定站点落地顺序；任意对齐 DP Design 的产品均可使用。
