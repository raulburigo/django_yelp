import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

function Home() {
    return (
        <div>
            <div>
                <h1 className="font-weight-light display-1 text-center">Restaurant Finder</h1>
            </div>
            <AddRestaurant />
            <RestaurantList />
        </div>
    )
}

export default Home
