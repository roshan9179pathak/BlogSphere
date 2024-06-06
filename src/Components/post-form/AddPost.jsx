import React, { useCallback, useEffect } from "react";
import { Button, Container, Input, Rte, Select } from "../index";
import { useForm } from "react-hook-form";
import services from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddPost({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const upload = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;
      if (file) {
        await services.deleFile(post.featuredImage);
      }

      const dbPost = await services.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await services.uploadFile(data.image[0]);
      if (file !== null) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await services.createPost({
          ...data,
          userId: userData.$id,
        });
        
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscribe.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <Container>
      <form onSubmit={handleSubmit(upload)}>
        <div className="flex justify-between px-3">
          <div className="flex flex-col justify-center">
            <Input
              label="Title"
              className="border-2 border-black"
              type="text"
              placeholder="Your title goes here..."
              {...register("title", {
                required: true,
              })}
            />
            <Input
              className="border-2 border-black"
              label="Slug"
              type="text"
              placeholder="Post slug..."
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </div>

          <div className="flex flex-col justify-start items-center">
            <Input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: !post,
              })}
            />

            <Select
              label="Status"
              className="w-[250px] ml-3 border-2 border-black"
              options={["active", "inactive"]}
              {...register("status", {
                required: true,
              })}
            />

            <Button
              bgColor={post ? "bg-green-500" : "bg-[#222F3E]"}
              type="submit"
              className="w-[120px] h-10 rounded-lg text-white my-3"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </div>

        <Rte
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </form>
    </Container>
  );
}
