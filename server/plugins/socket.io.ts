import { Server as Engine } from "engine.io";
import { Server, Socket } from "socket.io";
import { defineEventHandler } from "h3";
import {globalState} from "~/server/global-state";

const HOUR_AVAILABLE = 12 as const;

export default defineNitroPlugin((nitroApp) => {
    const engine = new Engine();
    const io = new Server();

    io.bind(engine);

    io.on("connection", (socket: Socket) => {
        console.debug("New connection :", socket.id);

        socket.on('joinGroup', (groupId: string) => {
            console.debug(`Client ${socket.id} a join group ${groupId.toLocaleLowerCase()}`);
            socket.join(groupId.toLocaleLowerCase());

            if (globalState.get(groupId.toLocaleLowerCase())) {
                socket.emit('tracker', { id: groupId.toLocaleLowerCase(), tracker: globalState.get(groupId.toLocaleLowerCase()) });
            } else {
                try {
                    globalState.set(groupId.toLocaleLowerCase(), null);
                    socket.emit('tracker', { id: groupId.toLocaleLowerCase(), tracker: globalState.get(groupId.toLocaleLowerCase()) });
                    setTimeout(() => {
                        globalState.delete(groupId.toLocaleLowerCase())
                    }, HOUR_AVAILABLE * 60 * 60 * 1000);
                } catch(e) {
                    socket.emit('error', e)
                }
            }
        });

        socket.on('tracker', (data: { id: string; tracker: any }) => {
            const { id, tracker } = data;
            if (!id) {
                console.error("ID is missing");
                return;
            }

            try {
                globalState.set(id, tracker);
                console.debug(`update tracker for the group ${id}:`, tracker);

                // Diffuser la mise à jour à tous les membres du groupe
                io.to(id).emit('tracker', {id, tracker});
            } catch(e) {
                socket.emit('error', e)
            }
        });

        socket.on("disconnect", (reason) => {
            console.debug(`Disconnection of client ${socket.id} :`, reason);
        });
    });

    nitroApp.router.use("/socket.io/", defineEventHandler((event) => {
        const { req, res } = event.node;
        engine.handleRequest(req as any, res);
        event._handled = true;
    }));
});