import { defineStore } from "pinia";

export const useTrackerStateStore = defineStore("default-state", {
    state: () => ({
        trackerState: {

        },
        trackerInfo: {

        },
        subscription: null,
        name: null,
    }),
    actions: {
        update(item, current, isDefault = false) {
            this.trackerState[item] = current

            if(this.subscription) {
                this.subscription(this.trackerState)
            }
        },

        setName(name) {
            this.name = name
        },

        subscribe(callback) {
            this.subscription = callback
        },

        unsubscribe() {
            this.subscription = null
        },

        getState() {
            return Object.keys(this.trackerInfo).reduce((acc, key) => {
                acc[key] = {
                    ...this.trackerInfo[key],
                    state: this.trackerState[key],
                };
                return acc;
            }, {});
        }
    }
});