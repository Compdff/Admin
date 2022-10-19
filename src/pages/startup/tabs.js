import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from 'pages/startup/tabPanal'
import StartUpQuery from 'pages/query/query'
import Document from 'pages/startup/addDocument'
import EditStartup from 'pages/startup/edit'
import Events from 'pages/events/index'

class StartupTab extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
    }
    state = {
        Id: 0,
        tabValue: 0,
        index: 0
    }
    async componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        this.setState({ Id: id })
    }

    handleChange = (event, newValue) => {
        this.setState({ tabValue: newValue })
    };

    handleChangeIndex = (index) => {
        this.setState({ index: index })
    };

    a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`
        };
    }


    render() {

        return (
            <div className="card card-primary">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>Startup</h3>
                                </div>

                                <div className="col-sm-6">
                                    <Link
                                        to='/startup_profiles'
                                        className="btn btn-info float-right"
                                    >
                                        Back
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8">
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={this.state.tabValue}
                                            onChange={this.handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                            aria-label="full width tabs example"
                                        >
                                            <Tab label="Profile Info" {...this.a11yProps(0)} />
                                            <Tab label="Query" {...this.a11yProps(1)} />
                                            <Tab label="Document" {...this.a11yProps(2)} />
                                            <Tab label="Events" {...this.a11yProps(3)} />
                                        </Tabs>
                                    </AppBar>

                                </div>
                            </div>
                        </div>
                        <div className="card-body" style={{ marginTop: '-40px' }}>
                            <SwipeableViews
                                index={this.state.tabValue}
                                onChangeIndex={this.thhandleChangeIndex}
                            >
                                <TabPanel value={this.state.tabValue} index={0}>
                                    <EditStartup id={this.state.Id}></EditStartup>
                                </TabPanel>
                                <TabPanel value={this.state.tabValue} index={1} >
                                    <StartUpQuery id={this.state.Id}></StartUpQuery>
                                </TabPanel>
                                <TabPanel value={this.state.tabValue} index={2} >
                                    <Document id={this.state.Id} data={this.state.documents}></Document>
                                </TabPanel>
                                <TabPanel value={this.state.tabValue} index={3} >
                                    <Events id={this.state.Id}></Events>
                                </TabPanel>
                            </SwipeableViews>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(StartupTab)
