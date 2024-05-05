"use client";

import { useEffect, useState } from "react";
import { chatRef } from "../../firebase-config";
import { onValue } from "firebase/database";
import Link from "next/link";
import { MessageType } from "@/types/MessageType";

export default function Home() {
  const [rooms, setRooms] = useState<MessageType[]>([]);

  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      const arr = [];
      for (const key in data) {
        arr.push({ uid: key, phone_number: data[key].phone_number });
      }

      setRooms(arr);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {rooms.map((room) => (
        // eslint-disable-next-line react/jsx-key
        <div key={room.uid} className="flex justify-between items-center">
          <p>{room.phone_number}</p>
          <Link href={`/${room.uid}`} className="border p-4">
            Chat
          </Link>
        </div>
      ))}
    </div>
  );
}
