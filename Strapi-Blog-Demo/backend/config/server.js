module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 7000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e25036210d6d9cd7d67aeaca189a56f1'),
    },
  },
});
