import { decodeJWT } from "./jwt";

export const query = {
  addGraphql: async (title, content, code) => {
    const token = sessionStorage.getItem("token");
    const decodedToken = decodeJWT(token);
    const response = await fetch(
      `${sessionStorage.getItem("currentPath")}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation { addDocument(title: "${title}", content: "${content}", creator: "${decodedToken.username}", code: "${code}") { title } }`,
        }),
      }
    );

    return response;
  },
  updateGraphql: async (id, title, content) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${sessionStorage.getItem("currentPath")}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation { updateDocument(id: "${id}", title: "${title}", content: "${content}") { id } }`,
        }),
      }
    );

    return response;
  },
  getDocumentGraphql: async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${sessionStorage.getItem("currentPath")}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{ document(id: "${id}") { title, content } }`,
        }),
      }
    );

    return response;
  },
  getDocumentsGraphql: async () => {
    const token = sessionStorage.getItem("token");
    const decodedToken = decodeJWT(token);
    const response = await fetch(
      `${sessionStorage.getItem("currentPath")}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{ documents(creator: "${decodedToken.username}") { _id, title, content,code } }`,
        }),
      }
    );

    return response;
  },
};
