namespace NVancedWars.Game


type GameRules = {
    buildingHpMult: Percentage option // None = Indestructable
    
    incomePerStructure: int
    baseIncome: int

    blackmap: bool
    fog: bool

    blindFirePenalty: Percentage // Multiplier on damage blind-firing. 0=No blind fire, 100=No penalty.
    firstStrikeDamage: Percentage // How much damage the attacker does before the defender's damage is calculated. 100: Advanced wars rules. 0: No advantage to attacker
    captureDecay: Percentage // reduce capture percent by how much between turns if nothing is capturing? 100: Advanced wars rules. 0: Capture progress never decays.
}

module GameRules =
    let advancedWars = 
        {
            buildingHpMult = None
            incomePerStructure = 100
            baseIncome = 100

            blackmap = false
            fog = true

            blindFirePenalty = Percentage.zero
            firstStrikeDamage = Percentage.oneHundred
            captureDecay = Percentage.oneHundred
        }

    let modernRules =
        {
            buildingHpMult = Some (Percentage.oneHundred)
            incomePerStructure = 100
            baseIncome = 100

            blackmap = false
            fog = true

            blindFirePenalty = Percentage 75
            firstStrikeDamage = Percentage 50
            captureDecay = Percentage 25
        }