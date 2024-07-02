// pages/index.tsx

import Head from "next/head";
import "./home.css"; // Import your CSS file here
import Header from "./components/header"; // Correct the path based on your project structure

const Home = () => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Study Group Platform</title>
        <link rel="stylesheet" href="/styles/style.css" />
      </Head>

      <Header />

      <main>
        <div className="hero">
          <div className="hero-text">
            <h1>Join Study Groups and Boost Your Learning</h1>
            <p>
              Welcome to our platform where students can connect with study
              groups, collaborate on subjects, and excel in their studies.
            </p>
            <div className="hero-buttons">
              <button className="get-started">Get Started</button>
              <button className="learn-more">Learn More</button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://eccles.utah.edu/wp-content/uploads/2015/04/Study-Group-web.jpeg"
              alt="Study Group Image"
            />
          </div>
        </div>

        <section className="features">
          <h2>Find Study Groups for Collaborative Learning</h2>
          <div className="features-container">
            <div className="feature">
              <img
                src="https://www.euroschoolindia.com/wp-content/uploads/2023/07/student-study-group.jpg"
                alt="Engage in Live Chat"
              />
              <h3>Engage in Live Chat with Fellow Students</h3>
              <p>
                Connect with other students studying the same subjects and
                exchange knowledge in real-time.
              </p>
              <button className="feature-button">Join</button>
            </div>
            <div className="feature">
              <img
                src="https://primeteamnames.com/wp-content/uploads/2024/02/Names-for-Bible-Study-Groups-1024x678.jpg"
                alt="Names for Bible Study Groups"
              />
              <h3>Explore Bible Study Group Names</h3>
              <p>
                Discover various names for Bible study groups to enrich your
                spiritual journey and learning experience.
              </p>
              <button className="feature-button">Explore</button>
            </div>
            <div className="feature">
              <img
                src="https://explore-blog.griffith.edu.au/wp-content/uploads/2021/01/PASS-scaled.jpg"
                alt="Access Study Materials"
              />
              <h3>Access Study Materials and Resources</h3>
              <p>
                Discover a wide range of study materials, including notes,
                practice questions, and helpful articles.
              </p>
              <button className="feature-button">Discover</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
