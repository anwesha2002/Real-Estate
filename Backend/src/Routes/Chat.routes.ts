import express  from "express";
import {getChatByChatId , sendMessage , clearChat , deleteChat} from "../Controllers/Chat.Controllers";

const router = express.Router()

router.route("/:id").post(sendMessage)
router.route("/:id").get(getChatByChatId)
router.route("/:id").delete(clearChat)
router.route("/delete/:id").delete(deleteChat)

export default router