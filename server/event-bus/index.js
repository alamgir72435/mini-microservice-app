const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(require("cors")());

const events = [];

app.post("/event", (req, res) => {
	const event = req.body;
	events.push(event);
	axios.post("http://localhost:4000/events", event);
	axios.post("http://localhost:4001/events", event);
	axios.post("http://localhost:4002/events", event);
	axios.post("http://localhost:4003/events", event);

	res.send("OK");
});

app.get("/events", (req, res) => {
	res.send(events);
});

app.listen(4005, () => console.log("Event Bus on 4005"));
