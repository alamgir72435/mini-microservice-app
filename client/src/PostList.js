import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = ({ base }) => {
	const [posts, setPosts] = useState([]);

	async function loadData() {
		const { data } = await axios.get(`${base}/posts`);
		console.log(data);
		setPosts(data);
	}

	useEffect(() => {
		loadData();
		// eslint-disable-next-line
	}, []);

	const renderPosts = Object.values(posts).map((post) => {
		return (
			<div key={post.id} className="card mr-2">
				<div className="card-body">
					<h3>{post.title}</h3>
					<CommentList comments={post.comments} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div style={{ display: "flex", justifyContent: "flex-between" }}>
			{renderPosts}
		</div>
	);
};

export default PostList;
