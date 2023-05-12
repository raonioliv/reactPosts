import './styles.css';

import { Component, useState } from 'react';


import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { LoadMorePosts } from '../../components/LoadMorePosts'
import { SearchBar } from '../../components/SearchBar'


const Home = () => {
  const [posts, setPosts] = useState([])
  
  const noMorePosts = page + postsPerPage >= allPosts.length ? true : false
  return (
    <section className='container'>

      {!!searchValue && filteredPosts.length > 0 && (
        <>
          <h1><b>Buscando por: </b> {searchValue} </h1>
        </>
      )}

      <SearchBar handleChange={this.handleChange} inputValue={searchValue} />
      <Posts posts={filteredPosts} />

      {!!!searchValue && (
        <>
          <LoadMorePosts
            text={'Load more posts'}
            loadMorePosts={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </>
      )}
      {!filteredPosts.length && (
        <>
          <h1>Não há resultados para esta busca =( </h1>
        </>
      )}
    </section>
  )

}

class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 20,
    searchValue: ''
  }

  componentDidMount() {
    this.setPosts()
  }

  setPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    this.setState({
      posts, page: nextPage
    })
  }
  handleChange = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  render() {


    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
      : posts
    return (

    );
  }
}

export default Home;
