import './Search.css';
import SearchIcon from '../../Assets/search-icon.svg'

const Search = ({ search }) => {
  const eventUpdate = (e) => {
    search(e);
  };
  return (
    <div className="search-icon" >
      <img src={SearchIcon} alt='icon' />
      <input
        placeholder="Search by name, email or role..."
        onChange={eventUpdate}
      />
    </div>
  );
};

export default Search;
