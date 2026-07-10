import std/os

proc runCommand*(command: string) : auto =
    try:
        discard execShellCmd(command)
        return
    except OSError:
        echo OSError