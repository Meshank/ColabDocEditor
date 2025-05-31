import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Editor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    socket.on("receive-changes", (data) => {
      setContent(data);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    socket.emit("send-changes", value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Collaborative Editor</h1>
      <textarea
        ref={editorRef}
        value={content}
        onChange={handleChange}
        className="w-full h-96 border rounded p-2"
      ></textarea>
    </div>
  );
}
