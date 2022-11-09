module.exports = class Data1667984227155 {
  name = 'Data1667984227155'

  async up(db) {
    await db.query(`CREATE TABLE "shell" ("id" character varying NOT NULL, "rarity" text, "race" text, "career" text, "timestamp" TIMESTAMP WITH TIME ZONE, "method" text, "nft_id" integer, "generation_id" integer, "account_id" character varying, CONSTRAINT "PK_babd1c2c803801d3118a54b4500" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_01250f149b871e924a6126b793" ON "shell" ("account_id") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "shell" ADD CONSTRAINT "FK_01250f149b871e924a6126b7938" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "shell"`)
    await db.query(`DROP INDEX "public"."IDX_01250f149b871e924a6126b793"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`ALTER TABLE "shell" DROP CONSTRAINT "FK_01250f149b871e924a6126b7938"`)
  }
}
