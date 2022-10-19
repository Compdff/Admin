const getAccessToken = () => {
    const authData = localStorage.getItem('dfanAuth')
    if (authData === null) return null
    return JSON.parse(authData)
}

export default getAccessToken
