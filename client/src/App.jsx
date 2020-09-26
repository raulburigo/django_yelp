import React from 'react';
import { RestaurantContextProvider } from './context/RestaurantContext';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import RestaurantUpdate from './pages/RestaurantUpdate';

const App = (props) => {
  const { page, restaurant_id } = props.data

  let page_view = null

  switch (page) {
    case 'home':
      page_view = <Home />
      break
    case 'detail':
      page_view = <RestaurantDetail id={restaurant_id} />
      break
    case 'update':
      page_view = <RestaurantUpdate id={restaurant_id} />
      break
    default:
      break
    }

  return (
    <RestaurantContextProvider>
      <div className="container">
        {page_view}
      </div>
    </RestaurantContextProvider>
  );
}

export default App;