module.exports = {
    HOST: "bookmark_db",
    USER: "karaoglan",
    PASSWORD: "password",
    DB: "bookmark_db",
    dialect: "mysql",
    port: "3306",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
