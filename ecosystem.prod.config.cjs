module.exports = {
  apps: [
    {
      name: "status-fe-prod",
      script: "ws",
      args: ["--spa", "dist", "--port", "9200"],
      instances: 1,
      autorestart: true,
      watch: false
    },
  ],
};
