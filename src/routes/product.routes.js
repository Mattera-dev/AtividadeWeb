import { Router } from "express";
import productController from "../controller/productController.js";

const productRouter = Router();

productRouter.get("/", productController.findAllProducts);
productRouter.get("/:id", productController.findProduct);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter