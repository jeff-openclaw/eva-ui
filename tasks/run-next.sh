#!/bin/bash
# Eva-UI Task Runner — picks the next unchecked task from queue.md and runs Claude Code on it.
set -euo pipefail

QUEUE="/home/openclaw/.openclaw/workspace/eva-ui/tasks/queue.md"
LOGDIR="/home/openclaw/.openclaw/workspace/eva-ui/tasks/logs"
REPO="/home/openclaw/.openclaw/workspace/eva-ui"

mkdir -p "$LOGDIR"

# Find first unchecked task
TASK=$(grep -n '^\- \[ \]' "$QUEUE" | head -1)
if [ -z "$TASK" ]; then
  echo "NO_TASKS_REMAINING"
  exit 0
fi

LINE_NUM=$(echo "$TASK" | cut -d: -f1)
TASK_TEXT=$(echo "$TASK" | cut -d: -f2- | sed 's/^- \[ \] //')
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
LOGFILE="$LOGDIR/task-${TIMESTAMP}.log"

echo "=== Task: $TASK_TEXT ===" | tee "$LOGFILE"
echo "=== Started: $(date -u) ===" | tee -a "$LOGFILE"

# Build the Claude Code prompt
PROMPT="You are reviewing Eva-UI components for bugs, edge cases, and quality issues.

TASK: ${TASK_TEXT}

Instructions:
1. Read the relevant component files in src/components/
2. Read CLAUDE.md for project conventions
3. Check for: type errors, logic bugs, edge cases, accessibility issues, CSS problems, missing reduced-motion, missing JSDoc
4. Fix issues directly in the files
5. Run 'npx tsc --noEmit' after your changes and fix any errors
6. Summarize what you found and fixed

Be surgical — don't rewrite working code. Focus on real bugs and quality issues."

# Run Claude Code
cd "$REPO"
claude --dangerously-skip-permissions -p "$PROMPT" --output-format text 2>&1 | tee -a "$LOGFILE"
EXIT_CODE=${PIPESTATUS[0]}

echo "=== Finished: $(date -u) === Exit: $EXIT_CODE ===" | tee -a "$LOGFILE"

# Mark task as done if successful
if [ $EXIT_CODE -eq 0 ]; then
  sed -i "${LINE_NUM}s/- \[ \]/- [x]/" "$QUEUE"
  echo "TASK_COMPLETE"
else
  echo "TASK_FAILED"
fi

exit $EXIT_CODE
