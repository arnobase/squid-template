import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"

@Entity_()
export class Shell {
  constructor(props?: Partial<Shell>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  account!: Account | undefined | null

  @Column_("text", {nullable: true})
  rarity!: string | undefined | null

  @Column_("text", {nullable: true})
  race!: string | undefined | null

  @Column_("text", {nullable: true})
  career!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Column_("text", {nullable: true})
  method!: string | undefined | null

  @Column_("int4", {nullable: true})
  nftId!: number | undefined | null

  @Column_("int4", {nullable: true})
  generationId!: number | undefined | null
}
