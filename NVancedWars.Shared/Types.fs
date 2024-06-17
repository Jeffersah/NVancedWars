namespace NVancedWars.Shared

open Elmish.Bridge

type GameId = GameId of string
type PlayerToken = PlayerToken of string

type ReplyChannel<'T> = 
    | NoMock of IReplyChannel<'T>
    | Mock of ('T -> unit)


type LoginRequest = { user: string; password: string }

type AccountCommands =
    | Register of LoginRequest * ReplyChannel<Result<PlayerToken, string>>
    | Login of LoginRequest * ReplyChannel<PlayerToken option>
    | AutoLogin of PlayerToken * ReplyChannel<string option> // Returns username
    | ChangePassword of string * string * ReplyChannel<PlayerToken option> // Old, New


type MsgToServer = 
    | Account of AccountCommands