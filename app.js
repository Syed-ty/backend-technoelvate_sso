const express = require('express');
const cors = require('cors');

const app = express();

// env config
require('dotenv').config();
// const {Register} = require('./model/auth-model');

const port = process.env.PORT || 3000;

// importing database
require('./config/db');

// cors middleware
app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json({
    limit: "50mb"
}));


const auth = require('./routes/auth.routes');
const user=require('./routes/user.routes');
const project =require('./routes/projectDetails.routes')
const payment = require('./routes/paymentandInvoice.routes')
const invoice = require('./routes/paymentandInvoice.routes')
const resource = require('./routes/paymentandInvoice.routes')

app.use('/auth', auth)
app.use('/user',user)
app.use('/project',project)
app.use('/payment',payment)
app.use('/invoice',invoice)
app.use('/resource',resource)


app.get('/', (req, res) => {
    res.json({
        app: 'Project_tracker',
        path: '/',
        response: "ok"
    });
});


//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        message: "Internal Server Error",
        details: err
    })
});


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
}).on('error', function (err) {
    console.log("Something Went Worng", err);
});

module.exports = app;