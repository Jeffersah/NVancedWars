import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { Percentage_$ctor_Z524259A4, Percentage_get_oneHundred, Percentage_get_zero, Percentage$reflection } from "./Percentage.fs.js";
import { record_type, bool_type, int32_type, option_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";

export class GameRules extends Record {
    "constructor"(buildingHpMult, incomePerStructure, baseIncome, blackmap, fog, blindFirePenalty, firstStrikeDamage, captureDecay) {
        super();
        this.buildingHpMult = buildingHpMult;
        this.incomePerStructure = (incomePerStructure | 0);
        this.baseIncome = (baseIncome | 0);
        this.blackmap = blackmap;
        this.fog = fog;
        this.blindFirePenalty = blindFirePenalty;
        this.firstStrikeDamage = firstStrikeDamage;
        this.captureDecay = captureDecay;
    }
}

export function GameRules$reflection() {
    return record_type("NVancedWars.Game.GameRules", [], GameRules, () => [["buildingHpMult", option_type(Percentage$reflection())], ["incomePerStructure", int32_type], ["baseIncome", int32_type], ["blackmap", bool_type], ["fog", bool_type], ["blindFirePenalty", Percentage$reflection()], ["firstStrikeDamage", Percentage$reflection()], ["captureDecay", Percentage$reflection()]]);
}

export const GameRulesModule_advancedWars = new GameRules(void 0, 100, 100, false, true, Percentage_get_zero(), Percentage_get_oneHundred(), Percentage_get_oneHundred());

export const GameRulesModule_modernRules = new GameRules(Percentage_get_oneHundred(), 100, 100, false, true, Percentage_$ctor_Z524259A4(75), Percentage_$ctor_Z524259A4(50), Percentage_$ctor_Z524259A4(25));

