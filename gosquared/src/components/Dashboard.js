import React from 'react'

export const Dashboard = ({ children, title }) => {
    return (
        <div className='dashboard'>
            <h1>{title}</h1>
            {children}
        </div>
    )
}

