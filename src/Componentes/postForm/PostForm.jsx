import React from "react";
import { useState, useCallback, useEffect } from "react";
import  appwriteService  from "../../appwrite/confiDatabase";
import { useNavigate } from "react-router-dom";
import { Input, ButtonComponent, RTE, Select,Loader} from "../import";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// import { data } from "autoprefixer";

function PostForm({post}) {
const { register,  handleSubmit, watch, setValue, control, getValues} =  useForm({
    defaultValues:{
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
    },
});


const [loading,setloading] = useState(false);
const navigate = useNavigate();
const userData = useSelector((state) => state.userData);

const submit = async (data) => {
        setloading(true)
    if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (file) {
            appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
            setloading(false);
        }
    } else {
        try {
                const file = await appwriteService.uploadFile(data.image[0])
        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
            if (dbPost) {
                // navigate(`/post/${dbPost.$id}`);
                navigate("/"),
                setloading(false)
            }
        }
        } catch (error) {
            console.log(`line no. 55 in postform.jsx, error :${error} `);
        }  
    }
};

const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
}, []);

React.useEffect(() => {
    console.log(getValues("content")) 
    const subscription = watch((value, { name }) => {
        if (name === "title") {   
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);


  return <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">
      <Input
      value = {post && post.title}
          label="Title :"
          placeholder="Title"
          className="mb-4"
          
          {...register("title", { required: true })}
        
          

      />
      <Input

          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug",slugTransform(e.currentTarget.value) , { shouldValidate: true });
          }}
      />
      <RTE label="Content :" name="content" control={control} defaultValue={post && post.content} />
  </div>
  <div className="w-1/3 px-2">
      <Input

          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
      />
      {post && (
          <div className="w-full mb-4">
              <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      <ButtonComponent
       type="submit" bgColor={post ? "bg-[#6b7280]" : undefined} className="w-full flex gap-1">
          {post ? "Update" : "Submit"}
         {loading ? <Loader></Loader>: ""}
      </ButtonComponent>
    
  </div>
</form>;
}

export default PostForm;
