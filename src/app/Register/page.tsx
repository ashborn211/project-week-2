"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebaseConfig"; // Adjust path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import "./style.css"; // Import your register styles here

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Add user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        email: user.email,
        displayName: displayName,
        profilePicture: "https://hongkongfp.com/wp-content/uploads/2023/06/20230610_164958-Copy.jpg", // Default profile picture
      });

      alert("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <main className="register-main">
      <form onSubmit={handleRegister}>
        <div className="container">
          <h1 className="stroke-text">MyChan</h1>
          <p>Sign up to the world's best webpage!</p>
          <div className="parent-container">
            <div className="register-box">
              <h2>Member Registration</h2>

              <label htmlFor="displayName">
                Display Name:
                <input
                  type="text"
                  className="form-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </label>

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

              <div className="button-container">
                <button type="submit" className="register-link">
                  REGISTER
                </button>
              </div>

              <p>
                <a href="/login">Already have an account? Log in here</a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;