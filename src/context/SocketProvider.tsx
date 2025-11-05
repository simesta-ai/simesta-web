"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const SocketContext = createContext<WebSocket | null>(null);
export const useSocket = () => useContext(SocketContext);

// ChatLayout.tsx
export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000/ws/chat");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
