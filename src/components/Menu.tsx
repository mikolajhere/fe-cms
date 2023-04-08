import { useEffect, useState } from "react";
import { PropsSingle } from "../pages/Single";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

export const Menu = ({ cat }: Partial<PropsSingle>) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="post-content mt-5">
      <h2 className="text-violet-700 text-xl font-bold mb-3">
        Other {cat} posts:
      </h2>
      <hr className="post border-l" />
      <div className="grid grid-cols-2 md:grid-cols-3 mt-3 gap-4">
        {posts &&
          posts.map((post: PropsSingle) => (
            <Link className="post" to={`/post/${post.id}`} key={post.id}>
              <img
                src={`/upload/${post?.img}`}
                className="object-cover w-full h-24 mb-3 hover:opacity-80"
                alt=""
              />
              <span className="hover:text-gray-500">
                <h3 className="text-sm font-bold">{post.title}</h3>
                <time className="flex items-center gap-1 text-xs font-bold text-gray-400 mt-1">
                  <ClockIcon height={15} width={15} />
                  {moment(post?.date).format("dddd, MMMM DD, YYYY")}
                </time>
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};
