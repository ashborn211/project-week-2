"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./firebaseConfig"; // Adjust path as needed
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import "./style.css"; // Import your login styles here

const standardProfilePicture =
  "https://hongkongfp.com/wp-content/uploads/2023/06/20230610_164958-Copy.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/user");
    } catch (error: any) {
      console.error(error.message);
      if (error.code === "auth/user-not-found") {
        const register = confirm(
          "User does not exist. Do you want to register?"
        );
        if (register) {
          router.push("/register");
        }
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        // User doesn't exist, create a new document
        await setDoc(doc(db, "users", user.uid), {
          userId: user.uid,
          email: user.email,
          displayName: user.displayName,
          profilePicture: user.photoURL || standardProfilePicture,
        });
      }

      router.push("/home");
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <main className="login-main">
      <form onSubmit={handleLogin}>
        <div className="container">
          <h1 className="stroke-text">MyChan</h1>
          <p>Sign into the world's best webpage!</p>
          <div className="parent-container">
            <div className="login-box">
              <h2>Member Login</h2>

              <label htmlFor="email">
                E-Mail:
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <a href="#">Password forgotten?</a>

              <div className="button-container">
                <button
                  onClick={handleGoogleSignIn}
                  className="login-link google-login"
                >
                  Google
                </button>
                <button type="submit" className="login-link">
                  LOGIN
                </button>
              </div>

              <p>
                <Link href="/register">Or Sign Up Instead</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
