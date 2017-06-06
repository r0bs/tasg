import React, { Component } from 'react'
import { navigateTo } from '../actions/navigation'



class MobileTopbar extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.dispatch = this.props.dispatch
    }

    handleMenuClick(navItem) {
        console.log(navItem)
        this.dispatch(navigateTo(navItem))
    }

    render() {
        return(
            <div className="mobile-topbar-wrapper">
                <div className="mobile-header">
                    <div className="mobile-topbar-button mobile-search-button" 
                        onClick={this.handleMenuClick.bind(this, "search")}>
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
                
                {this.props.children}

            </div>
        )
    }

}


export default MobileTopbar