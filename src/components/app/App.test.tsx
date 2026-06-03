import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {ThemeProvider} from "../../providers/theme-provider";
import App from "./App";

describe("App component tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders App component without crashing", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("renders header component", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders logo with correct text", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByText("Dmitry.Pishchalka")).toBeInTheDocument();
  });

  test("renders language switcher", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByText("ru")).toBeInTheDocument();
    expect(screen.getByText("en")).toBeInTheDocument();
  });
});
