export const monster = [{
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
},
{
    maxHealth: 10,
    name: "Упырь",
    moves: [
        {
            "name": "Запросить справку по форме 283",
            "physicalDmg": 4, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 10, // физическая броня
            "magicArmorPercents": 10,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Придраться к дате выдачи справки",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 30,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Провести внеплановую налоговую проверку",
            "physicalDmg": 3,
            "magicDmg": 3,
            "physicArmorPercents": 10,
            "magicArmorPercents": 80,
            "cooldown": 5
        },
        ,
        {
            "name": "Уйти на обед",
            "physicalDmg": 0,
            "magicDmg": 1,
            "physicArmorPercents": 100,
            "magicArmorPercents": 50,
            "cooldown": 5
        },
    ]
}];

export const mage = [{
    maxHealth: null,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}];