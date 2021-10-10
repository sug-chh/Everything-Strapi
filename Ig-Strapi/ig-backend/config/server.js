module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "6af28adb50eb15bf99322444bd83620b"),
    },
  },
  cron: {
    enabled: true,
  },
});
