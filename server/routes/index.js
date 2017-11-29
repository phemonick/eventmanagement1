import express from 'express';
import eventController from '../controllers/eventController';
import centerController from '../controllers/centerController';
import userController from '../controllers/userController';
//imported json authentication
import Auth from '../middleware/Auth'

const router = express.Router();

/* Get Home Page. */

router.get('/', (req, res) => {
  res
    .status(200)
    .send({message: 'welcome to our Event Manager'});
});

router.get('/events', Auth.verifyToken, eventController.getEvent);
router.get('/events/:id', Auth.verifyToken, eventController.getOneEvent);
router.post('/events', Auth.verifyToken, eventController.createEvent);
router.put('/events/:id', Auth.verifyToken, eventController.editEvent);
router.delete('/events/:id', Auth.verifyToken,  eventController.deleteEvent);

router.get('/centers', Auth.verifyToken, centerController.getCenter);
router.get('/centers/:id', Auth.verifyToken, centerController.getOneCenter);
router.post('/centers', Auth.verifyToken, centerController.createCenter);
router.put('/centers/:id', Auth.verifyToken, centerController.editCenter);
router.delete('/centers/:id', Auth.verifyToken, centerController.deleteCenter);

router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);

export default router;
