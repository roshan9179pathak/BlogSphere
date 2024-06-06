import React, { useEffect, useState } from "react";
import services from "../../Appwrite/config";
import { Container } from "../index";
import Postcard from "../Post-Page/Postcard";
import error from './pngwing.com.png'
export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getAllposts([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);


  if(posts.length > 0)return(
    <Container>
      <div className="w-full h-full flex flex-wrap">
        {posts.map((post) => (
          <div className="mx-2" key={post.$id}>
            <Postcard {...post} />
          </div>
        ))}
      </div>
    </Container>
  )

  return(
   
    <div className="w-full h-full flex flex-col items-center justify-center">

    <img src={error} alt="" />

    <h2 className="text-[40px] text-red-700">You haven't added any post yet</h2>

</div>
   
  ) 
}
