import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    setLoader(true);
    let url;
     
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8VYBlr-xMMUF5fuo0YSes1MSbirOBCwY'
     } else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8VYBlr-xMMUF5fuo0YSes1MSbirOBCwY'
    }
    fetch(url ,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {'Content-type': 'application/json'}
      }
    ).then((res) => {
      setLoader(false)
      if(res.ok){
        return res.json()
      }else{
        return res.json().then((data) => {
          const errormsg = data.error.message;
          throw new Error(errormsg)
        })
      }
    })
    .then((data) => {console.log(data);

    })
    .catch((err) => {
      alert(err.message);
    })
  }
    
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
         {loader ? 'Sending request...':<button>{isLogin ? 'Login' : 'Create Account'}</button>}
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
};

export default AuthForm;
