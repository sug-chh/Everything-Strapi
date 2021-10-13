module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "09e9d1762519670af1d5a90bd4eecc7b"),
    },
  },
  cron: {
    enabled: true,
  },
});
