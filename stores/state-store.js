import { defineStore } from "pinia";

export const useTrackerStateStore = defineStore("tracker-state", {
    state: () => ({
        trackerState: {

        }
    }),
    actions: {
        update(item, current) {
            this.trackerState[item] = current
        },

        get(item) {
            return this.trackerState[item];
        }
    }
});