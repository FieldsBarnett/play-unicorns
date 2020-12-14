import { Socket } from "dgram";
import { io } from 'socket.io-client';
const socket = io('https://play-unicorns.herokuapp.com/');
export default socket;