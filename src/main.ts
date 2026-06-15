import express from "express";
import moviesRouter from "./routes/movies.js";
import sessionsRouter from "./routes/sessions.js";

const app = express();
app.use(express.json());
app.use(`/movies`, moviesRouter);
app.use(`/sessions`, sessionsRouter);

const port = 7000;

app.listen(port, () => {
    console.log(`The server is running`);
    console.log(`listening on port ${port}`);
});
