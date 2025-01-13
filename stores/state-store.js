import { defineStore } from "pinia";

export const useTrackerStateStore = defineStore("default-state", {
    state: () => ({
        trackerState: {

        },
        subscription: null,
        defaultValue: null,
        name: null,
    }),
    actions: {
        update(item, current, isDefault = false) {
            if(!isDefault && this.defaultValue === null) {
                this.defaultValue = JSON.parse(JSON.stringify(this.trackerState));
            }

            this.trackerState[item] = current

            if(this.subscription) {
                this.subscription(this.trackerState)
            }
        },

        setName(name) {
            this.name = name
        },

        clear() {
            this.trackerState = JSON.parse(JSON.stringify(this.defaultValue));

            if(this.subscription) {
                this.subscription(this.trackerState)
            }

            // reloadNuxtApp()
        },

        subscribe(callback) {
            this.subscription = callback
        },

        unsubscribe() {
            this.subscription = null
        }
    }
});