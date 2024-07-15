import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
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
            aggregatedDiscountInfoV3?.header +
              " " +
              aggregatedDiscountInfoV3?.subHeader}
        </div>
      </div>

      <div className="res-card-content">
        <h3>{name}</h3>
        <div className="rating">
          <i className="fa fa-star"></i> {avgRating} Stars
        </div>
        <div className="delivery-time">
          <i className="fa fa-clock-o"></i> {sla.slaString}
        </div>
        <div className="cuisine">
          <i className="fa fa-cutlery"></i> {cuisines.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
