import express from "express";

import {getAllUsers , getUserById , createUser , editUser} from "../Controllers/User.Controllers"

const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUserById)
router.route('/').post(createUser)
router.route('/:id').patch(editUser)

export default router