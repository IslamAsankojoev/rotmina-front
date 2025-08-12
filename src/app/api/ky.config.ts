import ky from 'ky'

export const api = ky.create({
  prefixUrl: `http://localhost:1337/api`,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      () => {
        console.log('ky beforeRequest')
      },
    ],
  },
})
