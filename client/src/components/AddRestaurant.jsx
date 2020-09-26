import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'

function AddRestaurant() {
    const { addRestaurant } = useContext(RestaurantContext)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')

    // nao gosto disso pq ele tá permitindo submeter o form com price_range errado
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post('', {
                name,
                location,
                price_range: priceRange
            })
            addRestaurant(response.data.data.restaurant)
            setName('')
            setLocation('')
            setPriceRange('Price Range')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input
                            className="form-control"
                            type="text"
                            required
                            placeholder="restaurant name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            className="form-control"
                            type="text"
                            required
                            placeholder="restaurant location"
                            value={location}
                            onChange={e => setLocation(e.target.value)}                            
                        />
                    </div>
                    <div className="col">
                        <select className="custom-select" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
