# contains the function to get the commands of the file 
import std/[os, json, strformat, strutils]

proc getCommands*(sessionName: string): JsonNode =
    let filePath = joinPath(getHomeDir(), ".termcord", fmt"{sessionName}.json")

    if not fileExists(filePath):
        echo "Session doesn't exist"
        return newJArray()

    let data = parseFile(filePath)

    if not data.hasKey("commands") or data["commands"].kind != JArray:
        echo "Invalid session file: no commands array"
        return newJArray()

    return data["commands"]

proc getSessions*(): seq[string] =
    let folderPath = joinPath(getHomeDir(), ".termcord")

    if not dirExists(folderPath):
        return @[]

    for kind, path in walkDir(folderPath):
        if kind == pcFile and path.endsWith(".json"):
            result.add(splitFile(path).name)