import cors from 'cors'

export default {
  corsOptions: () => ({
    origin: 'http://localhost:3000',
    credentials: true,
  })
}
