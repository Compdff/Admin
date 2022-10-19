import React, { Component } from 'react'
import { paginate } from 'utils'
import _ from 'lodash'

class Pagination extends Component {
    _isMounted = false
    state = { currentPage: 1 }
    //localStorage.setItem('currentPage', 1)

    handlePageChange = (page) => {
        debugger
        this.setState({ currentPage: page })
        localStorage.setItem('currentPage', JSON.stringify(page))

    }

    handleNextPage = () => {
        const page = this.state.currentPage + 1
        this.setState({ currentPage: page })
    }

    handlePreviousPage = () => {
        const page = this.state.currentPage - 1
        this.setState({ currentPage: page })
    }
    async componentDidMount() {
        debugger
        this._isMounted = true
        var cp = localStorage.getItem('currentPage');
        var currentPage = JSON.parse(cp);
        this.setState({ currentPage: currentPage });
        
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        //if (this.props.data !== prevProps.data) {
        //  this.setState({currentPage: 1});
        //}
       
    }
 
    render() {
        const { data, pageSize, children } = this.props
        const { currentPage } = this.state
        if (data === null || data.length === 0) return children()

        const itemsCount = data.length
        const pagedData = paginate(data, this.state.currentPage, pageSize)

        const pagesCount = Math.ceil(itemsCount / pageSize)

        const pageLimit = 10
        const startIndex = Math.floor(currentPage / pageLimit) * pageLimit
        const startPage = startIndex === 0 ? 1 : startIndex
        const endIndex = startPage === 1 ? startPage + 8 : startPage + 9
        const endPage = endIndex < pagesCount ? endIndex : pagesCount
        const pages = _.range(startPage, endPage + 1)

        const pageNavigationControl = (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {currentPage !== 1 && (
                        <li className="page-item" style={{ cursor: 'pointer' }}>
                            <button
                                style={{ color: 'black' }}
                                className="page-link"
                                aria-label="Previous"
                                onClick={() => this.handlePreviousPage()}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                    )}
                    {pages.map((page) => (
                        <li
                            key={page}
                            style={{ cursor: 'pointer' }}
                            className={
                                page === currentPage
                                    ? 'page-item active'
                                    : 'page-item'
                            }
                        >
                            <button
                                style={{ color: 'black' }}
                                className="page-link"
                                onClick={() => this.handlePageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    {currentPage !== pagesCount && (
                        <li className="page-item" style={{ cursor: 'pointer' }}>
                            <button
                                style={{ color: 'black' }}
                                className="page-link"
                                aria-label="Next"
                                onClick={() => this.handleNextPage()}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        )

        return (
            <>
                {children(pagedData)}
                {pagesCount !== 1 && pageNavigationControl}
            </>
        )
    }
}

Pagination.defaultProps = {
    pageSize: 10,
}

export default Pagination
