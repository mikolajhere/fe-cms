import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PropsSingle } from "./Single";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Autoplay } from "swiper";
import axios from "axios";
import moment from "moment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const swiperBtns = Array.from(document.querySelectorAll('[role="button"]'));
  for (const btn of swiperBtns) {
    btn.addEventListener("mouseover", () => {
      const bgArr = Array.from(document.querySelectorAll(".post-bg"));
      for (const bg of bgArr) {
        bg.classList.add("set-darker-bg");
      }
    });
    btn.addEventListener("mouseout", () => {
      const bgArr = Array.from(document.querySelectorAll(".post-bg"));
      for (const bg of bgArr) {
        bg.classList.remove("set-darker-bg");
      }
    });
  }

  return (
    <section className="flex flex-col bg-white pb-10 text-3xl md:text-4xl min-h-screen">
      <Swiper
        className="w-full"
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1.1}
        centeredSlides={true}
        loop={true}
        speed={500}
        autoplay={{ delay: 5000 }}
        navigation
        scrollbar={{ draggable: true }}
      >
        {posts.map((post: PropsSingle) => (
          <SwiperSlide key={post.id}>
            <div
              className="post-bg"
              style={{
                backgroundImage: `linear-gradient(rgb(40 40 40 / 45%), rgb(40 40 40 / 85%)), url('/upload/${post.img}')`,
              }}
            >
              <Link
                to={`/?cat=${post?.cat}`}
                className="bg bg-violet-700 hover:bg-violet-800 rounded text-xs py-0 px-2 mb-3 sm:mb-1 font-medium"
              >
                {`${post?.cat.charAt(0).toUpperCase()}${post?.cat.slice(1)}`}
              </Link>
              <span className="text-sm my-3 hidden sm:block">
                {moment(post?.date).format("MMMM DD, YYYY")}
              </span>
              <Link to={`/post/${post.id}`}>
                <h2 className="text-xl px-12 sm:text-3xl sm:px-5 lg:text-5xl text-center font-bold drop-shadow-[0_3px_1px_rgba(0,0,0,0.4)] max-w-lg text-white">
                  {post.title}
                </h2>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {cat && cat !== "" ? (
        <h1 className="my-5 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold text-center">
          {posts?.length && cat !== "" ? (
            <>Posts in {cat.slice(5)} category</>
          ) : (
            <>There are no posts in the {cat.slice(5)} category yet.</>
          )}
        </h1>
      ) : (
        <h2 className="my-5 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold text-center">
          All posts
        </h2>
      )}
      <div className="home max-w-4xl mx-auto px-4 text-center mt-4">
        <div className="posts">
          {posts
            .map((post: PropsSingle) => (
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
    </section>
  );
};

export default Home;
