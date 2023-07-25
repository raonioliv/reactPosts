import './styles.css';

import { useEffect, useState } from 'react';


import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { LoadMorePosts } from '../../components/LoadMorePosts'
import { SearchBar } from '../../components/SearchBar'


const Home = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [allPosts, setAllPosts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  
  const filteredPosts = !!searchValue ? allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase())
  }) : posts


  const fetchPosts = async () => {
    const postsAndPhotos = await loadPosts()
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }



  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    setPosts(posts)
    setPage(nextPage)
  }
  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  
  const noMorePosts = page + postsPerPage >= allPosts.length ? true : false


  useEffect(()=>{
    fetchPosts()
  }, ['fetchPosts'])

  return (
    <section className='container'>

      {!!searchValue && filteredPosts.length > 0 && (
        <>
          <h1><b>Buscando por: </b> {searchValue} </h1>
        </>
      )}

      <SearchBar handleChange={handleChange} inputValue={searchValue} />
      <Posts posts={filteredPosts} />

      {!!!searchValue && (
        <>
          <LoadMorePosts
            text={'Load more posts'}
            loadMorePosts={loadMorePosts}
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
export default Home;
