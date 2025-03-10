import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;

  const user = useContext(UserContext);

  const {
    cloudinaryImageId,
    avgRating,
    name,
    aggregatedDiscountInfoV3,
    cuisines,
    sla,
  } = resData?.info;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <div className="offer-container">
        <div className="offer">
          {aggregatedDiscountInfoV3 &&
            `${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader}`}
        </div>
      </div>

      <div className="res-card-content">
        <h3 className="font-bold">{name}</h3>
        <div className="rating">
          <i className="fa fa-star"></i> {avgRating} Stars
        </div>
        <div className="delivery-time">
          <i className="fa fa-clock-o"></i> {sla.slaString}
        </div>
        <div className="cuisine">
          <i className="fa fa-cutlery"></i> {cuisines.join(", ")}
        </div>
        <p>{user.loggedinUser}</p>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <>
        <label className="absolute bg-black text-white m-3 p-2 rounded-lg z-10">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </>
    );
  };
};

export default RestaurantCard;
