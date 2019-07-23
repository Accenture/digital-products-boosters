export const text = {
  comments: "Comments",
  noComments: "No comments at this time"
};

export const makeTextComments = ({ comments }) =>
  comments.length ? text.comments : text.noComments;
