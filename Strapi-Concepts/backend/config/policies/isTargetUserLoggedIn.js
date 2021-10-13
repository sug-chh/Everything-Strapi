module.exports = async (ctx, next) => {
  const { user: userId } = ctx.request.query;
  const { user } = ctx.state;
  if (user) {
    if (!userId) {
      return ctx.unauthorized("Please specify a user id with ?user=${user.id}");
    }
    console.log("isTargetUserLoggedIn. There is a query parameter", userId);

    const targetUser = userId.toString();
    const loggedInUser = user.id.toString();

    if (targetUser === loggedInUser) {
      return await next();
    } else {
      return ctx.unauthorized("Target User is different from the LoggedInUser");
    }
  }
  return ctx.unauthorized("You need to log in!");
};
