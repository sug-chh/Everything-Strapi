"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
// Life Cycle
module.exports = {
  lifecycles: {
    async afterDelete(result, params) {
      console.log("afterDelete result", result);
      console.log("afterDelete result", params);
      // Delete the related image

      try {
        // Retrieve the file
        const file = await strapi.plugins["upload"].services.upload.fetch({
          // name of the image field and in this case its picture
          id: result.picture.id,
        });
        // Delete the file
        await strapi.plugins["upload"].services.upload.remove(file);
      } catch (err) {
        // Delete the file
        console.log(err);
      }
    },
  },
};
