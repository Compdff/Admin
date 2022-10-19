import React from 'react'

const FilterDropdown = (props) => {
    const { items, value, onSelectionChange } = props
    return (
        <select
            className="custom-select"
            value={value}
            onChange={onSelectionChange}
        >
            {items.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    )
}

export default FilterDropdown
