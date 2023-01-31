import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();
mongoose.set('strictQuery',false)
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-auth-token, Origin, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-control-Allow-Methods", "GET, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, content-type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie",movieRouter);
app.use("/booking", bookingsRouter)

app.get("/", async function(request,response){
    response.send("Hi, Welcome to Capstone...!!!")
})

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.mc3htnf.mongodb.net/MovieTicket`
    ).then(()=>{
        app.listen(6000, ()=>{
            console.log(`Connected to Database and Server is running`);
        })
    }).catch((e)=>
        console.log(e)
    )

