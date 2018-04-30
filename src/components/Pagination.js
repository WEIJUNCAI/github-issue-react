import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './css/Pagination.css'

const MARGIN_PAGE = 2;
const PAGE_RANGE = 5;
const NAVIGATE_PREV_NAME = "Previous";
const NAVIGATE_NEXT_NAME = "Next";


const Pagination = ({ currentPage, pageCount, handlePageChange }) => {

    return (
        <ReactPaginate
            forcePage={currentPage}
            pageCount={pageCount}
            marginPagesDisplayed={MARGIN_PAGE}
            pageRangeDisplayed={PAGE_RANGE}
            onPageChange={handlePageChange}
            previousLabel={NAVIGATE_PREV_NAME}
            nextLabel={NAVIGATE_NEXT_NAME}
            breakLabel={<a className="page-link">...</a>}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            previousClassName="page-item"
            nextClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            activeClassName="active"
            breakClassName="page-item disabled" />
    );

}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func
}

export default Pagination;