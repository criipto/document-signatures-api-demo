import React, {useState} from 'react';
import { setCredentials } from '../authentication';

interface Props {
  onLogin: () => void
}

export default function LoginScreen(props : Props) {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    setCredentials(clientId, clientSecret);
    props.onLogin();
  }

  return (
    <div className="container mt-5">
      <form className="w-25 m-auto" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in with your API credentials</h1>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="API Client ID" required value={clientId} onChange={(event) => setClientId(event.target.value)} />
          <label htmlFor="floatingInput">API Client ID</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="API Client Secret" required value={clientSecret} onChange={(event) => setClientSecret(event.target.value)}  />
          <label htmlFor="floatingPassword">API Client Secret</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  )
}