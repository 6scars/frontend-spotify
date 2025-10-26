import express from 'express'
import controller from './controller.js'

const router = express.Router();

router.post("/newAccount", controller.signUp)
router.post('/signin', controller.signIn)
router.post('/playlists', controller.playlists)
router.post('/checkToken', controller.checkToken)
router.get('/fetchSongs',controller.fetchSongs)
router.get('/:id/addView',controller.addView)
export default router;