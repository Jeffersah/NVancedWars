module RngHelper

let createRng() = System.Random()

let printable =
    [|
        yield! ['0'..'9']
        yield! ['a'..'z']
        yield! ['A'..'Z']
    |]

let generateString (random: System.Random) charsLong =
    let arr = Array.init charsLong (fun _ -> printable[random.Next(printable.Length)])
    new System.String(arr)