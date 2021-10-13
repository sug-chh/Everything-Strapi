module.exports = async (ctx, next) => {
  const { id } = ctx.params;
  const { user } = ctx.state;

  if (user) {
    if (!id) {
      return ctx.unauthorized("Please use this policy only in findOne");
    } else {
      const targetUser = id.toString();
      const loggedInUser = user.id.toString();
      if (targetUser === loggedInUser) {
        return await next();
      } else {
        return ctx.unauthorized(
          "Target user is different from the logged in user!"
        );
      }
    }
  } else {
    return ctx.unauthorized("You are not logged in!");
  }
};
