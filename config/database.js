const dev = {
    username: "root",
    password: "root",
    database: "nodeMCU",
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 1,
        idle: 20000
    }
}

const production = {
    
}



module.exports = dev;