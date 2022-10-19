import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import { toast } from 'react-toastify'



class Investors extends Component {
    _isMounted = false
    state = { membership: null, currentSort: 'default', Payments: [], startDate: null, endDate: null }

    async componentDidMount() {
        debugger
        this._isMounted = true
        const id = this.props.id
        const result = await axios({
            url: `/payment/${id}`,
            method: 'GET',
        })

        const membership = result.data
        if (this._isMounted) {
            if (result.data.status != false) {
                this.setState({ membership })
                this.setState({ Payments: membership.Payments })
                const startDate = new Date(membership.StartDate);
                const newStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear() + '      ' + startDate.getHours() + ":" + startDate.getMinutes();
                this.setState({ startDate: newStartDate })
                const endDate = new Date(membership.EndDate);
                const newEndDate = endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear() + '      ' + endDate.getHours() + ":" + endDate.getMinutes();
                this.setState({ endDate: newEndDate })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        debugger
        const { membership } = this.state
        const { Payments } = this.state

        for (var i = 0; i < Payments.length > 0; i++) {
            var newPaymentDate = new Date(Payments[i].PaymentDate);
            Payments[i].PaymentDate = newPaymentDate.getDate() + '/' + (newPaymentDate.getMonth() + 1) + '/' + newPaymentDate.getFullYear() + '      ' + newPaymentDate.getHours() + ":" + newPaymentDate.getMinutes();
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
                                    <h3>MemberShip Detail</h3> <br/>
                                    <h6><b>Start Date: </b>{this.state.startDate != null ? this.state.startDate : ""}</h6>
                                    <h6><b>End Date:</b> {this.state.endDate != null ? this.state.endDate : ""}</h6>
                                </div>
                            </div>
                        </div>
                        <Pagination data={Payments}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Payments === null ? (
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
                                            ) : Payments.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        No MemberShip Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                [...pagedData].sort(sortTypes[currentSort].fn).map((Payments) => (
                                                    <tr key={Payments.id}>
                                                        <td>
                                                            {Payments.PaymentDate}
                                                        </td>

                                                        <td>
                                                            {Payments.Amount}
                                                        </td>
                                                        <td>
                                                            {Payments.Status}
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
