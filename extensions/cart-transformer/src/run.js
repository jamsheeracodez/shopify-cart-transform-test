// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const operations = input.cart.lines.reduce(
      /** @param {CartOperation[]} acc */
      (acc, cartLine) => {
       const {id:cartLineId,merchandise} = cartLine;

        let operation =   {
          cartLineId,
          title: merchandise.product?.title || merchandise.title,
          // Optionally override the image for line item
          // image: { url: "https://cdn.shopify.com/.../something.png" },
          expandedCartItems: [
            {
              merchandiseId: merchandise.id,
              quantity: 1,
              price: {
                adjustment: {
                  fixedPricePerUnit: {
                    amount: 500 // Price with addon
                  },
                },
              },
            },
          ],
        };

          return [...acc, { expand: operation }];

      },
      []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};