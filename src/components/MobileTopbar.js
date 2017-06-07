import React, { Component } from 'react'
import Search from '../containers/Search'
import Logo from './Logo'
import AddTaskContainer from '../containers/AddTaskContainer'

class MobileTopbar extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            activeNav: "add"
        }
    }

    handleNavClick(target) {
        this.setState({
            activeNav: target
        })
    }

    render() {

        let visibleItem = this.state.activeNav === "search" ? <Search displayAutoFocus="true" /> : <AddTaskContainer />

        return (
            <div className="mobile-topbar-wrapper">
                <div className="mobile-header">
                    <div className={
                        this.state.activeNav === "search" ? "mobile-topbar-button mobile-search-button active" : "mobile-topbar-button mobile-search-button"
                    }
                        onClick={() => this.handleNavClick("search")}>
                        <span className="glyphicon glyphicon-search"></span>
                    </div>
                    <div className={
                        this.state.activeNav === "add" ? "mobile-topbar-button mobile-add-button active" : "mobile-topbar-button mobile-add-button"
                    }
                        onClick={() => this.handleNavClick("add")}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </div>
                    <Logo />
                </div>

                { visibleItem }

            </div>
        )
    }
}



export default MobileTopbar