import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import TimezoneSelect from "react-timezone-select";




class EditEvent extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
    }
    state = {
        Id: 0,
        EventTitle: '',
        EventDate: '',
        StartTime: '',
        EndTime: '',
        CallLink: '',
        Description: '',
        ImageURL: '',
        RecordingURL: '',
        CallForMoneyStartTime: '',
        CallForMoneyEndTime: '',
        State: 0,
        StartupProfileId: 0,
        CreatedDate: '',
        UpdatedDate: '',
        CreatedBy: '',
        UpdatedBY: '',
        TimeZone:''
    }
    handleCheckBox = (event) => {

        this.setState({ IsActive: event.target.value });

        console.log(event.target.value)
    }

    async componentDidMount() {
        debugger
        this._isMounted = true
        const id = this.props.id
        this.state.Id = id
        const result = await Axios({
            url: `/event/${id}`,
            method: 'GET',
        })
        debugger
        const {
            Id,
            EventTitle,
            EventDate,
            StartTime,
            EndTime,
            CallLink,
            Description,
            ImageURL,
            RecordingURL,
            CallForMoneyStartTime,
            CallForMoneyEndTime,
            State,
            StartupProfileId,
            CreatedDate,
            UpdatedDate,
            CreatedBy,
            UpdatedBY,
            IsActive,
            TimeZone

        } = result.data.data.data


        if (this._isMounted) {

            this.setState({
                Id,
                EventTitle,
                EventDate,
                StartTime,
                EndTime,
                CallLink,
                Description,
                ImageURL,
                RecordingURL,
                CallForMoneyStartTime,
                CallForMoneyEndTime,
                State,
                StartupProfileId,
                CreatedDate,
                UpdatedDate,
                CreatedBy,
                UpdatedBY,
                IsActive,
                TimeZone

            })
        }
    }

    handleStateSelect = (event) => {

        this.setState({ State: event.target.value });

        console.log(event.target.value)
    }
    updateEvent = async (values) => {
        debugger
        await Axios({
            url: `/event/${this.state.Id}`,
            method: 'PUT',
            data: {
                State: values.State,
                EventTitle: values.EventTitle,
                CallLink: values.CallLink,
                EventDate: values.EventDate,
                StartTime: values.StartTime,
                EndTime: values.EndTime,
                Description: values.Description,
                ImageURL: values.ImageURL,
                RecordingURL: values.RecordingURL,
                CallForMoneyStartTime: values.CallForMoneyStartTime,
                CallForMoneyEndTime: values.CallForMoneyEndTime,
                IsActive: this.state.IsActive
            },
        }).then((res) => {

            if (res.data.status === true) {
                toast.success('Updated Successfully!')
                window.location.href = "/startup/" + this.state.StartupProfileId;

            } else {
                toast.error(res.data.message)
            }
        })
    }

    render() {

        const {
            Id,
            EventTitle,
            EventDate,
            StartTime,
            EndTime,
            CallLink,
            Description,
            ImageURL,
            RecordingURL,
            CallForMoneyStartTime,
            CallForMoneyEndTime,
            State,
            StartupProfileId,
            CreatedDate,
            UpdatedDate,
            CreatedBy,
            UpdatedBY,
            IsActive,
            TimeZone

        } = this.state
        const state = [
            { id: '0', title: 'Planned' },
            { id: '1', title: 'Ongoing' },
            { id: '3', title: 'CallEnded' },
            { id: '4', title: 'InitialCommitStart' },
            { id: '5', title: 'CallForMoneyStart' },
            { id: '6', title: 'CallForMoneyEnd' }
        ]

        return (
            <div className="card card-primary">
                <div className="row">
                    <div className="col-md-12">

                        <Formik
                            enableReinitialize
                            initialValues={{
                                Id,
                                EventTitle,
                                EventDate,
                                StartTime,
                                EndTime,
                                CallLink,
                                Description,
                                ImageURL,
                                RecordingURL,
                                CallForMoneyStartTime,
                                CallForMoneyEndTime,
                                State,
                                StartupProfileId,
                                CreatedDate,
                                UpdatedDate,
                                CreatedBy,
                                UpdatedBY,
                                IsActive,
                                TimeZone

                            }}
                            onSubmit={async (values) => {
                                debugger
                                await this.updateEvent(values)
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Event Title</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="EventTitle"
                                                    onChange={handleChange}
                                                    value={values.EventTitle}
                                                />

                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>EventDate</label>
                                                <Datetime
                                                    name="EventDate"
                                                    selected={values.EventDate}
                                                    onChange={date => this.handleChange(date)}
                                                    value={values.EventDate}
                                                   // timeFormat={false}
                                                />
                                                {/*<input*/}
                                                {/*    className="form-control"*/}
                                                {/*    type="text"*/}
                                                {/*    name="EventDate"*/}
                                                {/*    onChange={handleChange}*/}
                                                {/*    value={values.EventDate}*/}
                                                {/*/>*/}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Time Zone</label>
                                                <TimezoneSelect
                                                    value={values.TimeZone}
                                                    onChange={time => this.setSelectedTimezone(time)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Start Time</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="StartTime"
                                                    onChange={handleChange}
                                                    value={values.StartTime}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>End Time</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="EndTime"
                                                    onChange={handleChange}
                                                    value={values.EndTime}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>Call Link</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="CallLink"
                                                    onChange={handleChange}
                                                    value={values.CallLink}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Description</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Description"
                                                    onChange={handleChange}
                                                    value={values.Description}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>Image URL</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="ImageURL"
                                                    onChange={handleChange}
                                                    value={values.ImageURL}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Recording URL</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="RecordingURL"
                                                    onChange={handleChange}
                                                    value={values.RecordingURL}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>Call For Money StartTime</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="CallForMoneyStartTime"
                                                    onChange={handleChange}
                                                    value={values.CallForMoneyStartTime}
                                                />
                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Call For Money EndTime</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="CallForMoneyEndTime"
                                                    onChange={handleChange}
                                                    value={values.CallForMoneyEndTime}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>State</label>
                                                <select
                                                    name="State"
                                                    className="custom-select"
                                                    value={values.State}
                                                    onChange={this.handleStateSelect}

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

                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Is Active</label><br />
                                                <input type="radio" className="checkmark" onChange={this.handleCheckBox} value='0' name="IsActive" checked={values.IsActive == 0} />No
                                              <input type="radio" className="checkmark ml-2" onChange={this.handleCheckBox} value='1' name="IsActive" checked={values.IsActive == 1} />Yes


                                            </div>
                                        </div>
                                        <div className="row">
                                            
                                        </div>


                                        <button
                                            type="submit"
                                            className="btn btn-success mr-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? 'Please wait...'
                                                : 'Update'}
                                        </button>
                                        <Link
                                            to="/Admin/investors"
                                            className="btn btn-default"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(EditEvent)
