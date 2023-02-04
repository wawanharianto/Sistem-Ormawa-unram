import express from 'express';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sequelizeStore from 'connect-session-sequelize';
import db from './config/Database.js';
import Userroute from './routes/user.js';
import Proposalroute from './routes/proposal.js';
import Authroute from './routes/auth.js';
dotenv.config();
import cors from 'cors';
import Spjroute from './routes/spj.js';
import Lpjroute from './routes/lpj.js';
const app = express();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

try {
  await db.authenticate();
  console.log('Database Connected...');
  // await db.sync();
} catch (error) {
  console.error(error);
}

app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('profilePic'));
app.use(express.static('proposalData'));
app.use(express.static('spjData'));
app.use(express.static('lpjData'));
app.use(express.static('export'));
app.use(Userroute);
app.use(Proposalroute);
app.use(Authroute);
app.use(Spjroute);
app.use(Lpjroute);

// store.sync();

app.listen(3000, () => console.log('server running at port 3000'));
