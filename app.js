import express from "express";
import getConfig from "./src/config/env.js";
import userRouter from "./src/routes/user.routes.js";

const app = express();

const config = getConfig();

app.use(express.json())
app.use("/usuarios", userRouter)

app.listen(config.app.port, config.app.host, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.clear()
    console.log(`Servidor rodando em ${config.app.host}:${config.app.port}`);

})