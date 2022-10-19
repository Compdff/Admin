import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'



class EditInvestor extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.handleIsInvestmentZero = this.handleIsInvestmentZero.bind(this);
    }
    state = {
        Id: 0,
        Status: '',
        Occupation: '',
        Jobtitle: '',
        CompanyName: '',
        LinkedinUrl: '',
        PAN: '',
        AadharNo: '',
        InvestedStartupCount: '',
        IsInvestmentZero: '',
        IsPartOfAngel: '',
        InvestementAmount: '',
        StartupTypes: '',
        IsActive: '',
        CreatedDate: '',
        UpdatedDate: '',
        CreatedBy: '',
        UpdatedBy: '',
        createdAt: '',
        updatedAt: '',
        userId: '',
        User: '',
    }
    handleCheckBox = (event) => {

        this.setState({ Status: event.target.value });

        console.log(event.target.value)
    }
    handleIsInvestmentZero = (event) => {

        const value = event.target.value == "true" ? true : false
        this.setState({ IsInvestmentZero: value });
    }
    handleIsPartOfAngel = (event) => {

        const value = event.target.value == "true" ? true : false
        this.setState({ IsPartOfAngel: value });
    }
    handleIsActive = (event) => {

        const value = event.target.value == "true" ? true : false
        this.setState({ IsActive: value });
    }
    async componentDidMount() {
        debugger
        this._isMounted = true
        const id = this.props.match.params.id
        this.state.Id = id
        const result = await Axios({
            url: `/investor/${id}`,
            method: 'GET',
        })
        debugger
        const {
            Occupation,
            Jobtitle,
            CompanyName,
            LinkedinUrl,
            Status,
            PAN,
            AadharNo,
            InvestedStartupCount,
            IsInvestmentZero,
            IsPartOfAngel,
            InvestementAmount,
            StartupTypes,
            IsActive,
            CreatedDate,
            UpdatedDate,
            CreatedBy,
            UpdatedBy,
            createdAt,
            updatedAt,
            userId,
            User
        } = result.data


        if (this._isMounted) {

            this.setState({
                Occupation,
                Jobtitle,
                CompanyName,
                LinkedinUrl,
                Status,
                PAN,
                AadharNo,
                InvestedStartupCount,
                IsInvestmentZero,
                IsPartOfAngel,
                InvestementAmount,
                StartupTypes,
                IsActive,
                CreatedDate,
                UpdatedDate,
                CreatedBy,
                UpdatedBy,
                createdAt,
                updatedAt,
                userId,
                User
            })
        }
    }


    updateInvestor = async (values) => {
        const status = this.state.Status;
        await Axios({
            url: `/investor/${this.state.Id}`,
            method: 'PUT',
            data: {
                Occupation: values.Occupation,
                Jobtitle: values.Jobtitle,
                CompanyName: values.CompanyName,
                LinkedinUrl: values.LinkedinUrl,
                PAN: values.PAN,
                AadharNo: values.AadharNo,
                InvestedStartupCount: values.InvestedStartupCount,
                IsInvestmentZero: this.state.IsInvestmentZero,
                IsPartOfAngel: this.state.IsPartOfAngel,
                InvestementAmount: values.InvestementAmount,
                StartupTypes: values.StartupTypes,
                IsActive: this.state.IsActive,
                Status: status
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Updated Successfully!')
                this.props.history.push('/Admin/investors')
            } else {
                toast.error(res.data.message)
            }
        })
    }

    render() {

        const {
            Id,
            Occupation,
            Jobtitle,
            CompanyName,
            LinkedinUrl,
            Status,
            PAN,
            AadharNo,
            InvestedStartupCount,
            IsInvestmentZero,
            IsPartOfAngel,
            InvestementAmount,
            StartupTypes,
            IsActive,
            CreatedDate,
            UpdatedDate,
            CreatedBy,
            UpdatedBy,
            createdAt,
            updatedAt,
            userId,
            User
        } = this.state


        return (
            <div className="card card-primary">
                <div className="row">
                    <div className="col-md-12">
                        
                        <Formik
                            enableReinitialize
                            initialValues={{
                                Id,
                                Occupation,
                                Jobtitle,
                                CompanyName,
                                LinkedinUrl,
                                Status,
                                PAN,
                                AadharNo,
                                InvestedStartupCount,
                                IsInvestmentZero,
                                IsPartOfAngel,
                                InvestementAmount,
                                StartupTypes,
                                IsActive,
                                CreatedDate,
                                UpdatedDate,
                                CreatedBy,
                                UpdatedBy,
                                createdAt,
                                updatedAt,
                                userId,
                                User
                            }}
                            onSubmit={async (values) => {
                                await this.updateInvestor(values)
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Investor Id</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="investorId"
                                                    readOnly
                                                    onChange={handleChange}
                                                    value={values.Id == null ? "" : values.Id}
                                                />

                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="investorName"
                                                    readOnly
                                                    onChange={handleChange}
                                                    value={values.User == null ? "" : values.User.Name}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Occupation</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Occupation"
                                                    onChange={handleChange}
                                                    value={values.Occupation == null ? "" : values.Occupation}
                                                />

                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Job Title</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Jobtitle"
                                                    onChange={handleChange}
                                                    value={values.Jobtitle == null ? "" : values.Jobtitle}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>Company Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="CompanyName"
                                                    onChange={handleChange}
                                                    value={values.CompanyName == null ? "" : values.CompanyName}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Linkedin Url</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="LinkedinUrl"
                                                    onChange={handleChange}
                                                    value={values.LinkedinUrl == null ? "" : values.LinkedinUrl}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>PAN Number</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="PAN"
                                                    onChange={handleChange}
                                                    value={values.PAN == null ? "" : values.PAN}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Aadhar Number</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="AadharNo"
                                                    onChange={handleChange}
                                                    value={values.AadharNo == null ? "" : values.AadharNo}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>How many startups you have invested in?</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="InvestedStartupCount"
                                                    onChange={handleChange}
                                                    value={values.InvestedStartupCount == null ? "" : values.InvestedStartupCount}
                                                />
                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Are you aware the investment in a startup can completely become zero?</label>
                                                <div className="content" style={{ display: 'flex' }}>
                                                    <div className="text-center form-check form-check-inline">
                                                        <p className="text-danger font-weight-bold text-dark">
                                                            <input
                                                                type="radio"
                                                                className="checkmark"
                                                                name="IsInvestmentZero"
                                                                value={true}
                                                                checked={this.state.IsInvestmentZero === true}
                                                                onChange={this.handleIsInvestmentZero}
                                                            />True
                                                        </p>
                                                    </div>

                                                    <div className="text-center form-check form-check-inline">
                                                        <p className="text-danger font-weight-bold text-dark">
                                                            <input
                                                                type="radio"
                                                                className="checkmark"
                                                                name="IsInvestmentZero"
                                                                value={false}
                                                                checked={this.state.IsInvestmentZero === false}
                                                                onChange={this.handleIsInvestmentZero}
                                                            /> False
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>How much capital in INR Lakhs are you planning to invest?</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="InvestementAmount"
                                                    onChange={handleChange}
                                                    value={values.InvestementAmount == null ? "" : values.InvestementAmount}
                                                />
                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Are you part of any other Angel Network?</label>
                                                <div className="content" style={{ display: 'flex' }}>
                                                    <div className="text-center form-check form-check-inline">
                                                        <p className="text-danger font-weight-bold text-dark">
                                                            <input
                                                                type="radio"
                                                                className="checkmark"
                                                                name="IsPartOfAngel"
                                                                value={true}
                                                                checked={this.state.IsPartOfAngel === true}
                                                                onChange={this.handleIsPartOfAngel}
                                                            />True
                                                        </p>
                                                    </div>

                                                    <div className="text-center form-check form-check-inline">
                                                        <p className="text-danger font-weight-bold text-dark">
                                                            <input
                                                                type="radio"
                                                                className="checkmark"
                                                                name="IsPartOfAngel"
                                                                value={false}
                                                                checked={this.state.IsPartOfAngel === false}
                                                                onChange={this.handleIsPartOfAngel}
                                                            /> False
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">

                                            <div className="form-group col-md-5">
                                                <label>In case you volunteer. What kind of startups can you evaluate?</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="StartupTypes"
                                                    onChange={handleChange}
                                                    value={values.StartupTypes == null ? "" : values.StartupTypes}
                                                />
                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>Is Active</label>
                                                <div className="content" style={{ display: 'flex' }}>
                                                    <div className="text-center form-check form-check-inline">
                                                        <p className="text-danger font-weight-bold text-dark">
                                                            <input
                                                                type="radio"
                                                                className="checkmark"
                                                                name="IsActive"
                                                                value={true}
                                                                checked={this.state.IsActive === true}
                                                                onChange={this.handleIsActive}
                                                            />True
                                                        </p>
                                                    </div>

                                                    <div className="text-center form-check form-check-inline">
                                                        <p className="text-danger font-weight-bold text-dark">
                                                            <input
                                                                type="radio"
                                                                className="checkmark"
                                                                name="IsActive"
                                                                value={false}
                                                                checked={this.state.IsActive === false}
                                                                onChange={this.handleIsActive}
                                                            /> False
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="content" style={{ display: 'flex' }}>
                                                <div className="text-center form-check form-check-inline">
                                                    <p className="text-danger font-weight-bold text-dark">
                                                        <input type="radio" className="checkmark" onChange={this.handleCheckBox} value='1' name="status" checked={this.state.Status == 1} />Approve
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
                                            to="/Admin/investors"
                                            className="btn btn-default"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(EditInvestor)
