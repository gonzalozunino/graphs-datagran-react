import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
