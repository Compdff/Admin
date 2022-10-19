import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

class ChangePassword extends Component {
    state = { Oldpassword: '', Password: '',ConfirmPassword:'' }

    handleInputChange = (event) => {
        const { name, value } = event.target
        const updatedPassword = { ...this.state, [name]: value }
        this.setState(updatedPassword)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        debugger
        var obj = {
            Oldpassword: this.state.Oldpassword,
            Password:this.state.Password
        }
        if (this.state.Password == this.state.ConfirmPassword) {


            Axios.put(`/users/user/ChangePassword`, obj)
                .then(({ data }) => {
                    debugger
                    if (data.status === true) {
                        toast.success(data.message)
                        window.location.href = '/'

                    } else {

                        toast.error(data.message)
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                })
        }
        else {
            toast.error('Please type correct password!')

        }
    }


    render() {
        return (
            <>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        {/*<span className="logo-center">*/}

                        {/*    <img src={require("../components/Images//logo.png")} className="img-fluid rounded-normal light-logo mt-4 mr-2" alt="logo" />*/}
                        {/*</span>*/}
                        <div className="container h-100">
                            <div className="row h-100 justify-content-center align-items-center">
                                <div className="col-lg-12">
                                    <div className="card card-block card-stretch create-workform">
                                        <div className="card-body ">
                                            <div className="container h-100">
                                                <div className="row h-100 justify-content-center align-items-center">
                                                    <div className="reg-sep-page">
                                                        <h2>Change Password</h2>
                                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="floating-input form-group">

                                                                        <input
                                                                            className="form-control"
                                                                            type="password"
                                                                            name="Oldpassword"
                                                                            value={this.state.Oldpassword}
                                                                            onChange={this.handleInputChange}
                                                                            required
                                                                        />
                                                                        <label className="form-label" for="oldpassword">Old Password</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="floating-input form-group">

                                                                        <input
                                                                            className="form-control"
                                                                            type="password"
                                                                            name="Password"
                                                                            value={this.state.Password}
                                                                            onChange={this.handleInputChange}
                                                                            required
                                                                        />
                                                                        <label className="form-label" for="newpassword">New Password</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="floating-input form-group">

                                                                        <input
                                                                            className="form-control"
                                                                            type="password"
                                                                            name="ConfirmPassword"
                                                                            value={this.state.ConfirmPassword}
                                                                            onChange={this.handleInputChange}
                                                                            required
                                                                        />
                                                                        <label className="form-label" for="newpassword">Confirm Password</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="btn-goo">
                                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default ChangePassword
