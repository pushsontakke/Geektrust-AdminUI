import React, { useState } from "react";
import './Search.module.css'

export default function Search({ membersData, onSearchData, setSearchActive }) {
    const [timeoutId, setTimeoutId] = useState(null);

    const performSearch = (input) => {
        if (input) {
            const result = membersData.filter((user) => {
                return user && user.name && user.name.toLowerCase().includes(input.toLowerCase());
            });
            onSearchData(result);
            setSearchActive(true);
        } else {
            onSearchData([]);
            setSearchActive(false);
        }
    }

    const debounceSearch = (e, debounceTimeout) => {
        let text = e.target.value;
        if (debounceTimeout)
            clearTimeout(debounceTimeout);

        let timeout = setTimeout(() => {
            performSearch(text);
        }, 500);
        setTimeoutId(timeout);
    };


    return (
        <input
            type="text"
            placeholder="Search by name, email or role"
            id="search"
            name="search"
            onChange={(e) => debounceSearch(e, timeoutId)}
        />
    );
}
