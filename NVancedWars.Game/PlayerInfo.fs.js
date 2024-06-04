import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { PlayerId$reflection } from "./Ids.fs.js";
import { record_type, class_type, int32_type, string_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { DiplomacyStatus$reflection } from "./DiplomacyStatus.fs.js";

export class PlayerInfo extends Record {
    "constructor"(id, displayName, playerIndex, colorIndex, diplomacy) {
        super();
        this.id = id;
        this.displayName = displayName;
        this.playerIndex = (playerIndex | 0);
        this.colorIndex = (colorIndex | 0);
        this.diplomacy = diplomacy;
    }
}

export function PlayerInfo$reflection() {
    return record_type("NVancedWars.Game.PlayerInfo", [], PlayerInfo, () => [["id", PlayerId$reflection()], ["displayName", string_type], ["playerIndex", int32_type], ["colorIndex", int32_type], ["diplomacy", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [PlayerId$reflection(), DiplomacyStatus$reflection()])]]);
}

