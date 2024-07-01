import Head from "next/head";
import Header from "../components/header";
import "./about.css";

const AboutPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About Us - Study Group Platform</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <Header />

      <main>
        <section className="about-section">
          <div className="container">
            <h1>About Us</h1>
            <p>
              Welcome to Study Group Platform, where we are committed to
              revolutionizing the way students learn and collaborate. Our
              platform is designed to break down traditional learning barriers
              by providing a space where knowledge flows freely and students
              empower each other through shared resources and support.
            </p>
            <p>
              At Study Group Platform, we believe that education should be
              accessible to everyone, regardless of background or location.
              That's why our platform is open to all students looking to enhance
              their learning experience through collaborative study groups, live
              discussions, and a vast repository of educational materials.
            </p>
            <p>
              Our mission is to foster a global community of learners who engage
              in meaningful discussions, exchange ideas, and inspire each other
              to achieve academic success. Whether you're seeking help with
              challenging subjects or eager to share your expertise, Study Group
              Platform provides the tools and community support to make your
              educational journey more enriching and rewarding.
            </p>
            <p>
              Join us today and explore the limitless possibilities of
              collaborative learning. Together, we can build a brighter future
              where knowledge knows no boundaries.
            </p>
          </div>

          <div className="about-images">
            <img
              src="https://cdn.filestackcontent.com/resize=width:450,height:450,fit:max/quality=value:90/ERvRPsZCSKazoBO9SAGw"
              alt="Image 1"
            />

            <div className="about-text">
              <h2>Our Vision</h2>
              <p>
                Our vision at Study Group Platform is to empower students
                worldwide by creating a dynamic learning environment that
                promotes collaboration, critical thinking, and innovation. We
                envision a future where educational resources are freely
                accessible to all, enabling every student to reach their full
                potential.
              </p>
              <p>
                Through our platform, we aim to bridge the gap between learning
                and application, providing students with the tools and support
                they need to succeed in an ever-changing world. By fostering a
                culture of sharing and mutual support, we believe in building a
                global community where every voice matters and every student can
                thrive.
              </p>
              <p>
                Join us in shaping the future of education. Together, we can
                make learning more inclusive, engaging, and impactful for
                students around the globe.
              </p>
            </div>

            <img
              src="https://themindsjournal.com/wp-content/uploads/2018/03/Knowledge-Isnt-Free.jpg"
              alt="Image 2"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
