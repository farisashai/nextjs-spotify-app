import cookie from 'cookie'
import { GetServerSideProps } from 'next'

import App from 'components/App'
import { getSessionCookie } from 'utils/cookies'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    return {
      props: { 
        session,
      },
    }
  } catch {
    return {
      props: {},
    }
  }
}

const IndexPage = ({ session, spotifyApi }) => {
  return <App session={session} />
}

export default IndexPage