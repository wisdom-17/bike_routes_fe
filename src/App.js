// import logo from './logo.svg';
import './App.css';
import { GoogleLogin, GoogleLogout } from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';

function App() {
  const [ profile, setProfile ] = useState(null);
  const clientId = '921371927242-sljeaailjhbnot134dejlh0orepedtcp.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
  }

  const onFailure = (err) => {
    console.log('failed: ', err);
  }

  const logOut = () => {
    setProfile(null);
  }

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user profile avatar" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
      ) : (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
      )}
    </div>
  );
}

export default App;
