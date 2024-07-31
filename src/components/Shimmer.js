import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(28)
        .fill("")
        .map((e, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-card-image"></div>
            <div className="shimmer-card-content">
              <div className="shimmer-card-title"></div>
              <div className="shimmer-card-subtitle"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
