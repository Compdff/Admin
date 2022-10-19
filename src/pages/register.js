import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Register extends Component {
    state = { name: '', username: '', password: '' }

    handleInputChange = (event) => {
        const { name, value } = event.target
        const updatedLogin = { ...this.state, [name]: value }
        this.setState(updatedLogin)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        //await Axios.post(`/users`, this.state);
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="card card-primary">
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <button className="btn btn-success mr-2">
                                    Login{' '}
                                </button>
                                <Link to="/" className="btn btn-default">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
