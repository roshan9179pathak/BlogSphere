import React, { useEffect, useState } from "react";
import Postcard from "../Post-Page/Postcard";
import "./home.css";
import error from "./pngwing.com.png";
import { useSelector } from "react-redux";
import { Container } from "../index";
import services from "../../Appwrite/config";
import { Query } from "appwrite";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((isLoggedIn && posts.length === 0) || !isAuthor) {
        setShowMessage(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, posts, isAuthor]);

  let query;

  useEffect(() => {
    if (isLoggedIn) {
      query = Query.equal("userId", [userData.$id]);
    } else {
      query = Query.equal("userId", ["null"]);
    }
    services.getAllposts(query).then((posts) => {
      if (posts) {
        setIsAuthor(posts.documents[0].userId === userData.$id);
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return (
      <Container
        className={`flex-grow bg-[#F7F4ED] 
        text-[30px]
      flex justify-center items-center ${'authMessage'}`}
      >
        <p className={`hover:scale-150 duration-500 text-black ${'para'}`}>
          You'r not authenticated, please Log-In to Read Post
        </p>
      </Container>
    );
  }

  if (isLoggedIn && posts.length > 0 && isAuthor) {
    return (
      <Container
        className={`flex-grow bg-[#F7F4ED] 
        text-[30px]
      `}
      >
        <div className={`px-3`}>
          <div className={`${"grid-container"} ${'for-tab'}`}>
            {posts.map((post) => (
              <div className="mx-2 hover:scale-105 duration-300" key={post.$id}>
                <Postcard {...post} />
              </div>
            ))}
          </div>{" "}
        </div>
      </Container>
    );
  }

  if (showMessage) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={error} alt="" />

        <h2 className="text-[40px] text-red-700">
          You haven't added any post yet
        </h2>
      </div>
    );
  }
}
