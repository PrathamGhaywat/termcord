# contains the deleteSession and deleteCommand function

import std/[os, json, strformat]

proc deleteSession*(sessionName: string) =
    ## Deletes the session file itself.
    var filePath = joinPath(getHomeDir(), ".termcord", fmt"{sessionName}.json")

    try:
        removeFile(filePath)
    except OSError:
        echo "Could not delete session. It may not exist"


proc deleteCommand*(sessionName: string, cmd: string, removalType: string) =
    var filePath = joinPath(getHomeDir(), ".termcord", fmt"{sessionName}.json")

    if not fileExists(filePath):
        echo "Session does not exist"
        return

    if removalType != "one" and removalType != "all":
        echo "removalType must be \"one\" or \"all\""
        return

    var data = parseFile(filePath)

    if not data.hasKey("commands") or data["commands"].kind != JArray:
        echo "Invalid session file: no commands array"
        return

    var newCommands = newJArray()
    var removed = false

    for command in data["commands"]:
        if command.getStr() == cmd:
            if removalType == "all":
                continue
            if removalType == "one" and not removed:
                removed = true
                continue
        newCommands.add(command)

    data["commands"] = newCommands

    writeFile(filePath, data.pretty())

    if removed or removalType == "all":
        echo "Command(s) deleted."
    else:
        echo "Command not found."

