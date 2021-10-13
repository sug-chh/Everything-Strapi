module.exports = async (ctx, next) => {
  const user = ctx.state.user;
  if (user) {
    console.log("This is the user data", user);
    return await next();
  } else {
    ctx.unauthorized("You need to be logged in to access this policy!");
  }
};
