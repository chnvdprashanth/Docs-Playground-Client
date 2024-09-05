import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoCheckboxOutline, IoImageOutline } from "react-icons/io5";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { useNotes } from "../contexts/Notes";

const Notes = ({ setToggleNotes }) => {
  const textAreaRef = useRef(null);
  const { setNotes } = useNotes();
  const [doc, setDoc] = useState({ title: "", desc: "", image: "" });

  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  // const [image, setImage] = useState("");

  const handleCreateNote = async () => {
    if (doc.title === "" || doc.desc === "") {
      setToggleNotes(false);
      return;
    }

    try {
      const res = await fetch("https://docs-playground.onrender.com/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: doc.title,
          desc: doc.desc,
          image: doc.image,
        }),
      });
      const note = await res.json();

      setNotes((prevNote) => [...prevNote, note]);
      setToggleNotes(false);
      toast("Created🎉",{type:"success"})
    } catch (err) {
      toast("Failed to create😥",{type:"error"});
      console.log("Creating note failed: ",err);
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

  return (
    <div className="w-full flex flex-col">
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
            onClick={handleCreateNote}
            className="text-base cursor-pointer font-normal"
          >
            Close
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
