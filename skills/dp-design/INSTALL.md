# DP Design Agent Pack · 安装说明

版本见设计系统 `docs/CHANGELOG.md`。  
**执行指令：`SKILL.md`**（Cursor 与其他工具共用）。`AGENT.md` 仅为旧路径兼容，会指向 `SKILL.md`。

## 步骤

1. 从指南站「介绍」页下载 zip，解压得到 `dp-design/`。  
2. 放入目标项目：

```text
your-project/.cursor/skills/dp-design/   # Cursor（推荐）
your-project/docs/dp-design/             # 与编辑器解耦
```

3. 让所用工具加载 **`SKILL.md`**（Cursor 放进 `.cursor/skills/` 即可自动发现）。  
4. 对话说 **`dpdesign`**。  
5. 样式对照指南站。

## 各工具

| 工具 | 做法 |
|------|------|
| **Cursor** | 拷到 `.cursor/skills/dp-design/`；说 **`dpdesign`** |
| **任意 / 未知** | 加载 `SKILL.md`；用户说 `dpdesign` 时按该文件执行 |
| **Claude Code** | `CLAUDE.md`：说 `dpdesign` 时遵循 `SKILL.md` |
| **GitHub Copilot** | 项目指令指向 `SKILL.md` + 触发词 `dpdesign` |
| **Windsurf / Continue** | 规则指向 `SKILL.md` |
| **Codex / AGENTS.md** | 合并 [templates/AGENTS.snippet.md](templates/AGENTS.snippet.md) |

## 包内文件

| 文件 | 给谁 | 作用 |
|------|------|------|
| `SKILL.md` | Agent | **执行指令**（流程 + 硬约束 + 按需路由） |
| `tokens-cheatsheet.md` | Agent | Token 表；对色时再打开 |
| `do-dont.md` | Agent | 正反例；拿不准时再打开 |
| `segment.md` | Agent | 胶囊实现；做模式切换时再打开 |
| `AGENT.md` | 兼容 | 指向 SKILL.md |
| `INSTALL.md` / `README.md` | 人 | 安装说明；Agent 不必读 |
| `templates/AGENTS.snippet.md` | 人 | 合并进仓库 AGENTS.md |

Agent **按任务打开参考文件**，不要一次读完全包。
