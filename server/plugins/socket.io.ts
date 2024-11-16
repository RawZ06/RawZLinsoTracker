import { Server as Engine } from "engine.io";
import { Server, Socket } from "socket.io";
import { defineEventHandler } from "h3";

let groupTrackers: Record<string, any> = {}; // État global organisé par groupe

export default defineNitroPlugin((nitroApp) => {
    const engine = new Engine();
    const io = new Server();
    io.adapter(require('socket.io-adapter')());

    io.bind(engine);

    // Gestion des connexions des sockets
    io.on("connection", (socket: Socket) => {
        // console.debug("Nouvelle connexion :", socket.id);

        // Gestion de l'entrée dans un groupe
        socket.on('joinGroup', (groupId: string) => {
            // console.debug(`Client ${socket.id} a rejoint le groupe ${groupId}`);
            socket.join(groupId);

            // Envoyer l'état actuel du groupe au client
            if (groupTrackers[groupId]) {
                socket.emit('tracker', { id: groupId, tracker: groupTrackers[groupId] });
            } else {
                // Initialiser un état pour le groupe si nécessaire
                groupTrackers[groupId] = null;
                socket.emit('tracker', { id: groupId, tracker: groupTrackers[groupId] });
                setTimeout(() => {
                    delete groupTrackers[groupId];
                }, 24 * 60 * 60 * 1000);
            }
        });

        // Écouter les mises à jour de l'état pour un groupe
        socket.on('tracker', (data: { id: string; tracker: any }) => {
            const { id, tracker } = data;
            if (!id) {
                console.error("ID de groupe manquant dans la mise à jour.");
                return;
            }

            // Mettre à jour l'état du groupe
            groupTrackers[id] = tracker;
            // console.debug(`Mise à jour du tracker pour le groupe ${id}:`, tracker);

            // Diffuser la mise à jour à tous les membres du groupe
            io.to(id).emit('tracker', { id, tracker });
        });

        // Gestion de la déconnexion
        socket.on("disconnect", (reason) => {
            // console.debug(`Déconnexion du client ${socket.id} :`, reason);
        });
    });

    // Middleware Nitro pour gérer les requêtes Socket.IO
    nitroApp.router.use("/socket.io/", defineEventHandler((event) => {
        const { req, res } = event.node;
        engine.handleRequest(req as any, res);
        event._handled = true;
    }));
});