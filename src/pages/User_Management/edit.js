import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'


class EditUser extends Component {
    _isMounted = false
    state = {
        Id: 0,
        MobileNo: '',
        Name: '',
        Password: '',
        UserName: '',
    }

    componentDidMount = async () => {
         debugger
        this._isMounted = true
        const id = this.props.match.params.id
        const result = await Axios({
            url: `/users/${id}`,
            method: 'GET',
        })
        const {
            MobileNo,
            Name,
            UserName,
        } = result.data.data.user

        if (this._isMounted) {
             
            this.setState({
                MobileNo,
                Name,
                UserName,
            })
        }
    }

    async componentWillUnmount() {
        this._isMounted = false
    }

    updateUser = async (values) => {
         
        await Axios({
            url: `/users/${this.props.match.params.id}`,
            method: 'PUT',
            data: {
                MobileNo: values.MobileNo,
                Name: values.Name,
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Updated Successfully!')
                this.props.history.push('/Admin/user_management')
            } else {
                toast.error(res.data.message)
            }
        })
    }


    render() {
        const {
            MobileNo,
            Name,
            UserName,
        } = this.state

        return (
            <div className="card card-primary mt-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4 className="card-title">Edit User</h4>
                                </div>
                            </div>
                        </div>

                        <Formik
                            enableReinitialize
                            initialValues={{
                               
                                MobileNo,
                                Name,
                                UserName
                               
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                 
                                this.updateUser(values);
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
                                                    readOnly
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
                                            
                                        </div>
                                        
                                       
                                        <div className="card-footer">
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
export default EditUser
