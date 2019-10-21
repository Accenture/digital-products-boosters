import { QUERY_GET_CURRENT_USER_LOGIN } from "../components/greeting";
import { QUERY_GET_VIEWER_REPOSITORIES } from "../components/repositories/index.jsx";
import {
  MUTATION_ADD_STAR_TO_REPOSITORY,
  MUTATION_REMOVE_STAR_FROM_REPOSITORY
} from "../components/star-button/index.jsx";
import { QUERY_GET_USER_REPOSITORIES } from "../components/user-section/index.jsx";

export const timeout = 100;

export const greetingMocks = [
  {
    request: {
      query: QUERY_GET_CURRENT_USER_LOGIN
    },
    result: {
      data: {
        viewer: {
          id: "MDQ6VXNlcjk2NzgxODI=",
          login: "davidrf",
          __typename: "User"
        }
      }
    }
  }
];

export const repositoriesMocks = [
  {
    request: {
      query: QUERY_GET_VIEWER_REPOSITORIES
    },
    result: {
      data: {
        viewer: {
          id: "MDQ6VXNlcjk2NzgxODI=",
          repositories: {
            nodes: [
              {
                createdAt: "2019-06-25T04:48:11Z",
                id: "MDEwOlJlcG9zaXRvcnkxOTM2MzY0MDA=",
                name: "apprentice-a11y-web-workshop",
                url: "https://github.com/davidrf/apprentice-a11y-web-workshop",
                viewerHasStarred: false,
                __typename: "Repository"
              },
              {
                createdAt: "2019-05-02T15:55:47Z",
                id: "MDEwOlJlcG9zaXRvcnkxODQ2MTAwNjA=",
                name: "elasticsearch-rails",
                url: "https://github.com/davidrf/elasticsearch-rails",
                viewerHasStarred: true,
                __typename: "Repository"
              },
              {
                createdAt: "2019-03-16T17:45:18Z",
                id: "MDEwOlJlcG9zaXRvcnkxNzYwMDQ3Mzk=",
                name: "apollo-client",
                url: "https://github.com/davidrf/apollo-client",
                viewerHasStarred: true,
                __typename: "Repository"
              }
            ],
            __typename: "RepositoryConnection"
          },
          __typename: "User"
        }
      }
    }
  },
  {
    request: {
      query: MUTATION_REMOVE_STAR_FROM_REPOSITORY,
      variables: { id: "MDEwOlJlcG9zaXRvcnkxOTM2MzY0MDA=" }
    },
    result: {
      data: {
        removeStar: {
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkxOTM2MzY0MDA=",
            viewerHasStarred: false,
            __typename: "Repository"
          },
          __typename: "RemoveStarPayload"
        }
      }
    }
  },
  {
    request: {
      query: MUTATION_ADD_STAR_TO_REPOSITORY,
      variables: { id: "MDEwOlJlcG9zaXRvcnkxOTM2MzY0MDA=" }
    },
    result: {
      data: {
        addStar: {
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkxOTM2MzY0MDA=",
            viewerHasStarred: true,
            __typename: "Repository"
          },
          __typename: "RemoveStarPayload"
        }
      }
    }
  }
];

export const userRepositoriesMocks = [
  {
    request: {
      query: QUERY_GET_USER_REPOSITORIES,
      variables: { login: "peggyrayzis" }
    },
    result: {
      data: {
        user: {
          id: "MDQ6VXNlcjE4MDE3MDY3",
          login: "peggyrayzis",
          repositories: {
            nodes: [
              {
                createdAt: "2019-10-17T19:44:03Z",
                id: "MDEwOlJlcG9zaXRvcnkyMTU4NzI5MDQ=",
                name: "graphql-landscape",
                url: "https://github.com/peggyrayzis/graphql-landscape",
                viewerHasStarred: false,
                __typename: "Repository"
              },
              {
                createdAt: "2019-04-12T10:42:19Z",
                id: "MDEwOlJlcG9zaXRvcnkxODA5ODgxMzg=",
                name: "the-graphql-dx",
                url: "https://github.com/peggyrayzis/the-graphql-dx",
                viewerHasStarred: false,
                __typename: "Repository"
              },
              {
                createdAt: "2019-04-04T08:48:21Z",
                id: "MDEwOlJlcG9zaXRvcnkxNzk0NTg3ODg=",
                name: "redux-to-graphql",
                url: "https://github.com/peggyrayzis/redux-to-graphql",
                viewerHasStarred: false,
                __typename: "Repository"
              }
            ],
            __typename: "RepositoryConnection"
          },
          __typename: "User"
        }
      }
    }
  }
];
