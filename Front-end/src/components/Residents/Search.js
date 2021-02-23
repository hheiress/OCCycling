import React, { useState } from "react";
import SearchButton from "../SearchButton";

const Search = props => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = event => {
    setSearchInput(event.target.value);
    console.log("Form submitted ", searchInput);
  };
  const handleSubmit = event => {
    event.preventDefault();
    props.search(searchInput);
  };

  return (
    
    <div className="search">
        <div className="col">
          <form className="form-group search-box" onSubmit={handleSubmit}>
            <div className="search-row">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                id="filter-name"
                className="form-control"
                placeholder="Search a renter"
              />
              <SearchButton />
            </div>
          </form>
        </div>
      
    </div>
  );
};

export default Search;
