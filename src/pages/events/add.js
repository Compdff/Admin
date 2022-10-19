import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Events from 'pages/events/index'
import DateTimePicker from 'react-datetime-picker';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import TimezoneSelect from "react-timezone-select";
 





class AddEvent extends Component {
    _isMounted = false
    constructor(props) {
         debugger
        super(props)
    }
    state = {
        Id: 0,
        EventTitle: '',
        EventDate: '',
        StartTime: '',
        Description: '',
        ImageURL: '',
        eventDate: '',
        startTime: '',
        startupProfileId: 0,
        selectedTimezone:''
    }

    async componentDidMount() {
        debugger
        this._isMounted = true
        const StartupProfileId = this.props.match.params.id
        this.setState({ startupProfileId: StartupProfileId });
    }


    AddEvent = async (values) => {
        debugger
        await Axios({
            url: `/event/create-event`,
            method: 'POST',
            data: {
                StartupProfileId: values.StartupProfileId,
                EventTitle: values.EventTitle,
                EventDate: values.EventDate,
                StartTime: values.StartTime,
                TimeZone: values.selectedTimezone,
                Description: values.Description,
                ImageURL: values.ImageURL
                
                
            },
        }).then((res) => {
            debugger
            if (res.data.status === true) {
                toast.success('Added Successfully!')
                window.location.href = "/startup/" + this.props.match.params.id;



            } else {
                toast.error(res.data.message)
            }
        })
    }

    hideModal = () => {
        this.setState({ show: false });
    };

    handleChangeEventDate = (date) => {
        debugger
        const eventDate = date.toLocaleString() 
        this.setState({ eventDate })
    }
    handleChangeStartTime = (date) => {
        debugger
        const startTime = date.toLocaleString();
        this.setState({ startTime })
    }

    setSelectedTimezone = (time) => {
        debugger
        const selectedTimezone = time.label;
        this.setState({ selectedTimezone })
    }
    

    render() {

        const {
            Id,
            EventTitle,
            EventDate,
            StartTime,
            Description,
            ImageURL,
            StartupProfileId,
            selectedTimezone
        } = this.state


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
                                Description,
                                ImageURL,
                                StartupProfileId,
                                selectedTimezone
                            }}
                            onSubmit={async (values) => {
                                debugger
                                values.EventDate = this.state.eventDate;
                                values.StartupProfileId = this.state.startupProfileId;
                                values.StartTime = this.state.startTime;
                                values.selectedTimezone = this.state.selectedTimezone;
                                await this.AddEvent(values)
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <h3>Add Event</h3>
                                            </div>
                                            </div>
                                        </div>
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
                                                <label>Image URL</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="ImageURL"
                                                    onChange={handleChange}
                                                    value={values.ImageURL}
                                                />
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                            
                                            <div className="form-group col-md-10">
                                                <label>Description</label>
                                                <textarea
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
                                                <label>Time Zone</label>
                                                <TimezoneSelect
                                                    value={values.selectedTimezone}
                                                    onChange={time=>this.setSelectedTimezone(time)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Event Date</label>
                                                <div>
                                                    <Datetime
                                                        name="EventDate"
                                                        selected={this.state.eventDate}
                                                        onChange={date => this.handleChangeEventDate(date)}
                                                        value={values.EventDate}
                                                        timeFormat={false}
                                                        showTimezone={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Start Time</label>
                                                <div>
                                                    <Datetime
                                                        name="StartTime"
                                                        selected={this.state.startTime}
                                                        onChange={this.handleChangeStartTime}
                                                        value={values.StartTime}
                                                        timeFormat={true}
                                                        //dateFormat={false}
                                                    />
                                                </div>
                                            </div>

                                          
                                        </div>
                                        
                                        
                                       

                                        <button
                                            type="submit"
                                            className="btn btn-success mr-2 mt-6"
                                            style={{
                                                marginTop: '140px',
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? 'Please wait...'
                                                : 'Create Event'}
                                        </button>
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


export default withRouter(AddEvent)
