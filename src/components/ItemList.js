import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.card?.info?.id}
          className="flex flex-col md:flex-row border-t-2 p-4 justify-between"
        >
          <div className="md:mr-4">
            <h2 className="text-2xl my-2 flex">{item.card?.info?.name}</h2>
            <div className="text-xl text-gray-700 my-2">
              ₹
              {item.card?.info?.price
                ? item.card?.info?.price / 100
                : item.card?.info?.defaultPrice / 100}
            </div>
            <div className="flex items-center text-sm text-green-600">
              {item.card?.info?.ratings?.aggregatedRating?.rating && (
                <>
                  <span className="mr-1">
                    ★ {item.card?.info?.ratings?.aggregatedRating?.rating}
                  </span>
                  <span>
                    ({item.card?.info?.ratings?.aggregatedRating?.ratingCountV2}
                    )
                  </span>
                </>
              )}
            </div>
            {item.card?.info?.description && (
              <div className="mt-2 text-gray-600">
                {item.card?.info?.description?.substring(0, 150)}...
              </div>
            )}
          </div>
          <div className="flex flex-col items-center ml-16">
            <img
              className="max-w-40 min-h-40 rounded"
              src={
                item.card?.info?.imageId
                  ? CDN_URL + item.card?.info?.imageId
                  : "https://www.tiffincurry.ca/wp-content/uploads/2021/02/default-product.png"
              }
              alt={item.card?.info?.name}
            />
            <button className="mt-[138px] bg-green-500 text-white px-4 py-2 rounded absolute ">
              ADD
            </button>
            <span className="text-sm text-gray-500 mt-6">Customisable</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
