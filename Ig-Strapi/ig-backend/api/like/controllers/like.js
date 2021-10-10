"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    const { user } = ctx.state;
    const { post } = ctx.request.body;

    if (typeof post !== "number") {
      ctx.throw(400, "Please only pass the id for the post");
    }

    const realPost = await strapi.services.post.findOne({ id: post });

    if (!realPost) {
      ctx.throw(400, "This post doesn't exist!");
    }

    const found = await strapi.services.like.findOne({
      user: user.id,
      post: post,
    });

    if (found) {
      ctx.throw(400, "You already liked this post!");
    }

    if (ctx.is("multipart")) {
      ctx.throw(400, "Only make JSON requests");
    } else {
      entity = await strapi.services.like.create({
        post: post,
        user: user,
      });
    }
    // Update the likes counter
    const { likes } = realPost;
    const updatedPost = await strapi.services.post.update(
      {
        id: post,
      },
      {
        likes: likes + 1,
      }
    );
    return sanitizeEntity(entity, { model: strapi.models.like });
  },
  async delete(ctx) {
    const { user } = ctx.state;
    const { postId } = ctx.params;
    // post id from the params is a string need to convert it into a number
    const post = parseInt(postId);
    if (typeof post !== "number") {
      ctx.throw(400, "Please only use the id of the post!");
    }

    const entity = await strapi.services.like.delete({
      post: post,
      user: user.id,
    });
    if (entity.length) {
      const { likes } = entity[0].post;
      const updatedPost = await strapi.services.post.update(
        {
          id: post,
        },
        {
          likes: likes - 1,
        }
      );
      return sanitizeEntity(entity[0], { model: strapi.models.like });
    }
  },
};
