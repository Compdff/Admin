import Login from './login'
import Logout from './logout'
import Investor from 'pages/investor/index'
import EditInvestor from 'pages/investor/edit'
import StartupProfile from 'pages/startup/index'
import EditStartup from 'pages/startup/edit'
import UserManagement from 'pages/User_Management/index'
import EditUser from 'pages/User_Management/edit'
import AddUser from 'pages/User_Management/add'
import Verticals from 'pages/verticals/index'
import Investments from 'pages/investor/investments'
import Referral from 'pages/investor/referal'
import Query from 'pages/query/index'
import ChangePassword from 'pages/change_password'
import InvestorTab from 'pages/investor/tabs'
import StartupTab from 'pages/startup/tabs'
import Events from 'pages/events/index'
import EditEvent from 'pages/events/edit'
import Membership from 'pages/investor/membership'
import CompanySetting from 'pages/Company_Setting/index'

const routes = [
    
    {
        path: '/login',
        name: Login,
        component: Login,
    },
    {
        path: '/events',
        name: Events,
        component: Events,
    },
    {
        path: '/change-password',
        name: ChangePassword,
        component: ChangePassword,
    },
    {
        path: '/investors/investments',
        name: Investments,
        component: Investments,
    },
    {
        path: '/query',
        name: Query,
        component: Query,
    },
    {
        path: '/Admin/investors',
        name: Investor,
        component: Investor,
    },
    {
        path: '/Admin/user_management',
        name: UserManagement,
        component: UserManagement,
    },
    {
        path: '/startup_profiles',
        name: StartupProfile,
        component: StartupProfile,
    },
    {
        path: '/investor/edit/:id',
        name: EditInvestor,
        component: EditInvestor,
    },
    {
        path: '/investor/referal/:id',
        name: Referral,
        component: Referral,
    },
    {
        path: '/investor/membership/:id',
        name: Membership,
        component: Membership,
    },
    {
        path: '/logout',
        component: Logout,
    },
    {
        path: '/startup/edit/:id',
        name: EditStartup,
        component: EditStartup,
    },
    {
        path: '/user/edit/:id',
        name: EditUser,
        component: EditUser,
    },
    {
        path: '/user/add',
        name: AddUser,
        component: AddUser,
    },
    {
        path: '/verticals',
        name: Verticals,
        component: Verticals,
    },
    {
        path: '/investor/:id',
        name: InvestorTab,
        component: InvestorTab,
    },
    {
        path: '/startup/:id',
        name: StartupTab,
        component: StartupTab,
    },
    {
        path: '/event/:id',
        name: EditEvent,
        component: EditEvent,
    },
    {
        path: '/settings',
        name: CompanySetting,
        component: CompanySetting,
    },
]

export default routes
