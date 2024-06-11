import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import services from "../../Appwrite/config";
import parse from "html-react-parser";
import Button from "../Misc/Button";
import {Container} from '../index'
import './post.css'
export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state)=> state.auth.status)

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug !== "") {
      services.getPost(slug).then((post) => {
        if (post) setPost(post);
        else {
          console.log(`Failed to get post`);
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    await services.deletePost(post.$id).then((status) => {
      if (status) {
        services.deleFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post && isLoggedIn ? (
    <Container
    className={`flex-grow bg-[#F7F4ED] 
   
  `}
  >
    <div className={` ${'image-container'} w-full min-h-full flex flex-col justify-center items-center `}>
      <div className={`${'for-image'} my-7`}>
        <img className="rounded-xl"
          src={services.getFilePreview(post.featuredImage)}
          alt={post.title}
        />
      </div>

      {isAuthor && (
        <div className= {`${'for-buttons'}`}>
          <Link to={`/edit-post/${post.$id}`}>
          <Button className="mx-1 mb-2 w-[100px] h-10 rounded-xl" bgColor="bg-green-500">
            Edit
          </Button>
          </Link>

          <Button 
          onClick = {deletePost}
          className="mx-1 w-[100px] h-10 rounded-xl" bgColor="bg-red-500">
            Delete
          </Button>

        </div>
      )}

      <div>
        <h2 className="text-[30px]">
      {post.title}
        </h2></div>

      <div className="mt-2 text-center mb-3">{parse(post.content)}</div>
    </div>
   </Container>
  ) : 
    navigate('/')
  
}
