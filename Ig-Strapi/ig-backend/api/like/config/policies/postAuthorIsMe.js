module.exports = async (ctx, next) => {
  const authorId = ctx.request.query["post.author"];
  if (!authorId) {
    ctx.unauthorized("Please specify a post.author={id}");
  }
  const targetUser = String(authorId);
  const loggedInUser = String(ctx.state.user.id);
  if (targetUser === loggedInUser) {
    return next();
  } else {
    return ctx.unauthorized(
      "Target user is different from the logged in user!"
    );
  }
};
