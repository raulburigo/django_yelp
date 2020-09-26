import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

function AddReview(props) {
    
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const restaurantId = props.id;
    
    const { addReview } = useContext(RestaurantContext)

    const emptyStar = <i className="fas fa-star"></i>
    const fullStar = <i className="far fa-star"></i>

    const handleSubmit = async e => {
        e.preventDefault()
        if (rating === 0) {
            alert('You must give at least one star')
        } else {
            try {
                const result = await RestaurantFinder.post(
                    `${restaurantId}/addreview/`,
                    { review, rating }
                )
                addReview(result)
            } catch (err) {
                console.log(err);
                if (err.response.status === 403) {
                    if (window.confirm('You must log in to add reviews') === true) {
                        window.location.href = '/accounts/login'
                    }
                } else if (err.response.status === 400) {
                    if (err.response.data.non_field_errors[0] === "The fields user, restaurant must make a unique set.") {
                    alert("You already reviewd this restaurant")
                    // todo: update review
                    }
                }
            }
            setReview('')
            setRating(0)
        }
    }

    return (
        <div className="mb-2">
            <form onSubmit={handleSubmit}>
                <h2 className="border-bottom">New review</h2>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="rating">Rating</label>
                        <div>
                            <span onClick={() => setRating(1)} value={1}>{rating >= 1 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(2)} value={2}>{rating >= 2 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(3)} value={3}>{rating >= 3 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(4)} value={4}>{rating >= 4 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(5)} value={5}>{rating >= 5 ? emptyStar : fullStar}</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea required id="review" value={review} onChange={e => setReview(e.target.value)} className="form-control"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-small">Add Review</button>
            </form>
        </div>
    )
}


export default AddReview
