import { useState } from "react";

const Pagination = ({ totalPost, postPerPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalPost / postPerPage);
    const [startIndex, setStartIndex] = useState(0);
    const [activePage, setActivePage] = useState(null);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pages.slice(startIndex, startIndex + 5)

    // function handleClick(page) {
    // }

    const handleClick = (page) => {
        setActivePage(page)
        setCurrentPage(page)
    };
    const handlePrev = () => {
        if (startIndex >= 5) {
            setStartIndex(startIndex - 5)
        }
    }
    const handleNext = () => {
        if(startIndex + 5 < totalPages) {
            setStartIndex(startIndex + 5)
        }
    }
    return (
        <div className="flex justify-center items-center w-full my-4">
            <button onClick={handlePrev} disabled={startIndex === 0} className="px-4 py-2 rounded-2xl text-white bg-[#a749ff] shadow-md hover:shadow-lg transition-all duration-300">Prev</button>
            {
            visiblePages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(page)}
                    className={`px-4 mx-1 my-24 py-2 rounded-2xl shadow-lg transition-all duration-300 ${activePage === page ? 'text-white shadow-ld' : 'text-black'}`}
                    style={{ backgroundColor: activePage === page ? '#a749ff' : 'white', }}
                >
                    {page}
                </button>
            ))
        }
            <button onClick={handleNext} disabled={startIndex + 5 >= totalPages} className="px-4 py-2 rounded-2xl text-white bg-[#a749ff] shadow-md hover:shadow-lg transition-all duration-300">Next</button>
        </div>
    );
}

export default Pagination;