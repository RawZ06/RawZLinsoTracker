import {socket} from "~/utils/socket.ts";
import {useTrackerStateStore} from "~/stores/state-store.js";

export function useSocket(id, onErrorHandle) {
    const isConnected = ref(false);
    const stateStore = useTrackerStateStore();
    const isSync = ref(false);

    const closeError = () => isError.value = false;

    // Se connecter automatiquement au groupe via l'ID
    if (socket.connected) {
        isConnected.value = true;
        socket.emit('joinGroup', id); // Rejoindre le groupe correspondant à l'ID
    }

    function onConnect() {
        isConnected.value = true;
        socket.emit('joinGroup', id); // Rejoindre le groupe lors de la connexion

        // Synchroniser le stateStore avec le serveur
        stateStore.subscribe((tracker) => {
            if(isSync.value) {
                socket.emit("tracker", { id, tracker }); // Inclure l'ID et l'état
            }
        });
    }

    function onDisconnect() {
        isConnected.value = false;
        stateStore.unsubscribe();
        isSync.value = false;
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Réception des mises à jour du serveur
    socket.on("tracker", (arg) => {
        isSync.value = true;
        if (arg.id === id && arg.tracker) { // Vérifier que l'ID correspond à celui du groupe actuel
            stateStore.trackerState = arg.tracker; // Mettre à jour uniquement l'état du groupe
        } else if(arg.id === id) {
            socket.emit("tracker", { id, tracker: stateStore.trackerState });
        }
    });

    socket.on('error', (arg) => {
        onErrorHandle(arg)
    })

    // Nettoyer les listeners lors du démontage
    onBeforeUnmount(() => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("tracker");
    });

    return {isConnected};
}