/* eslint-disable react/prop-types */
// src/routes.js
// import React, {useState} from 'react';
// import { Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from "firebase/auth";

// function ProtectedRoute({ children }) {
//   const [user, setUser] = useState({});
//   console.log(user);

//   React.useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       console.log(currentUser);
//       setUser(currentUser);
//     });
//   }, []);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;





import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null); // Null means we haven't checked the authentication state yet.
  const [loading, setLoading] = useState(true); // To handle the loading state while checking auth.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Auth state has been checked
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth state
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render children if authenticated
}

export default ProtectedRoute;
