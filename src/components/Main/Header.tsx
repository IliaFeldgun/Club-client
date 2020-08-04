import React from "react"

const Header: React.FunctionComponent = (props) =>{
    return (
        <React.Fragment>
            <header className="top wide">
                <a href="/">
                    <span className="main-title">♣ Club</span>
                </a>
                {props.children}
            </header>
        </React.Fragment>
    )
}

export default Header