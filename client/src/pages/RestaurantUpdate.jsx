import React from 'react'
import UpdateForm from '../components/UpdateForm'

function UpdateRestaurant(props) {

    return (
        <div>
            <h1 className="my-3 text-center">Update Restaurant</h1>
            <UpdateForm id={props.id}/>
        </div>
    )
}

export default UpdateRestaurant
