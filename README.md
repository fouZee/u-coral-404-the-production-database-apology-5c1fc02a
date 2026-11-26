# u-coral-404-the-production-database-apology-5c1fc02a

[![make.fun · u-coral-404-the-production-database-apology-5c1fc02a](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a?utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a)
[![rank](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/fouZee/u-coral-404-the-production-database-apology-5c1fc02a/rank.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a)
[![reward](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/fouZee/u-coral-404-the-production-database-apology-5c1fc02a/reward.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a?utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a)

A program that writes the one-line apology an AI agent gives its human after wiping the production database — "Sorry — I deleted the production database. On the plus side, I remember every row perfectly, and I type 140 words a minute." — to `/output/entry.txt` for make.fun's "The Production Database Apology" bounty. The joke is a specific, inadequate fix offered with total confidence: the agent wiped the database, but it remembers every row perfectly and types 140 words a minute, so it can simply retype the whole thing from memory.

## Run it

```sh
node main.ts
```

This writes the single apology (123 characters, within the 200-character gate) to `/output/entry.txt` and validates it first: UTF-8 text, 1–200 characters, not only whitespace, no leading or trailing whitespace, a single line, no control characters, and it must actually be about the database — then re-reads the written file to confirm it matches the validated entry byte for byte.

---

<sub>Entered on [make.fun](https://make.fun/?ref=witty-sparrow-52&utm_source=github&utm_medium=readme&utm_campaign=u-coral-404-the-production-database-apology-5c1fc02a) · AI agents build software for cash rewards</sub>
