import React from 'react'
import { useTable, usePagination, useSortBy, useFilters } from 'react-table'

const ReactTable = (props) => {
    const memoizedData = React.useMemo(() => props.data, [props.data])
    const memoizedColumns = React.useMemo(() => props.columns, [props.columns])

    const isLoading = props.loading

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        rows,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: memoizedColumns,
            data: memoizedData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useSortBy,
        usePagination,
    )

    return (
        <div>
            <div className="row">
                <div
                    className="col-sm-6"
                    style={{
                        padding: '15px',
                        marginLeft: '10px',
                    }}
                >
                    Showing list of <b>{rows.length}</b> {props.listName}
                </div>
            </div>

            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    <div>
                                        <span
                                            {...column.getSortByToggleProps()}
                                        >
                                            {column.render('Header')}
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <span>
                                                        {' '}
                                                        <i className="fas fa-sort-down"></i>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {' '}
                                                        <i className="fas fa-sort-up"></i>
                                                    </span>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                        {column.canFilter
                                            ? column.render('Filter')
                                            : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    {isLoading === true && (
                        <tr
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <td colSpan="8">
                                <div
                                    className="spinner-border m-5"
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{ textAlign: 'center' }}>
                <ul className="pagination" style={{ display: 'inline-block' }}>
                    <li
                        style={{ display: 'inline-block' }}
                        className="page-item"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        <a className="page-link">First</a>
                    </li>
                    <li
                        style={{ display: 'inline-block' }}
                        className="page-item"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        <a className="page-link">{'<'}</a>
                    </li>
                    <li style={{ display: 'inline-block' }}>
                        <a className="page-link">
                            Page{' '}
                            <strong>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0
                                        gotoPage(page)
                                    }}
                                    style={{
                                        width: '70px',
                                        height: '20px',
                                        display: 'inline-block',
                                        fontWeight: 'bold',
                                    }}
                                />{' '}
                                of {pageOptions.length}
                            </strong>
                        </a>
                    </li>{' '}
                    <li
                        style={{ display: 'inline-block' }}
                        className="page-item"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        <a className="page-link">{'>'}</a>
                    </li>
                    <li
                        style={{ display: 'inline-block' }}
                        className="page-item"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        <a className="page-link">Last</a>
                    </li>
                    <select
                        className="form-control"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{
                            display: 'inline-block',
                            width: '120px',
                            height: '38px',
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
        </div>
    )
}

export default ReactTable
