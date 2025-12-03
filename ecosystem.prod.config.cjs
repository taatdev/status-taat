module.exports = {
  apps: [
    {
      name: "status-fe-prod",
      script: "http-server",
      args: ["dist", "-p", "9200", "-a", "0.0.0.0"],
      instances: 1,
      autorestart: true,
      watch: false
    },
  ],
};
