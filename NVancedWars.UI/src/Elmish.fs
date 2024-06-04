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

let update (msg) (model) =
    match msg, model with

    | TriggerLogin (user, pass), NotAuthenticated { isReqInFlight = None } -> 
        let req () = async {
            let! result = Bridge.AskServer(fun (replyChannel:IReplyChannel<PlayerToken option>) -> Account (Login ({ user = user; password = pass }, replyChannel)))
            return LoginOrRegisterResult result
        }
        NotAuthenticated { isReqInFlight = Some user; loginFailed = false }, Cmd.OfAsync.either req () id (fun _ -> LoginOrRegisterResult None)

    | TriggerRegister (user, pass), NotAuthenticated { isReqInFlight = None } -> 
        let req () = async {
            let! result = Bridge.AskServer(fun (replyChannel:IReplyChannel<Result<PlayerToken, string>>) -> Account (Register ({ user = user; password = pass }, replyChannel)))
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
        Html.div (sprintf "Logged in as %s" state.username)