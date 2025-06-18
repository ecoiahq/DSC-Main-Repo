import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'b69czsvq',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})

export default client
