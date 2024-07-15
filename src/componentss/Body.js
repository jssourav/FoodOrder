import resList from "../utils/mockdata";
import RestaurantCard from "./RestaurantCard";
import { useState } from "react";

const Body = () => {
  const [lostsOfRestaurants, setListsOfRestaurants] = useState(resList);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            filteredLists = lostsOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListsOfRestaurants(filteredLists);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {lostsOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
