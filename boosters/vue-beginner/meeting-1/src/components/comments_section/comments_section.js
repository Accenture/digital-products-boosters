import Comment from "../comment/comment.vue";

export default {
  name: "CommentsSection",
  props: {
    comments: Array
  },
  components: {
    Comment
  }
};
