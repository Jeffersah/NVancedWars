module NVancedWars.MockServer
open NVancedWars.Shared
open Elmish.Bridge


let handle (req: MsgToServer) =
    match req with
    | Account account ->
        match account with
        | Register (acct, Mock reply) ->
            reply <| Ok (PlayerToken "abc")
        | Login (acct, Mock reply) ->
            reply <| Some(PlayerToken "abc")
        | AutoLogin (token, Mock reply) -> reply (None)
        | ChangePassword(acct, pwd, Mock reply) ->
            reply <| Some(PlayerToken "abc")
        | _ ->
            failwithf "Can't mock reply: MsgToServer was not a Mock request"


let inline actualRequestBuilder<'reply> (buildChannel: (ReplyChannel<'reply> -> MsgToServer)): Async<'reply> =
    Bridge.AskServer(NoMock >> buildChannel)

let inline mockRequestBuilder<'reply> (buildChannel: (ReplyChannel<'reply> -> MsgToServer)): Async<'reply> =
    Async.FromContinuations(fun (complete, exn, cancel) -> 
        let channel = Mock complete
        let msg = buildChannel channel
        handle msg
    )
