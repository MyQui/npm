const db = require('./index.js')

db.createConnection({
    host: '127.0.0.1',
    port: 4000,
    user: 'root',
    password: 'aidak1243'
})

db.connect()

db.prepare({ db: 'clientes', key: '2', value: 'pau'})
db.query('INSERT ON DATABASE clientes PARAMETERS (2, pau)')
