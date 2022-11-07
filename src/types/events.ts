import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v1150 from './v1150'
import * as v1170 from './v1170'
import * as v1181 from './v1181'

export class PwNftSaleOriginOfShellMintedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'PWNftSale.OriginOfShellMinted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Origin of Shell minted from the preorder
   */
  get isV1150(): boolean {
    return this._chain.getEventHash('PWNftSale.OriginOfShellMinted') === '41774c36baa12db566e3949f769da9f8705ce5fdcd8c7b1e27d43e47689262cc'
  }

  /**
   * Origin of Shell minted from the preorder
   */
  get asV1150(): {rarityType: v1150.RarityType, collectionId: number, nftId: number, owner: Uint8Array, race: v1150.RaceType, career: v1150.CareerType} {
    assert(this.isV1150)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Origin of Shell minted from the preorder
   */
  get isV1170(): boolean {
    return this._chain.getEventHash('PWNftSale.OriginOfShellMinted') === '0ee24f0c0474e9c9985ba844fdacb9ef08097efc3618b3dd9d6a90467a35d5cd'
  }

  /**
   * Origin of Shell minted from the preorder
   */
  get asV1170(): {rarityType: v1170.RarityType, collectionId: number, nftId: number, owner: Uint8Array, race: v1170.RaceType, career: v1170.CareerType, generationId: number} {
    assert(this.isV1170)
    return this._chain.decodeEvent(this.event)
  }
}

export class PwNftSaleOriginOfShellPreorderedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'PWNftSale.OriginOfShellPreordered')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A chance to get an Origin of Shell through preorder
   */
  get isV1150(): boolean {
    return this._chain.getEventHash('PWNftSale.OriginOfShellPreordered') === 'cb44bdc1c3d0fda63826fa061547e0d3f613e440e9e7e5ae307eb8d9b0005e1f'
  }

  /**
   * A chance to get an Origin of Shell through preorder
   */
  get asV1150(): {owner: Uint8Array, preorderId: number} {
    assert(this.isV1150)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A chance to get an Origin of Shell through preorder
   */
  get isV1181(): boolean {
    return this._chain.getEventHash('PWNftSale.OriginOfShellPreordered') === '6fea470972a2e609998a7fc257d690c4d549ed4dea4921c9b1d16b46bca98192'
  }

  /**
   * A chance to get an Origin of Shell through preorder
   */
  get asV1181(): {owner: Uint8Array, preorderId: number, race: v1181.RaceType, career: v1181.CareerType} {
    assert(this.isV1181)
    return this._chain.decodeEvent(this.event)
  }
}
