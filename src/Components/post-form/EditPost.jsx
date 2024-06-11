import React, { useEffect, useState } from "react";
import { Container, AddPost } from "../index";
import services from "../../Appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <Container className={`flex-grow bg-[#F7F4ED]`}>
      <div className="py-8">
        <AddPost post={post} />
      </div>
    </Container>
  ) : null;
}

export default EditPost;
