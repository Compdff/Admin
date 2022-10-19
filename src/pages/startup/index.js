import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import th from 'date-fns/esm/locale/th'
import { toast } from 'react-toastify'

class StartupProfile extends Component {
    _isMounted = false
    state = { startupProfiles: null, currentSort: 'default', Status: '' }


    async componentDidMount() {
        debugger
        localStorage.setItem('currentPage', 1)
        this._isMounted = true
        const result = await axios({
            url: '/startup',
            method: 'GET',
        })
        const startupProfiles = result.data
        if (this._isMounted) {
            this.setState({ startupProfiles })
        }
    }

    updateStartupStatus = async (e,id) => {
         debugger
        const status = e.target.value;
        await axios({
            url: `/startup/${id}`,
            method: 'PUT',
            data: {
                Status: status,
                CurrentState:status==1?2:1
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
    


    render() {
        const { startupProfiles } = this.state
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
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <TableTop
                            title="Startup Profiles"
                            buttonDisplay="none"
                        />
                        <Pagination data={startupProfiles}  >
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Startup Name</th>
                                                <th>Raising Funds</th>
                                                <th>Offered Stake</th>
                                                <th>
                                                    Status
                                                    <button className="btn" onClick={this.onSortChange}>
                                                        <i className={`fas fa-${sortTypes[currentSort].class}`} />
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {startupProfiles === null ? (
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
                                            ) : startupProfiles.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        No startupProfiles
                                                    </td>
                                                </tr>
                                            ) : (
                                                [...pagedData].sort(sortTypes[currentSort].fn).map(startupProfiles => (
                                                    <tr key={startupProfiles.id}>
                                                        <td>
                                                            <a
                                                                href={`/startup/${startupProfiles.Id}`}
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {startupProfiles.StartupName == null ? "" : startupProfiles.StartupName}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            {startupProfiles.RaisingFunds == null ? "" : startupProfiles.RaisingFunds}
                                                        </td>

                                                        <td>
                                                            {
                                                                startupProfiles.OfferedStake == null ? "" : startupProfiles.OfferedStake
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-success mr-1" value='1' onClick={e => this.updateStartupStatus(e, startupProfiles.Id)} disabled={startupProfiles.Status == 1}>Accept</button>
                                                            <button className="btn btn-danger" value='2' onClick={e => this.updateStartupStatus(e, startupProfiles.Id)} disabled={startupProfiles.Status == 2}>Reject</button>
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

export default StartupProfile
