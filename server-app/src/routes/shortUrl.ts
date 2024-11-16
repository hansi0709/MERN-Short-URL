import express from "express";
import { createUrl, deleteUrl, getAllUrl, getUrl } from "../controller/shortUrl";

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl);
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);

export default router;//when we import this file anywhere, this router obj will be imported