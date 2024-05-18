import React, { useEffect, useRef, useState } from "react";
import { addReq, uploadFile } from "../helpers/firebase";
import Box from "@mui/material/Box";
import { notifyDefault } from "../helpers/toastDefault";
import { toast } from "react-toastify";

function InputCard({ setLoading, getData, collectioName }) {
  const [isClickedTitle, setIsClickedTitle] = useState(false);
  const [isClickedDescription, setIsClickedDescription] = useState(false);
  const [title, setTitle] = useState("New Title");
  const [description, setDescription] = useState("New Description");
  const [imgPreview, setImgPreview] = useState(null);
  const [file, setFile] = useState(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // click reset actions
  const handleClickTitle = () => {
    setIsClickedTitle(true);
    setIsClickedDescription(false);
  };
  const handleClickDescription = () => {
    setIsClickedDescription(true);
    setIsClickedTitle(false);
  };
  const handleClickLabel = (event) => {
    setIsClickedDescription(false);
    setIsClickedTitle(false);
  };

  // input select all content actions
  useEffect(() => {
    if (!titleInputRef.current) return;
    titleInputRef.current.focus();
    titleInputRef.current.select();
  }, [isClickedTitle]);

  useEffect(() => {
    if (!descriptionInputRef.current) return;
    descriptionInputRef.current.focus();
    descriptionInputRef.current.select();
  }, [isClickedDescription]);

  // upload file img
  const handleUploadImg = (event) => {
    const file = event.target.files[0];
    setImgPreview(URL.createObjectURL(file));
    setFile(file);
  };
  const handleSubmit = async () => {
    setLoading(true);
    // add files and get url
    const resFileUrl = await uploadFile(file, collectioName);
    if (resFileUrl) console.log(resFileUrl);

    // add dataet to db
    const res = await addReq(collectioName, {
      title: title,
      description: description,
      src: resFileUrl,
    });
    if (res) {
      toast.success("Ekleme işlemi başarılı", notifyDefault);
      getData();
    }
    setLoading(false);

    //reset form
    setFile(null);
    setImgPreview(null);
    setTitle("New Title");
    setDescription("New Description");
  };

  return (
    <Box>
      <Box
        display="flex"
        className="w-fit"
        px={1}
        sx={{ border: "1px solid black", marginBottom: -2, paddingBottom: 2, borderRadius: 2 }}
      >
        New Title
      </Box>
      <Box
        height={380}
        width={200}
        p={1}
        sx={{
          borderRadius: 2,
          border: "1px solid black",
          zIndex: "100",
          background: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          {!isClickedTitle ? (
            <h1 className="text-orange-400 font-bold" onClick={handleClickTitle}>
              {title}
            </h1>
          ) : (
            <input
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={handleClickTitle}
              className="text-orange-400 font-bold"
            />
          )}
        </div>
        <div className="h-40   ">
          {!isClickedDescription ? (
            <p onClick={handleClickDescription} className="six-lines">
              {description}
            </p>
          ) : (
            <textarea
              ref={descriptionInputRef}
              rows={6}
              value={description}
              onClick={handleClickDescription}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          )}
        </div>

        <label
          onClick={handleClickLabel}
          htmlFor="img-file"
          className="bg-red-400 h-40 f-center w-full cursor-pointer hover:opacity-85"
        >
          {imgPreview ? (
            <img src={imgPreview} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="cursor-pointer">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12H20M12 4V20"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Görsel
            </div>
          )}

          <input type="file" id="img-file" accept="image/*" className="hidden" onChange={handleUploadImg} />
        </label>

        <button
          onClick={handleSubmit}
          disabled={!title || !description || !imgPreview}
          className={`w-4 h-4 self-end mt-1 ${
            title && description && imgPreview ? "bg-green-600 hover:opacity-50" : "bg-[#bfbfbf]"
          }`}
        ></button>
      </Box>
    </Box>
  );
}

export default InputCard;
