import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Main from "../components/main";
import AllDocuments from "../components/documents";

jest.mock("../components/documents");

test("renders title and create document link", () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

  expect(screen.getByText(/Dokument/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Create Document/i })
  ).toBeInTheDocument();
});
