import Head from "next/head";
import React, { useEffect } from "react";
import "./chatrooms.css";
const Chatrooms = () => {
  useEffect(() => {
    // JavaScript functions from group.js
    const openChatroom = (subject: string) => {
      // Implement functionality as needed
      console.log(`Opening chatroom for ${subject}`);
    };

    const sendMessage = () => {
      // Implement functionality as needed
      console.log("Sending message");
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Study Groups</title>
        <link rel="stylesheet" href="/group.css" />
        <script src="/group.js" defer></script>
      </Head>

      <header>
        <nav>
          <div className="logo">Logo</div>
          <ul className="nav-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">More</a>
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
            <div className="chatroom" id="chatroom">
              <div className="messages" id="messages"></div>
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
    </>
  );
};

export default Chatrooms;
