import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext"; 
import { Link, useLocation } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
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
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${userId}`); 
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
      <div className="bg-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col gap-5 sm:gap-8 text-white p-8">
          <div className="border-4 w-max h-max p-2 rounded-full border-slate-100">
            {/* <img
              src={`/upload/${user?.image}`}
              className="rounded-md object-cover w-24 h-24 max-w-max"
              alt={user?.username}
              title={user?.username}
            /> */}
            <UserIcon className="w-12 h-12 sm:w-24 sm:h-24" />
          </div>
          <div className="">
            <p className="uppercase tracking-wide mb-2 text-[0.8rem]">Author</p>
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
          <h2 className="font-bold text-4xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] pb-5 pl-3 text-left">List of {posts[0]?.username} articles</h2>
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
                          src={`/upload/${post.img}`}
                          className="rounded object-cover w-full h-36"
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
