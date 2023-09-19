import './styles.css';

import { useEffect, useState, useCallback } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { LoadMorePosts } from '../../components/LoadMorePosts';
import { SearchBar } from '../../components/SearchBar';
import { act } from 'react-dom/test-utils';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(7);
  const [allPosts, setAllPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const fetchPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setAllPosts(postsAndPhotos);
    setPosts(postsAndPhotos.slice(page, postsPerPage));
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };
  const handleChange = (event) => {
    const { value } = event.target;
    act(() => {
      setSearchValue(value);
    });
  };

  const noMorePosts = page + postsPerPage >= allPosts.length ? true : false;

  useEffect(() => {
    console.log(new Date().toLocaleString('pt-BR'));
    fetchPosts(0, postsPerPage);
  }, [postsPerPage, fetchPosts]);

  return (
    <>
      <section className="container">
        {!!searchValue && filteredPosts.length > 0 && (
          <>
            <h1>
              <b>Buscando por: </b> {searchValue}{' '}
            </h1>
          </>
        )}

        <SearchBar handleChange={handleChange} searchValue={searchValue} />
        <Posts posts={filteredPosts} />

        {!searchValue && (
          <>
            <LoadMorePosts text={'Load more posts'} loadMorePosts={loadMorePosts} disabled={noMorePosts} />
          </>
        )}
        {!filteredPosts.length && (
          <>
            <h1>Não há resultados para esta busca =( </h1>
          </>
        )}
      </section>
    </>
  );
};
export default Home;
