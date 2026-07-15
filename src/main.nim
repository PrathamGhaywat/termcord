import std/[os, json, strformat]
import snap, delete, execute, get

proc printUsage() =
    echo "Usage:"
    echo "  termcord snap <name>     - Record commands into a session"
    echo "  termcord get <name>      - List commands in a session"
    echo "  termcord list            - List all sessions"
    echo "  termcord delete <name>   - Delete a session"
    echo "  termcord execute <name>  - Execute a session's commands"

proc main() =
    if paramCount() == 0:
        printUsage()
        return

    let command = paramStr(1)

    case command
    of "snap":
        if paramCount() < 2:
            echo "Usage: termcord snap <sessionName>"
            return
        let sessionName = paramStr(2)
        echo &"Recording into session '{sessionName}' (type '!exit' to stop):"
        while true:
            stdout.write("> ")
            let cmd = readLine(stdin)
            if cmd == "!exit":
                break
            snap(sessionName, cmd)
            discard execShellCmd(cmd)

    of "get":
        if paramCount() < 2:
            echo "Usage: termcord get <sessionName>"
            return
        let sessionName = paramStr(2)
        let commands = getCommands(sessionName)
        if commands.elems.len == 0:
            echo "No commands found in session."
        else:
            for i, cmd in commands.elems:
                echo &"{i+1}. {cmd.getStr()}"

    of "list":
        let sessions = getSessions()
        if sessions.len == 0:
            echo "No sessions found."
        else:
            echo "Sessions:"
            for s in sessions:
                echo "  - " & s

    of "delete":
        if paramCount() < 2:
            echo "Usage: termcord delete <sessionName>"
            return
        let sessionName = paramStr(2)
        if paramCount() >= 4:
            let cmd = paramStr(3)
            let removalType = paramStr(4)
            deleteCommand(sessionName, cmd, removalType)
        else:
            deleteSession(sessionName)

    of "execute":
        if paramCount() < 2:
            echo "Usage: termcord execute <sessionName>"
            return
        let sessionName = paramStr(2)
        runCommands(sessionName)

    else:
        echo &"Unknown command: {command}"
        printUsage()

when isMainModule:
    main()
