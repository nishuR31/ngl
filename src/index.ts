import envf from "envf";
import app from "./app.js";

envf.load(".env");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
