import { useEffect, useState } from "react";
import { PropsSingle } from "../pages/Single";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ bio }: Partial<PropsSingle>) => {
  const [post, setPost] = useState<PropsSingle>();
  const location = useLocation();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setPost(actualData);
      } catch (err: any) {
        console.log(err);
      }
    };
    getData();
  }, [bio, postId]);

  return (
    <>
      {post?.bio !== null ? (
        <>
          <Link to={`/user/${post?.uid}`}>
            {post?.image !== null ? (
              <>
                <img
                  src={`/upload/${post?.image}`}
                  className="w-16 h-16 rounded-full object-cover shadow-lg hover:shadow-transparent"
                  alt={`${post?.title} cover`}
                  title={`${post?.title} cover`}
                />
              </>
            ) : (
              <span className="flex items-center justify-center rounded-md shadow-lg hover:shadow-transparent text-white bg-teal-700 hover:bg-teal-800 h-16 w-16 text-2xl">
                {post?.username.charAt(0).toUpperCase()}
              </span>
            )}
          </Link>
          <h4 className="uppercase tracking-wide py-3">About the author</h4>
          <p>{post?.bio?.slice(0, 70)}...</p>
          <Link
            className="flex text-sm text-sky-500 font-medium"
            to={`/user/${post?.uid}`}
          >
            Read more
          </Link>
        </>
      ) : (
        <>
          {
            <Link to={`/user/${post?.uid}`}>
              {post?.image !== null ? (
                <>
                  <img
                    src={`/upload/${post?.image}`}
                    className="w-16 h-16 rounded-md object-cover shadow-lg hover:shadow-transparent"
                    alt={`${post?.title} cover`}
                    title={`${post?.title} cover`}
                  />
                </>
              ) : (
                <span className="flex items-center justify-center rounded-md shadow-lg hover:shadow-transparent text-white bg-teal-700 hover:bg-teal-800 h-16 w-16 text-2xl">
                  {post?.username.charAt(0).toUpperCase()}
                </span>
              )}
            </Link>
          }
          <h4 className="uppercase tracking-wide py-3">About the author</h4>
          <p>
            <Link
              className="flex text-sm text-sky-500 font-medium"
              to={`/user/${post?.uid}`}
            >
              Read more
            </Link>
          </p>
        </>
      )}
    </>
  );
};
