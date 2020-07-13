import BikeImage from "../bike_image/bike_image.vue";
import Inventory from "../inventory/inventory.vue";

export default {
  name: "BikeViewer",
  data() {
    return {};
  },
  props: {
    bikes: Array
  },
  computed: {},
  methods: {
    nextSlide() {},
    previousSlide() {}
  },
  components: {
    BikeImage,
    Inventory
  }
};
