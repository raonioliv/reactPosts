import './App.css';
import { Component } from 'react';

class App extends Component { 

  // may use the class fields (javascript technic) to avoid using constructor like below
  /*
    state = { 
      .// state code
    }

  */
  state = { 
    posts: []
  }


  //arrow function notation dismissal the bind() method usage because has no scope for 'this' arg

  loadPosts = async () => { 
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photosResponse ])

    const postsJson = await  posts.json()
    const photosJson = await  photos.json()

    const postsWithPhotos = postsJson.map((post, index) => { 
      return { ...post, cover: photosJson[index].url}
    })

    this.setState({posts: postsWithPhotos})
  }
  componentDidMount(){ 
    // console.log('raonii');
    this.loadPosts()
  }
  render(){ 
    const {posts} = this.state
    return (
      <div className="posts">
        {posts.map(post => (
          <div className='post' key={post.id}>
            <img className='postImg' src={post.cover} alt={post.title}/>
            <div className='post-content'>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
