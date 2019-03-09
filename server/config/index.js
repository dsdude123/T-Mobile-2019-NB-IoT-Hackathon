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
  db: 'mongodb://rykeller:!MUNC7YSzawce6-@iothack-sp2019-shard-00-00-saf07.mongodb.net:27017,iothack-sp2019-shard-00-01-saf07.mongodb.net:27017,iothack-sp2019-shard-00-02-saf07.mongodb.net:27017/DEV?ssl=true&replicaSet=IOTHack-SP2019-shard-0&authSource=admin&retryWrites=true'
}
