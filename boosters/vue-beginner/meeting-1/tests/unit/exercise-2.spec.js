import { mount } from "@vue/test-utils";
import BikeImage from "@/components/bike_image/bike_image.vue";

describe("bike_image.vue", () => {
  const createWrapper = propsData => mount(BikeImage, { propsData });
  let props;

  beforeEach(() => {
    const comments = [
      {
        id: 3,
        user: { firstName: "Mirza", lastName: "Spokesman" },
        text: "Beautiful ride"
      },
      {
        id: 4,
        user: { firstName: "Dorian", lastName: "Crossbar" },
        text: "Bikealicious!"
      }
    ];
    props = {
      comments,
      imageUrl: "https://placehold.it/",
      name: 'Bikey'
    };
  })

  it("should render the bike image from imageUrl", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.find('img').attributes().src).toBe(props.imageUrl);
  });

  it("should render the bike name", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.text()).toMatch(props.name);
  });

  it("should render the comments section", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.find('.comments_section').exists()).toBe(true);
  });
});
