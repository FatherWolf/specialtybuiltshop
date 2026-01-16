module.exports = {
  apps: [{
    name: 'specialtybuilt',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: 'localhost'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '512M',
    node_args: '--max_old_space_size=512',
    restart_delay: 1000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}