import express from 'express';
import { userRouter } from "./controller/UserController.js";
import { itemRouter } from "./controller/ItemController.js";
import { cartRouter } from "./controller/CartContoller.js"; 
import cookieParser from "cookie-parser";
import { errorHandling } from './middleware/ErrorHandling.js';
import path from 'path';
import cors from 'cors';

const app = express();
const port = +process.env.PORT || 5510;

app.use((req, res, next) => {
    // CORS headers setup
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(),
    cors()
);

app.get('^/$|/capstone', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './static/index.html'));
});

// Use the correct router
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/cart', cartRouter); 

app.use(errorHandling);

app.listen(port, () => {
    console.log(`The server is now running on port http://localhost:${port}`);
});
