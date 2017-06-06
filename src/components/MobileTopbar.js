import React from 'react'

const MobileTopbar = (props) => {
    return(
        <div className="mobile-topbar-wrapper">
            <div className="mobile-header">
                <div className="mobile-topbar-button mobile-search-button">
                    <span className="glyphicon glyphicon-search"></span>
                </div>
                <div className="mobile-topbar-button mobile-add-button active">
                    <span className="glyphicon glyphicon-plus"></span>
                </div>
                <div style={{
                    textAlign: "center",
                    marginBottom: "2rem"
                }}>
                    <h1 style={{
                        fontFamily: "'Megrim', cursive",
                        marginTop: 0,
                        fontSize: "3rem",
                        margin: 0,
                        color: "#000"
                    }}>
                        <span
                        style={{
                            fontWeight: "bold"
                        }}>tas</span>
                        <span
                        style={{
                            color: "#ff5252",
                            fontWeight: "bold"
                        }}>g</span>
                        <span
                        style={{
                            fontWeight: "regular"
                        }}>.one</span>
                    </h1>
                    
                </div>
            </div>
            
            {props.children}

        </div>
    )
}




export default MobileTopbar