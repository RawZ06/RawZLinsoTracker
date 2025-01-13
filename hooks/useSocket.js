import {socket} from "~/utils/socket.ts";
import {useTrackerStateStore} from "~/stores/state-store.js";

export function useSocket(id, onErrorHandle) {
    const isConnected = ref(false);
    const stateStore = useTrackerStateStore();
    const isSync = ref(false);

    // Se connecter automatiquement au groupe via l'ID
    if (socket.connected) {
        isConnected.value = true;
        const name = stateStore.name;
        socket.emit('joinGroup', {id: id.toLocaleLowerCase(), name }); // Rejoindre le groupe correspondant à l'ID
    }

    function onConnect() {
        isConnected.value = true;
        const name = stateStore.name;
        socket.emit('joinGroup', {id: id.toLocaleLowerCase(), name }); // Rejoindre le groupe lors de la connexion

        // Synchroniser le stateStore avec le serveur
        stateStore.subscribe((tracker) => {
            const name = stateStore.name;
            if(isSync.value) {
                socket.emit("tracker", { id: id.toLocaleLowerCase(), name, tracker }); // Inclure l'ID et l'état
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
        if (arg.id.toLocaleLowerCase() === id.toLocaleLowerCase() && arg.tracker) { // Vérifier que l'ID correspond à celui du groupe actuel
            stateStore.trackerState = arg.tracker; // Mettre à jour uniquement l'état du groupe
            stateStore.trackerName = arg.name;
        } else if(arg.id.toLocaleLowerCase() === id.toLocaleLowerCase()) {
            const name = stateStore.name;
            socket.emit("tracker", { id: id.toLocaleLowerCase(), name, tracker: stateStore.trackerState });
        }
    });

    socket.on('error', (arg) => {
        onErrorHandle('error')
    })

    socket.on('name-error', (arg) => {
        onErrorHandle('name')
    })

    // Nettoyer les listeners lors du démontage
    onBeforeUnmount(() => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("tracker");
    });

    return {isConnected};
}