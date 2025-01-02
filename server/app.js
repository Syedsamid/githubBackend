import express from "express"
import config from "config"
import userRouter from "./controllers/user/index.js"
import repoRouter from "./controllers/repos/index.js"
import gistRouter from "./controllers/gists/index.js"
import publicRouter from "./controllers/public/index.js"


import "./utils/dbConnect.js"
import authMiddleware from "./middleware/auth.js"

const app = express()
const PORT = config.get("PORT")

app.use(express.json());

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"Samid"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

app.use("/api/public",publicRouter)

app.use(authMiddleware);

app.use("/api/private/users",userRouter);
app.use("/api/private/repos",repoRouter);
app.use("/api/private/gists",gistRouter)

app.listen(PORT,()=>{
    console.log(`Server is running at PORT no.${PORT}`);
})
