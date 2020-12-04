# MyQui
MyQui is a database API based on the SQL language and combining the sequentize technology of Qui Database.

## Why use MyQui?
MyQui improves so much the experience managing data with these features:
- New .qui extension for the databases (based on the MongoDB BSON technology)
- SQL-like syntax, so it is more easy for the people that normally uses SQLite or MySQL
- Query support and evaluations

## Installation
You can install this NPM using the command: `npm install myqui --save`
It is recommended to use NodeJS 14.15.1 LTS for this package.

## Documentation and examples
Reminder: you can find the complete documentation of MyQui at our web. (MANTEINANCE)

##### createConnection
createConnection is needed to stablish a connection to make working the database.
Also, this will create a `.quiconfig.yaml` config with some parameters to apply.

```js
const myqui = require('myqui')

const db = myqui.createConnection({
    host: '127.0.0.1', // 127.0.0.1 is the localhost IP, but you can set simply 'localhost' string.
    port: 25560, // this is the default port for MyQui. You can change it.
    user: 'root', // root haves all the permissions of the database.
    pass: 'aidak1234' // intended to login into the database.
})
```
##### connect
connect() will only work if you used createConnection before.
```js
db.connect()
```
##### prepare
prepare is intended to prepare data to later assign changes to query function.

```js
db.prepare({ db: 'test', key: 'id1', value: 'jake' })
// test is the database
// id1 is the key
// jake is the value
```

##### query
query is intended to execute SQL language for creating db files. You need to use prepare first to use query.
```js
// insert
db.query('INSERT ON DATABASE test PARAMETERS (id1, jake)')
// select
db.query('SELECT VALUE FROM DATABASE test WHERE KEY = id1')
// evaluate result (for checking if an object exists)
db.query('EVALUATE RESULT FROM DATABASE test WHERE KEY = id1')
// delete a database
db.query('DELETE DATABASE test')
```

##### viewSettings
viewSettings allow you to see the current configuration.
```js
db.viewSettings()
// return the .quiconfig.yaml file
```

##### close
close ends the connection to MyQui

#### How it works
```js
db.query('INSERT ON DATABASE foods PARAMETERS (14, popcorn)')

// this data is converted by the npm to:
```
```json
{"14": "Popcorn"}
```

## Source code
If you want to contribute to MyQui or Qui Database, you can view our GitHub repository.

## Changelog
- 2.0.2 == Added newlines to BSON files