module.exports = async(ctx, next) => {
    return ctx.unauthorized("This endpoint is closed!")
}