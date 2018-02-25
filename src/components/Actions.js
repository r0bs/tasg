import React from 'react'

const Actions = (props) => {
    return(
        <div>
        <h4><span className="glyphicon glyphicon-wrench"></span>  Actions</h4>
            {props.children}
        </div>
    )
}

export default Actions