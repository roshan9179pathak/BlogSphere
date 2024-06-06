import React, { useEffect, useState } from "react";
import Postcard from "../Post-Page/Postcard";
import "./home.css";
import error from "./pngwing.com.png";
import { useSelector } from "react-redux";
import { Container } from "../index";
import authservices from "../../Appwrite/auth";
import services from "../../Appwrite/config";
export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (!isLoggedIn) {
      authservices.authLogout();
    }
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = services.getAllposts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return (
      
      <div className=" text-slate-700 text-[30px] absolute hover:scale-150 duration-200 top-[50%] left-[30%]">
        You'r not authenticated, please Log-In to Read Post
      </div>
      
    );
  }

  return isLoggedIn && posts.length > 0 ? (
    <div className={`flex flex-wrap px-3 ${"grid-container"}`}>
      <Container>
        <div className="w-full h-full flex flex-wrap">
          {posts.map((post) => (
            <div className="mx-2" key={post.$id}>
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={error} alt="" />

      <h2 className="text-[40px] text-red-700">
        You haven't added any post yet
      </h2>
    </div>
  );
}
