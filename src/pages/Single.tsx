/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { HomeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Menu from "../components/Menu";
import { Sidebar } from "../components/Sidebar";

export interface PropsSingle {
  title: string;
  username: string;
  desc: string;
  cat: string;
  img: string;
  image: string;
  date: string;
  id: number;
  uid: number;
  bio: string;
}

const Single = () => {
  const [post, setPost] = useState<PropsSingle>();
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    let text = "Are you sure you want to delete this post?";
    if (confirm(text) === true) {
      try {
        await axios.delete(`/posts/${postId}`);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-3 max-w-6xl mx-auto">
        <div className="mx-auto pb-28 px-4 gap-5 md:flex-row col-span-3 md:col-span-2">
          <article className="flex-auto">
            <div className="hidden lg:flex breadcrumb items-center gap-1 text-sm text-gray-500 mt-3">
              <Link
                className="flex items-center gap-1 hover:text-violet-700"
                to="/"
              >
                <HomeIcon height={13} width={13} />
                Home page
                {" / "}
              </Link>
              <Link
                className="flex items-center gap-1 hover:text-violet-700"
                to={`/?cat=${post?.cat}`}
              >
                {`${post?.cat.charAt(0).toUpperCase()}${post?.cat.slice(1)}`}
                {" / "}
              </Link>
              {post?.title}
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl lg:text-5xl my-4">
              {post?.title}
            </h1>
            <div className="flex items-center gap-2">
              <time className="text-sm text-slate-900">
                Posted by{" "}
                <b>
                  <Link to={`/user/${post?.uid}`}>{post?.username}</Link>
                </b>{" "}
                on {moment(post?.date).format("MMMM DD, YYYY")}
              </time>
              <div className="flex items-center font-medium whitespace-nowrap gap-2">
                {currentUser?.username === post?.username && (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/write?edit=${postId}`}
                      state={post}
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

            <img
              src={`/upload/${post?.img}`}
              className="object-cover w-full max-h-60 my-6"
              alt={`${post?.title} cover`}
              title={`${post?.title} cover`}
            />

            <p
              className="mt-6 prose prose-slate"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.desc!),
              }}
            ></p>
          </article>
          <Menu cat={post?.cat} />
        </div>
        <div className="px-12 hidden md:block md:col-span-1">
          <div className="lg:pl-6 sticky top-5 pt-12 my-3">
            <Sidebar bio={post?.bio} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
