const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('hello');
  });

app.listen(8080, () => console.log(`Listening on 8080`));
