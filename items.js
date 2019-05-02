let idToIndex = {};

let tableEntries = [
  {
    itemId: 3283,
    name: 'Mirror of Kalandra',
    cardId: 3776,
    card: "House of Mirrors"
  },
  {
    itemId: 3891,
    name: 'Headhunter',
    cardId: 3509,
    card: "The Doctor"
  },
  {
    itemId: 3891,
    name: 'Headhunter',
    cardId: 3423,
    card: "The Fiend"
  },
  {
    itemId: 3841,
    name: "Queen's Sacrifice",
    cardId: 3616,
    card: "Beauty Through Death"
  },
  {
    itemId: 5667,
    name: "Trash To Treasure",
    cardId: 374,
    card: "The Iron Bard"
  },
  {
    itemId: 6371,
    name: "Zerphi's Heart",
    cardId: 12642,
    card: "The Life Thief"
  },
  {
    itemId: 3776,
    name: "House of Mirrors",
    cardId: 3604,
    card: "The Immortal"
  },
  {
    itemId: 6699,
    name: "The Perandus Manor",
    cardId: 2863,
    card: "The Mayor"
  },
  {
    itemId: 3777,
    name: "Fated Connections",
    cardId: 3144,
    card: "Immortal Resolve"
  },
  {
    itemId: 2754,
    name: "Berek's Respite",
    cardId: 493,
    card: "The Spark and the Flame"
  },
  {
    itemId: 3509,
    name: "The Doctor",
    cardId: 3088,
    card: "The Nurse"
  },
  // {
  //   itemId: 8,
  //   name: "Watcher's Eye",
  //   cardId: 544,
  //   card: "The Samurai's Eye"
  // },
  {
    itemId: -1,       // create custom rule for this ID number
    name: "3x Exalted Orb",
    cardId: 2331,
    card: "Abandoned Wealth"
  },
  {
    itemId: 3840,
    name: "The Taming",
    cardId: 2272,
    card: "Hunter's Reward"
  },
  {
    itemId: 5776,
    name: "Opal Ring ilvl 100",
    cardId: 2355,
    card: "The Celestial Stone"
  },
  {
    itemId: 5498,
    name: "Mirror Shard",
    cardId: 12507,
    card: "Seven Years Bad Luck"
  },
  {
    itemId: 3351,
    name: "Lvl 4 Enlighten",
    cardId: 4207,
    card: "Wealth and Power"
  },
  {
    itemId: 3519,
    name: "Lvl 4 Empower",
    cardId: 2616,
    card: "The Dragon's Heart"
  },
  {
    itemId: 3783,
    name: "Rigwald's Quills",
    cardId: 2927,
    card: "The Wolven King's Bite"
  },
  // {
  //   itemId: 251, //maybe remove this one cuz of weird prices
  //   name: "Ventor's Gamble",
  //   cardId: 2627,
  //   card: "The Risk"
  // },
  {
    itemId: -2,
    name: "2x Exalted Orb",
    cardId: 1441,
    card: "The Saint's Treasure"
  },
  // {
  //   itemId: 2644,
  //   name: "Eyes Of The Greatwolf",
  //   cardId: 3424,
  //   card: "Mawr Blaidd"
  // },
  {
    itemId: 8836,
    name: "Atziri's Acuity",
    cardId: 4270,
    card: "The Queen"
  },
  {
    itemId: 2644,
    name: "Kaom's Heart (Corrupted)",
    cardId: 2506,
    card: "Pride Before the Fall"
  },
  {
    itemId: 4189,
    name: "Lvl 4 Enhance",
    cardId: 3095,
    card: "The Artist"
  },
  {
    itemId: 2644,
    name: "Kaom's Heart",
    cardId: 1316,
    card: "The King's Heart"
  },
  {
    itemId: 2497,
    name: "The Putrid Cloister",
    cardId: 2375,
    card: "The Professor"
  },
  {
    itemId: -3,
    name: "3x Orb Of Annulment", // itemId: 1343
    cardId: 12568,
    card: "The Seeker"
  },
  // Can't look up values of these items
  // {
  //   itemId: null,
  //   name: "6L Astral Plate",
  //   cardId: 2516,
  //   card: "The Celestial Justicar"
  // },
  // {
  //   itemId: null,
  //   name: "6L Vaal Regalia",
  //   cardId: 1901,
  //   card: "The Ethereal"
  // },
  {
    itemId: 2504,
    name: "Lvl 3 Enlighten",
    cardId: 645,
    card: "The Enlightened"
  },
  {
    itemId: 142,
    name: "Exalted Orb",
    cardId: 811,
    card: "The Hoarder"
  },
  {
    itemId: 3428,
    name: "The Beachhead",
    cardId: 12519,
    card: "The Landing"
  },
  {
    itemId: 2251,
    name: "Shavronne's Wrappings",
    cardId: 788,
    card: "The Offering"
  },
  {
    itemId: 3301,
    name: "Voll's Devotion (Corrupted)",
    cardId: 2626,
    card: "The Brittle Emperor"
  },
  {
    itemId: 1165,
    name: "Bisco's Collar",
    cardId: 1610,
    card: "The Master"
  },
  {
    itemId: 1279,
    name: "Mortal Hope",
    cardId: 1963,
    card: "Last Hope"
  },
  {
    itemId: 1467,
    name: "Astramentis",
    cardId: 875,
    card: "The Polymath"
  },
  {
    itemId: 1336,
    name: "Monstrous Treasure",
    cardId: 674,
    card: "The Valley of Steel Boxes"
  },
  {
    itemId: 1352,
    name: "Windripper",
    cardId: 524,
    card: "The Wind"
  },
  {
    itemId: 1036,
    name: "Kaom's Roots",
    cardId: 1569,
    card: "The Throne"
  },
  {
    itemId: 144,
    name: "Taste Of Hate",
    cardId: 1266,
    card: "The Hunger"
  },
  {
    itemId: 794,
    name: "The Jeweller's Touch",
    cardId: 1344,
    card: "The Jeweller's Boon"
  },
  {
    itemId: 1436,
    name: "Starforge",
    cardId: 1184,
    card: "The World Eater"
  },
  {
    itemId: 907,
    name: "The Poet's Pen",
    cardId: 752,
    card: "A Dab of Ink"
  },
  {
    itemId: 764,
    name: "Tabula Rasa",
    cardId: 485,
    card: "Humility"
  }
]; 

module.exports = {tableEntries, idToIndex};