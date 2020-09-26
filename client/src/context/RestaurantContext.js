import React, { useState, createContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])
    const [newReviews, setNewReviews] = useState([])
    const [isUpdated, setIsUpdated] = useState(true) 

    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get('')
            setRestaurants(response.data.data.restaurants)
        }
        fetchData().catch(err => console.log(err));
        setIsUpdated(true)
    }, [setRestaurants, isUpdated])

    const addRestaurant = restaurant => {
        setRestaurants([...restaurants, restaurant])
    }

    const addReview = review => {
        setNewReviews([...newReviews, review])
    }

    return (
        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants,
            addRestaurant,
            addReview,
            newReviews,
            setIsUpdated,
            isUpdated
        }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}
