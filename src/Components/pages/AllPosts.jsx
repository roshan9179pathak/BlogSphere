import React, { useEffect, useState } from "react";
import services from "../../Appwrite/config";
import { Query } from "appwrite";
import { Container } from "../index";
import { useSelector } from "react-redux";

import Postcard from "../Post-Page/Postcard";
import error from "./pngwing.com.png";
import { useNavigate } from "react-router-dom";
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  let query;

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((isLoggedIn && posts.length === 0) || !isAuthor) {
        setShowMessage(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, posts, isAuthor]);

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
      
      <div className=" text-slate-700 text-[30px] absolute hover:scale-150 duration-200 top-[50%] left-[30%]">
        {navigate('/')}
        You'r not authenticated, please Log-In to Read Post
      </div>
    );
  }

  if (isLoggedIn && posts.length > 0 && isAuthor) {
    return (
      <Container>
        <div className="w-full h-full flex flex-wrap">
          {posts.map((post) => (
            <div className="mx-2" key={post.$id}>
              <Postcard {...post} />
            </div>
          ))}
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
