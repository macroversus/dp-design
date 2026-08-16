# AGENTS.md 片段 · DP Design

将以下内容合并进项目根目录 `AGENTS.md`（若无则新建）。路径按实际放置调整。

```markdown
## Frontend · DP Design

Trigger: **dpdesign**

When the user says `dpdesign`, or when changing frontend UI (layout, theme, components, copy, empty states, i18n):

1. Follow `docs/dp-design/SKILL.md` (or `.cursor/skills/dp-design/SKILL.md`).
2. Do not load the whole pack. Open tokens-cheatsheet / do-dont / segment only when the routing table in SKILL.md says so.
3. Prefer `--dp-*` tokens; do not hard-code a conflicting primary.
4. Mode switches use `.dp-segment` (see segment.md).
5. Empty states: outlined icons 48–64; do not use archived illustration SVGs.
```
