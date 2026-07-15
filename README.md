# TermCord

> **Persistent terminal memory for AI coding agents.**
>
> Record shell commands once. Replay them forever.

AI coding agents lose context. Every new session starts with:

- "How did we start the dev server?"
- "What was the Docker command again?"
- "How do I regenerate the client?"
- "What was the exact build pipeline?"

TermCord gives agents (and humans) a persistent command memory that survives context windows, chat sessions, and even different AI tools.

Instead of generating boilerplate commands over and over, agents can simply retrieve and execute known-good workflows.

---

## Why?

Modern AI agents are stateless. Your terminal isn't.

TermCord bridges that gap by letting agents build a reusable library of shell workflows.

Examples:

- start development environments
- build projects
- generate clients
- run migrations
- deploy services
- execute release pipelines
- bootstrap repositories

Record them once.

Reuse them forever.

---

## Example

Record a workflow:

```bash
termcord snap dev
```

Run your normal commands:

```bash
npm install
npm run dev
```

Stop recording.

Later—even in a completely new AI conversation:

```bash
termcord execute dev
```

The exact same commands are replayed from the current working directory.

No hallucinated flags.

No forgotten steps.

No asking the user again.

---

## Perfect for AI Agents

TermCord acts as long-term procedural memory.

An AI agent can:

1. discover existing workflows

```bash
termcord list
```

2. inspect a workflow

```bash
termcord get dev
```

3. execute it

```bash
termcord execute dev
```

4. create new ones
```txt
See the termcord skill to generate a new workflow
```

Instead of reinventing commands every session, the agent builds a reliable command library over time.

This makes it ideal for:

- Claude Code
- Codex
- Cursor
- Gemini CLI
- Aider
- Roo Code
- OpenCode
- any terminal-based AI agent

---

## Installation

```bash
npm install -g @pratham/termcord
```

## Usage

```bash
termcord snap <name>       # Record a workflow
termcord execute <name>    # Replay it
termcord get <name>        # Show stored commands
termcord list              # List all workflows
termcord delete <name>     # Remove a workflow
```

---

## Storage

Sessions are stored as plain JSON files:

```text
~/.termcord/
```

They're portable, editable, versionable, and easy to back up.

---

## Example Workflows

```text
dev
build
docker-up
docker-reset
migrate
seed
release
benchmark
lint
test
```

Instead of repeatedly prompting an AI for these commands, store them once and execute them with a single command.

---

## Philosophy

Documentation tells an AI *what* to do.

TermCord remembers *how* to do it.

Think of it as executable memory for the terminal.

---

## Build From Source

Requires [Nim](https://nim-lang.org/).

```bash
nim c -d:release --opt:speed -o:termcord src/main.nim
```

---

## License

MIT