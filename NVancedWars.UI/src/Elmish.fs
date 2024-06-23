module NVancedWars.App.Elmish
open App

open Elmish
open NVancedWars.Shared
open Feliz
open Elmish.Bridge

type ClientMessage = 
    | TriggerLogin of string * string
    | TriggerRegister of string * string
    | LoginOrRegisterResult of PlayerToken option

type ClientState = {
    username: string
    token: PlayerToken
}

type NonAuthState = {
    isReqInFlight: string option
    loginFailed: bool
}


type ClientMainState =
    | NotAuthenticated of NonAuthState
    | Authenticated of ClientState

let init () = 
    NotAuthenticated { isReqInFlight = None; loginFailed = false }, Cmd.none

    
let inline ask useRealServer (fn: ReplyChannel<'reply> -> MsgToServer) : Async<'reply> =
    if useRealServer then
        (NVancedWars.MockServer.actualRequestBuilder<'reply> fn)
    else
        (NVancedWars.MockServer.mockRequestBuilder<'reply> fn)

let update (useRealServer) (msg) (model) =
    let inline ask f = ask useRealServer f

    match msg, model with

    | TriggerLogin (user, pass), NotAuthenticated { isReqInFlight = None } -> 
        let req () = async {
            let! result = ask(fun (replyChannel: ReplyChannel<PlayerToken option>) -> Account (Login ({ user = user; password = pass }, replyChannel)))
            return LoginOrRegisterResult result
        }
        NotAuthenticated { isReqInFlight = Some user; loginFailed = false }, Cmd.OfAsync.either req () id (fun _ -> LoginOrRegisterResult None)

    | TriggerRegister (user, pass), NotAuthenticated { isReqInFlight = None } -> 
        let req () = async {
            let! result = ask(fun (replyChannel:ReplyChannel<Result<PlayerToken, string>>) -> Account (Register ({ user = user; password = pass }, replyChannel)))
            return LoginOrRegisterResult (match result with | Error _ -> None | Ok value -> Some value)
        }
        NotAuthenticated { isReqInFlight = Some user; loginFailed = false }, Cmd.OfAsync.either req () id (fun _ -> LoginOrRegisterResult None)

    | LoginOrRegisterResult None, NotAuthenticated { isReqInFlight = Some _ } ->
        NotAuthenticated { isReqInFlight = None; loginFailed = true }, Cmd.none

    | LoginOrRegisterResult (Some token), NotAuthenticated { isReqInFlight = Some user }->
        Authenticated { username = user; token = token }, Cmd.none
    | _ -> model, Cmd.none

let view model dispatch =
    match model with
    | NotAuthenticated { isReqInFlight = isReqInFlight; loginFailed = failed } ->
        LoginComponents.LoginOrRegister (Option.isSome isReqInFlight,  failed, (TriggerLogin >> dispatch), (TriggerRegister >> dispatch))
    | Authenticated state ->
        NVancedWars.App.Pages.Frame.FrameComponents.Frame(state.username)
