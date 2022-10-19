import getAccessToken from './getAccessToken'

const isLoggedIn = () => {
    return getAccessToken() !== null
}
export default isLoggedIn
