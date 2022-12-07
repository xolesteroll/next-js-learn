import AuthForm from '../components/auth/auth-form';
import {getSession} from "next-auth/client";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({
    req: ctx.req
  })

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session))
    }
  }
}

export default AuthPage;
