import { mount, shallowMount } from "@vue/test-utils";
import BikeViewer from "@/components/bike_viewer/bike_viewer.vue";

describe("bike_viewer.vue", () => {
  const createWrapper = propsData => mount(BikeViewer, { propsData });
  const createShallowWrapper = propsData => shallowMount(BikeViewer, { propsData });
  const props = {
    bikes: [
      {
        comments: [
          {
            id: 1,
            user: { firstName: "Johnny", lastName: "Clipins" },
            text: "What a great bike!"
          },
          {
            id: 2,
            user: { firstName: "Esther", lastName: "Sprocket" },
            text: "That bike is totally tubular!"
          },
          {
            id: 7,
            user: { firstName: "Ezra", lastName: "Handbreak" },
            text: "How do I love thee Bianchi? Let me count the ways..."
          }
        ],
        id: 1,
        name: "Bianchi Lupo",
        price: 1000,
        qty: 5
      },
      {
        comments: [
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
        ],
        id: 2,
        name: "Ridley X-Trail",
        price: 1300,
        qty: 3
      }
    ]
  };

  it("initializes with a bikeIndex data value of 0", () => {
    expect(BikeViewer.data().bikeIndex).toBe(0);
  });

  it("contains a computed activeBike that returns the index from bikes corresponding to bikeIndex", () => {
    expect(BikeViewer.computed.activeBike.call({ bikeIndex: 0, ...props }).id).toBe(props.bikes[0].id);
  });

  it("renders a BikeImage component with activeBike's comments, image, and name", () => {
    const wrapper = createWrapper(props);
    const bikeImageComponent = wrapper.find('.bike_image');
    const bike = props.bikes[0];
    expect(bikeImageComponent.exists()).toBe(true);
    expect(bikeImageComponent.props().comments.map(({ id }) => id)).toEqual(
      expect.arrayContaining(bike.comments.map(({ id }) => id))
    );
    expect(bikeImageComponent.props().imageUrl).toBe(bike.imageUrl);
    expect(bikeImageComponent.props().name).toBe(bike.name);
  });

  it("renders an Inventory component for activeBike", () => {
    const wrapper = createWrapper(props);
    const inventoryComponent = wrapper.find('.inventory');
    expect(inventoryComponent.exists()).toBe(true);
    expect(inventoryComponent.props().bike.id).toBe(props.bikes[0].id);
  });

  describe("methods", () => {
    describe("nextSlide", () => {
      it("increments bikeIndex if there is bike with a higher index in bikes", () => {
        const wrapper = createShallowWrapper(props);
        wrapper.vm.nextSlide();
        expect(wrapper.vm.$data.bikeIndex).toBe(1);
      });

      it("does not increment bikeIndex if it is already the max index", () => {
        const wrapper = createShallowWrapper(props);
        wrapper.vm.nextSlide();
        wrapper.vm.nextSlide();
        expect(wrapper.vm.$data.bikeIndex).toBe(1);
      });
    });

    describe("previousSlide", () => {
      it("decrements the bikeIndex if the it is not 0", () => {
        const wrapper = createShallowWrapper(props);
        wrapper.vm.$data.bikeIndex = 1;
        wrapper.vm.previousSlide();
        expect(wrapper.vm.$data.bikeIndex).toBe(0);
      });

      it("does not decrement the bikeIndex if it is 0", () => {
        const wrapper = createShallowWrapper(props);
        wrapper.vm.previousSlide();
        expect(wrapper.vm.$data.bikeIndex).toBe(0);
      });
    });
  });

  describe("navigation buttons", () => {
    it("renders a '.next' button that calls nextSlide when clicked", () => {
      const wrapper = createWrapper(props);
      wrapper.vm.nextSlide = jest.fn();
      wrapper.find('.next').trigger('click');
      expect(wrapper.vm.nextSlide).toHaveBeenCalled();
    });
    it("renders a '.previous' button that calls nextSlide when clicked", () => {
      const wrapper = createWrapper(props);
      wrapper.vm.previousSlide = jest.fn();
      wrapper.find('.previous').trigger('click');
      expect(wrapper.vm.previousSlide).toHaveBeenCalled();
    });
  })
});
