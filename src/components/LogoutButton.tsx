import React from 'react';
import {removeCredentials} from '../authentication';

interface Props {
  onLogout: () => void
}

export default function LogoutButton(props : Props) {
  const handleLogout = () => {
    removeCredentials();
    props.onLogout();
  };

  return (
    <button className="btn btn-secondary" type="button" onClick={handleLogout}>Sign out</button>
  );
}