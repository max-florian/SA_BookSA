import { Router, Application } from "express";
import {
    login,
    register
} from "../controllers";
const router = Router();

router.get('/', (req, res) => { res.send(`${req.app.get('servicename')} service working!`) })
router.post('/login', login);
router.post('/register', register);

export default router;