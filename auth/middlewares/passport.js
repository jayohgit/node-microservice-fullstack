import passport from 'passport'
import { GraphQLLocalStrategy } from 'graphql-passport'
import User from '../models/User'

export default {
// Passport
  initialize: () => passport.initialize(),
  session: () => passport.session(),
  userInit: () => {
    passport.use(
      new GraphQLLocalStrategy((email, password, done) => {
        const users = User.getUsers()
        const matchingUser = users.find(
          (user) => email === user.email && password === user.password
        )
        const error = matchingUser ? null : new Error('no matching user')
        done(error, matchingUser)
      })
    )
    
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
      const users = User.getUsers()
      const matchingUser = users.find((user) => user.id === id)
      done(null, matchingUser)
    })
  }
}
