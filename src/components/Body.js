import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { GET_RESTAURENTS } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listsOfRestaurants, setListsOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const isOnline = useOnline();

  const RestaurentCardWithPromotedLabel = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(GET_RESTAURENTS);
    const json = await data.json();
    setListsOfRestaurants(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const { loggedinUser, setUserName } = useContext(UserContext);

  if (!isOnline) return <h1>Looks like you are offline currently</h1>;

  return listsOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex flex-wrap justify-center mt-10">
        <input
          type="text"
          value={searchText}
          className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-1"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const filteredRestaurents = listsOfRestaurants.filter((item) =>
              item.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurants(filteredRestaurents);
          }}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
        >
          search
        </button>
        <button
          className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => {
            filteredLists = listsOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setFilteredRestaurants(filteredLists);
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-blue-700 rounded-md group-hover:bg-opacity-0 hover:text-white">
            Top Rated Restaurant
          </span>
        </button>
        <input
          type="text"
          className="border border-solid p-2"
          value={loggedinUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {/* {restaurant.info.aggregatedDiscountInfoV3 ? (
              <RestaurentCardWithPromotedLabel resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )} */}
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
