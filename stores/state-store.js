import { defineStore } from "pinia";

export const useTrackerStateStore = defineStore("default-state", {
    state: () => ({
        trackerState: {

        },
        subscription: null
    }),
    actions: {
        update(item, current) {
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