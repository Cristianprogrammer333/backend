import app from "./app";
import caseEntorno from "./config/index.js";
import "./config/database/mongo.js";

app.listen(app.get("PORT"), caseEntorno);



