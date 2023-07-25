const { render, screen } = require("@testing-library/react")
import { Posts } from '.'


const props = {
    posts: [
        {
            title: 'title 1',
            body: 'body 1',
            id: 1,
            cover: 'img/img1.png'
        },
        {
            title: 'title 2',
            body: 'body 2',
            id: 2,
            cover: 'img/img2.png'
        },
        {
            title: 'title 3',
            body: 'body 3',
            id: 3,
            cover: 'img/img3.png'
        },
        {
            title: 'title 4',
            body: 'body 4',
            id: 4,
            cover: 'img/img4.png'
        }
    ]
}

describe('<Posts />', () => {
    it('should render all posts', () => {
        render(<Posts {...props} />)

        expect(screen.getAllByRole('heading', { name: /title/i }))
            .toHaveLength(4)
        expect(screen.getAllByRole('img', { name: /title/i }))
            .toHaveLength(4)
        expect(screen.getAllByText(/body/i ))
            .toHaveLength(4)

        expect(screen.getByRole('img', { name: /title 3/i }))
            .toHaveAttribute('src', 'img/img3.png')
    })

    it('should match the snapshot', ()=>{
        const { container } = render(<Posts {...props} />)

        expect(container.firstChild).toMatchSnapshot()
    })

    it('should not render any post when empty props',()=>{
        const { container } = render(<Posts />)

        expect(screen.queryByRole('heading', {name: /title/i})).not.toBeInTheDocument()
    })

    it('should match the snapshot', ()=>{
        const {container} = render(<Posts {...props} />)

        expect(container.firstChild).toMatchSnapshot()
    })

})