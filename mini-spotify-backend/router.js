import express from 'express'
import controller from './controller.js'

const router = express.Router();

router.post("/newAccount", controller.signUp)
router.post('/signin', controller.signIn)
router.post('/playlists', controller.playlists)
router.post('/checkIsLogedIn', controller.checkIsLogedIn)
export default router;