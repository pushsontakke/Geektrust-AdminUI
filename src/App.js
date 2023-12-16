import React, { useState, useMemo, useEffect } from "react";
import Axios from 'axios';
import AdminUI from './Components/Admin/AdminUI';
import Pagination from "./Components/Pagination/Pagination";
import './App.css';

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const ApiCall = async() => {
            try{
                const response = await Axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                setData(response.data);
            } catch(e){
                console.error(e);
            }
        };

        ApiCall();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 10;

    // Calculate the index range for the current page
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = data.slice(indexOfFirstMember, indexOfLastMember);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="App">
            <React.StrictMode>
                <AdminUI data={currentMembers} />
                <Pagination
                    membersPerPage={membersPerPage}
                    totalMembers={data.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </React.StrictMode>
        </div>
    );
}

export default App;
