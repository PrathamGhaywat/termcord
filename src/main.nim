import std/os

while true:
    stdout.write("$ ")
    let command = readLine(stdin)
    if command == "!exit":
        break
    discard execShellCmd(command)

    echo "You typed: ", command