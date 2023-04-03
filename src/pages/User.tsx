import { useLocation, useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react"; 
import "react-quill/dist/quill.snow.css";
import axios from "axios"; 

interface FileProp {
  file?: File | null;
}

export const User = () => {
  const state = useLocation().state;
  const [username, setUsername] = useState(state?.username || "");
  const [bio, setBio] = useState(state?.bio || "");
  const [file, setFile] = useState<FileProp>(state?.img || "");
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file as string);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err: any) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const imgUrl = await upload();

    let currentId = window.location.href.slice(33);
    try {
      await axios.put(`/users/${currentId}`, {
        username,
        bio,
        img: file ? imgUrl : "",
      });
      navigate("/");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  console.log({ state });

  return (
    <div className="max-w-xl mx-auto px-4 text-left mt-4 min-h-screen">
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Set username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  invalid:border-pink-500 invalid:text-pink-600"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="editContainer mb-6">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Set biography (<small>Characters limit: {255 - bio.length}</small>)
        </label>
        <textarea
          id="bio"
          value={bio}
          placeholder="Biography"
          className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  invalid:border-pink-500 invalid:text-pink-600"
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Set avatar
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
