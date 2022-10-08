import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCntx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredNewpassword = newPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA8VYBlr-xMMUF5fuo0YSes1MSbirOBCwY',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCntx.token,
        password: enteredNewpassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      console.log(res);
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
