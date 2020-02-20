import BikeImage from "./components/bike_image/bike_image.vue";
import BikeViewer from "./components/bike_viewer/bike_viewer.vue";
import Comment from "./components/comment/comment.vue";
import CommentsSection from "./components/comments_section/comments_section.vue";
import Counter from "./components/counter/counter.vue";
import Inventory from "./components/inventory/inventory.vue";

import {
  decrementInventory,
  getBike,
  incrementInventory
} from "./utils/inventory";

import bikesData from "./data";

export default {
  name: "app",
  data() {
    return {
      bikes: bikesData,
      renderDemo: false
    };
  },
  computed: {
    bikeImages() {
      return this.bikes.map(({ bikeImage }) => bikeImage);
    },
    buttonColor() {
      return this.renderDemo ? "red" : "green";
    },
    buttonText() {
      return this.renderDemo ? "Hide" : "Render";
    },
    demoBike() {
      return this.bikes[0];
    }
  },
  methods: {
    decrementInventory,
    getBike,
    incrementInventory
  },
  mounted() {
    this.bikes.forEach(bike => {
      bike.decrement = this.decrementInventory(bike.id);
      bike.increment = this.incrementInventory(bike.id);
    });
  },
  components: {
    BikeImage,
    BikeViewer,
    Comment,
    CommentsSection,
    Counter,
    Inventory
  }
};
