import { CardSpecification, CardType, TriggerType } from './models';

export let baseDeck1: any = {
    "Baby Unicorn (Red)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Pink)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Orange)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Yellow)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Green)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Blue)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Purple)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Black)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (White)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Brown)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Rainbow)": {type: CardType.BABY, amount: 1}, 
    "Baby Unicorn (Death)": {type: CardType.BABY, amount: 1}, 
    "Baby Narwhal": {type: CardType.BABY, amount: 1}, 
    "Basic Unicorn (Red)": {type: CardType.BASIC, amount: 3}, 
    "Basic Unicorn (Orange)": {type: CardType.BASIC, amount: 3}, 
    "Basic Unicorn (Yellow)": {type: CardType.BASIC, amount: 3}, 
    "Basic Unicorn (Green)": {type: CardType.BASIC, amount: 3}, 
    "Basic Unicorn (Blue)": {type: CardType.BASIC, amount: 3}, 
    "Basic Unicorn (Indigo)": {type: CardType.BASIC, amount: 3}, 
    "Basic Unicorn (Purple)": {type: CardType.BASIC, amount: 3}, 
    "Narwhal": {type: CardType.BASIC, amount: 1}, 
    "Rhinocorn": {type: CardType.MAGICAL, amount: 1,
        triggers: [{type: TriggerType.BOT_PHASE, }]}, 
    "Extremely Fertile Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Magical Kittencorn": {type: CardType.MAGICAL, amount: 1}, 
    "Stabby the Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Puppicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Rainbow Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Zombie Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Extremely Destructive Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Chainsaw Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Llamacorn": {type: CardType.MAGICAL, amount: 1}, 
    "Americorn": {type: CardType.MAGICAL, amount: 1}, 
    "Ginormous Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Seductive Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Angel Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Queen Bee Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Greedy Flying Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Annoying Flying Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Magical Flying Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Swift Flying Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Majestic Flying Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Unicorn Phoenix": {type: CardType.MAGICAL, amount: 1}, 
    "Unicorn on the Cob": {type: CardType.MAGICAL, amount: 1}, 
    "Black Knight Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Shark With a Horn": {type: CardType.MAGICAL, amount: 1}, 
    "Shabby the Narwhal": {type: CardType.MAGICAL, amount: 1}, 
    "Narwhal Torpedo": {type: CardType.MAGICAL, amount: 1}, 
    "Alluring Narwhal": {type: CardType.MAGICAL, amount: 1}, 
    "Mermaid Unicorn": {type: CardType.MAGICAL, amount: 1}, 
    "Classy Narwhal": {type: CardType.MAGICAL, amount: 1}, 
    "The Great Narwhal": {type: CardType.MAGICAL, amount: 1}, 
    "Unicorn Poison": {type: CardType.MAGIC, amount: 3}, 
    "Back Kick": {type: CardType.MAGIC, amount: 3}, 
    "Change of Luck": {type: CardType.MAGIC, amount: 2}, 
    "Glitter Tornado": {type: CardType.MAGIC, amount: 2}, 
    "Unicorn Swap": {type: CardType.MAGIC, amount: 2}, 
    "Re-Target": {type: CardType.MAGIC, amount: 2}, 
    "Unfair Bargain": {type: CardType.MAGIC, amount: 2}, 
    "Two-For-One": {type: CardType.MAGIC, amount: 2}, 
    "Unicorn Shrinkray": {type: CardType.MAGIC, amount: 1}, 
    "Targeted Destruction": {type: CardType.MAGIC, amount: 1}, 
    "Mystical Vortex": {type: CardType.MAGIC, amount: 1}, 
    "Good Deal": {type: CardType.MAGIC, amount: 1}, 
    "Shake Up": {type: CardType.MAGIC, amount: 1}, 
    "Blatant Thievery": {type: CardType.MAGIC, amount: 1}, 
    "Reset Button": {type: CardType.MAGIC, amount: 1}, 
    "Rainbow Mane": {type: CardType.UPGRADE, amount: 3}, 
    "Extra Tail": {type: CardType.UPGRADE, amount: 3}, 
    "Glitter Bomb": {type: CardType.UPGRADE, amount: 2}, 
    "Yay": {type: CardType.UPGRADE, amount: 2}, 
    "Unicorn Lasso": {type: CardType.UPGRADE, amount: 1}, 
    "Rainbow Aura": {type: CardType.UPGRADE, amount: 1}, 
    "Double Dutch": {type: CardType.UPGRADE, amount: 1}, 
    "Summoning Ritual": {type: CardType.UPGRADE, amount: 1}, 
    "Barbed Wire": {type: CardType.DOWNGRADE, amount: 1}, 
    "Pandamonium": {type: CardType.DOWNGRADE, amount: 1}, 
    "Sadistic Ritual": {type: CardType.DOWNGRADE, amount: 1}, 
    "Slowdown": {type: CardType.DOWNGRADE, amount: 1}, 
    "Nanny Cam": {type: CardType.DOWNGRADE, amount: 1}, 
    "Broken Stable": {type: CardType.DOWNGRADE, amount: 1}, 
    "Blinding Light": {type: CardType.DOWNGRADE, amount: 1}, 
    "Tiny Stable": {type: CardType.DOWNGRADE, amount: 1}, 
    "Neigh": {type: CardType.INSTANT, amount: 14}, 
    "Super Neigh": {type: CardType.INSTANT, amount: 1}, 
};

export let gameStopDeck = { // Same as baseDeck1 but gamer instead of puppi

}