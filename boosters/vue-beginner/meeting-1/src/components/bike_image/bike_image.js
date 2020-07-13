import CommentsSection from "../comments_section/comments_section.vue";

export default {
  name: "BikeImage",
  props: {
    comments: Array,
    imageUrl: String,
    name: String
  },
  components: {
    CommentsSection
  }
};
