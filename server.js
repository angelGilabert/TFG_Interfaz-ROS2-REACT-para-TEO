import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos
app.use('/', express.static(path.join(__dirname, 'src', 'www')));

app.get('/mobile', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'www', 'mobile.html'));
});

let clientSocket;
let staffSocket;
let nClients = 0;


io.on('connection', (socket) => {
    if (nClients === 0) {
        // Si es el primer socket en conectarse, es el socket del servidor
        staffSocket = socket;
    } else {
        // Si no, es el socket del cliente
        clientSocket = socket;
    }
    // Aumentar número de sockets conectados
    nClients++;
    console.log("Nuevo socket conectado.  Numero clientes:", nClients);

    socket.on("disconnect", () => {
        nClients--;
        console.log("Cliente desconectado.  Numero clientes:", nClients);

        // Si solo queda el portatil conectado
        if (nClients == 1) {
            io.emit("MOVIL_OFF")
        }
    });

    socket.on("MOVIL_CONECTADO", () => {
        io.emit("MOVIL_ON")
    });

    socket.on("VALOR_GYRO", ({ alpha, gamma }) => {
        io.emit("VALOR_GYRO_PORT", { alpha, gamma });
    });

    socket.on("MODO_POS", () => {
        console.log("Modo posicion activado")
        io.emit("MODO_POS_MOVIL");
    });

    socket.on("MODO_VEL", () => {
        console.log("Modo velocidad activado")
        io.emit("MODO_VEL_MOVIL");
    });

});

server.listen(3002, () => {
    console.log("Server listening on port 3002...");
});
