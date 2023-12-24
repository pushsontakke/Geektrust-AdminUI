import React, { useState, useEffect } from "react";
import Axios from "axios";
import Table from "../Table/Table";
import Search from "../Search/Search";
import Styles from "./Admin.module.css";
import "../../App.css";

const AdminUI = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMembers, setSearchMembers] = useState("");
  const [debounce, setDebounce] = useState();
  const [selectCheckbox, setSelectCheckbox] = useState([]);
  const [selectAllMember, setSelectAllMember] = useState(false);

  const ApiCall = async () => {
    try {
      const response = await Axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setMembers(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ApiCall();
    // eslint-disable-next-line
  }, []);

  const rowsInPage = 10;
  const pages = Math.ceil(members.length / rowsInPage);
  const startIndex = (currentPage - 1) * rowsInPage;
  const endIndex = startIndex + rowsInPage;
  const dataToShow = members.slice(startIndex, endIndex);

  const PageButtons = () => {
    const PageNumbers = [];
    for (let page = 1; page <= pages; page++) {
      PageNumbers.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      );
    }
    return PageNumbers;
  };

  const debounceSearch = (event, debounceTimeout) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    const debounceCall = setTimeout(() => {
      const searchResult = members.filter((mem) => {
        return (
          mem.name.toLowerCase().includes(searchMembers.toLowerCase()) ||
          mem.email.toLowerCase().includes(searchMembers.toLowerCase()) ||
          mem.role.toLowerCase().includes(searchMembers.toLowerCase())
        );
      });
      if (event.target.value === "") {
        setMembers(ApiCall());
      }
      setMembers(searchResult);
    }, debounceTimeout);
    setDebounce(debounceCall);
  };

  const search = (e) => {
    setSearchMembers(e.target.value);
    debounceSearch(e, 500);
  };

  const handleDeleteMember = (mId) => {
    setMembers((prevMem) => prevMem.filter((member) => member.id !== mId));
  };

  const handleSelectMember = (mId) => {
    let arr;
    if (selectCheckbox.includes(mId)) {
      arr = selectCheckbox.filter((member) => {
        return member !== mId;
      });
    } else {
      arr = [...selectCheckbox, mId];
    }

    setSelectCheckbox(arr);
  };

  const deleteMultiple = () => {
    setSelectAllMember(false);
    for (let i = 0; i < selectCheckbox.length; i++) {
      handleDeleteMember(selectCheckbox[i]);
    }
  };

  const selectAll = () => {
    if (selectCheckbox.length !== 10) {
      setSelectAllMember(true);
      setSelectCheckbox(
        dataToShow.map((member) => {
          return member.id;
        })
      );

    } else {
      setSelectAllMember(false);
      setSelectCheckbox([]);
    }
  };

  return (
    <div>
      <Search search={search} />
      <table>
        <thead className={Styles.TableHead}>
          <tr className={Styles.HeadRow}>
            <th>
              <input
                className={Styles.input}
                name="checkbox"
                type="checkbox"
                checked={selectAllMember}
                onClick={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={Styles.TableBody}>
          {dataToShow.map((value) => {
            return (
              <Table
                membersData={value}
                key={value.id}
                checked={selectCheckbox.includes(value.id)}
                selectMember={() => handleSelectMember(value.id)}
                onDelete={() => handleDeleteMember(value.id)}
              />
            );
          })}
        </tbody>
      </table>
      <div className={Styles.BottonButtons}>
        <button className={Styles.DeleteBtn} onClick={deleteMultiple}>
          Delete Selected
        </button>
        <div className={Styles.ButtonGroup}>
          <button
            className="first-page"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="previous-page"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {PageButtons()}
          <button
            className="next-page"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === pages}
          >
            Next
          </button>
          <button
            className="last-page"
            onClick={() => setCurrentPage(pages)}
            disabled={currentPage === pages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUI;
