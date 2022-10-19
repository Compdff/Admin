import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'


class AddUser extends Component {
    _isMounted = false
    state = {
        Id: 0,
        GoogleKey: '',
        DeviceType: '',
        DeviceToken: '',
        IsProfileCreated: false,
        MobileNo: '',
        Name: '',
        Password: '',
        Status: '',
        UserName: '',
        createdAt: '',
        updatedAt: '',
    }

    componentDidMount = async () => {
         
        this._isMounted = true
        
    }

    async componentWillUnmount() {
        this._isMounted = false
    }

    addUser = async (values) => {
         
        await Axios({
            url: `/users/`,
            method: 'POST',
            data: {
                devicetoken: values.DeviceToken,
                devicetype: values.DeviceType,
                role : 'admin',
                googlekey: values.GoogleKey,
                mobileno: values.MobileNo,
                password: values.Password,
                status: 1,
                name: values.Name,
                username: values.UserName,
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Added Successfully!')
                this.props.history.push('/Admin/user_management')
            } else {
                toast.error(res.data.message)
            }
        })
    }


    render() {
        const {
            GoogleKey,
            DeviceType,
            DeviceToken,
            IsProfileCreated,
            MobileNo,
            Name,
            Password,
            Status,
            UserName,
            createdAt,
            updatedAt,
        } = this.state

        return (
            <div className="card card-primary mt-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4 className="card-title">Add User</h4>
                                </div>
                            </div>
                        </div>

                        <Formik
                            enableReinitialize
                            initialValues={{
                                GoogleKey,
                                DeviceType,
                                DeviceToken,
                                IsProfileCreated,
                                MobileNo,
                                Name,
                                Password,
                                Status,
                                UserName,
                                createdAt,
                                updatedAt,
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                 
                                this.addUser(values);
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                errors,
                                isSubmitting,
                                touched,
                                setFieldValue,
                            }) => (
                                <form onSubmit={handleSubmit}>

                                    <div className="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Name"
                                                    value={values.Name}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>User Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="UserName"
                                                    value={values.UserName}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                        </div>
                                        
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>Mobile No.</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="MobileNo"
                                                    value={values.MobileNo}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Password</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Password"
                                                    value={values.Password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                type="submit"
                                                className="btn btn-success mr-2"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? 'Please wait...'
                                                    : 'Add User'}
                                            </button>
                                            <Link
                                                to="/Admin/user_management"
                                                className="btn btn-default"
                                            >
                                                Cancel
                                        </Link>
                                        </div>

                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
        )
    }
}
export default AddUser
