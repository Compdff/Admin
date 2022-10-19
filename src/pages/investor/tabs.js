import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from 'pages/startup/tabPanal'
import Investment from 'pages/investor/investment'
import EditInvestor from 'pages/investor/edit'
import Referral from './referal';
import Membership from './membership';


class InvestorTab extends Component {
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
        const id = this.props.match.params.id
        this.setState({ Id: id })
    }

    handleChange = (event, newValue) => {
        debugger
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
                                    <h3>Investors</h3>
                                </div>

                                <div className="col-sm-6">
                                    <Link
                                        to='/Admin/investors'
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
                                            <Tab label="Investments" {...this.a11yProps(1)} />
                                            <Tab label="Referral" {...this.a11yProps(2)} />
                                            <Tab label="Membership" {...this.a11yProps(3)} />
                                        </Tabs>
                                    </AppBar>

                                </div>
                            </div>
                        </div>
                        <SwipeableViews
                            index={this.state.tabValue}
                            onChangeIndex={this.thhandleChangeIndex}
                        >
                            <TabPanel value={this.state.tabValue} index={0}>
                                <EditInvestor id={this.state.Id}></EditInvestor>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={1} >
                                <Investment id={this.state.Id}></Investment>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={2}>
                                <Referral id={this.state.Id}></Referral>
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={3}>
                                <Membership id={this.state.Id}></Membership>
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(InvestorTab)
