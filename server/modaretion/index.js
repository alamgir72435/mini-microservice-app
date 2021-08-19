const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
	const { type, data } = req.body;

	if (type === "CommentCreated") {
		const status = data.content.includes("orrange") ? "rejected" : "approved";

		await axios.post("http://localhost:4005/event", {
			type: "CommentModerated",
			data: {
				id: data.id,
				postId: data.postId,
				status,
				content: data.content,
			},
		});

		console.log("Comment Modareted");
	}

	res.send({});
});

app.listen(4003, console.log(`Modaretion on 4003`));
