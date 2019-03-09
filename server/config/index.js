module.exports = {
  env: process.env.NODE_ENV,
  dev: process.env.NODE_ENV !== 'production',
  prod: process.env.NODE_ENV === 'production',
  ports: {
    https: 443,
    http: 80,
    dev: 3000
  },
  api: {
    prefix: 'api',
    version: 'v1'
  },
  cookie: {
    secret: 'plz-invite-keller-onsite'
  },
  db: 'mongodb: //192.168.99.100:27017/test'
}
