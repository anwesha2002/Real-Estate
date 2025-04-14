import express  from "express";
import {getChatByChatId , sendMessage} from "../Controllers/Chat.Controllers";

const router = express.Router()

router.route("/:id").post(sendMessage)
router.route("/:id").get(getChatByChatId)

export default router