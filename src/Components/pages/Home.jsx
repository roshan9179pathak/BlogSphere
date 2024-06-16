import React, { useEffect, useState } from "react";
import {login} from '../../store/AuthProvider'
import Postcard from "../Post-Page/Postcard";
import "./home.css";
import error from "./pngwing.com.png";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "../index";
import services from "../../Appwrite/config";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(useSelector((state) => state.auth.userData))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loggedUser = useSelector(state=> state.auth.status)
  console.log(loggedUser);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((isLoggedIn && posts.length === 0) || !isAuthor) {
        setShowMessage(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, posts, isAuthor]);

  useEffect(()=>{
    const activeUser = JSON.parse(localStorage.getItem('userSession'))
    console.log(activeUser);
    if(activeUser){
      dispatch(login(activeUser))
      setIsLoggedIn(true)
      setIsAuthor(true)
      setUserData(activeUser)}
    
      else{
        setIsLoggedIn(loggedUser)

      }
    
  },[isLoggedIn,loggedUser])

  let query;

  useEffect(() => {
    if (isLoggedIn) {
      query = Query.equal("userId", [userData.$id]);
    } else {
      query = Query.equal("userId", ["null"]);
    }
    services.getAllposts(query).then((posts) => {
      console.log(posts);
      if (posts) {
        setIsAuthor(posts.documents[0].userId === userData.$id);
        setPosts(posts.documents);
      }
    });
  }, [isAuthor]);

  if (!isLoggedIn) {
    return (
      <Container
        className={`flex-grow bg-[#F7F4ED] 
        text-[30px]
      flex flex-col justify-center items-center ${'authMessage'}`}
      >
        <p className={`hover:scale-150 duration-500 text-black ${'para'}`}>
          You'r not authenticated, please Log-In to Read Post
        </p>

        <Button 
        onClick={()=> navigate('login')}
        className={`bg-[#023047] text-white rounded-lg py-1 w-20 text-[20px] ${'home-login'}`}>Login</Button>
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
