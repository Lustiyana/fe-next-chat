"use client";
import React, { useEffect, useState } from "react";
import { database, getValue } from "../../../firebase-config";
import { onValue, ref } from "firebase/database";
import axios from "axios";
import { MessageType } from "@/types/MessageType";

const Page = ({ params }: { params: { slug: string } }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    onValue(ref(database, "/chats/" + params.slug), (snapshot) => {
      const data = snapshot.val();
      const dataMessages = data.messages;
      const arr = [];
      for (const key in dataMessages) {
        arr.push({
          uid: key,
          updated_at: dataMessages[key].updated_at,
          role: dataMessages[key].role,
          message: dataMessages[key].message,
        });
      }

      setMessages(arr);
    });
  }, []);

  const onSubmitMessage = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);

    axios.post(
      `http://127.0.0.1:5000/api/message/admin?key=${params.slug}`,
      formData
    );

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="h-screen w-1/2">
        <div className="h-3/4 overflow-auto">
          <div className="flex flex-col gap-4">
            {messages &&
              messages.map((message) => (
                <div
                  key={message.uid}
                  className={`border w-auto ${
                    message.role == "user" ? "self-start" : "self-end"
                  }`}
                >
                  <p>{message.message}</p>
                  <p>{message.updated_at}</p>
                </div>
              ))}
          </div>
        </div>
        <form className="flex gap-4" onSubmit={onSubmitMessage}>
          <input
            type="text"
            className="border w-full"
            name="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="border">Sent</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
