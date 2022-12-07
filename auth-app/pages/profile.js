import UserProfile from '../components/profile/user-profile';
import {getSession} from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({req: ctx.req})

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {session: JSON.parse(JSON.stringify(session))}
  }
}

export default ProfilePage;

