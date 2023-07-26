import { fireEvent, render, screen } from '@testing-library/react';
import { LoadMorePosts } from '.';
import { mockedProps } from './mock';
const props = mockedProps;
describe('<LoadMorePosts />', () => {
  it('should render the button with text "LOAD MORE"', () => {
    render(<LoadMorePosts {...props} />);
    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should trigger the function on click', () => {
    const fn = jest.fn();
    render(<LoadMorePosts {...props} onClick={fn()} />);

    const button = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be enabled when its false', () => {
    render(<LoadMorePosts {...props} disabled={false} />);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeEnabled();
  });

  it('should match the snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<LoadMorePosts text="Load More" loadMorePosts={fn} disabled={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
