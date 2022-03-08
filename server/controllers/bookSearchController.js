const axios = require('axios');
const PAGE_SIZE = 9;
const db = require('../models');

// create main model
const Bookmark = db.bookmarks;

const bookSearch = async (req, res) => {
  console.log('bookSearch');

  let keywords = req.body.keywords;
  let author = req.body.author;
  let title = req.body.title;
  let startIndex = req.body.startIndex;

  let googleApi = `https://www.googleapis.com/books/v1/volumes?startIndex=${startIndex}&maxResults=${PAGE_SIZE}&q=`;

  let queryApi =
    googleApi + `"${keywords}"+inauthor:"${author}"+intitle:"${title}"`;

  const response = await axios.get(queryApi);

  let resp = {
    items: [],
    totalItems: response.data.totalItems,
  };
  resp.items = response.data.items ? response.data.items : [];

  for (let item of resp.items) {
    let bookmark = await Bookmark.findAll({
      where: { bookId: item.id },
    });
    console.log(bookmark);
    item['bookmarked'] = !!bookmark.length;
  }
  res.status(200).send(resp);
};

module.exports = {
  bookSearch,
};
