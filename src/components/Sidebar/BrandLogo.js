import React from 'react'

const BrandLogo = () => {
    return (
        <a
            href="/"
            className="brand-link"
            
        >
            <div class="iq-navbar-logo d-flex align-items-center justify-content-between">
                <img src={require("../Images//logo.png")} class="rounded-normal light-logo"
                    style={{ height: '50%', width: '100%' }} alt="logo" />
            </div>

        </a>
    )
}

export default BrandLogo
