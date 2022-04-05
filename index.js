require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL
})

client.connect().then(async () => {
    console.log(process.env.REGION)
    const res = await client.query('SELECT * FROM indigo.projects')
    console.log(res)
})
