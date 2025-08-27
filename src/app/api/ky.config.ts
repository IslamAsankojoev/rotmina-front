import ky from 'ky'

export const api = ky.create({
  prefixUrl: `${process.env.API_INTERNAL_URL}/api`,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request, options) => {
        if (options.method && ['post', 'put', 'patch'].includes(options.method.toLowerCase())) {
          if (!options.headers) {
            options.headers = new Headers()
          }
          
          const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
          if (!headers.has('Content-Type') && !headers.has('content-type')) {
            headers.set('Content-Type', 'application/json')
            options.headers = headers
          }
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
        }
      },
    ],
  },
})
