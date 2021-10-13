module.exports = async (ctx, next) => {
  console.log("Global Demo Policy......Global policies are executed first and then the local policies are executed!");
  return await next();
};
