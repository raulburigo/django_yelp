import React from 'react'
import UpdateForm from '../components/UpdateForm'

function UpdateRestaurant(props) {

    return (
        <div className="my-3 text-center">
            <h1>Update Restaurant</h1>
            <UpdateForm id={props.id}/>
        </div>
    )
}

export default UpdateRestaurant
