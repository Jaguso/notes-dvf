const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//de clase 2
const routes = require('./routes');
//

const app = express();

const port = process.env.PORT || 8080;

const {errors} = require("celebrate");

const cors = require('cors');
//con cors hay waitlists y blacklists (en las primeras decimos que servidores queremos que entren y la segunda qué servidores queremos que no entren)


// éstos son middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1', routes);
app.use(errors()); //éste tiene que ser el último app.use
app.use(cors());

app.get('/', (req, res) => {
    res.send("Everything Works :)")
})

app.listen(port, e => console.log(`works in port ${port}`));

module.exports = app;


