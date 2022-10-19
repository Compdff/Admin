import React, { Component } from 'react'

class Logout extends Component {
    componentDidMount() {
        localStorage.clear()
        window.localStorage.clear();
        window.location.href = '/login'
    }

    render() {
        return <h5>Logging out...</h5>
    }
}

export default Logout
