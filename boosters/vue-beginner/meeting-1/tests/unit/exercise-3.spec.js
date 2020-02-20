import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/counter/counter.vue";

describe("counter.vue", () => {
  const createWrapper = propsData => shallowMount(Counter, { propsData });
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

  it("renders the bike quantity", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.text()).toMatch(String(props.bike.qty));
  });

  it("calls the bike's decrement function when the '-' button is clicked", () => {
    const wrapper = createWrapper(props);
    const decrementer = wrapper.find('.decrementer');
    decrementer.trigger('click');
    expect(props.bike.decrement).toBeCalled();
  });

  it("calls the bike's increment function when the '+' button is clicked", () => {
    const wrapper = createWrapper(props);
    const incrementer = wrapper.find('.incrementer');
    incrementer.trigger('click');
    expect(props.bike.increment).toBeCalled();
  })
});
