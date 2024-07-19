import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { GET_RESTAURENTS } from "../utils/constants";

const Body = () => {
  const [listsOfRestaurants, setListsOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(GET_RESTAURENTS);
    const json = await data.json();
    setListsOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    console.log(listsOfRestaurants);
  };

  return listsOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={() => {
            const filteredRestaurents = listsOfRestaurants.filter((item) =>
              item.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(filteredRestaurents);
            setFilteredRestaurants(filteredRestaurents);
          }}
        >
          search
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            filteredLists = listsOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListsOfRestaurants(filteredLists);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
