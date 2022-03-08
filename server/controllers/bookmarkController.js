const db = require('../models');

// create main model
const Bookmark = db.bookmarks;

const User = db.users;

Bookmark.belongsTo(User, {
  foreignKey: '1',
  as: 'user',
});

const addBookmark = async (req, res) => {
  console.log('addBookmark');
  let bookmarkObject = {
    bookId: req.body.bookId,
  };

  const bookmark = await Bookmark.create(bookmarkObject);
  res.status(200).send(bookmark);
};

const getAllBookmarks = async (req, res) => {
  console.log('getAllBookmarks');
  let bookmarks = await Bookmark.findAll({});
  res.status(200).send(bookmarks);
};

const getBookmark = async (req, res) => {
  console.log('getBookmark');
  let id = req.params.id;
  let bookmark = await Bookmark.findAll({
    where: { bookId: id },
  });
  if (!bookmark.length) {
    res.status(404).send();
  } else {
    res.status(200).send(bookmark);
  }
};

const updateBookmark = async (req, res) => {
  console.log('updateBookmark');
  let id = req.params.id;

  const bookmark = await Bookmark.update(req.body, { where: { id: id } });

  res.status(200).send(bookmark);
};

const deleteBookmark = async (req, res) => {
  let id = req.params.id;
  await Bookmark.destroy({
    where: { id: id },
  });
  res.status(200).send('bookmark deleted');
};

// const userBookmark = async (req, res) => {
//   const bookmark = await Bookmark.findAll({where: { user }})
//   let id = req.params.id;
//   await Bookmark.destroy({
//     where: { id: id }
//   });
//   res.status(200).send('bookmark deleted');
// }

module.exports = {
  addBookmark,
  getAllBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark,
};
