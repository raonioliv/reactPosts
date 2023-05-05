import './styles.css';

import { Component } from 'react';


import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { LoadMorePosts } from '../../components/LoadMorePosts'
class Home extends Component { 
  state = { 
    posts: [],
    allPosts: [], 
    page: 0, 
    postsPerPage: 20
  }

  componentDidMount(){ 
    this.loadPosts()
  }

  loadPosts = async () => { 
    const {page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage) , 
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => { 
    const { 
      page,
      postsPerPage,
      allPosts, 
      posts
     } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage )
    posts.push(...nextPosts)
    this.setState({ 
      posts, page: nextPage
    }) 
  }
  render(){ 
    const {posts, postsPerPage, page, allPosts} = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length ? true : false 
    return (
      <section className='container'>
        <Posts posts={posts}/>
        <LoadMorePosts 
        text={'Load more posts'}
        loadMorePosts={this.loadMorePosts}
        disabled={noMorePosts}
        />
      </section>
    );
  }
}

export default Home;
