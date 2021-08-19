const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const axios = require("axios");
app.use(express.json());
app.use(require("cors")());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;
	const comments = commentsByPostId[req.params.id] || [];
	comments.push({ id: commentId, content, status: "pending" });
	commentsByPostId[req.params.id] = comments;

	await axios.post("http://localhost:4005/event", {
		type: "CommentCreated",
		data: {
			id: commentId,
			content,
			postId: req.params.id,
			status: "pending",
		},
	});

	res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
	console.log("event Received", req.body.type);

	const { type, data } = req.body;

	if (type === "CommentModerated") {
		const { id, postId, status, content } = data;
		const comments = commentsByPostId[postId];
		const comment = comments.find((x) => x.id === id);
		comment.status = status;

		await axios.post("http://localhost:4005/event", {
			type: "CommentUpdated",

			data: {
				id,
				postId,
				status,
				content,
			},
		});
	}

	res.send({});
});

app.listen(4001, () => console.log("Comments on 4001"));