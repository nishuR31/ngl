import {Router} from 'express';

import {ping,time,echo,spam} from "../controller/app.controllers.js";

let router: Router = Router();

router.get('/ping',ping);

router.get('/time',time);

router.post('/echo',echo);

router.get('/spam',spam);

export default router;