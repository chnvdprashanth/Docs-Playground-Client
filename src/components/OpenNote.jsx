import React, { useEffect, useRef, useState } from "react";
import { IoCheckboxOutline, IoImageOutline } from "react-icons/io5";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useNotes } from "../contexts/Notes";

const OpenNote = () => {
  const textAreaRef = useRef(null);
  const { noteId } = useParams();
  const { notes, setNotes } = useNotes();
  const [doc, setDoc] = useState(() => {
    return notes
      ? notes.filter((note) => note._id === noteId)
      : { title: "", desc: "", image: "" };
  });

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
      const note = await res.json();

      setNotes((prevNote) => [...prevNote, note]);
    } catch (err) {}
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

  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-transparent">
      <div className="w-full flex flex-col bg-gray-800">
        <div className="w-full flex flex-col gap-y-2">
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
            className="outline-none bg-zinc-800 py-2"
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
            className="outline-none text-base bg-zinc-800"
            style={{ resize: "none" }}
          />
        </div>
        <div className="w-full flex items-center gap-x-4 max-sm:gap-x-2 p-2">
          <div className="w-full flex items-center gap-x-4 max-sm:gap-x-2">
            <IoImageOutline
              className="w-6 h-6 cursor-pointer"
              onClick={() => handleImageInput}
            />
            <IoCheckboxOutline className="w-6 h-6 cursor-pointer" />
            <LuUndo2 className="w-4 h-4 text-white cursor-pointer" />
            <LuRedo2 className="w-4 h-4 text-white cursor-pointer" />
          </div>
          <div className="flex justify-center items-center">
            <p
              onClick={handleUpdateNote}
              className="text-base cursor-pointer font-normal"
            >
              Close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenNote;
