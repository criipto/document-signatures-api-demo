import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import { getCredentials } from './authentication';
import LoginScreen from './screens/LoginScreen';
import LogoutButton from './components/LogoutButton';
import IndexScreen from './screens/IndexScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getCredentials());
  const refreshLogin = () => {
    setIsAuthenticated(!!getCredentials());
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen onLogin={refreshLogin} />
    );
  }
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          Criipto Signatures Demo
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/signatureorders" className="nav-link px-2 link-dark">Signature orders</Link></li>
        </ul>

        <div className="col-md-3 text-end">
          <LogoutButton onLogout={refreshLogin} />
        </div>
      </header>
      <React.Suspense fallback={'Loading...'}>
        <IndexScreen />
      </React.Suspense>
    </div>
  );
}

export default App;
