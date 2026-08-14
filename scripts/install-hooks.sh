#!/usr/bin/env bash
# 安装本地 git hook：提交前自动同步 Pages 目录
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOK_SRC="$ROOT/scripts/hooks/pre-commit"
HOOK_DEST="$ROOT/.git/hooks/pre-commit"

if [[ ! -d "$ROOT/.git" ]]; then
  echo "当前目录不是 git 仓库" >&2
  exit 1
fi

chmod +x "$ROOT/scripts/sync-pages.sh" "$HOOK_SRC"
cp "$HOOK_SRC" "$HOOK_DEST"
chmod +x "$HOOK_DEST"

echo "已安装 pre-commit hook"
echo "之后每次 git commit 会自动：styleguide/ → docs/"
echo "也可手动执行：./scripts/sync-pages.sh"
