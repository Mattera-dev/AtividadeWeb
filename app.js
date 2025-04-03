import express from "express";
import getConfig from "./src/config/env.js";
import userRouter from "./src/routes/user.routes.js";
import productRouter from "./src/routes/product.routes.js";

const app = express();

const config = getConfig();

app.use(express.json())
app.use("/usuarios", userRouter)
app.use("/produtos", productRouter)

app.listen(config.app.port, config.app.host, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.clear()
    console.log(`Servidor rodando em ${config.app.host}:${config.app.port}`);

})