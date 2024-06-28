const express = require('express');

const {connectMongo} = require('./connect')
const Url = require('./models/url');
const path = require('path');
const cookieParser = require('cookie-parser');

const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const { loggedinUserOnly, checkAuth } = require('./middleware/auth');

const app = express();
const port = 8001;

connectMongo('mongodb://localhost:27017/shorturl')
.then(() => console.log("Connected to MongoDB"));

app.set('view engine', 'ejs')
app.set('views',path.resolve("./views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// app.get('/test', async (req,res) => {
//     const allUrls = await Url.find()
//     return res.render('home',{
//         urls: allUrls,
//     });
// });

app.use("/url",loggedinUserOnly,urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user", userRoute);

app.listen(port , () => console.log(`Server running on port ${port}`)); 