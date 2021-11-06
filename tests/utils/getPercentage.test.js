import getPercentage from "../../src/utils/getPercentage";

describe("getPercentage", () => {
  it("should get the percentage the given numbers", () => {
    const output = getPercentage(10, 100);
    expect(output).toBe(10);
  });
});
