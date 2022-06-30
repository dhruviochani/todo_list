import React, { useState, useEffect } from 'react';
// import { Checkmark } from 'react-checkmark'
import axios from 'axios';
import './App.css';
// import Edit from './components/edit';
import { BsFillCheckSquareFill } from 'react-icons/bs';

const client = axios.create({
	baseURL: 'http://localhost:3006/tasks',
});

const App = () => {
	const [title, setTitle] = useState('');
	const [posts, setPosts] = useState([]);

	// GET with Axios
	useEffect(() => {
		const fetchPost = async () => {
			try {
				let response = await client.get();
				setPosts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPost();
	}, []);

	// DELETE with Axios
	const deletePost = async (id) => {
		try {
			await client.delete(`${id}`);
			setPosts(
				posts.filter((post) => {
					return post.id !== id;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPosts(title);
	};

	// POST 
	const addPosts = async (title) => {
		try {
			let response = await client.post('', {
				title: title,
			});
			setPosts([response.data, ...posts]);
			setTitle('');
		} catch (error) {
			console.log(error);
		}
	};

	//PUT
	const update = async (id) => {
		id.preventDefault();
		const { title } = this.state;

		await axios.put('http://localhost:3006/tasks/${id}', { title: { title } })

			.then(response => {
				this.setState({ status: response.status });
			})
	}

	return (
		<div className="app">
			<nav>
				<h1>TODO LIST</h1>
			</nav>
			<div className="add-post-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<button type="submit">Add tasks</button>

				</form>
			</div>
			<div className="posts-container">
				<h2>All tasks:</h2>
				{posts.map((post) => {
					return (
						<>
							<div className="post-card" key={post.id}>
								{/* <h3>{post.id}</h3> */}
								<div className="post-title">{post.title}</div>
								<div className="button">
									<div className='delete' onClick={() => deletePost(post.id)}>
										{/* <button className="delete-btn" onClick={() => deletePost(post.id)}>
											Delete
										</button> */}

										<BsFillCheckSquareFill className='icon' />
									</div>
{/* edit button */}
{/* <Router>
	<div className='edit-route'>
		
			<Route exact path="/edit" component={Edit}></Route>
			<Link to="/edit"><div className='edit'>
										<button className='update-btn' onClick={() => update(post._id)} >edit
										</button>
									</div>
									</Link>
	</div>
</Router> */}
<div className='edit'>
										<button className='update-btn' onClick={() => update(post._id)} >edit
										</button>
									</div>
									
								</div>

							</div>
						</>);
				})}
			</div>
		</div>
	);
};

export default App;