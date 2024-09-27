import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import CreateDocument from "../components/createDocument";

test("renders form with title and content fields", () => {
  render(
    <MemoryRouter>
      <CreateDocument />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Innehåll/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Skapa/i })).toBeInTheDocument();
});

test("updates title and content on input change", () => {
  render(
    <MemoryRouter>
      <CreateDocument />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText(/Title/i);
  const contentTextarea = screen.getByLabelText(/Innehåll/i);

  fireEvent.change(titleInput, { target: { value: "New Document Title" } });
  fireEvent.change(contentTextarea, {
    target: { value: "Document content goes here..." },
  });

  expect(titleInput.value).toBe("New Document Title");
  expect(contentTextarea.value).toBe("Document content goes here...");
});
