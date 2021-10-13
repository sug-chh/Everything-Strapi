"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

// Creating a sendmail service
module.exports = {
  sendEmail: async (to, subject, html, from) => {
    strapi.log.info("services.email.sendEmail Sending email");
    await strapi.plugins["email"].services.email.send({
      to: to,
      from: from,
      subject: subject,
      html: html,
    });
    strapi.log.info("services.email.sendEmail Email sent");
    return {
      message: "Email sent!",
    };
  },
};
