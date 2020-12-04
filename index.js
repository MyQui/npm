const fs = require('fs')
const readline = require('readline')
const figlet = require('figlet')
const colors = require('colors')
const package = require('./package.json')
const grac = require('graceful-fs')
const sql = require('sqlite3')

function createConnection(options) {
    host = options.host
    port = options.port
    user = options.user
    pass = options.password


    fs.writeFileSync(`.quiconfig.yaml`, `# This is the configuration file for your MyQui Database. Do not change anything if you don't know what are you doing.

    connection info:
    host: ${host}
    port: ${port}
    username: ${user}
    password: ${pass}
    
    settings: 
    deprecate old URLs: false
    safe stringify: true
    block remote: false
    createconnection includes db parameter: false`)

    figlet('MyQui', function(err, data) {
        console.log(colors.brightBlue(data))
        console.log('')
        console.log(`Version ${package.version}`)
    })
}

function connect() {
    if (!fs.existsSync('myqui')){
        fs.mkdirSync('myqui')
    }
}

function viewSettings() {
    console.log(colors.brightYellow(`   connection info:
    host: ${host}
    port: ${port}
    username: ${user}
    password: ${pass}
    
    settings: 
    deprecate old URLs: false
    safe stringify: true
    block remote: false
    createconnection includes db parameter: false`))
      
}
function prepare(options) {
    db = options.db
    key = options.key
    value = options.value
    if(!fs.existsSync(`myqui/${db}.qui`)){
        fs.writeFileSync(`myqui/${db}.qui`, '{}')
    }
}
function query(string) {
    if (string === `INSERT ON DATABASE ${db} PARAMETERS (${key}, ${value})`){
    let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')
    let fcol = JSON.parse(col)

    fcol[key] = value
    fs.writeFileSync(`myqui/${db}.qui`, JSON.stringify(fcol, null, 2))
    }

    if (string === `SELECT VALUE FROM DATABASE ${db} WHERE KEY = ${key}`) {
        let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')
        let fcol = JSON.parse(col)
    
        return fcol[key]
    }

    if (string === `EVALUATE RESULT FROM DATABASE ${db} WHERE KEY = ${key}`) {
        let col = fs.readFileSync(`myqui/${db}.qui`, 'utf-8')

        let fcol = JSON.parse(col)
        let objf = fcol[key]
    
        if(objf){
            return true
        } else if (!objf){
            return false
        }
    }

}

function close(){

}

module.exports = {
    createConnection,
    connect,
    prepare,
    query,
    viewSettings,
    close
}