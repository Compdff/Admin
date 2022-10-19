import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import EditEvent from 'pages/events/edit'
import { Modal } from 'react-responsive-modal'
import AddEvent from 'pages/events/add'
import { toast } from 'react-toastify'
import Moment from 'moment';



class Events extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
    }
    state = {
        events: [], eventRsvp: [], currentSort: 'default', Status: '', show: false, add: false,showRsvp:false }


    async componentDidMount() {
        debugger
        this._isMounted = true
        const id = this.props.id


        const result = await axios({
            url: `/event/startup/${id}`,
            method: 'GET',
        })

        const events = result.data.data.data
        if (this._isMounted) {
            this.setState({ events })
        }
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


    editEventModel = (id) => {
        debugger
        this.setState({ Id: id });
        this.setState({ show: true });
    }
    eventRsvpModel = async (id) => {
        debugger
        this.setState({ Id: id });
        this.setState({ showRsvp: true });

        const result =await axios({
            url: `/event/eventrsvp/rsvp/${id}`,
            method: 'GET',
        })

        const eventRsvp = result.data.data.result
        if (this._isMounted) {
            this.setState({ eventRsvp })
        }
    }
    addEventModel = () => {
        this.setState({ add: true });
    }
    hideModal = () => {
        this.setState({ Id: 0 });
        this.setState({ show: false });
    };
    hideAddModal = () => {
        this.setState({ add: false });
    };
    hideModalRsvp = () => {
        this.setState({ showRsvp: false });
    };

    handleStateSelect = (e,values) => {
        debugger

        axios({
            url: `/event/updatestate/${values}`,
            method: 'PUT',
            data: {
                State: e.target.value,
                
            },
        }).then((res) => {

            if (res.data.status === true) {
                toast.success('State Updated Successfully!')
                this.componentDidMount();

            } else {
                toast.error(res.data.message)
            }
        })
    }
    render() {
        const { events } = this.state
        const { currentSort } = this.state;
        const { eventRsvp } = this.state;

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
        const state = [
            { id: '0', title: 'Planned' },
            { id: '1', title: 'Ongoing' },
            { id: '3', title: 'CallEnded' },
            { id: '4', title: 'InitialCommitStart' },
            { id: '5', title: 'CallForMoneyStart' },
            { id: '6', title: 'CallForMoneyEnd' }
        ]
        return (
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>Events</h3>
                                </div>

                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        style={{ float: 'right' }}
                                        onClick={() => this.addEventModel()}
                                    >
                                        Add
                                  </button>
                                </div>
                            </div>
                        </div>
                        <Pagination data={events}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Event Title</th>
                                                <th>Event Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>
                                                    Description
                                                    
                                                </th>
                                               
                                                <th>
                                                    Is Active
                                                     
                                                </th>
                                                <th>
                                                    State
                                                     
                                                </th>
                                                <th>
                                                    RSVP's
                                                    
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events === null ? (
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
                                            ) : events.length === 0 ? (
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
                                                [...pagedData].sort(sortTypes[currentSort].fn).map(events => (
                                                    <tr key={events.id}>
                                                        <td>
                                                            <a
                                                                onClick={() => this.editEventModel(events.Id)}
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {events.EventTitle}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            {Moment(events.EventDate).format('DD/MM/YYYY')}
                                                        </td>

                                                        <td>
                                                            {Moment(events.StartTime).format("ddd, hA")}
                                                                
                                                        </td>
                                                        <td>
                                                            {
                                                                events.EndTime
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                events.Description
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                events.IsActive == 0 ? "No" : events.IsActive == 1?"Yes":""
                                                            }
                                                        </td>
                                                        <td>
                                                        <select
                                                            name="State"
                                                            className="custom-select"
                                                            value={events.State}
                                                            onChange={e=>this.handleStateSelect(e,events.Id)}

                                                        >
                                                            {state.map(
                                                                (item) => (
                                                                    <option
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        {item.title}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                        </td>
                                                        <td>
                                                            <button class="btn btn-primary" onClick={() => this.eventRsvpModel(events.Id)}>Open</button>
                                                        </td>

                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Pagination>

                        <Modal
                            open={this.state.show}
                            onClose={this.hideModal}
                            classNames={{
                                modal: 'customModal',
                            }}
                        >
                            <EditEvent id={this.state.Id}></EditEvent>
                        </Modal>

                        <Modal
                            open={this.state.add}
                            onClose={this.hideAddModal}
                            classNames={{
                                modal: 'customModal',
                            }}
                        >
                            <AddEvent></AddEvent>
                        </Modal>
                        <Modal
                            open={this.state.show}
                            onClose={this.hideAddModal}
                            classNames={{
                                modal: 'customModal',
                            }}
                        >
                            <EditEvent id={this.state.Id}></EditEvent>
                        </Modal>

                        <Modal
                            open={this.state.showRsvp}
                            onClose={this.hideModalRsvp}
                            classNames={{
                                modal: 'customModal',
                            }}
                        >
                            <div>
                                <p>Total no. of RSVP - {eventRsvp.length}</p>
                            <Pagination data={eventRsvp}>
                                {(pagedData) => (
                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Event Title</th>
                                                    <th>Investor Name</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {eventRsvp === null ? (
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
                                                ) : eventRsvp.length === 0 ? (
                                                    <tr
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <td colSpan={5}>
                                                            No Event Rsvp
                                                    </td>
                                                    </tr>
                                                ) : (
                                                            [...pagedData].sort(sortTypes[currentSort].fn).map(eventrsvp => (
                                                                <tr key={eventrsvp.id}>
                                                                    <td>

                                                                        {events.find(x => x.Id == eventrsvp.EventId).EventTitle}
                                                                    </td>

                                                                    <td>
                                                                        {eventrsvp.InvestorName}
                                                                    </td>

                                                                    <td>
                                                                        {eventrsvp.Status == 0 ? "No" : eventrsvp.Status==1?"Yes":"May Be"}
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
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events
