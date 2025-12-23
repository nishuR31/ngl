import {Router} from 'express';

import {ping,time,echo,spam,add,cron} from "../controller/app.controllers.js";

let router: Router = Router();

router.get('/ping',ping);

router.get('/time',time);

router.post('/echo',echo);

router.get('/spam',spam);

router.post('/add',add);

router.get("/user/:username",cron);

export default router;