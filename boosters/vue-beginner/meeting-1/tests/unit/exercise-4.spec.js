import { mount } from "@vue/test-utils";
import Inventory from "@/components/inventory/inventory.vue";

describe("inventory.vue", () => {
  const createWrapper = propsData => mount(Inventory, { propsData });
  const props = {
    bike: {
      bikeImage: "https://placehold.it/",
      comments: [],
      decrement: jest.fn(),
      id: 1,
      increment: jest.fn(),
      name: "Bianchi Lupo",
      price: 1000,
      qty: 5
    }
  };

  it("renders the bike's price", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.text()).toMatch(`Price: $${props.bike.price}`);
  });

  it("renders the counter", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.find('.counter').exists()).toBe(true);
  });

  it("renders the total stock value", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.text()).toMatch(`Stock Value: $${props.bike.qty * props.bike.price}`);
  });
});
