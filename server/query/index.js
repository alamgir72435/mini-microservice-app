const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
// QUICK EXAMPLE
// posts ===
// 	{
// 		"232hkhjk": {
// 			id: "232hkhjk",
// 			title: "post title",
// 			comments: [{ id: "ásldjf", content: "comment " }],
// 		},
// 	};

function handleEvent(type, data) {
	if (type === "PostCreated") {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}

	if (type === "CommentCreated") {
		const { id, content, postId, status } = data;
		const post = posts[postId];
		post.comments.push({ id, content, status });
	}

	if (type === "CommentUpdated") {
		const { id, postId, status, content } = data;
		const findPost = posts[postId];
		const comment = findPost.comments.find((x) => x.id === id);
		comment.status = status;
		comment.content = content;
	}
}

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;
	handleEvent(type, data);
	res.send({});
});

app.listen(4002, async () => {
	console.log("Query on 4002");
	const { data: events } = await axios.get("http://localhost:4005/events");
	for (let eachEvent of events) {
		const { type, data } = eachEvent;
		console.log("Processing event :", type);
		handleEvent(type, data);
	}
});
