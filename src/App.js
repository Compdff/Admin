import React from 'react'
import { Header, Footer, Sidebar } from 'components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from 'pages/routes'
import axios from 'axios'
import { getAccessToken, isLoggedIn } from 'auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminHeader from 'components/Header.js'
import Login from './pages/login'


axios.interceptors.request.use(function (config) {
    const accessToken = getAccessToken()
    if (accessToken !== null) {
        config.headers['x-access-token'] = `${accessToken}`
    }
    config.baseURL = process.env.REACT_APP_API_URL
    return config
})

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.data) {
            toast.error(err.response.data)
        }
    },
)


function App() {
    const token = localStorage.getItem("dfanAuth");
    if (token != null) {
        return (
            <>
                <ToastContainer />
                <AdminHeader />
                <Router>
                    <Sidebar />
                    <div className="content-wrapper">
                        <div className="container">

                            <Switch>
                                {routes.map((r) => (
                                    <Route
                                        key={r.path}
                                        path={r.path}
                                        component={r.component}
                                    />
                                ))}
                            </Switch>
                        </div>
                    </div>
                    {/* /.content */}
                </Router>
            </>
        )
    }
    else {
        return (
            <>
                <ToastContainer />
                <Login />
            </>
        )
    }
}

export default App
