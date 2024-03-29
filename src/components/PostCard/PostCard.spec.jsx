import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { mockedProps } from './mock';
const props = mockedProps;
describe('< PostCard />', () => {
  it('should render post card correctly', () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: /title 1/i })).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { container } = render(<PostCard {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
