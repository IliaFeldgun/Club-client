import React from "react"
import CookieConsent from 'react-cookie-consent'

const Footer: React.FunctionComponent = () => {
    return (
        <footer>
            <CookieConsent 
                location="bottom" 
                sameSite="strict"
            >
                This site depends on using cookies to provide you the experience.
            </CookieConsent>
        </footer>
    )
}

export default Footer