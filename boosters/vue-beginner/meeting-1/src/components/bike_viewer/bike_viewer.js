import BikeImage from "../bike_image/bike_image.vue";
import Inventory from "../inventory/inventory.vue";

export default {
  name: "BikeViewer",
  data() {
    return {
      bikeIndex: 0
    };
  },
  props: {
    bikes: Array
  },
  computed: {
    activeBike() {
      return this.bikes[this.bikeIndex];
    }
  },
  methods: {
    nextSlide() {
      if (this.bikeIndex !== this.bikes.length - 1) {
        this.bikeIndex += 1;
      }
    },
    previousSlide() {
      if (this.bikeIndex !== 0) {
        this.bikeIndex -= 1;
      }
    }
  },
  components: {
    BikeImage,
    Inventory
  }
};
