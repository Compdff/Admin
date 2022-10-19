import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import 'pages/verticals/model.css'
import { toast } from 'react-toastify'
import swal from 'sweetalert'


class Verticals extends Component {
    _isMounted = false

    state = { verticals: [], show: false, Id: 0, name: '' }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ Id: 0 });
        this.setState({ name: '' });
        this.setState({ show: false });
    };

    editVerticalModel = (Id, Name) => {
         
        this.setState({ Id: Id });
        this.setState({ name: Name });
        this.setState({ show: true });
    }

    async componentDidMount() {
         
        this._isMounted = true
        const result = await axios({
            url: '/verticals',
            method: 'GET',
        })
         
        const verticals = result.data
        if (this._isMounted) {
            this.setState({ verticals })
        }
    }

    handleSubmit = (event) => {
         
        event.preventDefault()
        if (this.state.Id == 0) {
            this.addNewVertical()
        }
        else {
            this.editVertical()
        }
    }
    handleNameChange = (e) => {
         
        this.setState({ name: e.target.value })
    }
    addNewVertical = () => {
        axios({
            url: `/verticals/create-verticals`,
            method: 'POST',
            data: {
                Name: this.state.name
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success(res.data.message)
                window.location.reload();
            } else {
                toast.error(res.data.message)
            }
        })
    }

    editVertical = () => {
        axios({
            url: `/verticals/${this.state.Id}`,
            method: 'PUT',
            data: {
                Name: this.state.name
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success(res.data.message)
                window.location.reload();
            } else {
                toast.error(res.data.message)
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    deleteVertical = (id) => {
         
        swal({
            title: 'Are you sure?',
            text: 'Would you like to Delete Vertical?',
            icon: 'warning',
            buttons: true,
        }).then(async (saveChanges) => {
            if (saveChanges) {
                axios({
                    url: `/verticals/${id}`,
                    method: 'DELETE',
                }).then((res) => {
                    if (res.data.status === true) {
                        toast.success(res.data.message)
                        window.location.reload();
                    } else {
                        toast.error(res.data.message)
                    }
                })
            }
        })
    }

    render() {
        const { verticals } = this.state

        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>Verticals</h3>
                                </div>

                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={this.showModal}
                                        style={{ marginBottom: '2px', marginLeft: '223px' }}
                                    >
                                        Add
                                  </button>
                                </div>
                            </div>
                        </div>

                        <Pagination data={verticals}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Id</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {verticals === null ? (
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
                                            ) : verticals.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        No verticals
                                                    </td>
                                                </tr>
                                            ) : (
                                                pagedData.map((vertical) => (
                                                    <tr key={vertical.Id}>
                                                        <td>
                                                            <a
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() => this.editVerticalModel(vertical.Id, vertical.Name)}
                                                            >
                                                                {vertical.Id}
                                                            </a>

                                                        </td>
                                                        <td>
                                                            {vertical.Name}
                                                        </td>
                                                        <td>
                                                            <i style={{ color: 'red', cursor: 'pointer' }} class="fas fa-trash-alt" onClick={() => this.deleteVertical(vertical.Id)}></i>
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
                </div>
                <Modal
                    open={this.state.show}
                    onClose={this.hideModal}
                    classNames={{
                        modal: 'customModal',
                    }}
                >
                    <h4>Verticals</h4>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>
                                    Name
                                    </label>
                                <div className="row">
                                    <input
                                        className="form-control col-10"
                                        type="hidden"
                                        name="Id"
                                        value={this.state.Id}
                                        onChange={this.handleNameChange}
                                    />
                                    <input
                                        className="form-control col-10"
                                        type="text"
                                        name="Name"
                                        value={this.state.name}
                                        onChange={this.handleNameChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success mr-2 mt-4"
                                >
                                    {this.state.isSubmitting
                                        ? 'Please wait...'
                                        : 'Save'}
                                </button>

                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

        )
    }
}

export default Verticals