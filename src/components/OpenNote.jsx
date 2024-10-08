import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoCheckboxOutline, IoImageOutline } from "react-icons/io5";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../contexts/Notes";

const OpenNote = () => {
  const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { notes, setNotes } = useNotes();
  const [doc, setDoc] = useState({ title: "", desc: "", image: "" });

  const handleUpdateNote = async () => {
    try {
      const res = await fetch(
        `https://docs-playground.onrender.com/note/${noteId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: doc.title,
            desc: doc.desc,
            image: doc.image,
          }),
        }
      );
      const updatedNote = await res.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        )
      );
      toast("Saved🎉",{type:"success"})
      navigate("/", { replace: true });
    } catch (err) {
        toast("Error Occured",{type:"error"})
        console.log("Error while trying to save: ",err);
    }
  };

  const handleImageInput = (e) => {
    setDoc((prevDoc) => ({
      ...prevDoc,
      image: e.target.value,
    }));
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    const handleInput = () => {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };

    textArea?.addEventListener("input", handleInput);

    return () => {
      textArea?.removeEventListener("input", handleInput);
    };
  });

  useEffect(() => {
    setDoc(() => {
      if (notes && noteId) {
        const foundNote = notes.find((note) => note._id === noteId);
        return foundNote || { title: "", desc: "", image: "" };
      }
      return;
    });
  }, [notes, noteId]);

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50">
        <div className="w-11/12 md:w-3/5 lg:w-2/5 bg-zinc-800 p-4 rounded-lg shadow-lg text-zinc-50 max-h-[90vh] overflow-auto no-scrollbar">
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Title here"
              name="docs-title"
              id="docs-title"
              value={doc.title}
              onChange={(e) =>
                setDoc((prevDoc) => ({
                  ...prevDoc,
                  title: e.target.value,
                }))
              }
              className="w-full outline-none bg-zinc-800 py-2 px-4 text-lg"
            />
            <textarea
              ref={textAreaRef}
              type="text"
              name="docs-text"
              id="docs-text"
              placeholder="Take a note..."
              value={doc.desc}
              onChange={(e) =>
                setDoc((prevDoc) => ({
                  ...prevDoc,
                  desc: e.target.value,
                }))
              }
              className="w-full outline-none text-base bg-zinc-800 py-2 px-4 resize-none no-scrollbar"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            />
          </div>
          <div className="w-full flex items-center justify-between gap-x-4 p-2">
            <div className="w-1/2 flex items-center gap-x-4">
              <IoImageOutline
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleImageInput}
              />
              <IoCheckboxOutline className="w-6 h-6 cursor-pointer" />
              <LuUndo2 className="w-4 h-4 text-white cursor-pointer" />
              <LuRedo2 className="w-4 h-4 text-white cursor-pointer" />
            </div>
            <div className="w-1/2 flex justify-end items-center">
              <p
                onClick={handleUpdateNote}
                className="text-base text-center cursor-pointer font-normal text-white bg-zinc-800 hover:bg-zinc-600 hover:duration-300 px-4 py-1 rounded-md"
              >
                Save & Close
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenNote;
