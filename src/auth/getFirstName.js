const getFirstName = () => { 
    const authFirstNameData = localStorage.getItem('dfanFirstName')
    if (authFirstNameData === null) return null
    return JSON.parse(authFirstNameData)
}

export default getFirstName
