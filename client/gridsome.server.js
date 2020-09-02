// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const nodeExternals = require('webpack-node-externals');
const axios = require('axios');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('http://localhost:1337/events')

    const collection = actions.addCollection({
      typeName: 'Event',
      path: '/events/:id'
    })

    for (const event of data) {
      collection.addNode({
        id: event.id,
        path: '/events/' + event.id,
        title: event.title,
        description: event.description,
        price: event.price,
        duration: event.duration,
        date: event.date,
        image: event.image,
        category: event.categories[0].id
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
