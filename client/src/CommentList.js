import React from "react";
const CommentList = ({ comments }) => {
	return (
		<ul>
			{comments.map((x) => {
				let content;

				if (x.status === "approved") {
					content = x.content;
				}

				if (x.status === "pending") {
					content = "This comment is awaiting moderation";
				}

				if (x.status === "rejected") {
					content = "This comment has been rejected";
				}

				return <li key={x.id}>{content}</li>;
			})}
		</ul>
	);
};

export default CommentList;
