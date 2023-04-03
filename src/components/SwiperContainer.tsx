import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper";
import { Link } from "react-router-dom";

export const SwiperContainer = () => {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={0}
      slidesPerView={1.1}
      centeredSlides={true}
      loop={true}
      speed={750}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div
          className=""
          style={{
            backgroundImage:
              "linear-gradient(rgb(62 62 62 / 15%), rgb(40 40 40 / 85%)), url(https://www.otodom.pl/wiadomosci/wp-content/uploads/2022/11/ebook.png)",

            height: "500px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            position: "relative",
            overflow: "hidden",
            backgroundSize: "cover",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Link to="" className="post-cat">
            Finance
          </Link>
          <time>6 day ago</time>
          <Link
            to="/"
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: "50px",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            <h2>Raport z rynku najmu - luty 2023</h2>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className=""
          style={{
            backgroundImage:
              "linear-gradient(rgb(62 62 62 / 15%), rgb(40 40 40 / 85%)), url(https://www.otodom.pl/wiadomosci/wp-content/uploads/2022/11/a4-magazine-mockupmy.jpg)",

            height: "500px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {" "}
          <Link to="" className="post-cat">
            Finance
          </Link>
          <time>6 day ago</time>
          <Link
            to="/"
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: "50px",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            <h2>Raport z rynku najmu - luty 2023</h2>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className=""
          style={{
            backgroundImage:
              "linear-gradient(rgb(62 62 62 / 15%), rgb(40 40 40 / 85%)), url(https://www.otodom.pl/wiadomosci/wp-content/uploads/2023/01/GettyImages-1140374970.jpg)",

            height: "500px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {" "}
          <Link to="" className="post-cat">
            Finance
          </Link>
          <time>6 day ago</time>
          <Link
            to="/"
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: "50px",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            <h2>Raport z rynku najmu - luty 2023</h2>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className=""
          style={{
            backgroundImage:
              "linear-gradient(rgb(62 62 62 / 15%), rgb(40 40 40 / 85%)), url(https://www.otodom.pl/wiadomosci/wp-content/uploads/2023/03/AdobeStock_300858050-scaled.jpeg)",

            height: "500px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {" "}
          <Link to="" className="post-cat">
            Finance
          </Link>
          <time>6 day ago</time>
          <Link
            to="/"
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: "50px",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            <h2>Raport z rynku najmu - luty 2023</h2>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
