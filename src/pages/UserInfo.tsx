/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";

export interface PostSingle {
  title: string;
  desc: string;
  img: string;
  date: string;
  username: string;
  bio: string;
  image: string;
  id: number;
}

export interface UserProps {
  username: string;
  bio: string;
  image: string;
  id: number;
}

export const UserInfo = () => {
  const [posts, setPosts] = useState<PostSingle[]>([]);
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();

  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [userId]);

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleDelete = async () => {
    let text =
      "This action will delete your account and your posts. Are you sure?";
    if (confirm(text) === true) {
      try {
        await axios.delete(`/api/users/${userId}`);
        logout();
        toast.success("User deleted successfully!");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col gap-5 sm:gap-8 text-white p-8">
          <div className="border-4 w-max h-max p-0 rounded-full border-slate-100">
            {posts[0]?.image !== null ? (
              <img
                src={`/upload/${posts[0]?.image}`}
                className="rounded-full object-cover w-12 h-12 sm:w-28 sm:h-28"
                alt="avatar"
                title="avatar"
              />
            ) : (
              <UserIcon className="p-2 w-12 h-12 sm:w-24 sm:h-24" />
            )}
          </div>
          <div className="">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-wide mb-2 text-[0.8rem]">
                Author
              </p>
              <div className="flex items-center font-medium whitespace-nowrap gap-2 mb-2">
                {currentUser?.username && (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/user?edit=${userId}`}
                      state={posts}
                      title="Edit an article"
                      className="flex items-center justify-center text-white rounded-full bg-blue-600 h-6 w-6 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <PencilIcon className="h-3 w-3" />
                    </Link>
                    <TrashIcon
                      title="Delete an article"
                      onClick={handleDelete}
                      className="flex items-center justify-center text-white rounded-full bg-red-600 h-6 w-6 p-1 cursor-pointer focus:ring-offset-gray-800 focus:ring-white"
                    />
                  </div>
                )}
              </div>
            </div>
            <h1 className="font-bold text-4xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] pb-4">
              {posts[0]?.username}
            </h1>
            <div className="flex max-w-xs items-center gap-3 mb-3">
              <hr className="border-1 w-16 border-gray-50" />
              <p className="tracking-wide uppercase flex flex-row items-center gap-1">
                {posts?.length} <span className="text-[0.7rem]">articles</span>
              </p>
            </div>
            <h2 className="italic font-medium text-xl pb-3 ">
              {posts[0]?.bio}
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto min-h-screen pt-10 px-4">
        <div className="home text-center">
          <h2 className="font-bold text-4xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] pb-5 pl-3 text-left">
            List of {posts[0]?.username} articles
          </h2>
          <div className="posts">
            {posts &&
              posts
                .map((post: PostSingle) => (
                  <div
                    className="post flex flex-col sm:flex-row items-start gap-4 mb-4 rounded hover:bg-gray-100 p-3"
                    key={post.id}
                  >
                    <Link to={`/post/${post.id}`}>
                      <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row">
                        <img
                          src={`/upload/${post?.img}`}
                          className="rounded object-cover min-w-[200px] w-full h-36"
                          alt=""
                        />
                        <div className="text-left">
                          <div className="flex flex-col gap-1">
                            <time className="whitespace-nowrap text-sm">
                              {moment(post?.date).format("MMMM DD, YYYY")}
                            </time>
                            <h2 className="text-base font-semibold tracking-tight text-slate-900">
                              {post.title}
                            </h2>
                            <p className="text-base">
                              {getText(post.desc.slice(0, 100))}...
                            </p>
                            <button className="flex text-sm text-sky-500 font-medium">
                              <span>Read more</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
                .reverse()}
          </div>
        </div>
      </div>
    </>
  );
};
