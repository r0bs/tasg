import React from 'react'

const MobileTopbar = (props) => {
    return(
        <div>
            <div className="mobile-topbar">
                <div style={{
                    textAlign: "center",
                    marginBottom: "2rem"

                }}>
                    <h1 style={{
                        fontFamily: "'Megrim', cursive",
                        marginTop: 0,
                        fontSize: "3rem",
                        margin: 0,
                        color: "#323232"
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
                
                {props.children}
            </div>
        </div>
    )
}




export default MobileTopbar