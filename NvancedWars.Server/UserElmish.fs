module UserElmish

open NVancedWars.Shared
open Elmish
open NVancedWars.Server.UserAccounts
open Elmish.Bridge


type ActiveUserState = {
    username: string
    token: PlayerToken

    isInGame: GameId option
}

type UserState = 
    | NotAuthenticated
    | Authenticated of ActiveUserState



let elmishMethods (uac: UserAccountController) () =

    let init clientDispatch () = 
        NotAuthenticated, Cmd.none

    let update clientDispatch (msg) (model: UserState) =
        match msg, model with
        | Account (Register (request, reply)), NotAuthenticated ->
            match uac.RegisterAccount (request.user, request.password) with
            | Error err -> 
                printfn "Acct register failed: %s" request.user
                reply.Reply (Error err)
                model, Cmd.none
            | Ok token ->
                printfn "Acct register success: %s" request.user
                reply.Reply (Ok token)
                Authenticated { username = request.user; token = token; isInGame = None }, Cmd.none
        | Account (Login (request, reply)), NotAuthenticated ->
            match uac.Login (request.user, request.password) with
            | Error err -> 
                printfn "Acct login failed: %s" request.user
                reply.Reply (None)
                model, Cmd.none
            | Ok token ->
                printfn "Acct login success: %s" request.user
                reply.Reply (Some token.token)
                Authenticated { username = request.user; token = token.token; isInGame = None }, Cmd.none
        | Account (AutoLogin (request, reply)), NotAuthenticated ->
            match uac.LoginByToken (request) with
            | Error err -> 
                printfn "Acct tokenlogin failed: %A" request
                reply.Reply (None)
                model, Cmd.none
            | Ok user ->
                printfn "Acct token login success: %s" user
                reply.Reply (Some user)
                Authenticated { username = user; token = request; isInGame = None }, Cmd.none
        | _ ->
            model, Cmd.none

    (init, update)