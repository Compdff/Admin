import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class EditStartup extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
    }
    state = {
        id: '',
        CreatedDate: '',
        CurrentEvaluation: '',
        CurrentState: '',
        DeckFilename: '',
        DeckURL: '',
        InitialEvaluation: '',
        OfferedStake: '',
        ProductDescription: '',
        RaisingFunds: '',
        StartupFounders: [],
        StartupName: '',
        StateDetail: '',
        Status: '',
        UpdatedDate: '',
        Website: '',
        UpdatedBy: '',
        createdAt: '',
        updatedAt: '',
        userId: '',
        user: '',
        values: [],
        show: false,
        count: 0,
        documents: [],
        documentName: '',
        documentNameList: [],
        verticalsData: [],
    }
    handleCheckBox = (event) => {

        this.setState({ Status: event.target.value });

        console.log(event.target.value)
    }

    handleCheckBoxIsRevenueDataShareable = (event) => {

        this.setState({ IsRevenueDataShareable: event.target.value });

        console.log(event.target.value)
    }

    handleCheckBoxIsIdeaSacaleDigitally = (event) => {

        this.setState({ IsIdeaSacaleDigitally: event.target.value });

        console.log(event.target.value)
    }
    handleCheckBoxIsAcceptTnC = (event) => {

        this.setState({ IsAcceptTnC: event.target.value });

        console.log(event.target.value)
    }

    handleStartupFounders = (event) => {

        console.log(event)
    }

    handleCurrentStateChange = (event) => {

        const selectedCurrentState = event.target.value
        this.setState({ CurrentState: selectedCurrentState });
    }

    handleVerticalChange = (event) => {

        const selectedVertical = event.target.value
        this.setState({ VerticalId: selectedVertical });
    }
    handleBusinessModelChange = (event) => {

        const selectedBusinessModel = event.target.value
        this.setState({ BusinessModel: selectedBusinessModel });
    }
    async componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        this.state.id = id
        const result = await Axios({
            url: `/startup/${id}`,
            method: 'GET',
        })

        const {
            Id,
            CreatedDate,
            CurrentEvaluation,
            CurrentState,
            DeckFilename,
            DeckURL,
            InitialEvaluation,
            OfferedStake,
            ProductDescription,
            RaisingFunds,
            StartupFounders,
            StartupName,
            StateDetail,
            Status,
            UpdatedDate,
            Website,
            createdAt,
            UpdatedBy,
            updatedAt,
            userId,
            user,
            BusinessModel,
            ExitStrategyForUs,
            Horizontal,
            HowBigMarketAvailable,
            HowProductFitInMarket,
            IsAcceptTnC,
            IsIdeaSacaleDigitally,
            IsRevenueDataShareable,
            Location,
            Logo,
            VerticalId,
            WhatNHowProblemSolve,
            YourUSP
        } = result.data

        const verticalResult = await Axios({
            url: `/verticals`,
            method: 'GET',
        })
        this.state.verticalsData = verticalResult.data
        if (this._isMounted) {

            this.setState({
                Id,
                CreatedDate,
                CurrentEvaluation,
                CurrentState,
                DeckFilename,
                DeckURL,
                InitialEvaluation,
                OfferedStake,
                ProductDescription,
                RaisingFunds,
                StartupFounders,
                StartupName,
                StateDetail,
                Status,
                UpdatedDate,
                Website,
                createdAt,
                UpdatedBy,
                updatedAt,
                userId,
                user,
                BusinessModel,
                ExitStrategyForUs,
                Horizontal,
                HowBigMarketAvailable,
                HowProductFitInMarket,
                IsAcceptTnC,
                IsIdeaSacaleDigitally,
                IsRevenueDataShareable,
                Location,
                Logo,
                VerticalId,
                WhatNHowProblemSolve,
                YourUSP
            })
        }
    }


    updateStartupStatus = async (values) => {
        debugger
        if (this.state.show != true) {
            const status = this.state.Status;
            await Axios({
                url: `/startup/${this.state.id}`,
                method: 'PUT',
                data: {
                    CurrentEvaluation: values.CurrentEvaluation,
                    CurrentState: this.state.CurrentState,
                    DeckFilename: values.DeckFilename,
                    DeckURL: values.DeckURL,
                    InitialEvaluation: values.InitialEvaluation,
                    OfferedStake: values.OfferedStake,
                    ProductDescription: values.ProductDescription,
                    RaisingFunds: values.RaisingFunds,
                    StartupFounders: values.StartupFounders,
                    StartupName: values.StartupName,
                    StateDetail: values.StateDetail,
                    Website: values.Website,
                    Status: status,
                    BusinessModel: values.BusinessModel,
                    ExitStrategyForUs: values.ExitStrategyForUs,
                    Horizontal: values.Horizontal,
                    HowBigMarketAvailable: values.HowBigMarketAvailable,
                    HowProductFitInMarket: values.HowProductFitInMarket,
                    IsAcceptTnC: values.IsAcceptTnC,
                    IsIdeaSacaleDigitally: values.IsIdeaSacaleDigitally,
                    IsRevenueDataShareable: values.IsRevenueDataShareable,
                    Location: values.Location,
                    VerticalId: values.VerticalId,
                    WhatNHowProblemSolve: values.WhatNHowProblemSolve,
                    YourUSP: values.YourUSP
                },
            }).then((res) => {
                if (res.data.status === true) {
                    toast.success('Updated Successfully!')
                    this.props.history.push('/startup_profiles')
                } else {
                    toast.error(res.data.message)
                }
            })
        }
    }

    render() {

        const {
            Id,
            CreatedDate,
            CurrentEvaluation,
            CurrentState,
            DeckFilename,
            DeckURL,
            InitialEvaluation,
            OfferedStake,
            ProductDescription,
            RaisingFunds,
            StartupFounders,
            StartupName,
            StateDetail,
            Status,
            UpdatedDate,
            Website,
            UpdatedBy,
            createdAt,
            updatedAt,
            userId,
            user,
            BusinessModel,
            ExitStrategyForUs,
            Horizontal,
            HowBigMarketAvailable,
            HowProductFitInMarket,
            IsAcceptTnC,
            IsIdeaSacaleDigitally,
            IsRevenueDataShareable,
            Location,
            Logo,
            VerticalId,
            WhatNHowProblemSolve,
            YourUSP
        } = this.state

        const currentStateOption = [
            { id: '0', title: 'In Progress' },
            { id: '1', title: 'Under Screening' },
            { id: '2', title: 'Active' }
        ]

        const businessModelOption = [
            { id: '0', title: 'B2B' },
            { id: '1', title: 'B2C' },
            { id: '2', title: 'B2B2c' }
        ]

        const verticals = this.state.verticalsData

        return (
            <div className="card card-primary">
                <div className="row">
                    <div className="card-body" style={{ marginTop: '-40px' }}>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                Id,
                                CreatedDate,
                                CurrentEvaluation,
                                CurrentState,
                                DeckFilename,
                                DeckURL,
                                InitialEvaluation,
                                OfferedStake,
                                ProductDescription,
                                RaisingFunds,
                                StartupFounders: [],
                                StartupName,
                                StateDetail,
                                Status,
                                UpdatedDate,
                                Website,
                                UpdatedBy,
                                createdAt,
                                updatedAt,
                                userId,
                                user,
                                BusinessModel,
                                ExitStrategyForUs,
                                Horizontal,
                                HowBigMarketAvailable,
                                HowProductFitInMarket,
                                IsAcceptTnC,
                                IsIdeaSacaleDigitally,
                                IsRevenueDataShareable,
                                Location,
                                Logo,
                                VerticalId,
                                WhatNHowProblemSolve,
                                YourUSP
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                await this.updateStartupStatus(values)
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
                                                <label>Startup Id</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="StartupName"
                                                    onChange={handleChange}
                                                    readOnly
                                                    value={values.Id}
                                                />

                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Startup Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="StartupName"
                                                    readOnly
                                                    onChange={handleChange}
                                                    value={values.StartupName == null ? "" : values.StartupName}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Created Date</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="createdAt"
                                                    onChange={handleChange}
                                                    readOnly
                                                    value={values.createdAt == null ? "" : values.createdAt}
                                                />

                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Modified Date</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="modifiedAt"
                                                    onChange={handleChange}
                                                    readOnly
                                                    value={values.updatedAt == null ? "" : values.updatedAt}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Initial Evaluation</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="InitialEvaluation"
                                                    onChange={handleChange}
                                                    readOnly
                                                    value={values.InitialEvaluation == null ? "" : values.InitialEvaluation}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Current Evaluation</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="CurrentEvaluation"
                                                    onChange={handleChange}
                                                    value={values.CurrentEvaluation == null ? "" : values.CurrentEvaluation}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Current State</label>
                                                <select
                                                    name="CurrentState"
                                                    className="custom-select"
                                                    value={values.CurrentState == null ? "" : values.CurrentState}
                                                    onChange={async (event,) => {
                                                        this.handleCurrentStateChange(
                                                            event,
                                                        )
                                                        setFieldValue(
                                                            'state',
                                                            event.target
                                                                .value,
                                                        )
                                                    }}
                                                >
                                                    {currentStateOption.map(
                                                        (item) => (
                                                            <option
                                                                key={
                                                                    item.id
                                                                }
                                                                value={
                                                                    item.id
                                                                }
                                                            >
                                                                {item.title}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Deck URL</label>

                                                <a className="form-control btn-link"
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    name="DeckURL" href={'//' + values.DeckURL}>{values.DeckURL}</a>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Updated Deck</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="DeckFilename"
                                                    onChange={handleChange}
                                                    value={values.DeckFilename == null ? "" : values.DeckFilename}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Offered Stake</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="OfferedStake"
                                                    onChange={handleChange}
                                                    value={values.OfferedStake == null ? "" : values.OfferedStake}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">

                                                <label>Raising Funds (In Rupees Millions)</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="RaisingFunds"
                                                    onChange={handleChange}
                                                    value={values.RaisingFunds == null ? "" : values.RaisingFunds}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label>About the product(Minimum words)</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="ProductDescription"
                                                    onChange={handleChange}
                                                    value={values.ProductDescription == null ? "" : values.ProductDescription}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>State Detail</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="StateDetail"
                                                    onChange={handleChange}
                                                    value={values.StateDetail}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Website</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Website"
                                                    onChange={handleChange}
                                                    value={values.Website == null ? "" : values.Website}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">


                                            <div className="form-group col-md-5">
                                                <label>Business Model</label>
                                                <select
                                                    name="BusinessModel"
                                                    className="custom-select"
                                                    value={values.BusinessModel == null ? "" : values.BusinessModel}
                                                    onChange={async (event,) => {
                                                        this.handleBusinessModelChange(
                                                            event,
                                                        )
                                                        setFieldValue(
                                                            'state',
                                                            event.target
                                                                .value,
                                                        )
                                                    }}
                                                >
                                                    {businessModelOption.map(
                                                        (item) => (
                                                            <option
                                                                key={
                                                                    item.id
                                                                }
                                                                value={
                                                                    item.id
                                                                }
                                                            >
                                                                {item.title}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>


                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Exit Strategy For Us</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Website"
                                                    onChange={handleChange}
                                                    value={values.ExitStrategyForUs == null ? "" : values.ExitStrategyForUs}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">


                                            <div className="form-group col-md-5">
                                                <label>Horizontal</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Horizontal"
                                                    onChange={handleChange}
                                                    value={values.Horizontal == null ? "" : values.Horizontal}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Vertical</label>
                                                <select
                                                    name="Verticals"
                                                    className="custom-select"
                                                    value={values.VerticalId == null ? "" : values.VerticalId}
                                                    onChange={async (event,) => {
                                                        this.handleVerticalChange(
                                                            event,
                                                        )
                                                        setFieldValue(
                                                            'state',
                                                            event.target
                                                                .value,
                                                        )
                                                    }}
                                                >
                                                    {verticals.map(
                                                        (item) => (
                                                            <option
                                                                key={
                                                                    item.Id
                                                                }
                                                                value={
                                                                    item.Id
                                                                }
                                                            >
                                                                {item.Name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>


                                            </div>

                                            
                                        </div>
                                        <div className="row">


                                            <div className="form-group col-md-5">
                                                <label>Is Accept TnC</label><br />

                                                <input type="radio" className="checkmark" onChange={this.handleCheckBoxIsAcceptTnC} value='0' name="IsAcceptTnC" checked={values.IsAcceptTnC == 0} />No
                                              <input type="radio" className="checkmark ml-2" onChange={this.handleCheckBoxIsAcceptTnC} value='1' name="IsAcceptTnC" checked={values.IsAcceptTnC == 1} />Yes

                                               
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Is Idea Sacale Digitally</label><br />
                                                <input type="radio" className="checkmark" onChange={this.handleCheckBoxIsIdeaSacaleDigitally} value='0' name="IsIdeaSacaleDigitally" checked={values.IsIdeaSacaleDigitally == 0 } />No
                                              <input type="radio" className="checkmark ml-2" onChange={this.handleCheckBoxIsIdeaSacaleDigitally} value='1' name="IsIdeaSacaleDigitally" checked={values.IsIdeaSacaleDigitally == 1} />Yes

                                               
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Is Revenue Data Shareable</label><br/>
                                                <input type="radio" className="checkmark" onChange={this.handleCheckBoxIsRevenueDataShareable} value='0' name="IsRevenueDataShareable" checked={values.IsRevenueDataShareable == 0} />No
                                              <input type="radio" className="checkmark ml-2" onChange={this.handleCheckBoxIsRevenueDataShareable} value='1' name="IsRevenueDataShareable" checked={values.IsRevenueDataShareable == 1} />Yes

                                               
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Location</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Location"
                                                    onChange={handleChange}
                                                    value={values.Location == null ? "" : values.Location}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Logo</label><br />
                                                {values.Logo != null ? (<img src={values.Logo} width="100" height="100" />) : <h6>No Logo provided</h6>} 

                                               
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>How Big Market Available</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Website"
                                                    onChange={handleChange}
                                                    value={values.HowBigMarketAvailable == null ? "" : values.HowBigMarketAvailable}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>What N How Problem Solve</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="WhatNHowProblemSolve"
                                                    onChange={handleChange}
                                                    value={values.WhatNHowProblemSolve == null ? "" : values.WhatNHowProblemSolve}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Your USP</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="YourUSP"
                                                    onChange={handleChange}
                                                    value={values.YourUSP == null ? "" : values.YourUSP}
                                                />
                                            </div>
                                        </div>

                                        {StartupFounders.map(item => (
                                            <div className="card md-3">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <h2 className="card-title">Startup Founder</h2>
                                                    </div>
                                                    <div className="row" name="StartupFounders" >

                                                        <div className="form-group col-md-4">
                                                            <label>Designation</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="Designation"
                                                                onChange={handleChange}
                                                                readOnly
                                                                value={item.Designation == null ? "" : item.Designation}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label>Founder Name</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="FounderName"
                                                                onChange={handleChange}
                                                                readOnly
                                                                value={item.FounderName == null ? "" : item.FounderName}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label>Linkedin Url</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="LinkedinUrl"
                                                                onChange={handleChange}
                                                                readOnly
                                                                value={item.LinkedinUrl == null ? "" : item.LinkedinUrl}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label>Mobile Number</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="MobileNumber"
                                                                onChange={handleChange}
                                                                readOnly
                                                                value={item.MobileNumber == null ? "" : item.MobileNumber}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="form-group">
                                            <div className="content" style={{ display: 'flex' }}>
                                                <div className="text-center form-check form-check-inline">
                                                    <p className="text-danger font-weight-bold text-dark">
                                                        <input type="radio" className="checkmark" onChange={this.handleCheckBox} value='1' name="status" checked={this.state.Status == 1} />Active
                                                        </p>
                                                </div>

                                                <div className="text-center form-check form-check-inline">
                                                    <p className="text-danger font-weight-bold text-dark">
                                                        <input type="radio" value='2' name="status" onChange={this.handleCheckBox} checked={this.state.Status == 2} /> Reject
                                                        </p>
                                                </div>
                                                <div className="text-center form-check form-check-inline">
                                                    <p className="text-danger font-weight-bold text-dark">
                                                        <input type="radio" value='0' name="status" onChange={this.handleCheckBox} checked={this.state.Status == 0} /> Pending
                                                        </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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
                                        to="/startup_profiles"
                                        className="btn btn-default"
                                    >
                                        Cancel
                                        </Link>

                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(EditStartup)
