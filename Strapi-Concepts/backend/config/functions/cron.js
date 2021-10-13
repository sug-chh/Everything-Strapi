"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  // every second
  // "* * * * * *": async () => {
  //   console.log("Every second!");
  // },
  // every midnight
  // "0 0 0 * * *": async () => {
  //   console.log("Once at midnight");
  // },
  // once every hour
  // "0 0 * * * *": async () => {
  //   console.log("Once at midnight");
  // },
  // Cron Job to Send a mail to every user every second. This cron job works for a collection type of post with an author and likes property
  // "* * * * * *": async () => {
  //   console.log("Once a day, at midnight");
  //   const users = await strapi.plugins[
  //     "users-permissions"
  //   ].services.user.fetchAll({});
  //   const res = await Promise.all(
  //     users.map(async (user) => {
  //       // Retrieve all posts created by the user
  //       const posts = await strapi.services.post.find({ author: user.id });
  //       console.log("posts.length", posts.length);
  //       const total = posts.reduce((acc, post) => acc + post.likes, 0);
  //       await strapi.plugins["email"].services.email.send({
  //         to: user.email,
  //         from: "Strapitest@localhost.com",
  //         subject: "Your likes total",
  //         text: `You got ${total} likes!`,
  //       });
  //     })
  //   );
  // },
  // Send Email every second to only one user.
  // "* * * * * *": async () => {
  //   console.log("Cron every second!");
  //   try {
  //     await strapi.plugins["email"].services.email.send({
  //       // email address generated from 10minutemail
  //       to: "xjdhlrsrwsqsrbxsjo@mrvpm.net",
  //       from: "xjdhlrsrwsqsrbxsjo@mrvpm.net",
  //       subject: "Use strapi email provider successfully",
  //       text: "Hello world!, I am gonna improve you!",
  //       html: "<h1>Hello world!</h1>",
  //     });
  //   } catch (e) {
  //     console.log("Exception in sending err", err[0].message);
  //   }
  // },
  // Another cron jobs for strapi components // Its a fucking shit worst code in my entire life
  // "* * * * * *": async () => {
  //   const firstArticle = await strapi.services.post.findOne({ id: 1 });
  //   console.log(firstArticle);
  //   const secondArticle = await strapi.services.post.findOne({ id: 2 });
  //   console.log(secondArticle);
  //   firstArticle.viewsPerCategory.push({
  //     contentcategory: 3,
  //     numberOfViews: 1337,
  //   });
  //   const index = 1;
  //   const targeting2ndViewsPerCategory = firstArticle;
  //   targeting2ndViewsPerCategory.viewsPerCategory[index].numberOfViews = 42;
  //   const update = await strapi.services.post.update(
  //     { id: 1 },
  //     targeting2ndViewsPerCategory
  //   );
  //   console.log(update);
  // },
};
