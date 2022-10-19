import React from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const Sidebar = () => {
    if (window.location.pathname === '/Register/index') {
        return null
    }
    if (window.location.pathname === '/login') {
        return null
    }
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4"
            style={{ marginTop: '75px' }}>
            
            <div className="sidebar">
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item has-treeview menu-open">
                            <a href="/AdminDashboard" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="/Admin/investors" className="nav-link">
                                <i className="nav-icon fas fa-hand-holding-usd" />
                                <p>
                                    Investors
                                </p>
                            </a>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="/startup_profiles" className="nav-link">
                                <i className="nav-icon fa fa-hourglass-start" />
                                <p>
                                    Startup Profiles
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/settings" className="nav-link">
                                <i className="nav-icon fa fa-cog" />
                                <p>
                                    Settings
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/Admin/user_management" className="nav-link">
                                <i className="nav-icon fa fa-users" />
                                <p>
                                    User Management
                                </p>
                            </a>
                        </li>
                       
                        <li className="nav-item">
                            <a href="/verticals" className="nav-link">
                                <i className="nav-icon fas fa-user" />
                                <p>
                                    Masters
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/verticals" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Verticals</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
