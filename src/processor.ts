import {lookupArchive} from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"
import {Account, Shell} from "./model"
import {PwNftSaleOriginOfShellMintedEvent,PwNftSaleOriginOfShellPreorderedEvent} from "./types/events"
import {RarityType, RaceType, CareerType} from "./types/v1170"

const processor = new SubstrateBatchProcessor()
.setBatchSize(500)
.setDataSource({
    // Lookup archive by the network name in the Subsquid registry
    archive: lookupArchive("khala", {release: "FireSquid"})
})
.addEvent('PWNftSale.OriginOfShellMinted', {
    data: {
        event: {
            args: true,
            extrinsic: {
                hash: true,
                fee: true
            }
        }
    }
} as const)
.addEvent('PWNftSale.OriginOfShellPreordered', {
    data: {
        event: {
            args: true,
            extrinsic: {
                hash: true,
                fee: true
            }
        }
    }
} as const);


type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>


processor.run(new TypeormDatabase(), async ctx => {
    let nftData = getNFTEvents(ctx)

    let accountIds = new Set<string>()
    for (let t of nftData) {
        accountIds.add(t.accountId)
    }

    let accounts = await ctx.store.findBy(Account, {id: In([...accountIds])}).then(accounts => {
        return new Map(accounts.map(a => [a.id, a]))
    })

    let transfers: Shell[] = []

    for (let t of nftData) {
        
        let {id, timestamp, method, rarity,
            nftId, race, career, generationId} = t

        let account = getAccount(accounts, t.accountId)

        transfers.push(new Shell({
            id,
            account,
            rarity,
            race,
            career,
            timestamp,
            method,
            nftId,
            generationId
        }))
    }

    await ctx.store.save(Array.from(accounts.values()))
    await ctx.store.insert(transfers)
})


interface NFTEvent {
    id: string
    blockNumber: number
    timestamp: Date
    extrinsicHash?: string
    accountId: string
    method: string
    rarity: string
    nftId: number
    race: string
    career: string
    generationId: number
}

function getNFTEvents(ctx: Ctx): NFTEvent[] {
    let nfts: NFTEvent[] = []
    for (let block of ctx.blocks) {
        for (let item of block.items) {
            if (item.name == "PWNftSale.OriginOfShellMinted") {
                let e = new PwNftSaleOriginOfShellMintedEvent(ctx, item.event)
                let rec: {
                    rarityType: RarityType,
                    collectionId: number, 
                    nftId: number,
                    owner: Uint8Array,
                    race: RaceType,
                    career: CareerType,
                    generationId: number
                };
                rec=e.asV1170;
                nfts.push({
                    id: item.event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: item.event.extrinsic?.hash,
                    accountId: ss58.codec('kusama').encode(rec.owner),
                    method: "mint",
                    rarity: rec.rarityType.__kind,
                    nftId: rec.nftId,
                    race: rec.race.__kind,
                    career: rec.career.__kind,
                    generationId: rec.generationId
                });
            }
            if (item.name == "PWNftSale.OriginOfShellPreordered") {
                let e = new PwNftSaleOriginOfShellPreorderedEvent(ctx, item.event)
                let rec: {
                    preorderId: number,
                    owner: Uint8Array,
                    race: RaceType,
                    career: CareerType,
                    
                };
                rec=e.asV1181;
                nfts.push({
                    id: item.event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: item.event.extrinsic?.hash,
                    accountId: ss58.codec('kusama').encode(rec.owner),
                    method: "preorder",
                    rarity: "prime",
                    nftId: rec.preorderId,
                    race: rec.race.__kind,
                    career: rec.career.__kind,
                    generationId: 0
                });
            }
        }
    }
    return nfts
}


function getAccount(m: Map<string, Account>, id: string): Account {
    let acc = m.get(id)
    if (acc == null) {
        acc = new Account()
        acc.id = id
        m.set(id, acc)
    }
    return acc
}
