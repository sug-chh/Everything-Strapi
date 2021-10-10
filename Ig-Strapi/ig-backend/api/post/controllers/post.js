const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    // This if only works when any file is sent to the server
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      // I guess this works only with FormData()
      //   if (!data.description) {
      //     ctx.throw(400, "Plese add some content");
      //   }
      //   if (!files) {
      //     ctx.throw(400, "You must submit atleast a file");
      //   }

      entity = await strapi.services.post.create(
        {
          ...data,
          ...{
            likes: 0,
            // This doesn't work even logically the auth token is sent in the headers which is sent with the body in the request. So here ctx.state.user is basically null!
            // Now I got it, it simply doesn't work as it is checking for mulipart data i.e; if images or other files are attached to it
            author: ctx.state.user,
          },
        },
        { files }
      );
    } else {
      entity = await strapi.services.post.create({
        ...ctx.request.body,
        likes: 0,
        // This piece of shit is working mf
        author: ctx.state.user,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    let entity;
    if (ctx.is("multipart")) {
      // This part is basically checking if only json requests are sent and no files are sent!
      ctx.throw(
        400,
        "Please only make json request with only an updated description!"
      );
    } else {
      // Its gonna execute when I haven't sent any files
      // delete likes if any like field data is sent from the frontend
      // Its prevents any form of abuse if one tries to update the no of likes from the frontend by sending a put request with the like field on it
      delete ctx.request.body.likes;
      // It also has another filter attached to it. That is it checks if the author attached to the post === user logged in the frontend.
      // Details: It decodes the  jwt and gets the id of the user and from there queries the database to get the user by the id, In this case it probably checks if the author object matches with the user object or not! Something like that
      entity = await strapi.services.post.update(
        { id, author: user.id },
        ctx.request.body
      );
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const entity = await strapi.services.post.delete({ id, author: user.id });
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
