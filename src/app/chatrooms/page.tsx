// pages/chatrooms.tsx

import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Link from "next/link"; // Import Link from Next.js

const Chatrooms = () => {
  const [chatrooms, setChatrooms] = useState({
    math: [],
    science: [],
    history: [],
    english: [],
  });

  const [currentChatroom, setCurrentChatroom] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("chatrooms")
      .doc(currentChatroom)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const message = change.doc.data();
            setChatrooms((prevChatrooms) => ({
              ...prevChatrooms,
              [currentChatroom]: [
                ...prevChatrooms[currentChatroom],
                message.message,
              ],
            }));
          }
        });
      });

    return () => unsubscribe();
  }, [currentChatroom]);

  const openChatroom = (room: string) => {
    setCurrentChatroom(room);
    document.getElementById("chatroom")!.style.display = "flex";
    fetchMessagesFromFirestore(room);
  };

  const sendMessage = () => {
    const messageText = (
      document.getElementById("messageText") as HTMLInputElement
    ).value;
    if (messageText.trim() === "") return;

    const message = {
      name: currentChatroom,
      message: messageText,
      timestamp: new Date(),
    };

    db.collection("chatrooms")
      .doc(currentChatroom)
      .collection("messages")
      .add(message)
      .then(() => {
        console.log("Message added to Firestore");
        setChatrooms((prevChatrooms) => ({
          ...prevChatrooms,
          [currentChatroom]: [...prevChatrooms[currentChatroom], messageText],
        }));
        (document.getElementById("messageText") as HTMLInputElement).value = "";
      })
      .catch((error) => {
        console.error("Error adding message to Firestore: ", error);
      });
  };

  const fetchMessagesFromFirestore = (room: string) => {
    db.collection("chatrooms")
      .doc(room)
      .collection("messages")
      .get()
      .then((querySnapshot) => {
        const messages: string[] = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data().message);
        });
        setChatrooms((prevChatrooms) => ({
          ...prevChatrooms,
          [room]: messages,
        }));
      })
      .catch((error) => {
        console.error("Error fetching messages: ", error);
      });
  };

  return (
    <div>
      <header>
        <nav>
          <div className="logo">Logo</div>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/chatrooms">Chat with students</Link>
            </li>
            <li>
              <Link href="/upload">Browse/Upload files</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="container">
          <header>
            <h1>Study Groups</h1>
          </header>
          <main className="main-content">
            <div className="chatroom-list">
              <h2>Select a Chatroom</h2>
              <ul>
                <li>
                  <button
                    className="subject-btn"
                    onClick={() => openChatroom("math")}
                  >
                    Math
                  </button>
                </li>
                <li>
                  <button
                    className="subject-btn"
                    onClick={() => openChatroom("science")}
                  >
                    Science
                  </button>
                </li>
                <li>
                  <button
                    className="subject-btn"
                    onClick={() => openChatroom("history")}
                  >
                    History
                  </button>
                </li>
                <li>
                  <button
                    className="subject-btn"
                    onClick={() => openChatroom("english")}
                  >
                    English
                  </button>
                </li>
              </ul>
            </div>
            <div className="chatroom" id="chatroom" style={{ display: "none" }}>
              <div className="messages" id="messages">
                {chatrooms[currentChatroom].map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  id="messageText"
                  placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </main>
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2024 Study Group Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Chatrooms;
