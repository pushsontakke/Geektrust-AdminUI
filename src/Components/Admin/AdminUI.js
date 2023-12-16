import React, { useState } from "react";
import Search from "../SearchBar/Search.js";
import Members from "../Members/Members.js";

const AdminUI = ({ data } ) => {
    
    const [searchResult, setSearchResult] = useState([]);
    const [searchActive, setSearchActive] = useState(false);

    const handleSearchData = (filterData) => {
        if (filterData.length !== 0) setSearchResult(filterData);
    }

    return (
        <>
            <h1>Dashboard</h1>
            <Search membersData={data} onSearchData={handleSearchData} setSearchActive={setSearchActive} />
            {
                searchActive && searchResult.length === 0 ? (<Members noData={true} />) : (
                    <Members noData={false} members={searchActive ? searchResult : data} />)
            }
        </>
    );
};
export default AdminUI;
