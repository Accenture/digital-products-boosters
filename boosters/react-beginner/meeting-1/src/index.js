import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import Comment from "./components/comment";
import CommentsSection from "./components/comments-section";
import NewsImage from "./components/news-image";
import NewsItem from "./components/news-item";
import NewsText from "./components/news-text";
import NewsVideo from "./components/news-video";
import data from "./data.json";
import "./index.css";

const Exercises = () => (
  <div>
    <h1>Exercises</h1>
    <div>
      <h2>Comment Component</h2>
      <Comment
        text="I love this pupper"
        user={{ firstName: "John", lastName: "PupperLover" }}
      />
    </div>
    <div>
      <h2>CommentSection Component</h2>
      <CommentsSection
        comments={[
          {
            id: "1",
            text: "first comment",
            user: { firstName: "John", lastName: "PupperLover" }
          },
          {
            id: "2",
            text: "second comment",
            user: { firstName: "Jane", lastName: "DoggoLover" }
          }
        ]}
      />
    </div>
    <div>
      <h2>NewsText Component</h2>
      <NewsText
        comments={[
          {
            id: "1",
            text: "first comment",
            user: { firstName: "John", lastName: "PupperLover" }
          },
          {
            id: "2",
            text: "second comment",
            user: { firstName: "Jane", lastName: "DoggoLover" }
          }
        ]}
        text="Doggo rated 20 out of 10!"
      />
    </div>
    <div>
      <h2>NewsImage Component</h2>
      <NewsImage
        comments={[
          {
            id: "1",
            text: "first comment",
            user: { firstName: "John", lastName: "PupperLover" }
          },
          {
            id: "2",
            text: "second comment",
            user: { firstName: "Jane", lastName: "DoggoLover" }
          }
        ]}
        imageUrl="https://live.staticflickr.com/371/31905345324_d5dd230dfa_b.jpg"
        title="Doggo rated 20 out of 10!"
      />
    </div>
    <div>
      <h2>NewsVideo Component</h2>
      <NewsVideo
        comments={[
          {
            id: "1",
            text: "first comment",
            user: { firstName: "John", lastName: "PupperLover" }
          },
          {
            id: "2",
            text: "second comment",
            user: { firstName: "Jane", lastName: "DoggoLover" }
          }
        ]}
        videoUrl="https://www.youtube.com/embed/8sUOvDzmrks"
        title="Cutest pupper!"
      />
    </div>
    <div>
      <h2>NewsItem Component</h2>
      <NewsItem
        comments={[
          {
            id: "1",
            text: "first comment",
            user: { firstName: "John", lastName: "PupperLover" }
          },
          {
            id: "2",
            text: "second comment",
            user: { firstName: "Jane", lastName: "DoggoLover" }
          }
        ]}
        text="Doggo rated 20 out of 10!"
        typename="NewsText"
      />
      <NewsItem
        comments={[]}
        imageUrl="https://live.staticflickr.com/371/31905345324_d5dd230dfa_b.jpg"
        title="Cutest pupper image!"
        typename="NewsImage"
      />
      <NewsItem
        comments={[
          {
            id: "1",
            text: "first comment",
            user: { firstName: "John", lastName: "PupperLover" }
          }
        ]}
        videoUrl="https://www.youtube.com/embed/8sUOvDzmrks"
        title="Cutest pupper video!"
        typename="NewsVideo"
      />
    </div>
    <div>
      <h2>App Component</h2>
      <App newsItems={data.newsItems} />
    </div>
  </div>
);

ReactDOM.render(<Exercises />, document.getElementById("root"));
