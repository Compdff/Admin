import React, { Component } from 'react'
import { TableTop, Pagination } from 'components'
import axios from 'axios'
import swal from 'sweetalert'
import { toast } from 'react-toastify'

class UserManagement extends Component {
    _isMounted = false
    state = { users: [], currentSort: 'default', loggedInUserId : localStorage.getItem('dfanUserId') }
    
    async componentDidMount() {
         
        this._isMounted = true
        const result = await axios({
            url: '/users',
            method: 'GET',
        })
         
        const users = result.data
        if (this._isMounted) {
            this.setState({ users })
        }
    }

    onDeleteUser =(id) => {
         
        const loginUserId = localStorage.getItem('dfanUserId')
        if (loginUserId != id) {
            swal({
                title: 'Are you sure?',
                text: 'Would you like to Delete',
                icon: 'warning',
                buttons: true,
            }).then(async (saveChanges) => {
                 
                if (saveChanges) {
                    const result = await axios({
                        url: `/users/${id}`,
                        method: 'DELETE',
                    })
                    if (result.data.status != true) {
                        swal({
                            title: 'Could Not delete',
                            text: '',
                            icon: 'warning',
                            buttons: true,
                        })
                    } else {
                        toast.success(result.data.message)
                        window.location.reload();
                    }
                }
            })
        }
        else {
            swal({
                title: 'Could Not Delete',
                text: 'Login user Can not delete this user',
                icon: 'warning',
                buttons: true,
            })
        }
    }
    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        this.setState({
            currentSort: nextSort
        });
    };

    componentWillUnmount() {
        this._isMounted = false
    }
   

    render() {
        const { users } = this.state
        const { currentSort } = this.state;
        const sortTypes = {
            up: {
                class: 'sort-up',
                fn: (a, b) => a.Status - b.Status
            },
            down: {
                class: 'sort-down',
                fn: (a, b) => b.Status - a.Status
            },
            default: {
                class: 'sort',
                fn: (a, b) => a
            }
        };
        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card">
                        <TableTop
                            link="/user/add"
                            title="Users"
                            linkText="Add New"
                        />
                        <Pagination data={users}>
                            {(pagedData) => (
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>UserName</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users === null ? (
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
                                            ) : users.length === 0 ? (
                                                <tr
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        No user
                                                    </td>
                                                </tr>
                                            ) : (
                                                pagedData.map((user) => (
                                                    <tr key={user.Id}>
                                                        <td>
                                                            <a
                                                                href={`/user/edit/${user.Id}`}
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {user.UserName}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            {user.Name}
                                                        </td>
                                                        
                                                        <td>
                                                            <a hidden={this.state.loggedInUserId==user.Id} onClick={() => this.onDeleteUser(user.Id)}><i class="fas fa-trash-alt" ></i></a>
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
            </div>
        )
    }
}

export default UserManagement
