import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

class Login extends Component {
    state = { username: '', password: '' }

    handleInputChange = (event) => {
        const { name, value } = event.target
        const updatedLogin = { ...this.state, [name]: value }
        this.setState(updatedLogin)
    }

    handleSubmit = (e) => {
        e.preventDefault()
         
        Axios.post(`/auth/signin`, this.state)
            .then(({ data }) => {
                 
                if (data.status === true) {
                     
                    localStorage.setItem('dfanFirstName', JSON.stringify(data.data.user.Name))
                    localStorage.setItem('dfanUserId', JSON.stringify(data.data.user.Id))
                    localStorage.setItem('dfanAuth', JSON.stringify(data.data.accessToken))
                    localStorage.setItem('role', data.data.role)
                    //const query = new URLSearchParams(
                    //    this.props.history.location.search,
                    //)
                    //const returnUrl = query.get('returnUrl')
                    if (data.data.role == "admin") {
                        toast.success(data.message)
                        window.location.href = '/'
                    }
                    else {
                        toast.error("Invalid Credential")
                    }
                } else {
                     
                    toast.error(data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }


    render() {
        return (
            <>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <span className="logo-center">

                            <img src={require("../components/Images//logo.png")} className="img-fluid rounded-normal light-logo mt-4 mr-2" alt="logo" />
                        </span>
                        <div className="container h-100">
                            <div className="row h-100 justify-content-center align-items-center">
                                <div className="col-lg-12">
                                    <div className="card card-block card-stretch create-workform">
                                        <div className="card-body ">
                                            <div className="container h-100">
                                                <div className="row h-100 justify-content-center align-items-center">
                                                    <div className="reg-sep-page">
                                                        <h2>Welcome to DFAN</h2>
                                                        <p>It's good to see you again Please login to your account.</p>
                                                        <form onSubmit={(event) => this.handleSubmit(event)}>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="floating-input form-group">

                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="username"
                                                                            id="username"
                                                                            value={this.state.username}
                                                                            onChange={this.handleInputChange}
                                                                            required
                                                                        />
                                                                        <label className="form-label" for="username">Email Address</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12">
                                                                    <div className="floating-input form-group">

                                                                        <input
                                                                            className="form-control"
                                                                            type="password"
                                                                            name="password"
                                                                            id="password"
                                                                            value={this.state.password}
                                                                            onChange={this.handleInputChange}
                                                                            required
                                                                        />
                                                                        <label className="form-label" for="password">Password</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="btn-goo">
                                                                <button type="submit" className="btn btn-primary">Sign In</button>
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

export default Login
