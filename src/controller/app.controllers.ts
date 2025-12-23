import asyncHandler from '../config/asyncHandler.js';
import appService from '../services/app.services.js';


let controller = {
    add:asyncHandler(async(req:Request,res:Response)=>{
        let {fileName,payload}=req.body;
        let result=appService.addservice(fileName,payload);
        return res.status(202).json(result);
    }),
    ping: asyncHandler(async (req: Request, res: Response) => {
        let result =  appService.pingService();
       return res.status(200).json(result);
    }),
    time: asyncHandler(async (req: Request, res: Response) => {
        let result = appService.timeService();
       return res.status(200).json(result);
    }),
    echo: asyncHandler(async (req: Request, res: Response) => {
        let result =  appService.echoService(req.body);
       return res.status(200).json(result);
    }),
    spam: asyncHandler(async (req: Request, res: Response) => {
        let result = await appService.spamService(req?.query?.username);
       return res.status(202).json(result);
    }),
    cron:asyncHandler(async(req:Request,res:Response)=>{
        let result=await appService.cronService(req.params.username);
        return res.status(202).json(result);
    })
}

export default controller;
export const {ping,time,echo,spam,add,cron}=controller;