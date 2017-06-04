import React from 'react'

const Sidebar = (props) => {
    return(
        <div className={
            props.menuToggled ? "sidebar sidebar-mobile-visible" : "sidebar"
        }>
            <div style={{
                textAlign: "left",
                marginBottom: "4rem"

            }}>
                <h1 style={{
                    fontFamily: "'Megrim', cursive",
                    marginTop: 0,
                    fontSize: "4rem",
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
    )
}




export default Sidebar