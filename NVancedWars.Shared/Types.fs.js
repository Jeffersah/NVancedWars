import { Record, Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { option_type, record_type, lambda_type, unit_type, union_type, string_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { IReplyChannel$1$reflection } from "../NVancedWars.UI/src/fable_modules/Elmish.Bridge.RPC.7.0.0/Library.fs.js";
import { FSharpResult$2 } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Choice.js";

export class GameId extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["GameId"];
    }
}

export function GameId$reflection() {
    return union_type("NVancedWars.Shared.GameId", [], GameId, () => [[["Item", string_type]]]);
}

export class PlayerToken extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PlayerToken"];
    }
}

export function PlayerToken$reflection() {
    return union_type("NVancedWars.Shared.PlayerToken", [], PlayerToken, () => [[["Item", string_type]]]);
}

export class ReplyChannel$1 extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NoMock", "Mock"];
    }
}

export function ReplyChannel$1$reflection(gen0) {
    return union_type("NVancedWars.Shared.ReplyChannel`1", [gen0], ReplyChannel$1, () => [[["Item", IReplyChannel$1$reflection(gen0)]], [["Item", lambda_type(gen0, unit_type)]]]);
}

export class LoginRequest extends Record {
    "constructor"(user, password) {
        super();
        this.user = user;
        this.password = password;
    }
}

export function LoginRequest$reflection() {
    return record_type("NVancedWars.Shared.LoginRequest", [], LoginRequest, () => [["user", string_type], ["password", string_type]]);
}

export class AccountCommands extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Register", "Login", "AutoLogin", "ChangePassword"];
    }
}

export function AccountCommands$reflection() {
    return union_type("NVancedWars.Shared.AccountCommands", [], AccountCommands, () => [[["Item1", LoginRequest$reflection()], ["Item2", ReplyChannel$1$reflection(union_type("Microsoft.FSharp.Core.FSharpResult`2", [PlayerToken$reflection(), string_type], FSharpResult$2, () => [[["ResultValue", PlayerToken$reflection()]], [["ErrorValue", string_type]]]))]], [["Item1", LoginRequest$reflection()], ["Item2", ReplyChannel$1$reflection(option_type(PlayerToken$reflection()))]], [["Item1", PlayerToken$reflection()], ["Item2", ReplyChannel$1$reflection(option_type(string_type))]], [["Item1", string_type], ["Item2", string_type], ["Item3", ReplyChannel$1$reflection(option_type(PlayerToken$reflection()))]]]);
}

export class MsgToServer extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Account"];
    }
}

export function MsgToServer$reflection() {
    return union_type("NVancedWars.Shared.MsgToServer", [], MsgToServer, () => [[["Item", AccountCommands$reflection()]]]);
}

