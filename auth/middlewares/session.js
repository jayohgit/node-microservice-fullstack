import session from 'express-session'
import uuid from 'uuid/v4'

const SESSION_SECRECT = process.env.SESSION_SECRET || 'developmentsessionsecret'

export default {
  init: () => session({
    genid: (req) => uuid(),
    secret: SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
  })
}