import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const [showCurrentItem, setShowCurrentItem] = useState(showItems);
  const handelClick = () => {
    setShowIndex();
    setShowCurrentItem(!showCurrentItem);
  };
  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-xl border-t-2 p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handelClick}
        >
          <span className="font-bold mb-4">
            {data.title} ({data.itemCards.length})
          </span>
          <span>
            <i
              className={
                showItems && showCurrentItem
                  ? "fa fa-arrow-up"
                  : "fa fa-arrow-down"
              }
            ></i>
          </span>
        </div>
        {showItems && showCurrentItem && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
