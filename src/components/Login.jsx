// src/components/Login.jsx
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Local state to track authenticated user

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);  // Update the local state with the authenticated user
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  const storeUserInDB = async (user) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        uid: user?.uid,
        email: user?.email,
      });
      console.log('User stored in database:', response.data);
      return true;  // Return true if storing user was successful
    } catch (error) {
      console.error("Error storing user in database:", error);
      return false;  // Return false if there was an error
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // If user is already logged in, store the user in the database
        const success = await storeUserInDB(currentUser);  // Store the user in the database
        console.log(success);
  
        // Navigate to home page after storing the user or if already logged in
        if (success) {
          navigate('/');
        }
      }
    });
  
    return () => unsubscribe(); // Cleanup listener
  }, [navigate, user]);
  



  return (
    <div className="flex justify-center items-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={googleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default Login;
