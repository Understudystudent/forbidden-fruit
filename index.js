import { userRouter, express } from "./controller/UserContoller.js";
import { itemRouter } from "./controller/ItemContoller.js";
import {errorHandling} from './middleware/ErrorHandling.js'
import ItemMiddleware from './middleware/ItemsMiddleware.js';
import cookieParser from "cookie-parser";

import path from 'path'
import cors from 'cors'
// import { config } from "dotenv";
// config()

const app = express()
const port = +process.env.PORT || 5510
// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  })  
app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
      extended: true,
    }),
    cookieParser(), 
    cors()
  )
app.get('^/$|/capstone', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, './static/index.html'))
})
app.use('/users', userRouter)
app.use('/items', itemRouter);
app.use(errorHandling)
app.use(ItemMiddleware);
app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})