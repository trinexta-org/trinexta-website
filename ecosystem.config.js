module.exports = {
  apps: [{
    name: 'trinexta-staging',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/trinexta-website',
    env: {
      PORT: 3010,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3010,
    },
  }],
}