"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  send: async (ctx) => {
    console.log("Email.send", ctx);
    const { to, subject, html, from } = ctx.request.body;
    return await strapi.services.email.sendEmail(to, subject, html, from);
  },
};
