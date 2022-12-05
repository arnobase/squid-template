import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class ReceivedFood {
  constructor(props?: Partial<ReceivedFood>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null

  @Column_("text", {nullable: true})
  sender!: string | undefined | null

  @Column_("int4", {nullable: true})
  nftId!: number | undefined | null

  @Column_("int4", {nullable: true})
  collection!: number | undefined | null

  @Column_("int4", {nullable: true})
  era!: number | undefined | null
}
