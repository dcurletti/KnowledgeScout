require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'KnowledgeScout',
    description: 'A career growth tracker aimed at helping teams discover optimal routes for gaining knowledge.',
    head: {
      titleTemplate: 'KnowledgeScout: %s',
      meta: [
        {name: 'description', content: 'A career growth tracker aimed at helping teams discover optimal routes for gaining knowledge.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'KnowledgeScout'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'}, // TODO: Change
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'KnowledgeScout'},
        {property: 'og:description', content: 'A career growth tracker aimed at helping teams discover optimal routes for gaining knowledge.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@LordCurletti'},
        {property: 'og:creator', content: '@LordCurletti'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);