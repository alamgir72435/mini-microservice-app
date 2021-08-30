const express = require("express");
const app = express();

app.use(require("morgan")("tiny"));

app.get("/", (req, res) => {
	res.send(`Hello world <br/>${JSON.stringify(process.env)} `);
});

const PORT = 80;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
