import { Router } from "express";
import { productController } from "./../controllers/products";

const productRouter = Router();
productRouter.post("/", productController.insertProduct);
productRouter.get("/", productController.listProducts);
productRouter.get("/:id", productController.findById);
productRouter.delete("/:id", productController.deleteById);
productRouter.put("/:id", productController.updateProduct);

export { productRouter };
