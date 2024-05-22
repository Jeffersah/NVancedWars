namespace NVancedWars.Game


type GameRules = {
    buildingHpMult: Percentage option // None = Indestructable
    
    incomePerStructure: int
    baseIncome: int

    blackmap: bool
    fog: bool

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

            firstStrikeDamage = Percentage 100
            captureDecay = Percentage 100
        }