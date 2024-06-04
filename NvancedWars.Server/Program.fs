open Suave
open Suave.Operators
open Elmish
open Elmish.Bridge
open NVancedWars.Shared
open NVancedWars.Server.UserAccounts

[<EntryPoint>]
let main argv = 
    let servePath = 
        #if DEBUG
            "../../../../NVancedWars.UI/dist"
        #else
            "./public"
        #endif

    let cts  = new System.Threading.CancellationTokenSource()
    let config = {defaultConfig with cancellationToken = cts.Token; homeFolder = Some("./public")}

    let userAccountControl = Async.RunSynchronously <| (UserAccountController.init (Persist.toBinaryFile "users.db"))

    let init, update = UserElmish.elmishMethods userAccountControl ()

    let server =
        Bridge.mkServer NVancedWars.Shared.Variables.endpoint init update
        |> Bridge.run Suave.server

    let webPart =
      choose [
        server
        Filters.path "/" >=> Files.file (sprintf "%s/index.html" servePath)
        Filters.GET >=> Filters.pathScan "/assets/%s" (fun s -> Files.file (sprintf "%s/assets/%s" servePath s))
        Filters.GET >=> Filters.pathScan "/%s" (fun s -> Files.file (sprintf "%s/%s" servePath s))
      ]

    let listening, server = startWebServerAsync config webPart
    Async.Start (server, cts.Token)
    printfn "Running"
    let rec runUntilStop () =
        let key = System.Console.ReadKey()
        if key.Key = System.ConsoleKey.Escape then ()
        else runUntilStop()
    runUntilStop()
    cts.Cancel()
    0