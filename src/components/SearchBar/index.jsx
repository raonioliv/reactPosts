import "./styles.css"
export const SearchBar = ({handleChange, searchValue}) => { 
    
    return(
        <div className="searchBar__wrapper">
            <label className="searchBar__label" htmlFor="searchBar">Pesquisar por posts</label>
            <input 
            onChange={handleChange}
            placeholder="Pesquisar" 
            className="searchBar__input" 
            id="searchBar" 
            name="searchBar" 
            type="text"
            value={searchValue} />
            
        </div>
    )
}