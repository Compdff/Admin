import React from 'react'
import { Link } from 'react-router-dom'

const TableTop = ({ title, link, linkText, buttonDisplay }) => {
    return (
        <div className="card-header">
            <div className="row">
                <div className="col-sm-6">
                    <h3>{title}</h3>
                </div>

                <div className="col-sm-6">
                    <Link
                        to={link}
                        className="btn btn-info float-right"
                        style={{ display: `${buttonDisplay}` }}
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TableTop
