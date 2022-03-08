const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { configs } = require('./config');
const { authJwt } = require('./middleware');

const app = express();

var corOptions = {
  origin: 'https://localhost:8081',
};

// middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'karaoglan-session',
    secret: configs.cookieSecret,
    httpOnly: true,
    sameSite: 'strict',
  })
);

// routers
const bookmarkRouter = require('./routes/bookmarkRouter.js');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const bookSearchRouter = require('./routes/bookSearchRouter');

app.use(
  '/api/bookmarks',
  [authJwt.verifyToken, authJwt.isUser],
  bookmarkRouter
);
app.use('/api/login', authRouter);
app.use('/api/users', userRouter);
app.use('/api/bookSearch', bookSearchRouter);

// testing api

app.get('/', (req, res) => {
  res.json({ message: 'Hello Fullstack Developer' });
});

// port

const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});
