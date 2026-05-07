import express from "express";
import routeTask from "./src/routes/routeTask.js";
import cors from "cors";
import routeProject from "./src/routes/routeProject.js";
import routeAuth from "./src/routes/routeAuth.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/task", routeTask);
app.use('/project', routeProject);
app.use("/user", routeAuth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
