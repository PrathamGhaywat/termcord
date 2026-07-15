import std/[os, json, strformat]

proc runCommands*(sessionName: string) =
  let filePath = joinPath(getHomeDir(), ".termcord", fmt"{sessionName}.json")
  if not fileExists(filePath):
    echo "Session doesn't exist"
    return
  let data = parseFile(filePath)
  if not data.hasKey("commands") or data["commands"].kind != JArray:
    echo "Invalid session file: no commands array"
    return
  for cmd in data["commands"]:
    echo "> " & cmd.getStr()
    discard execShellCmd(cmd.getStr())