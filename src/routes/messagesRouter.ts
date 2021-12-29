const router = require('express').Router();
const {getAllMessages: getAllMessagesHandler} = require('../controllers/messagesController.ts');
const {googleAuth: googleAuthentication} = require('../controllers/auth/googleAuth.ts');

const googleAuthenticationMiddleware = async (req: any, res: any, next: any) => {
  const response = await googleAuthentication(req.headers.authorization);
  if(response) next();
  else { res.statusCode = 403; next(); }
};
router.use(googleAuthenticationMiddleware)
router.get("/", getAllMessagesHandler);

module.exports = router;
