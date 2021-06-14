import { Router } from "express";
import {
    login,
    register
} from "../controllers";
import { verifyToken } from "../controllers/jwt";
const router = Router();

router.get('/', (req, res) => { res.send(`${req.app.get('servicename')} service working!`) })
router.post('/login', login);
router.post('/register', register);
router.get('/verify-token', verifyToken);

export default router;