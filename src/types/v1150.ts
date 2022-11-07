import type {Result} from './support'

export type RarityType = RarityType_Prime | RarityType_Magic | RarityType_Legendary

export interface RarityType_Prime {
  __kind: 'Prime'
}

export interface RarityType_Magic {
  __kind: 'Magic'
}

export interface RarityType_Legendary {
  __kind: 'Legendary'
}

export type RaceType = RaceType_Cyborg | RaceType_AISpectre | RaceType_XGene | RaceType_Pandroid

export interface RaceType_Cyborg {
  __kind: 'Cyborg'
}

export interface RaceType_AISpectre {
  __kind: 'AISpectre'
}

export interface RaceType_XGene {
  __kind: 'XGene'
}

export interface RaceType_Pandroid {
  __kind: 'Pandroid'
}

export type CareerType = CareerType_HackerWizard | CareerType_HardwareDruid | CareerType_RoboWarrior | CareerType_TradeNegotiator | CareerType_Web3Monk

export interface CareerType_HackerWizard {
  __kind: 'HackerWizard'
}

export interface CareerType_HardwareDruid {
  __kind: 'HardwareDruid'
}

export interface CareerType_RoboWarrior {
  __kind: 'RoboWarrior'
}

export interface CareerType_TradeNegotiator {
  __kind: 'TradeNegotiator'
}

export interface CareerType_Web3Monk {
  __kind: 'Web3Monk'
}
