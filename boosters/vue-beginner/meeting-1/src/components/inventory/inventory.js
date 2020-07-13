import Counter from "../counter/counter.vue";

export default {
  name: "Inventory",
  props: {
    bike: Object,
    decrement: Function,
    increment: Function
  },
  computed: {
    stockValue() {
      return this.bike.qty * this.bike.price;
    }
  },
  components: {
    Counter
  }
};
