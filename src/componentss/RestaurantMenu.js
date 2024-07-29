import { CDN_URL, GET_MENU } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "./useRestaurantMenu";

function getRecommendedItems(menu) {
  for (const menuItem of menu) {
    if (menuItem.card.card.title === "Recommended") {
      return menuItem.card.card.itemCards;
    }
  }
  return [];
}

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const { name, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
  const menu =
    resInfo?.cards[resInfo?.cards.length - 1]?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards;
  console.log(resInfo?.cards);
  const recommendedItems = getRecommendedItems(menu);

  return (
    <div className="grid lg:grid-cols-2 m-4">
      <div>
        <h1 className="font-bold mb-4 text-2xl">{name}</h1>
        <img
          className="w-3/4 shadow-md"
          src={CDN_URL + cloudinaryImageId}
          alt="res-logo"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl">Recomanded Menu</h2>
        <ul className="mt-2">
          {recommendedItems.map((menuItem) => {
            const { id, name, defaultPrice, price } = menuItem?.card?.info;
            return (
              <li key={id} className="py-2">
                <span className="font-semibold">{name}</span> -{" "}
                <span className="text-pink-500">
                  ₹{defaultPrice / 100 || price / 100}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
