import React, { Fragment, useContext, useEffect, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantContext } from '../context/RestaurantContext';

function RestaurantDetail(props) {
    const { id } = props
    const [restaurant, setRestaurant] = useState({});
    const { newReviews } = useContext(RestaurantContext);

    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get(`${id}`);
            setRestaurant(response.data.data.restaurant);
        }
        fetchData().catch(err => {
            console.log(err);
            if (err.response && err.response.status === 404) {
                setRestaurant({
                    name: 'notfound',
                    location: 'nowhere',
                })
            }
        });
    }, [id, newReviews])

    const handleUpdateBtn = () => {
        window.location.href = `/restaurants/${restaurant.id}/update`
    }

    return (
        <Fragment>
            { restaurant && (restaurant.name === 'notfound' && restaurant.location === 'nowhere' ?
            <h3 className="text-center text-danger mt-4">404 - restaurant not found</h3>
            :
            <>
            <div className="my-3 text-center">
                <h1 className="font-weight-light display-3">{restaurant.name }</h1>
                {restaurant.count > 0 ? <><StarRating rating={restaurant.avg_rating}/>
                <span>{` (${restaurant.count}) | `}</span></> : <span>no reviews yet | </span>}
                <button type="button" onClick={handleUpdateBtn} className="btn btn-sm btn-outline-dark">update restaurant</button>
            </div>
            <Reviews reviews={restaurant.reviews}/>
            <AddReview id={id}/>
            </>
            )}
        </Fragment>
    )
}

export default RestaurantDetail;
