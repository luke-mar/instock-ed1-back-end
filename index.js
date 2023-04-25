const express = require('express');
const app = express();
const cors = require('cors');
const inventoryRoutes = require('./routes/inventoryRoute');
const warehouseRoutes = require('./routes/warehouseRoute');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('hello');
  });

app.use('/inventories', inventoryRoutes);

app.listen(8080, () => console.log(`Listening on 8080`));
