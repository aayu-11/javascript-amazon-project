import { formatCurrency } from "../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("converts 1000 to $10.00", () => {
    expect(formatCurrency(1000)).toEqual("$10.00");
  });
  it("converts 0 to $0.00", () => {
    expect(formatCurrency(0)).toEqual("$0.00");
  });
  it("converts 2000.5 to $20.01", () => {
    expect(formatCurrency(2000.5)).toEqual("$20.01");
  });
  it("converts 2000.4 to $20.00", () => {
    expect(formatCurrency(2000.4)).toEqual("$20.00");
  });
  it("object equality check", () => {
    let obj1 = { a: 1, b: 2 };
    let obj2 = { a: 1, b: 2 };
    expect(obj1).toEqual(obj2);
    // This will fail because obj1 and obj2 are different objects in memory
    // expect(obj1).toBe(obj2);
    expect(obj1).not.toBe(obj2);
  });
});
