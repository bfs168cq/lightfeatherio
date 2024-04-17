import React from 'react'

const Supervisor = ({supervisor}) => {
    return (
        <div>
            {supervisor.jurisdiction} - {supervisor.lastName}, {supervisor.firstName}
        </div>
    )
}

export default Supervisor