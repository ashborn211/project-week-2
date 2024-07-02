"use client";

import { useEffect, useState } from "react";
import Header from "../components/header";
import Link from "next/link";
import "./chatrooms.css";
import {
  db,
  collection,
  getDocs,
  addDoc, // Import addDoc from Firestore
  onSnapshot,
} from "../firebaseConfig";
import Head from "next/head";

type ChatroomsState = {
  [key: string]: string[];
};

const Chatrooms = () => {
  const [chatrooms, setChatrooms] = useState<ChatroomsState>({
    math: [],
    science: [],
    history: [],
    english: [],
  });

  const [currentChatroom, setCurrentChatroom] = useState<string>("");

  useEffect(() => {
    if (currentChatroom) {
      console.log(`Setting up real-time listener for ${currentChatroom}`);

      const fetchData = async () => {
        const messages: string[] = [];
        try {
          const querySnapshot = await getDocs(collection(db, "chats"));
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.title === currentChatroom) {
              messages.push(data.message);
            }
          });
          console.log(`Fetched messages for ${currentChatroom}:`, messages);
          setChatrooms((prevChatrooms) => ({
            ...prevChatrooms,
            [currentChatroom]: messages,
          }));
        } catch (error) {
          console.error(`Error fetching ${currentChatroom} messages: `, error);
        }
      };

      fetchData();

      const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (
            change.type === "added" &&
            change.doc.data().title === currentChatroom
          ) {
            setChatrooms((prevChatrooms) => ({
              ...prevChatrooms,
              [currentChatroom]: [
                ...prevChatrooms[currentChatroom],
                change.doc.data().message,
              ],
            }));
          }
        });
      });

      return () => {
        console.log(`Unsubscribing from ${currentChatroom}`);
        unsubscribe();
      };
    }
  }, [currentChatroom]);

  const openChatroom = (room: string) => {
    setCurrentChatroom(room);
    document.getElementById("chatroom")!.style.display = "flex";
  };

  const sendMessage = async () => {
    const messageText = (
      document.getElementById("messageText") as HTMLInputElement
    ).value;
    if (messageText.trim() === "") return;

    const message = {
      title: currentChatroom,
      message: messageText,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "chats"), message);
      console.log("Message added to Firestore");
      (document.getElementById("messageText") as HTMLInputElement).value = "";
    } catch (error) {
      console.error("Error adding message to Firestore: ", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <Header></Header>
      <main>
        <div className="container">
          <header>
            <h1>Study Groups</h1>
          </header>
          <div className="main-content">
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
                {chatrooms[currentChatroom]?.map((message, index) => (
                  <div key={index} className="message">
                    {message}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  id="messageText"
                  placeholder="Type your message..."
                  onKeyPress={handleKeyPress} // Add event listener for Enter key
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
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
