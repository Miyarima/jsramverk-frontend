export const code = {
  execute: async (value) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${sessionStorage.getItem("currentPath")}/users/codemode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          code: value,
        }),
      }
    );

    return response;
  },
  getContent: async (id) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${sessionStorage.getItem("currentPath")}/users/codemode/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
      }
    );

    return response;
  },
  updateContent: async (id, value) => {
    const token = sessionStorage.getItem("token");
    await fetch(
      `${sessionStorage.getItem("currentPath")}/users/codemode/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          code: value,
        }),
      }
    );
  },
};
