module.exports = class Data1667769610343 {
  name = 'Data1667769610343'

  async up(db) {
    await db.query(`ALTER TABLE "transfer" ALTER COLUMN "fee" SET NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "transfer" ALTER COLUMN "fee" DROP NOT NULL`)
  }
}
