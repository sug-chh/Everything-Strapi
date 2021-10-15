import React from "react";

function PortfolioItem({ post }) {
  return (
    <div
      style={{ backgroundColor: `${post.backgroundColor}`, padding: "40px" }}
    >
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  );
}

export default PortfolioItem;
