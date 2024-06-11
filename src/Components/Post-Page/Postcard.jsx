import React from "react";
import { Link, useNavigate } from "react-router-dom";
import services from "../../Appwrite/config";

export default function Postcard({ $id, featuredImage, title }) {

    const navigate = useNavigate()

  return (
    <Link to={`/post/${$id}`}>
    <div className="w-[300px] h-[350px] shadow-lg bg-white border-2 border-[black] rounded-lg mx-auto my-4 pt-2 relative">
      <div className="w-[95%] h-4/5 bg-[#222F3E] rounded-xl mx-auto">
        <img className="w-full h-full rounded-lg" src={services.getFilePreview(featuredImage)} alt={title} />
      </div>
      <div className="w-full flex justify-center">
        <h2 className="from-neutral-500 font-bold mt-5 text-xl">
          {title}
        </h2>
      </div>
    </div>
    </Link>
  );
}
