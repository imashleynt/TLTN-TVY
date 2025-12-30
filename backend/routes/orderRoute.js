import express from "express";
import { listOrders, placeOrder, updateStatus, userOrders, verfyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verfy", verfyOrder);
orderRouter.post("/userorders", authMiddleware,userOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;