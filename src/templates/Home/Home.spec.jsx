import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
    // console.log('Chamada API de posts interceptada');
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img1.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img4.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title 5',
          body: 'body 5',
          url: 'img5.jpg',
        },
        {
          userId: 6,
          id: 6,
          title: 'title 6',
          body: 'body 6',
          url: 'img6.jpg',
        },
        {
          userId: 7,
          id: 7,
          title: 'title 7',
          body: 'body 7',
          url: 'img7.jpg',
        },
        {
          userId: 8,
          id: 8,
          title: 'title 8',
          body: 'body 8',
          url: 'img8.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);
describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it('should render posts, search and loadmore', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não há resultados para esta busca =(');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Pesquisar/i);
    expect(search).toBeInTheDocument();

    const img = screen.getAllByRole('img', /title/i);
    expect(img).toHaveLength(7); //length of handlers

    const button = screen.getByRole('button', { name: /Load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    const search = screen.getByPlaceholderText(/Pesquisar/i);
    const noMorePosts = screen.getByText('Não há resultados para esta busca =(');
    await waitForElementToBeRemoved(noMorePosts);
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 8/i })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');

    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Buscando por: title 1' })).toBeInTheDocument();
    userEvent.clear(search);

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
  });

  it('should load more posts on button click', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não há resultados para esta busca =(');
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load more posts/i });
    fireEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title 8 8' })).toBeInTheDocument();
  });
});
