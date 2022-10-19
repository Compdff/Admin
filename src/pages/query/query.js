import React, { useEffect } from 'react'
import Axios from 'axios'
import { TableTop, ReactTable } from 'components'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal'
import swal from 'sweetalert'
import { format } from 'date-fns';

import {
    SearchColumnFilter,
} from 'utils'


function StartUpQuery(props) {
    debugger
    const [data, setData] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const [queryData, setQueryData] = React.useState([])



    const columns = [

      
        {
            Header: 'Question',
            accessor: 'Question',
            disableFilters: true,

        },
        {
            Header: 'QueryBy',
            accessor: 'QueryBy',
            Filter: SearchColumnFilter,
        },
        {
            Header: 'Comment',
            accessor: 'Comment',
            disableFilters: true,

        },
        {
            Header: 'Status',
            accessor: 'Status',
            Cell: (cellObj) => <div>{cellObj.row.original.Status == 1 ? "Answered" : "Pending"}</div>,
            disableFilters: true,


        },
        {
            Header: 'Created Date',
            accessor: 'CreatedDate',
            Cell: (cellObj) => format(new Date(cellObj.row.original.CreatedDate), 'yyyy/MM/dd'),
            disableFilters: true,


        },
        {
            Header: 'AttachDoc',
            accessor: 'AttachDoc',
            Cell: (cellObj) => cellObj.row.original.AttachDoc != null ? <div><a target="_blank" href={cellObj.row.original.AttachDoc}>Document</a></div> : "",

            disableFilters: true,

        },

    ]

    useEffect(() => {
        debugger
        async function fetchData() {
            debugger
            const result = await Axios({
                url: `/query/startupqueries/${props.id}`,
                method: 'GET',
            })

            if (result.data.status == true) {
                var Query = result.data.data
                setData(Query)
            }
            else {
                var Query = result.data
                setData(Query)
            }
            
            setLoading(false)
        }

        fetchData()
    }, [])



    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card mt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Queries</h3>
                            </div>
                        </div>
                    </div>
                    {
                        data.status !== false ?
                            (
                                <ReactTable
                                    data={data}
                                    columns={columns}
                                    listName="Queries"
                                    loading={isLoading}
                                ></ReactTable>
                            ) : data.status === false ? (<div class="container">
                                <div class="row">
                                    <div class="col d-flex justify-content-center">
                                        <div class="col d-flex justify-content-center">
                                            <h6>No Query Found</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>) : (<div class="container">
                                <div class="row">
                                    <div class="col d-flex justify-content-center">
                                        <div className="spinner-border" >
                                            <span className="sr-only" >
                                                Loading...
                                         </span>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }

                </div>
            </div>

        </div>
    )
}



export default StartUpQuery
