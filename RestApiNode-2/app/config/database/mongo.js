import express from "express";
import mongoose from "mongoose";
import message from "../message.js";

const app = express();

(async () => {
    try {
        app.set("DB_URI" , process.env.DB_URI);
        const db = await mongoose.connect(app.get("DB_URI"),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        message(`Base de datos en: ${db.connection.name}`, "success");
    } catch (error) {
        message(error, "danger");
    }
})();