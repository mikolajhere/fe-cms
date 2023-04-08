import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

interface FileProp {
  file?: File | null;
}

export const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState<FileProp>(state?.img || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file as string);
      }
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err: any) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const imgUrl = await upload();

    let currentId = window.location.href.slice(49);
    try {
      state
        ? await axios.put(`/api/posts/${currentId}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/api/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
      toast.success("Post saved successfully!");
    } catch (err: any) {
      setError(err.response.data);
      toast.error(err.response.data);
    }
  };

  console.log({ state });
  console.log({ file });
  

  return (
    <div className="max-w-xl mx-auto px-4 text-left mt-4 min-h-screen">
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Title of the article
        </label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Title"
          className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  invalid:border-pink-500 invalid:text-pink-600"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="editContainer mb-6">
        <label
          htmlFor=""
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Content of the article (
          <small>Characters limit: {5000 - value.length}</small>)
        </label>
        <ReactQuill
          className="editor"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="mb-6">
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-2 flex text-sm leading-6 text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative text-center cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span className="text-center">Upload a file</span>

                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={(e: any) => {
                      if (!e.target.files) {
                        return;
                      }

                      setFile(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB and no spaces in the file name
              </p>
            </div>
          </div>
        </div>
      </div>
      <fieldset className="mb-6">
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          Category of the article
        </legend>
        <div className="mt-2 space-y-3">
          <div className="flex items-center gap-x-3">
            <input
              checked={cat === "art"}
              id="art"
              name="cat"
              value="art"
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="art"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Art
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              checked={cat === "science"}
              id="science"
              name="cat"
              value="science"
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="science"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Science
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              checked={cat === "technology"}
              id="technology"
              name="cat"
              value="technology"
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="technology"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Technology
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              checked={cat === "cinema"}
              id="cinema"
              name="cat"
              value="cinema"
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="cinema"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cinema
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              checked={cat === "design"}
              id="design"
              name="cat"
              value="design"
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="design"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Design
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              checked={cat === "food"}
              id="food"
              name="cat"
              value="food"
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="food"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Food
            </label>
          </div>
        </div>
      </fieldset>
      <div>
        <button
          className="group relative flex mx-auto justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
          onClick={handleSubmit}
        >
          Publish
        </button>

        <div className="text-center mt-5">
          {err && <p className="text-sm text-center text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
};
