import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import { toast } from 'react-toastify'



class Referrals extends Component {
    _isMounted = false
    state = { Data: null, currentSort: 'default', referrals: [],point:null }

    async componentDidMount() {
        debugger
        this._isMounted = true
        const id = this.props.id
        const result = await axios({
            url: `/referral/investor/${id}`,
            method: 'GET',
        })

        const referrals = result.data
        if (this._isMounted) {
            this.setState({ Data: referrals.data.result })
            this.setState({ point: referrals.data.result.Points })
            this.setState({ referrals: referrals.data.result.Referrals })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        debugger
        const { Data } = this.state
        const { referrals } = this.state

        for (var i = 0; i < referrals.length > 0; i++) {
            var newCreatedDate = new Date(referrals[i].CreatedDate);
            referrals[i].CreatedDate = newCreatedDate.getDate() + '/' + (newCreatedDate.getMonth() + 1) + '/' + newCreatedDate.getFullYear() + '      ' + newCreatedDate.getHours() + ":" + newCreatedDate.getMinutes();
        }
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
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>Referral Detail</h3> <br />
                                    <h6><b>Point: </b>{this.state.point != null ? this.state.point : ""}</h6>
                                </div>
                            </div>
                        </div>
                        <Pagination data={referrals}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Investor Name</th>
                                                <th>Created Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {referrals === null ? (
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
                                            ) : referrals.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                            No Referral Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                [...pagedData].sort(sortTypes[currentSort].fn).map((referrals) => (
                                                    <tr key={referrals.id}>
                                                        <td>
                                                            {referrals.InvestorProfile.User.Name}
                                                        </td>
                                                        <td>
                                                            {referrals.CreatedDate}
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

export default Referrals
