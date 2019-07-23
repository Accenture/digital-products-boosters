import React from "react";
import NewsText from "../news-text";
import NewsImage from "../news-image";
import NewsVideo from "../news-video";

const NewsItem = ({ typename, ...props }) => {
  switch (typename) {
    case "NewsText":
      return <NewsText {...props} />;
    case "NewsImage":
      return <NewsImage {...props} />;
    case "NewsVideo":
      return <NewsVideo {...props} />;
    default:
      return null;
  }
};

export default NewsItem;
