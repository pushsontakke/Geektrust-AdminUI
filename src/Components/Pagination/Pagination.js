import React from "react";

const Pagination = ({
    membersPerPage,
    totalMembers,
    currentPage,
    onPageChange,
}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(1)}>First</button>
            <button onClick={() => onPageChange((current) => current - 1)}>Prev</button>

            { 
            pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        // className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                );
            })
            }
            <button onClick={() => onPageChange((current) => current + 1)}>
                Next
            </button>
            <button onClick={() => onPageChange(pages.length)}>Last</button>
        </div>
    );
};

export default Pagination;
