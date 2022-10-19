import React, { Component } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Moment from 'moment';


class CompanySetting extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
    }
    state = {
        Id: 0,
        AboutUsUrl: '',
        BlogURL: '',
        CompanyName: '',
        CompanyShortName: '',
        MembershipFee: '',
        InvestorPoints: '',
        RefInvestorPoints: '',
        TncUrl:'',
        createdAt: '',
        updatedAt: '',
    }

    async componentDidMount() {
        debugger
        this._isMounted = true
        const result = await Axios({
            url: `/companysettings/`,
            method: 'GET',
        })
        const {
            Id,
            AboutUsUrl,
            BlogURL,
            CompanyName,
            CompanyShortName,
            MembershipFee,
            InvestorPoints,
            RefInvestorPoints,
            TncUrl,
            createdAt,
            updatedAt
        } = result.data


        if (this._isMounted) {

            this.setState({
                Id,
                AboutUsUrl,
                BlogURL,
                CompanyName,
                CompanyShortName,
                MembershipFee,
                InvestorPoints,
                RefInvestorPoints,
                TncUrl,
                createdAt,
                updatedAt
            })
        }
    }


    updateSetting = async (values) => {
        await Axios({
            url: `/companysettings`,
            method: 'POST',
            data: {
                AboutUsUrl: values.AboutUsUrl,
                BlogURL: values.BlogURL,
                CompanyName: values.CompanyName,
                CompanyShortName: values.CompanyShortName,
                MembershipFee: values.MembershipFee,
                InvestorPoints: values.InvestorPoints,
                RefInvestorPoints: values.RefInvestorPoints,
                TncUrl: values.TncUrl

            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Updated Successfully!')
            } else {
                toast.error(res.data.message)
            }
        })
    }

    render() {

        const {
            Id,
            AboutUsUrl,
            BlogURL,
            CompanyName,
            CompanyShortName,
            MembershipFee,
            createdAt,
            updatedAt,
            InvestorPoints,
            RefInvestorPoints,
            TncUrl
        } = this.state

            

        return (
            <div className="card card-primary mt-5">
                <div className="row">
                    <div className="col-md-12">

                        <Formik
                            enableReinitialize
                            initialValues={{
                                Id,
                                AboutUsUrl,
                                BlogURL,
                                CompanyName,
                                CompanyShortName,
                                MembershipFee,
                                createdAt,
                                updatedAt,
                                InvestorPoints,
                                RefInvestorPoints,
                                TncUrl,
                            }}
                            onSubmit={async (values) => {
                                await this.updateSetting(values)
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
                                                <label>Id</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="Id"
                                                    readOnly
                                                    onChange={handleChange}
                                                    value={values.Id}
                                                />

                                            </div>

                                            <div className="form-group col-md-5">
                                                <label>AboutUsUrl</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="AboutUsUrl"
                                                    readOnly
                                                    onChange={handleChange}
                                                    value={values.AboutUsUrl}
                                                />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>BlogURL</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="BlogURL"
                                                    onChange={handleChange}
                                                    value={values.BlogURL}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Company Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="CompanyName"
                                                    onChange={handleChange}
                                                    value={values.CompanyName}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-5">
                                                <label>Company Short Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="CompanyShortName"
                                                    onChange={handleChange}
                                                    value={values.CompanyShortName}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Membership Fee</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="MembershipFee"
                                                    onChange={handleChange}
                                                    value={values.MembershipFee}
                                                />
                                            </div>
                                            </div>
                                            <div className="row">

                                                <div className="form-group col-md-5">
                                                    <label>Investor Points</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="InvestorPoints"
                                                        onChange={handleChange}
                                                        value={values.InvestorPoints}
                                                    />
                                                </div>
                                                <div className="form-group col-md-5">
                                                    <label>Ref. Investor Points</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="RefInvestorPoints"
                                                        onChange={handleChange}
                                                        value={values.RefInvestorPoints}
                                                    />
                                                </div>
                                            </div>
                                        <div className="row">
                                            
                                            <div className="form-group col-md-5">
                                                <label>Created At</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    readOnly
                                                    name="createdAt"
                                                    onChange={handleChange}
                                                    value={Moment(values.createdAt).format('YYYY-MM-DD')}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Updated At</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    readOnly
                                                    name="updatedAt"
                                                    onChange={handleChange}
                                                    value={Moment(values.updatedAt).format('YYYY-MM-DD')}
                                                />
                                            </div>
                                            </div>
                                            <div className="row">

                                                <div className="form-group col-md-5">
                                                    <label>T&C Url</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="InvestorPoints"
                                                            onChange={handleChange}
                                                            value={values.TncUrl}
                                                    />
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


export default withRouter(CompanySetting)
