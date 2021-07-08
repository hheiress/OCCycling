import react, {Form, useState, useEffect} from "react";

function FilterByDate (props){
    const [searchInput, setSearchInput] = useState("");
 
    const handleSearchInput = event => {
      setSearchInput(event.target.value);
    };
    const handleSubmit = event => {
      event.preventDefault();
      props.searchDay(searchInput);
    };
    useEffect(()=>{
        console.log("Form submitted ", searchInput);
          props.searchDay(searchInput);
        }, [searchInput])
    
  return <div>
           
            <input
                className="form-control"
                type="date"
                name="filter_day"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Select day"
                onSubmit={handleSubmit}
              />
        </div> 
}
export default FilterByDate;