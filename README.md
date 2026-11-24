# polish-ui

A skill that makes coding agents build cleaner UI. It gives them 17 rules for screens a person understands without reading an explanation.

![polish-ui fixing an endpoints dashboard, one change at a time](media/polish-ui-dashboard.gif)

## Install

```sh
npx skills add hoangvu12/polish-ui
```

Or copy `skills/polish-ui` into your agent's skills folder, for example `~/.claude/skills/` for Claude Code.

## How it works

The agent loads the skill when it builds, changes or reviews UI. `SKILL.md` holds the rules. Side files cover copy, layout, alignment, forms, accessibility, web code and the tells of AI-generated UI, and the agent reads one only when the work needs it. The alignment pass comes with a probe (`gridlines/`) that draws a container's guide lines in the browser and lists every item that misses them.

Each rule has a number, so you can cite it in a review. "polish 13" means feedback shows where the action happened.

Motion rules hand off to [Emil Kowalski's skills](https://github.com/emilkowalski/skills), and copy rules use [unslop](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop) when it is installed. Both are optional.

Some surface, typography, icon, accessibility and copy details are adapted from [Jakub Krehel's skills](https://github.com/jakubkrehel/skills) (MIT). The alignment probe is adapted from [pritamux/gridlines](https://github.com/pritamux/gridlines) (MIT). The tells come from [Contra Labs' Frontier Design Benchmark](https://contralabs.com/research/frontier-design-benchmark), [Build to Launch's study of 120 AI-built sites](https://buildtolaunch.substack.com/p/fix-ai-slop-website-design) and [charles.unemployed's list of 20](https://www.tiktok.com/@charles.unemployed/video/7711428398635076885).

## License

MIT
