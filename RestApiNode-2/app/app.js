import express, {Router} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import enviroments from "./config/enviroments";
import taskRoutes from "./routes/task.routes";

const app = express();

//settings
app.set("PORT", process.env.PORT);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
// Router.use(express.json({}));

//routes
app.get("/", (req, res) =>{
    res.send({ mssage: "Welcome to aplication"});
});

app.use("/api/task", taskRoutes);

export default app;