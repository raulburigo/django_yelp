import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

function Home() {
    return (
        <div>
            <div className="my-3 text-center">
                <h1 className="font-weight-light display-3">Restaurant Finder</h1>
            </div>
            <AddRestaurant />
            <RestaurantList />
        </div>
    )
}

export default Home
