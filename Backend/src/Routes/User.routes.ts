import express from "express";

import { getAllUsers, getUserById, createUser } from "../Controllers/User.Controllers"

const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUserById)
router.route('/').post(createUser)

export default router