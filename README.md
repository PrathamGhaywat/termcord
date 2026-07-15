# TermCord - Let the agents memorize the commands
TermCord is a CLI tool that let's humans aswell as agents read, write and execute boilerplate commands into one directory located at your home folder, so that neither you nor your agent has to memorize obscure unreadable commands.

This makes commands easy to use across sessions, context windows and ultrafast.

## Installation

```bash
npm install -g termcord
```

## Usage

```bash
termcord snap <name>       # Record a workflow
termcord execute <name>    # Replay it
termcord get <name>        # Show stored commands
termcord list              # List all workflows
termcord delete <name>     # Remove a workflow
```


## Storage

Sessions are stored as plain JSON files:

```text
~/.termcord/
```

They're portable, editable, versionable, and easy to back up.


## License
MIT License so you can build on top of it, around it or with it!


## Liked this?
If you like this please star this repository. If you want to see more awesome stuff from me, you can follow me on X: https://x.com/@prathamghaywat