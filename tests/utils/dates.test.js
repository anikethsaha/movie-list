import { normalizeDate } from "../../src/utils/dates";

describe("normalizeDate", () => {
  it("should normalize the given date", () => {
    const output = normalizeDate("29 Oct, 2020");
    expect(output).toBe(`Oct 2020`);
  });
});
