import { mount } from "@vue/test-utils";
import CommentsSection from "@/components/comments_section/comments_section.vue";

describe("comment_section.vue", () => {
  const createWrapper = propsData => mount(CommentsSection, { propsData });
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
    props = { comments };
  })

  it("should render all comments if there are comments", () => {
    const wrapper = createWrapper(props);
    expect(wrapper.findAll('.comment').length).toBe(2);
    props.comments.forEach(
      comment => expect(wrapper.text()).toMatch(comment.text)
    );
  });

  it("should render 'No comments' if empty comments", () => {
    const wrapper = createWrapper({ comments: [] });
    expect(wrapper.text()).toMatch("No comments");
  });

  it("should render 'No comments' if comments aren't provided", () => {
    const wrapper = createWrapper({});
    expect(wrapper.text()).toMatch("No comments");
  });
});
