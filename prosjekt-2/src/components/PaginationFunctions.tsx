import { useState } from 'react';
import { ICommit } from '../api/GetCommits';

function PaginationFunctions(data: Array<ICommit>, itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPages = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPages));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPages));
    }

    return { next, prev, jump, currentData, currentPage, maxPages };
}

export default PaginationFunctions;