module.exports = {
  apps: [{
    name: 'trinexta',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/trinexta-website',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
}