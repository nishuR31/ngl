import express from 'express';
import router from './routes/app.routes.js';
import path from 'path';
const app = express();
let __dirname = path.resolve();
// console.log(__dirname)
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes


app.get('/api/questions',(req: Request, res: Response) => {
  const filePath = path.join(__dirname, 'src/data/questions.json');
  res.sendFile(filePath);
});

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello from server'});
});

app.all("/{*splat}", (req: Request, res: Response) => {
res.status(404).json({ error: "Endpoint not found" });
})




// basic error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
});


export default app;