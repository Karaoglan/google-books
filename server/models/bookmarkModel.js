module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('bookmark', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Bookmark;
};
