const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const axios = require("axios");
app.use(express.json());
app.use(require("cors")());
const posts = {};

app.get("/", (req, res) => {
	res.json({ data: process.env });
});

app.get("/check", (req, res) => {
	const data = {
		pid: process.pid,
	};
	res.json(data);
});

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts", async (req, res) => {
	const id = randomBytes(4).toString("hex");
	const { title } = req.body;
	posts[id] = {
		id,
		title,
	};

	await axios.post("http://event-bus-srv:4005/event", {
		type: "PostCreated",
		data: {
			id,
			title,
		},
	});

	res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
	console.log("v20");
	console.log("Received Event", req.body.type);
	res.send({});
});

app.listen(4000, () => console.log("posts on 4000"));
