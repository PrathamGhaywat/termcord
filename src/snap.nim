import std/[os, json, strformat]

proc snap(sessionName: string, cmd: string) =
  var data: JsonNode

  let homeDir = getHomeDir()
  let termcordDir = homeDir / ".termcord"

  createDir(termcordDir)

  let filePath = termcordDir / fmt"{sessionName}.json"

  if fileExists(filePath):
    data = parseFile(filePath)
  else:
    data = %*{
      "commands": []
    }

  data["commands"].add(%cmd)

  writeFile(filePath, data.pretty())