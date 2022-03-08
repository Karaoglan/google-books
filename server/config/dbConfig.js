module.exports = {
    HOST: "localhost",
    USER: "karaoglan",
    PASSWORD: "password",
    DB: "bookmark_db",
    dialect: "mysql",
    port: "3309",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
