import express from 'express';
import multer from 'multer';
import controller from './controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // note: dest, not desc



router.post("/newAccount", controller.signUp)
router.post('/signin', controller.signIn)
router.post('/playlists', controller.playlists)
router.post('/checkToken', controller.checkToken)
router.get('/fetchSongs', controller.fetchSongs)
router.get('/:id/addView', controller.addView)
router.get('/getAuthorsAlbums', controller.getDataFromToken, controller.getAuthorsAlbums)
router.post(
  '/saveSongInBase',
  upload.fields([
    { name: 'mp3',   maxCount: 1 },
    { name: 'img', maxCount: 1 }
  ]),
  controller.saveSongInBase
);
export default router;