import express from 'express'
import { buildContext } from 'graphql-passport'
import { ApolloServer } from 'apollo-server-express'

import User from '../models/User'
import typeDefs from '../types/typeDefs'
import resolvers from '../resolvers/resolvers'
import Cors from '../middlewares/cors'
import Passport from '../middlewares/passport'
import Session from '../middlewares/session'

const PORT = process.env.PORT || 4000

Passport.userInit()

const app = express()

app.use(Passport.initialize())
app.use(Passport.session())

app.use(Cors.corsOptions)

app.use(Session.init())



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
})

server.applyMiddleware({ app, cors: false })

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})
