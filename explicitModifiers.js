const mods = {
    "# To Maximum Energy Shield (Local)" : "explicit.stat_4052037485",
    "#% To Fire Resistance" : "explicit.stat_3372524247",
    "#% To Cold Resistance" : "explicit.stat_4220027924",
    "#% To Lightning Resistance" : "explicit.stat_1671376347",
    "#% Increased Energy Shield (Local)" : "explicit.stat_4015621042",
    "#% To All Elemental Resistances" : "explicit.stat_2901986750",
    "#% Faster Start Of Energy Shield Recharge" : "explicit.stat_1782086450",
    "#% Increased Energy Shield Recharge Rate" : "explicit.stat_2339757871",
    "#% Increased Evasion And Energy Shield" : "explicit.stat_1999113824",
    "#% Increased Armour And Energy Shield" : "explicit.stat_3321629045",
    "#% Increased Maximum Energy Shield" : "explicit.stat_2482852589",
    "# To Maximum Energy Shield" : "explicit.stat_3489782002",
    "#% Increased Maximum Mana" : "explicit.stat_2748665614",
    "#% Increased Maximum Life" : "explicit.stat_983749596",
    "# To Maximum Mana" : "explicit.stat_1050105434",
    "# To All Attributes" : "explicit.stat_1379411836",
    "#% Increased Elemental Damage With Attack Skills" : "explicit.stat_387439868",
    "#% Increased Elemental Damage" : "explicit.stat_3141070085",
    "#% Increased Chaos Damage" : "explicit.stat_736967255",
    "#% Increased Cold Damage" : "explicit.stat_3291658075",
    "#% Increased Lightning Damage" : "explicit.stat_2231156303",
    "#% Increased Fire Damage" : "explicit.stat_3962278098",
    "#% Increased Spell Damage" : "explicit.stat_2974417149",
    "# To Intelligence" : "explicit.stat_328541901",
    "# To Dexterity" : "explicit.stat_3261801346",
    "# To Strength" : "explicit.stat_4080418644",
    "# To Maximum Life" : "explicit.stat_3299347043",
    "#% Increased Movement Speed" : "explicit.stat_2250533757",
    "#% Increased Movement Speed During Flask Effect" : "explicit.stat_3182498570",
    "#% Increased Movement Speed If You Haven't Taken Damage Recently" : "explicit.stat_3854949926",
    "#% Increased Movement Speed If You've Killed Recently" : "explicit.stat_279227559",
    "#% Increased Attack Speed (Local)" : "explicit.stat_210067635",
    "#% Increased Attack Speed" : "explicit.stat_681332047",
    "#% Increased Cast Speed" : "explicit.stat_2891184298",
    "#% Increased Attack And Cast Speed" : "explicit.stat_2672805335",
    "Adds # to # Physical Damage To Attacks" : "explicit.stat_3032590688",
    "Adds # to # Physical Damage (Local)" : "explicit.stat_1940865751",
    "#% Increased Physical Damage (Local)" : "explicit.stat_1509134228",
    "#% Increased Global Physical Damage" : "explicit.stat_1310194496",
    "Gain #% Of Physical Damage As Extra Cold Damage" : "explicit.stat_979246511",
    "Gain #% Of Physical Damage As Extra Lightning Damage" : "explicit.stat_219391121",
    "Gain #% Of Physical Damage As Extra Fire" : "explicit.stat_369494213",
    "Gain #% Of Physical Damage As Extra Chaos Damage" : "explicit.stat_3319896421",
    "Gain #% Of Elemental Damage As Extra Chaos Damage" : "explicit.stat_3495544060",
    "Gain #% Of Physical Damage As Extra Damage Of A Random Element" : "explicit.stat_3753703249",
    "#% To Global Critical Strike Multiplier" : "explicit.stat_3556824919",
    "#% Increased Global Critical Strike Chance" : "explicit.stat_587431675",
    "#% Increased Critical Strike Chance (Local)" : "explicit.stat_2375316951",
    "#% Increased Critical Strike Chance For Spells" : "explicit.stat_737908626",
    "#% To Critical Strike Multiplier With Fire Skills" : "explicit.stat_2307547323",
    "#% To Critical Strike Multiplier With Lightning Skills" : "explicit.stat_2441475928",
    "#% To Critical Strike Multiplier With Cold Skills" : "explicit.stat_915908446",
    "#% To Critical Strike Multiplier With Elemental Skill" : "explicit.stat_1569407745",
    "#% To Melee Critical Strike Multiplier" : "explicit.stat_4237442815",
    "#% To Critical Strike Multiplier For Spells" : "explicit.stat_274716455",
    "#% To Cold Damage Over Time Multiplier" : "explicit.stat_3993576199",
    "#% To Non-Ailment Chaos Damage Over Time Multiplier" : "explicit.stat_1653010703",
    "mod" : "number",
    "mod" : "number",
    "mod" : "number"
}
const pseudoMods = {
    "Pseudo +#% Total To Cold Resistance" : "pseudo.pseudo_total_cold_resistance",
    "Pseudo +#% Total To Fire Resistance" : "pseudo.pseudo_total_fire_resistance",
    "Pseudo +#% Total To Lightning Resistance" : "pseudo.pseudo_total_lightning_resistance",
    "Pseudo +#% Total To Elemental Resistance" : "pseudo.pseudo_total_elemental_resistance",
    "Pseudo +#% Total Maximum Life" : "pseudo.pseudo_total_life",
    "Pseudo +#% Total Maximum Energy Shield" : "pseudo.pseudo_total_energy_shield",
    "Pseudo" : "number",
    "Pseudo" : "number",
    "Pseudo" : "number"
}



// Pseudo modifiers
// this is a unique type of explicit modifier that adds together other explicit modifiers on the item and returns the total
// for example an item has 35% fire resistance and 25% cold resistance
// the pseudo total elemental resistances would be 60% for that item because its 35 fire + 25 cold