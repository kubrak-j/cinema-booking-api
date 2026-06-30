import express from "express";
import moviesRouter from "./routes/movies.route.js";
import sessionsRouter from "./routes/sessions.route.js";
import authRouter from "./routes/auth.route.js";
import bookingsRouter from "./routes/bookings.route.js";

const app = express();
app.use(express.json());
app.use(`/movies`, moviesRouter);
app.use(`/sessions`, sessionsRouter);
app.use(`/auth`, authRouter);
app.use(`/bookings`, bookingsRouter);

const port = 7000;

app.listen(port, () => {
    console.log(`The server is running`);
    console.log(`listening on port ${port}`);
});
