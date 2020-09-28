import React, { useState, useEffect, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

function UpdateForm(props) {
    const { id } = props
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');
    const [restaurant, setRestaurant] = useState(null);

    const { setIsUpdated } = useContext(RestaurantContext);

    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get(`${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData().catch(err => {
            console.log(err);
            if (err.response && err.response.status === 404) {
                setRestaurant(404)
            }
        });
    }, [id])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await RestaurantFinder.put(`${id}/`, {
                name,
                location,
                price_range: priceRange
            })
            setIsUpdated(false)
            window.location.href = ('/')
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async e => {
        e.preventDefault()
        try {
            await RestaurantFinder.delete(`/${id}`)
            window.location.href = ('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            { restaurant !== 404 ? (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="restaurant name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="restaurant location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}                            
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select className="custom-select" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="form-group text-center">
                    <button type="submit" onClick={e => handleSubmit(e)} className="btn btn-primary mx-1">Update</button>
                    <button type="delete" onClick={e => handleDelete(e)} className="btn btn-danger mx-1">Delete</button>
                </div>
            </form>)
            :
            <h3 className="text-center text-danger">404 - restaurant not found</h3>
            }
        </div>
    )
}

export default UpdateForm;
