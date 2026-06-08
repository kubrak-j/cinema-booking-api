import express from "express";

const app = express();
app.use(express.json());
const port = 7000;

app.listen(port, () => {
    console.log(`The server is running`);
    console.log(`listening on port ${port}`);
});

