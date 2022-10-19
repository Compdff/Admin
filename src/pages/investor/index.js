import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import { toast } from 'react-toastify'



class Investors extends Component {
    _isMounted = false
    state = { investers: null, currentSort: 'default' }

    async componentDidMount() {
        debugger    
        localStorage.setItem('currentPage', 1)
        this._isMounted = true
        const result = await axios({
            url: '/investor',
            method: 'GET',
        })
        const investers = result.data
        if (this._isMounted) {
            this.setState({ investers })
        }
    }

    updateInvestorStatus = async (e, id) => {
        const status = e.target.value;
        await axios({
            url: `/investor/${id}`,
            method: 'PUT',
            data: {
                Status: status
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Updated Successfully!')
                window.location.reload();
            } else {
                toast.error(res.data.message)
            }
        })
    }

    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        this.setState({
            currentSort: nextSort
        });
    };
  

    componentWillUnmount() {
        this._isMounted = false

    }
    editRow(e) {
        window.location.href = "/investor/edit/" + e;
    }
    render() {
        const { investers } = this.state
        const { currentSort } = this.state;
        const sortTypes = {
            up: {
                class: 'sort-up',
                fn: (a, b) => a.Status - b.Status
            },
            down: {
                class: 'sort-down',
                fn: (a, b) => b.Status - a.Status
            },
            default: {
                class: 'sort',
                fn: (a, b) => a
            }
        };
        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>Investors</h3>
                                </div>
                            </div>
                        </div>
                        <Pagination data={investers}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Occupation</th>
                                                <th>Job Title</th>
                                                <th>Company Name</th>
                                                <th>
                                                    Status
                                                    <button className="btn" onClick={this.onSortChange}>
                                                        <i className={`fas fa-${sortTypes[currentSort].class}`} />
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {investers === null ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan="6">
                                                        <div
                                                            className="spinner-border m-6"
                                                            role="status"
                                                        >
                                                            <span className="sr-only">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : investers.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        No investers
                                                    </td>
                                                </tr>
                                            ) : (
                                                [...pagedData].sort(sortTypes[currentSort].fn).map((investers) => (
                                                    <tr key={investers.id}>
                                                        <td>
                                                            <a
                                                                href={`/investor/${investers.Id}`}
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {investers.User!=null ? investers.User.Name:""}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            {investers.Occupation}
                                                        </td>

                                                        <td>
                                                            {
                                                                investers.Jobtitle
                                                            }
                                                        </td>
                                                        <td>
                                                            {investers.CompanyName}
                                                        </td>

                                                        <td>
                                                            <button className="btn btn-success mr-1" value='1' onClick={e => this.updateInvestorStatus(e, investers.Id)} disabled={investers.Status == 1}>Accept</button>
                                                            <button className="btn btn-danger" value='2' onClick={e => this.updateInvestorStatus(e, investers.Id)} disabled={investers.Status == 2}>Reject</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Pagination>
                    </div>
                </div>
            </div>
        )
    }
}

export default Investors
