import React from "react";
import { API_URL } from "../utils/api_url";

const formatImageUrl = (url) => `${API_URL}${url}`;

export const Post = ({ post }) => {
  const url = post.image && post.image.url;
  return (
    <div className="Post">
      <img width={500} height={500} src={formatImageUrl(url)} alt="" />
      <h4>{post.description}</h4>
      <div>
        <span>Likes: {post.likes}</span>
      </div>
    </div>
  );
};
