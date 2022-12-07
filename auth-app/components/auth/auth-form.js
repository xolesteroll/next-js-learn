import { useState } from 'react';
import classes from './auth-form.module.css';
import {createUser} from "../../lib/auth";
import {signin} from "next-auth/client";
import {useRouter} from "next/router";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredPass, setEnteredPass] = useState("")

  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (isLogin) {
      // log in
      const signinResult = await signin('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPass
      })

      if (!signinResult.error) {
        router.push('/profile')
      }
      console.log(signinResult)
    } else {
      try {
        const response = await createUser({
          email: enteredEmail,
          password: enteredPass
        })
        console.log(response)
      } catch (e) {
        console.log(e)
      }

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={enteredEmail} onChange={(e) => setEnteredEmail(e.currentTarget.value)}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required value={enteredPass} onChange={(e) => setEnteredPass(e.currentTarget.value)}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
