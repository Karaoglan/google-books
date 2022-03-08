const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("connected...");
    })
    .catch((err) => {
        console.log("Error: " + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.bookmarks = require("./bookmarkModel.js")(sequelize, DataTypes);

db.users.hasMany(db.bookmarks);

db.sequelize.sync({ force: false }).then(() => {
    let userObject = {
        username: "mk-user",
        email: "mk-user@mk.com",
        password:
            "$2a$08$Kd0HQB9ziyMpH4K3g1eOd.xLS7avbIcOj1QrpLy9nzmAPpXeu82Ki", // 12345
        roles: "user",
    };
    let adminObject = {
        username: "mk",
        email: "mk@mk.com",
        password:
            "$2a$08$YNSZz5NlNrvJ8MbCC0SvceJRoXICu5UU9xCxitlJbnIlPZ8Bd/hVy", // 1234
        roles: "admin",
    };
    const User = db.users;
    User.findAll({}).then((res) => {
        if (!res || !res.length) {
            User.create(userObject).then(() => console.log("user created"));
            User.create(adminObject).then(() => console.log("Admin created!"));
        }
    });
    console.log("Re-sync done");
});

module.exports = db;
