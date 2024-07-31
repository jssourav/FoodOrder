import { CDN_URL, GET_MENU } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "./useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

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

  const { name, cloudinaryImageId, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const menu =
    resInfo?.cards[resInfo?.cards.length - 1]?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards;

  const recommendedItems = getRecommendedItems(menu);

  const categories = menu.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  // console.log(categories);

  return (
    <div>
      <h1 className="font-bold my-5 text-2xl text-center">{name}</h1>
      <p className="font-bold text-lg text-center">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* <RestaurantCategory /> */}
      {categories.map((category) => (
        <RestaurantCategory data={category?.card?.card} />
      ))}
    </div>
  );
};

export default RestaurantMenu;
