module.exports = {
  apps: [
    {
      name: "status-fe-prod",
      script: "serve",
      args: "-s dist --listen 9200",
      instances: 1,
      autorestart: true,
      watch: false,
      env_file: ".env",
    },
  ],
};
