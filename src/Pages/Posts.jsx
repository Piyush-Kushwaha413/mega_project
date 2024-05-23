
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/confiDatabase";
import { ButtonComponent, Container } from "../Componentes/import";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";

export default function Post() {
    const [post, setPost] = useState(null);
    // const[isAuthor,setisAuthor] =useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);
//    const auth = post? post.userId === userData.$id
   const isAuthor = post && userData ? post.userId === userData.$id : false;
   
 

    useEffect(() => {
        if (slug) {
            console.log("if slug hai runing");
            appwriteService.getPost(slug)
            .then((post) => {
                if (post){
                    setPost(post);
                    // if (userData) {
                    //     post.userId ===userData.$id
                    //     setisAuthor(true);
                    // }
                    // else(false)
                } 
                else{
                    console.log("if post nhi milla");
                    navigate("/");
                } 
            }, (error)=>{
                console.log(error);
            }     
            );
        
            
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
 <div className="py-8">
            <Container>
                <div className="w-full flex flex-col justify-center mb-4 relative border rounded-xl p-2">
                {isAuthor && (
                        <div className=" flex gap-6 self-center my-4 ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <ButtonComponent bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </ButtonComponent>
                            </Link>
                            <ButtonComponent bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </ButtonComponent>
                        </div>
                    )}
                    <img 
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[70%] mx-auto max-h-[450px] object-contain object-center   "
                    />

                    
                </div>
 {/* text Area */}
                <div  className=" border" >
                <div className="w-full mb-6 ">
                    <h1 className="text-2xl uppercase underline font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
               
                </div>
            </Container> 
</div>




    ) : null;
}

