import React from 'react'
import jwtDecode from 'jwt-decode'
import { isLoggedIn, getAccessToken, getFirstName } from 'auth'
import BrandLogo from 'components/Sidebar/BrandLogo'

export default function AdminHeader() {
    var userName = null
    var token = getAccessToken()
    var firstName = getFirstName()
    if (token !== null) {
         
        var decodedToken = jwtDecode(token)
        var Email =
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        var userEmail = decodedToken[Email]
    }
    if (window.location.pathname === '/Register/index') {
        return null
    }
    if (window.location.pathname === '/login') {
        return null
    }
    return (
        <nav
            className=" navbar navbar-expand navbar-dark layout-fixed"
            style={{ backgroundColor: '#3c8dbc', height:"76px" }}
        >
            <ul className="navbar-nav">
                <li className="nav-item layout-fixed">
                    <BrandLogo />
                </li>
                <li className="nav-item mt-3">
                    <span
                        style={{ cursor: 'pointer' }}
                        className="nav-link"
                        data-widget="pushmenu"
                        role="button"
                    >
                        <i className="fas fa-bars" />
                    </span>
                </li>
                <li className="nav-item d-none d-sm-inline-block mt-3">
                    <a href="index3.html" className="nav-link">
                        Home
                    </a>
                </li>

            </ul>

            <ul className="navbar-nav ml-auto">
                {token && (
                    <li className="nav-item d-sm-inline-block ">
                        <a
                            className="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            href="#"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {firstName}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            {!isLoggedIn() ? (
                                <a href="/logout" className="dropdown-item">
                                    Logout
                                </a>
                            ) : (
                                <a href="/logout" className="dropdown-item">
                                    Logout
                                </a>
                            )}
                        </div>
                    </li>
                )}

            </ul>
        </nav>
    )
}
