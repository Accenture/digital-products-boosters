import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import classNames from "./class-names.module.css";

const text = {
  created: "Created on: ",
  star: "Star ",
  unstar: "Unstar "
};

export const MUTATION_ADD_STAR_TO_REPOSITORY = gql`
  mutation addStarToRepository($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const MUTATION_REMOVE_STAR_FROM_REPOSITORY = gql`
  mutation removeStarFromRepository($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

// YOU SHOULD NOT NEED TO UPDATE THIS COMPONENT
const StarBase = ({ classNameSvg, label, onClick }) => (
  <button aria-label={label} className={classNames.button} onClick={onClick}>
    <svg className={classNameSvg} viewBox="0 0 210 210">
      <title>{label}</title>
      <polygon
        className={classNameSvg}
        points="105,10 45,198 195,78 15,78 165,198"
      />
    </svg>
  </button>
);

const StarButton = ({ id, name, viewerHasStarred }) => {
  const label = (viewerHasStarred ? text.unstar : text.star) + name;
  const classNameSvg = viewerHasStarred
    ? classNames.svgStarred
    : classNames.svgNotStarred;

  const [addStar] = useMutation(MUTATION_ADD_STAR_TO_REPOSITORY, {
    variables: { id }
  });
  const [removeStar] = useMutation(MUTATION_REMOVE_STAR_FROM_REPOSITORY, {
    variables: { id }
  });
  const onClick = viewerHasStarred ? removeStar : addStar;

  const baseProps = { classNameSvg, label, onClick };
  return <StarBase {...baseProps} />;
};

export default StarButton;
