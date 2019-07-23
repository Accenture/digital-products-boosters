import React from "react";
import NewsItem from "../news-item";
import classNames from "./class-names.module.css";

export const text = {
  news: "News"
};

const App = ({ newsItems }) => (
  <div className={classNames.root}>
    <header className={classNames.header}>
      <h1>{text.news}</h1>
    </header>
    <main className={classNames.main}>
      {newsItems.map(newsItem => (
        <NewsItem {...newsItem} key={newsItem.id} />
      ))}
    </main>
  </div>
);

export default App;
