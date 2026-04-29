import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import App from "./App";

describe("App component tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders App component without crashing", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("renders header component", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders logo with correct text", () => {
    render(<App />);
    expect(screen.getByText("Dmitry.Pishchalka")).toBeInTheDocument();
  });

  test("renders social media links", () => {
    render(<App />);
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Mail")).toBeInTheDocument();
    expect(screen.getByText("Telegram")).toBeInTheDocument();
  });
});
