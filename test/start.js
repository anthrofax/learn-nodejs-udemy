import { expect } from "chai";
import { it } from "mocha";

it("Pertambahan 2 angka", () => {
  const num1 = 1;
  const num2 = 2;

  expect(num1 + num2).to.equal(3);
});

it("Pertambahan 2 angka selain 6", () => {
  const num1 = 1;
  const num2 = 2;

  expect(num1 + num2).not.to.equal(3);
});
