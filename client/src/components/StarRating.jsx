import React, { Fragment } from 'react';

function StarRating({ rating }) {
    
    const stars = []
    const starIcons = {
        full: "fas fa-star text-warning",
        half: "fas fa-star-half-alt text-warning",
        empty: "far fa-star text-warning"
    }

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i key={i} className={starIcons.full}></i>);
        } else if ((i - rating) <= 0.5 ) {
            stars.push(<i key={i} className={starIcons.half}></i>);
        } else {
            stars.push(<i key={i} className={starIcons.empty}></i>);
        }
    }

    return (
        <Fragment>{ stars }</Fragment>
    )
}

export default StarRating;
