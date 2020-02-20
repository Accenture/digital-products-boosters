import { shallowMount } from "@vue/test-utils";
import Comment from "@/components/comment/comment.vue";

describe("comment.vue", () => {
  const createWrapper = propsData => shallowMount(Comment, { propsData });
  let props;

  beforeEach(() => {
    const user = { firstName: "Johnny", lastName: "Clipins" };
    props = { text: "What a great bike!", user };
  })

  it("should render the text prop", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.text()).toMatch(props.text);
  });

  it("should render the name of the commenter", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.text()).toMatch("- Johnny Clipins");
  })
});
