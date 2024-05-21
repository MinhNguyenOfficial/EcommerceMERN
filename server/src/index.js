const express = require('express');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const moongose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

moongose.set('strictQuery', true);

moongose
  .connect(process.env.MONGO_DB)
  .catch(() => console.log('Failure connect to DB!'));

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());
routes(app);

app.get('/', (req, res) => {
  return res.send('Hello, world');
});

https
  .createServer(
    {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is runing at port: ${port}`);
  });
