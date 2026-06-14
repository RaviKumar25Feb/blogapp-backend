const express = require("express");
const app = express();
const cors = require('cors');

require("dotenv").config();

//middleware for parsing the data from req.body
app.use(express.json());

//import db
const dbConnect = require("./configs/dbConnect")
dbConnect();

app.use(cors({
  origin: 'https://blogapp-frontend-xi.vercel.app/'
}));


const PORT = process.env.PORT || 5000;
//listen the app
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})

//import the routes and mount them
const blogRoutes = require("./routes/blog.routes");
app.use("/api/blogs", blogRoutes);

//default routes
app.get("/", (req, res) => {
    res.send(`<h1>Welcome to HOMEPAGE..</h1>`)
});
