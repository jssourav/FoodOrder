import { useEffect, useState } from "react";
import { CDN_URL, GET_MENU } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

function getRecommendedItems(menu) {
  for (const menuItem of menu) {
    if (menuItem.card.card.title === "Recommended") {
      return menuItem.card.card.itemCards;
    }
  }
  return [];
}

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(GET_MENU + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  if (resInfo === null) return <Shimmer />;

  const { name, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
  const menu =
    resInfo?.cards[resInfo?.cards.length - 1]?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards;
  console.log(resInfo?.cards);
  const recommendedItems = getRecommendedItems(menu);

  return (
    <div className="menu">
      <h1>{name}</h1>
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <h2>Recomanded Menu</h2>

      <ul>
        {recommendedItems.map((menuItem) => {
          const { id, name, defaultPrice, price } = menuItem?.card?.info;
          return (
            <li key={id}>
              {name} - ₹{defaultPrice / 100 || price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
