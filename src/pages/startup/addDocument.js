import React, { Component } from 'react'
import Axios from 'axios'
import { TableTop, Pagination } from 'components'
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal'

class Document extends Component {
    _isMounted = false
    constructor(props) {
        debugger
        super(props)
        this.handleDocumnetSubmit = this.handleDocumnetSubmit.bind(this);
    }
    state = {
        id: '',
        values: [],
        documents: [],
        documentName: '',
        documentNameList: [],
        docResult: [],
        show: false,
    }
    async componentDidMount() {
        debugger
        this._isMounted = true
        const id = this.props.id
        this.setState({ id: id })
        const docResult = await Axios({
            url: `/document/startup/${id}`,
            method: 'GET',
        })
        if (docResult.data.status != false) {
            for (var i = 0; i < docResult.data.data.data.length; i++) {
                this.state.documents.push(docResult.data.data.data[i]);
            }

            this.setState({ docResult: docResult.data.data.data })
        }

    }

    createUI() {
        return this.state.documents.map((el, i) =>
            <div className="form-group">
                <div class="col-12">
                    <label className="form-control col-5" style={{ float: 'left' }} type="text" >{el.Name}</label>
                    {el.URL !== "" ? (<a className="col-5" style={{ float: 'left', marginLeft: '10px' }} href={el.URL} target="_blank">Link</a>) : null}
                    {
                        el.URL === "" ? (
                            <i class="fa fa-times mr-2 col-5" style={{ float: 'left' }} aria-hidden="true" onClick={this.removeClick.bind(this, i)}></i>
                        ) : (null)
                    }
                    <div style={{ clear: 'both' }}> </div>
                </div>
            </div>
        )
    }


    removeClick(i) {
        let documents = [...this.state.documents];
        documents.splice(i, 1);
        this.setState({ documents });
    }

    handleDocumnetSubmit = async (e) => {
        e.preventDefault()
        debugger
        for (var i = 0; i < this.state.documents.length; i++) {
            this.state.documentNameList.push({
                "Id": this.state.documents[i].Id,
                "Name": this.state.documents[i].Name,
                "URL": this.state.documents[i].URL,
                "StartupProfileId": this.state.id
            });
        }
        console.log(this.state.documentNameList)
        await Axios({
            url: `/document/request/${this.state.id}`,
            method: 'POST',
            data: {
                document: this.state.documentNameList
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Updated Successfully!')
                this.hideModal()
                this.componentDidMount();
            } else {
                toast.error(res.data.message)
            }
        })
    }

    onAddItem = () => {
        if (this.state.documentName != "") {
            this.setState(state => {
                const documents = this.state.documents.concat({ "Name": this.state.documentName, "Id": 0, "URL": "", "Status": 0, "StartupProfileId": this.state.id });

                return {
                    documents,
                    documentName: '',
                };
            });
        }
    };

    onChangeValue = event => {
        this.setState({ documentName: event.target.value });
    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        const { docResult } = this.state
        return (
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>Document</h3>
                                </div>

                                <div className="col-sm-6 float-right">
                                    <button className="btn btn-success" onClick={this.showModal} style={{ float:'right' }}>Add Required Document</button>
                                </div>
                            </div>
                        </div>
                        <Pagination data={docResult}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>DocumentName</th>
                                                <th>Document</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {docResult === null ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan="6">
                                                        <div
                                                            className="spinner-border m-6"
                                                            role="status"
                                                        >
                                                            <span className="sr-only">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : docResult.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        No Document
                                                    </td>
                                                </tr>
                                            ) : (
                                                [...pagedData].map(docResult => (
                                                    <tr key={docResult.Id}>
                                                        <td>
                                                            <a>
                                                                {docResult.Name}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            {docResult.URL != null ? <div><a target="_blank" href={docResult.URL}>Document</a></div> : ""}
                                                        </td>

                                                        <td>
                                                            {
                                                                docResult.Status
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Pagination>
                    </div>
                    <Modal
                        open={this.state.show}
                        onClose={this.hideModal}
                        classNames={{
                            modal: 'customModal',
                        }}
                    >
                        <h4>Add Reqired Document</h4>

                        <form onSubmit={this.handleDocumnetSubmit}>
                            {this.createUI()}
                            <div class="form-group  col-12">
                                <input type="text" placeholder="Document Name" class="form-control" onChange={this.onChangeValue} value={this.state.documentName} />
                            </div>
                            <div className="col-lg-12">
                                <button type="button" onClick={this.onAddItem} className="btn btn-success form-control col-4  mr-2 " style={{ float: 'left' }}  > Add</button>

                                <input type="submit" className="btn btn-success mr-2 form-control col-4" style={{ float: 'left' }} value="Submit" />
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withRouter(Document)