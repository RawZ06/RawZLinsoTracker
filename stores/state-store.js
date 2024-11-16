import { defineStore } from "pinia";

export const useTrackerStateStore = defineStore("tracker-state", {
    state: () => ({
        trackerState: {

        },
        subscription: null
    }),
    actions: {
        update(item, current) {
            this.isLocalUpdate = true
            this.trackerState[item] = current

            if(this.subscription) {
                this.subscription(this.trackerState)
            }
        },

        subscribe(callback) {
            this.subscription = callback
        },

        unsubscribe() {
            this.subscription = null
        }
    }
});