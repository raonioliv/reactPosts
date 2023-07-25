import { render, screen } from "@testing-library/react"
import { PostCard } from "."

const props =  { 
    title: 'title 1' ,
    body: 'body 1' ,
    id: 1, 
    cover: 'img/img.png'
}

describe('< PostCard />', ()=>{
    it('should render post card correctly' ,()=>{
        render(<PostCard {...props}/>)

        expect( screen.getByRole('img', {name: /title 1/i}))
            .toHaveAttribute('src', 'img/img.png')
        expect( screen.getByRole('heading', {name: /title 1/i})).toBeInTheDocument()
        expect( screen.getByText('body 1')).toBeInTheDocument()
        
    })

    it('should match the snapshot', ()=>{ 
        const { container } = render(<PostCard {...props}/>)

        expect(container.firstChild).toMatchSnapshot()
    })
})