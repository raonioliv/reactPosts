import { render, screen } from "@testing-library/react"
import {SearchBar} from '.'
import userEvent from "@testing-library/user-event"
describe('<SearchBar />', ()=>{
    it('should have the value of searchValue', ()=>{
        const fn = jest.fn()
        render(<SearchBar handleChange={fn} searchValue={'testando'} />)

        const value = 'any value'
        const input = screen.getByPlaceholderText(/Pesquisar/i)

        expect(input).toBeInTheDocument()
        userEvent.type(input, value)
        expect(input.value).toBe('testando')
        
        
    })

    it('should call handleChange at each keypress', ()=>{
        const fn = jest.fn()
        render(<SearchBar handleChange={fn} />)

        const value = 'any value'
        const input = screen.getByPlaceholderText(/Pesquisar/i)

        userEvent.type(input, value)

        expect(input.value).toBe(value)

        expect(fn).toHaveBeenCalledTimes(value.length)

        screen.debug(input)
    })
})