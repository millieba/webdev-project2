import { useState } from 'react';
import { ICommit } from '../api/GetCommits';
import { IIssue } from '../api/GetIssues';

function PaginationFunctions(data: Array<any>, elementsPerPage: number) {
    const [onPage, setOnPage] = useState(1);
    const numberOfPages = Math.ceil(data.length / elementsPerPage);

    function dataDisplaying() {
        const start = (onPage - 1) * elementsPerPage;
        const end = start + elementsPerPage;
        return data.slice(start, end);
    }

    function next() {
        setOnPage(onPage => Math.min(onPage + 1, numberOfPages));
    }

    function prev() {
        setOnPage(onPage => Math.max(onPage - 1, 1));
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page);
        setOnPage(onPage => Math.min(pageNumber, numberOfPages));
    }

    return { next, prev, jump, dataDisplaying: dataDisplaying, onPage: onPage, numberOfPages: numberOfPages };
}

export default PaginationFunctions;