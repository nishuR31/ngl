import express from 'express';
import router from './routes/app.routes.js';
import path from 'node:path';
const app = express();
import fs from "node:fs"
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes


app.get('/api/files',(req: Request, res: Response) => {
  const dataDir = path.join(process.cwd(), "src", "data");
  try {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));
    res.json({ files });
  } catch (e) {
    res.status(500).json({ error: "Cannot read data folder" });
  }

});

app.get("/api/file/:file", (req:Request, res:Response) => {
  const safe = req.params.file.replace(/[^a-zA-Z0-9_-]/g, "");
  const filePath = path.join(process.cwd(), "src", "data", `${safe}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

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