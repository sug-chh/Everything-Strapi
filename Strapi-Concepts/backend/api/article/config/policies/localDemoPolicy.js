module.exports = async (ctx, next) => {
    // this will return undefined as no jwt is sent from the frontend!
  console.log(ctx.state.user);
  console.log("Local Demo Policy");
  return await next();
};
