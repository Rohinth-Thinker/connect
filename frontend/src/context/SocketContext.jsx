import {io} from 'socket.io-client';

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const {authUser} = useAuthContext();

    useEffect(() => {
        function connectSocket() {
            const socket = io('http://localhost:3000');

            socket.on('connect', () => {
                setSocket(socket);
            })

            return () => {
                socket.off('connect');
            }
        }

        if (authUser) connectSocket();
    }, [authUser])

    return (
        <SocketContext.Provider value={{socket}}>
            { children }
        </SocketContext.Provider>
    )
}