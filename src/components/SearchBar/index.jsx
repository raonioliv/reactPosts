import "./styles.css"
import "../../static/css/global.css"
export const SearchBar = ({handleChange, searchValue}) => { 
    
    return(
        <div className="searchBar__wrapper inputWithIcon">
            <label className="searchBar__label" htmlFor="searchBar">Pesquisar por posts</label>
            <input 
            onChange={handleChange}
            title="Barra de pesquisa"
            placeholder="Pesquisar" 
            className="searchBar__input" 
            id="searchBar" 
            name="searchBar" 
            type="text"
            value={searchValue} />
            <i className="search-icon searchBar__icon" role="button"></i>
        </div>
    )
}