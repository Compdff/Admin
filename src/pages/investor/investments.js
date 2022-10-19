import React, { useEffect } from 'react'
import Axios from 'axios'
import { TableTop, ReactTable } from 'components'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal'
import swal from 'sweetalert'
import {
    SearchColumnFilter,
} from 'utils'


function Investments() {
    debugger
    const [data, setData] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const [show, setShow] = React.useState(false);
    const [investmentData, setInvestmentData] = React.useState([])
    const [investorList, setInvestorList] = React.useState([])
    const [startupList, setStartupList] = React.useState([])
    const [investorName, setInvestorName] = React.useState('')
    const [startupName, setStartupName] = React.useState('')
    const [Amount, setAmount] = React.useState('')
    const [Stack, setStack] = React.useState('')
    const [investmentId, setInvestmentId] = React.useState(0)
    const [showAdd, setShowAdd] = React.useState(false);


    const columns = [
        {
            Header: 'Startup',
            accessor: 'StartupProfile.StartupName',
            Filter: SearchColumnFilter,

        },
        {
            Header: 'Investor',
            accessor: 'InvestorProfile.User.Name',
            Filter: SearchColumnFilter,

        },
        {
            Header: 'Amount',
            accessor: 'Amount',
            Filter: SearchColumnFilter,
        },
        {
            Header: 'Stake',
            accessor: 'Stake',
            Filter: SearchColumnFilter,
        },
        {
            Header: "Action",
            id: "edit2",
            accessor: '[editButton]',
            Cell: (cellObj) => <div><i class="fas fa-edit" onClick={() => handleClickEditRow(cellObj.row.original.Id)}></i> |  <i class="fa fa-trash" onClick={() => handleClickDeleteRow(cellObj.row.original.Id)} aria-hidden="true"></i> </div>,
            disableFilters: true,
        },
    ]

    useEffect(() => {
        async function fetchData() {

            const result = await Axios({
                url: `/investment`,
                method: 'GET',
            })
            const investorList = await Axios({
                url: '/investor',
                method: 'GET',
            })
            const startupList = await Axios({
                url: '/startup',
                method: 'GET',
            })
            var Investments = result.data
            var ListOfInvestor = investorList.data
            var ListofStartup = startupList.data
            setData(Investments)
            setInvestorList(ListOfInvestor)
            setStartupList(ListofStartup)
            setLoading(false)
        }

        fetchData()
    }, [])

    function showModal(Id) {

        const investmentData = fetchDataById(Id)
        setShowAdd(true);
    }

    async function handleClickAddButton() {
        setShowAdd(true);
    }

    function handleClickEditRow(Id) {

        const investmentData = fetchDataById(Id)
        setShow(true);
    }

    async function handleClickDeleteRow(Id) {

        swal({
            title: 'Are you sure?',
            text: 'Would you like to Delete Investment?',
            icon: 'warning',
            buttons: true,
        }).then(async (saveChanges) => {
            if (saveChanges) {
                Axios({
                    url: `/investment/${Id}`,
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


    async function fetchDataById(Id) {
        debugger
        const result = await Axios({
            url: `/investment/${Id}`,
            method: 'GET',
        })

        var investmentData = result.data
        setInvestmentId(result.data.Id)
        setInvestmentData(investmentData)
    }

    const hideModal = () => {
        var investmentData = ''
        setInvestmentData(investmentData)
        setShow(false);
    };

    const hideAddModal = () => {
        var investmentData = ''
        setShowAdd(false);
    };

    function handleInvestorNameChange(event) {

        investmentData.InvestorProfileId = event.target.value;
        setInvestorName(event.target.value)
    }

    function handleStartupNameChange(event) {
        investmentData.StartupProfileId = event.target.value;
        setStartupName(event.target.value)
    }

    function handleStackChange(e) {
        const stack = parseInt(e.target.value)
        investmentData.Stake = stack;
        setStack(e.target.value)
    }

    function handleAmountChange(e) {
        const amount = parseInt(e.target.value)
        investmentData.Amount = amount;
        setAmount(e.target.value)
    }

    async function handleAddData(event) {
        debugger
        event.preventDefault()
        if (startupName == "") {
            toast.error("Please Selete Startup Name")
            return;
        }
        if (investorName == "") {
            toast.error("Please Selete Investor Name")
            return;
        }
        const result = await Axios({
            url: `/investment/`,
            method: 'POST',
            data: {
                StartupProfileId: startupName,
                InvestorProfileId: investorName,
                Amount: Amount,
                Stake: Stack
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Add Successfully!')
                window.location.reload();
            } else {
                toast.error(res.data.message)
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const result = await Axios({
            url: `/investment/${investmentId}`,
            method: 'PUT',
            data: {
                Amount: Amount == "" ? investmentData.Amount : Amount,
                Stake: Stack == "" ? investmentData.Stack : Stack
            },
        }).then((res) => {
            if (res.data.status === true) {
                toast.success('Updated Successfully!')
                window.location.reload();
            } else {
                toast.error(res.data.message)
            }
        })
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card mt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Investments</h3>
                            </div>

                            <div className="col-sm-6">
                                <button
                                    type="button"
                                    className="btn btn-info btn-lg"
                                    onClick={showModal}
                                    style={{ marginBottom: '2px', marginLeft: '430px' }}
                                >
                                    Add
                                  </button>
                            </div>
                        </div>
                    </div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        listName="Investments"
                        loading={isLoading}
                    ></ReactTable>

                </div>
            </div>
            <div>
                <Modal
                    open={show}
                    onClose={() => hideModal()}
                    classNames={{
                        modal: 'customModal',
                    }}
                >
                    <h4>Edit Investments</h4>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>
                                    Startup Name
                                    </label>
                                <div className="row">
                                    <select
                                        name="StartupName"
                                        className="custom-select"
                                        disabled
                                        value={investmentData.StartupProfileId}
                                        onChange={async (event,) => { handleStartupNameChange(event) }}
                                    >
                                        {startupList.map(
                                            (item) => (
                                                <option
                                                    key={
                                                        item.Id
                                                    }
                                                    value={
                                                        item.Id
                                                    }
                                                >
                                                    {item.StartupName}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>

                                <label>
                                    Investor Name
                                    </label>
                                <div className="row">
                                    <select
                                        name="InvestorName"
                                        className="custom-select"
                                        disabled
                                        value={investmentData.InvestorProfileId}
                                        onChange={async (event,) => { handleInvestorNameChange(event) }}
                                    >
                                        {investorList.map(
                                            (item) => (
                                                <option
                                                    key={
                                                        item.Id
                                                    }
                                                    value={
                                                        item.Id
                                                    }
                                                >
                                                    {item.User.Name}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                                <label>
                                    Amount
                                    </label>
                                <div className="row">
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="Amount"
                                        onChange={async (event,) => { handleAmountChange(event) }}
                                        value={investmentData.Amount}
                                    />
                                </div>
                                <label>
                                    Stake
                                    </label>
                                <div className="row">
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="Stake"
                                        onChange={async (event,) => { handleStackChange(event) }}
                                        value={investmentData.Stake}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success mr-2 mt-4"
                                >
                                    Update
                                </button>

                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    open={showAdd}
                    onClose={() => hideAddModal()}
                    classNames={{
                        modal: 'customModal',
                    }}
                >
                    <h4>Add Investments</h4>
                    <div className="card-body">
                        <form onSubmit={handleAddData}>
                            <div className="form-group">
                                <label>
                                    Startup Name
                                    </label>
                                <div className="row">
                                    <select
                                        name="StartupName"
                                        className="custom-select"
                                        value={investmentData.StartupProfileId}
                                        onChange={async (event,) => { handleStartupNameChange(event) }}
                                    >
                                        <option>Select Startup</option>
                                        {startupList.map(
                                            (item) => (
                                                <option
                                                    key={
                                                        item.Id
                                                    }
                                                    value={
                                                        item.Id
                                                    }
                                                >
                                                    {item.StartupName}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>

                                <label>
                                    Investor Name
                                    </label>
                                <div className="row">
                                    <select
                                        name="InvestorName"
                                        className="custom-select"
                                        value={investmentData.InvestorProfileId}
                                        onChange={async (event,) => { handleInvestorNameChange(event) }}
                                    >
                                        <option>Select Investor</option>
                                        {investorList.map(
                                            (item) => (
                                                <option
                                                    key={
                                                        item.Id
                                                    }
                                                    value={
                                                        item.Id
                                                    }
                                                >
                                                    {item.User.Name}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                                <label>
                                    Amount
                                    </label>
                                <div className="row">
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="Amount"
                                        onChange={async (event,) => { handleAmountChange(event) }}
                                        value={investmentData.Amount}
                                    />
                                </div>
                                <label>
                                    Stake
                                    </label>
                                <div className="row">
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="Stake"
                                        onChange={async (event,) => { handleStackChange(event) }}
                                        value={investmentData.Stake}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success mr-2 mt-4"
                                >
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}



export default Investments
