import React, { useEffect } from 'react'

const requireAuth = (ChildComponent) => (props) => {
    const authData = localStorage.getItem('dfanAuth')

    useEffect(() => {
        if (authData === null) {
            const returnUrl = props.history.location.pathname
            props.history.push(`/login?returnUrl=${returnUrl}`)
        }
    }, [authData, props.history])

    if (authData == null) {
        return <></>
    } else {
        return <ChildComponent {...props} />
    }
}

export default requireAuth
