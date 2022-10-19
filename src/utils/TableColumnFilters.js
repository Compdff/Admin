import React, { useState } from 'react'

export const SearchColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    const [isShown, setIsShown] = useState(false)

    const hideFilter = () => {
        setFilter('')
        setIsShown(false)
    }
    return (
        <span>
            {'  '}
            <i
                className="fas fa-filter fa-xs"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    isShown == false ? setIsShown(true) : hideFilter()
                }
                // onMouseLeave={() => setIsShown(false)}
            ></i>
            {isShown && (
                <input
                    autoFocus
                    placeholder="Search..."
                    value={filterValue || ''}
                    onChange={(e) => setFilter(e.target.value)}
                />
            )}
        </span>
    )
}

export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const [isShown, setIsShown] = useState(false)

    const hideFilter = () => {
        setFilter('')
        setIsShown(false)
    }

    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <span>
            {'  '}
            <i
                className="fas fa-filter fa-xs"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    isShown == false ? setIsShown(true) : hideFilter()
                }
                // onMouseLeave={() => setIsShown(false)}
            ></i>
            {isShown && (
                <div>
                    <select
                        value={filterValue}
                        onChange={(e) => {
                            setFilter(e.target.value || undefined)
                        }}
                    >
                        <option value="">All</option>
                        {options.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </span>
    )
}

export function SelectBooleanColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const [isShown, setIsShown] = useState(false)

    const hideFilter = () => {
        setFilter('')
        setIsShown(false)
    }

    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id] == true ? 'true' : 'false')
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <span>
            {'  '}
            <i
                className="fas fa-filter fa-xs"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    isShown == false ? setIsShown(true) : hideFilter()
                }
                // onMouseLeave={() => setIsShown(false)}
            ></i>
            {isShown && (
                <div>
                    <select
                        value={filterValue}
                        onChange={(e) => {
                            setFilter(e.target.value || undefined)
                        }}
                    >
                        <option value="">All</option>
                        {options.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </span>
    )
}

export function DateRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id]).getTime()
            : 0
        let max = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id]).getTime()
            : 0
        preFilteredRows.forEach((row) => {
            min = Math.min(new Date(row.values[id]).getTime(), min)
            max = Math.max(new Date(row.values[id]).getTime(), max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="date"
                onChange={(e) => {
                    const val = new Date(e.target.value).getTime()
                    setFilter((old = []) => [
                        new Date(val).getTime() || undefined,
                        old[1],
                    ])
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <input
                value={filterValue[1] || ''}
                type="date"
                onChange={(e) => {
                    const val = e.target.value
                    setFilter((old = []) => [
                        old[0],
                        new Date(val).getTime() || undefined,
                    ])
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}
