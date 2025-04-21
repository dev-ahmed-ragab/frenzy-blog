 
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";

function ArticleDetails () {
    let currentUser = "001"; // Replace with actual user logic
    const userId = useSelector((state) => state.user.id);
    console.log("User ID from Redux:", userId);
    const defaultUserImg ="user.jpg";
    const { id: postId } = useParams();

    const [editingComment, setEditingComment] = useState(null);
    const [deletingCommentId, setDeletingCommentId] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
            // const res = await axios.get(`http://localhost:5000/api/posts/680121b6bfcbc0ff1d024835`);
            const normalized = normalizePost(res.data);
            setPost(normalized);
          } catch (error) {
            console.error("Error fetching post:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPost();
      }, []);

    let post2 = {
        title: "Article Title",
        content: "This is the content of the article.",
        img: "s.jpg",
        Auther: "Author Name",
        AuthorImg: "s.jpg",
        AutherEmail:"skfjsdkjk@kfjhsk.com",
    
         
        categories: ["Category1", "Category2"],
        comments: [
            {
                username: "User1",
                comment: "This is a comment.",  
                userid:"001",
                userImg: "",
            },  
            {
                username: "User2",
                comment: "This is another comment.",
                userid:"002",
            },
        ],
    }
    const normalizePost = (post2) => ({
        title: post2.title,
        content: post2.content,
        img: post2.imageUrl,
        Auther: post2.author?.username || "Unknown Author",
        AuthorImg: defaultUserImg, // if you don’t have one from backend
        AutherEmail: post2.author?.email || "no-email@example.com",
        categories: [post2.category],
        comments: post2.comments || [],
    });
 
    const handleMakeComment = (e) => {
        // e.preventDefault();
        // const comment = e.target.elements.comment.value;
        // const username = "User"; // Replace with actual username logic
        // const date = new Date().toLocaleDateString();
        
        // post.comments.push({ username, comment, date });
        // e.target.reset(); // Clear the form after submission
    };
    const handleDeleteComment = (userid) => {
        // post.comments = post.comments.filter(comment => comment.userid !== userid);
        toast.success("Comment deleted successfully!");
    };
    const handleEditComment = (userid) => {
        // const commentToEdit = post.comments.find(comment => comment.userid === userid);
        // if (commentToEdit) {
        //     const newComment = prompt("Edit your comment:", commentToEdit.comment);
        //     if (newComment) {
        //         commentToEdit.comment = newComment;
        //     }
        // }
        toast.success("Comment edited successfully!");
    }

    return (<>
        {post && <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl space-y-6 my-5">
            
            {/* Article main content */}
            <div>
                <img src={post.img} alt="Article" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

        
            {/* Author card */}
             
            <div className="items-center border-solid rounded-lg shadow-sm border-[12px] border-[#dde7f5]">
                <div className="bg-white rounded-lg items-center flex flex-col justify-center">
                    <div className="flex gap-4 p-5 items-center justify-center">
                        <img
                            src={post.AuthorImg || defaultUserImg}
                            alt={post.Auther}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{post.Auther}</p>
                            <p className="text-sm text-gray-600">{post.AutherEmail}</p>
                            <p className="text-sm text-gray-600">Auother</p>
                        </div>
                        
                    </div>
                    <button className="w-[50%] bg-blue-950 my-2 h-12  text-white py-2 px-4 rounded-full hover:bg-white hover:text-black border-2 border-blue-950 transition duration-300 ease-in-out">
                            All Posts
                    </button>
                </div>
            </div>
            

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {post.categories.map((category, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* Comments section
            <div className="space-y-4">
                {post.comments.length === 0 ? (
                    <p className="text-gray-500 italic">No comments yet.</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold">{post.comments.length} Comments</p>
                        {post.comments.map((comment, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                                <div className="flex items-start gap-3">
                                    <img
                                    src={comment.userImg || defaultUserImg}
                                    alt={comment.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                    <p className="text-sm text-gray-700">
                                        <strong>{comment.username}</strong> 
                                    </p>
                                    <p className="text-sm text-gray-600">{comment.comment}</p>
                                    {/* Edit/Delete buttons if current user is the author */}
                                    {/*{currentUser === comment.userid && (
                                        <div className="space-x-2 mt-2">
                                        <button
                                            onClick={() => {
                                            setEditingComment(comment);
                                            setEditedText(comment.comment);
                                            }}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeletingCommentId(comment.userid)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Add Comment Form */}
            {/*<div>
                <h2 className="text-2xl font-semibold mb-2">Add a Comment</h2>
                <form className="space-y-3" onSubmit={handleMakeComment}>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Comment"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
                
            {/* Edit Comment Modal */}
            {/*{editingComment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                    <h3 className="text-lg font-semibold">Edit Comment</h3>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                        onClick={() => setEditingComment(null)}
                        className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={() => {
                            handleEditComment(editingComment.userid, editedText);
                            setEditingComment(null);
                        }}
                        className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                        Save
                        </button>
                    </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {/*{deletingCommentId !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">Delete Comment</h3>
                    <p className="text-gray-700">Are you sure you want to delete this comment?</p>
                    <div className="flex justify-end gap-2">
                        <button
                        onClick={() => setDeletingCommentId(null)}
                        className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={() => {
                            handleDeleteComment(deletingCommentId);
                            setDeletingCommentId(null);
                        }}
                        className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
            )} */}

</div>}
{!post && <Loading></Loading>}


    </>)
}

export default ArticleDetails ;