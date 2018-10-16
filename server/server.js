const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 8080;


app.use('/api/v1', routes);
// éstos son middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Everything Works :)")
})

app.listen(port, e => console.log(`works in port ${port}`));


