import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { BuildingInfoId$reflection, UnitInfoId$reflection } from "./Ids.fs.js";
import { BuildingInfo$reflection, UnitInfo$reflection } from "./UnitInfo.fs.js";
import { record_type, class_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";

export class ConstData extends Record {
    "constructor"(unitInfo, buildingInfo) {
        super();
        this.unitInfo = unitInfo;
        this.buildingInfo = buildingInfo;
    }
}

export function ConstData$reflection() {
    return record_type("NVancedWars.Game.ConstData", [], ConstData, () => [["unitInfo", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [UnitInfoId$reflection(), UnitInfo$reflection()])], ["buildingInfo", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [BuildingInfoId$reflection(), BuildingInfo$reflection()])]]);
}

