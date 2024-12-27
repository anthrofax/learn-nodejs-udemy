import { expect } from "chai";
import { it } from "mocha";

import authMiddleware from "../middleware/is-auth";

it("should throw an error if no authorization header is present", function () {
  const req = {
    get: function (headerName) {
      return null;
    },
  };

  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    "Not authenticated."
  );
});
