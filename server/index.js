const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const path = require('path');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('hello world')
});


app.use(cors());
app.use(bodyParser.json());

const uristring = "mongodb+srv://admin:admin@cluster0.mywe7.mongodb.net/agenda?retryWrites=true&w=majority";

mongoose.connect(uristring, {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

/*if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}*/


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
