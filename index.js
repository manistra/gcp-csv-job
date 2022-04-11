require('dotenv').config()
const { Client } = require('pg')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const client = new Client({
    connectionString: process.env.DATABASE_URL
})

const region = process.env.REGION
client.connect().then(async () => {
    const rmcData = await client.query(`SELECT "gcp_plant", indigo.raw_materials.name, cost, currency_code  FROM indigo.raw_material_costs
    JOIN indigo.raw_materials ON indigo.raw_materials.id = indigo.raw_material_costs.raw_material_id
    JOIN indigo.gcp_plants ON indigo.gcp_plants.id = indigo.raw_material_costs.factory_detail_id
    JOIN indigo.regions ON indigo.regions.id = indigo.gcp_plants.region_id
    WHERE "is_associated" = TRUE
    AND indigo.regions.name = '${region}'
    ORDER BY gcp_plant ASC, indigo.raw_materials.name
    `)
    console.log("RMC DATA", rmcData)

    const credentials = JSON.parse(process.env.S3_CREDENTIALS)
    console.log("S3 CREDENTIALS", credentials)

    const s3Client = new S3Client({
        region,
        credentials,
    })

    const response = await s3Client.send(
        new PutObjectCommand({
            Bucket: 'indigo-rm-cost-history',
            Key: 'rmc-cost-test',
            Body: "Rmc const test"
        })
    )
    console.log("S3 RESPONSE FROM PUT COMMAND", response)

    client.end()
})

