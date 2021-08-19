import PostCreate from "./PostCreate";
import PostList from "./PostList";
const base = "http://localhost:4002";
function App() {
	return (
		<div className="container">
			<header className="App-header">
				<h1>Create Post</h1>
			</header>
			<PostCreate base={base} />
			<hr />
			<h2>Post List</h2>
			<PostList base={base} />
		</div>
	);
}

export default App;
