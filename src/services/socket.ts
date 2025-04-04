import { io, Socket } from "socket.io-client";
import { store } from "../redux/store";
import { getUserId } from "./decodeToken";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URI

let socket: Socket;

export const initiateSocket = (): void => {
    const accessToken = store.getState().auth.accessToken
    if (accessToken) {

        const id = getUserId(accessToken)

        socket = io(SOCKET_URL, {
            auth: {
                _id: id
            }
        });

        console.log('socket ', socket)
        
        socket.on("connect", () => {
            console.log("Connected to Socket.IO server");
        });


        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
        });
    }

};

export const getSocket = (): Socket => {
    if (!socket) {
        throw new Error("Socket is not initialized");
    }
    return socket;
};