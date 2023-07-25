import { fireEvent, render, screen } from "@testing-library/react";
import { LoadMorePosts } from "."


describe('<LoadMorePosts />', () =>{
    it('should render the button with text "LOAD MORE"', () => { 
        render(<LoadMorePosts text="Load More" />);
        expect.assertions(1)
        const button = screen.getByRole('button', {name: /load more/i})
        expect(button).toBeInTheDocument()
    })

    it('should trigger the function on click', ()=>{ 
        const fn = jest.fn()
        render(<LoadMorePosts text="Load More" onClick={fn()} />)
        
        const button = screen.getByRole('button', {name: /load more/i})
        fireEvent.click(button)    
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should be enabled when its false', ()=>{ 
        render(<LoadMorePosts text="Load More" disabled={false} />)
        
        const button = screen.getByRole('button', {name: /load more/i})
        expect(button).toBeEnabled()
    })

    it('should match the snapshot', ()=>{ 


        const { container } = render(<LoadMorePosts text="Load More" disabled={false} />)

        expect(container.firstChild).toMatchSnapshot();
    })
})