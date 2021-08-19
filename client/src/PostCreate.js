import React, { useState } from "react";
import axios from "axios";
const PostCreate = ({ base }) => {
	const [title, setTitle] = useState("");

	async function submitHandler(e) {
		e.preventDefault();
		const { data } = await axios.post(`http://localhost:4000/posts`, { title });
		setTitle("");
		console.log(data);
	}

	return (
		<>
			<form onSubmit={submitHandler}>
				<div className="form-group">
					<label>Title</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="form-control"
					/>
				</div>
				<button className="btn btn-submit">Submit</button>
			</form>
		</>
	);
};

export default PostCreate;
