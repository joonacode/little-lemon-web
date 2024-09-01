import { afterEach, describe, it, expect } from "vitest";
import { Button, ButtonProps } from ".";
import { cleanup, render } from "@/utils/utils-test";

const defaultValue: ButtonProps = {
  children: "Button",
};

const setup = (props: Partial<ButtonProps> = defaultValue) => {
  return render(<Button {...defaultValue} {...props} />);
};

describe("Component Button", () => {
  afterEach(() => {
    cleanup();
  });
  it("Should render without crash", () => {
    const { getByRole } = setup();
    expect(getByRole("button")).toBeDefined();
  });
});
