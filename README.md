# polish-ui

A skill that makes coding agents build cleaner UI. It gives them 17 rules for screens a person understands without reading an explanation.

![polish-ui fixing an endpoints dashboard, one change at a time](media/polish-ui-dashboard.gif)

## Install

```sh
npx skills add hoangvu12/polish-ui
```

Or copy `skills/polish-ui` into your agent's skills folder, for example `~/.claude/skills/` for Claude Code.

## How it works

The agent loads the skill when it builds, changes or reviews UI. `SKILL.md` holds the rules. Five side files cover copy, layout, forms, accessibility and web code, and the agent reads one only when the work needs it.

Each rule has a number, so you can cite it in a review. "polish 13" means feedback shows where the action happened.

Motion rules hand off to [Emil Kowalski's skills](https://github.com/emilkowalski/skills), and copy rules use [unslop](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop) when it is installed. Both are optional.

## License

MIT
