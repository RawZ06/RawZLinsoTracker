import { defineStore } from "pinia";
import {convertRgb} from "~/utils/convertRgbToHex.js";

export const useTrackerStore = defineStore("tracker", {
    state: () => ({
        data: null,
        loaded: false,
        trackerName: null
    }),
    actions: {
        load(trackerName) {
            fetch('/sources/' + trackerName + '/tracker.json').then(async (res) => {
                try {
                    this.data = await res.json();
                    this.trackerName = trackerName
                    this.loaded = true;
                } catch (error) {
                    //failed loading is always true
                }
            })
        },

        dimensions() {
            return this.data ? this.data[1].Datas.Dimensions : null;
        },

        background() {
            return this.data ? '/sources/' + this.trackerName + '/' + this.data[1].Datas.Background : null
        },

        backgroundColor() {
            return this.data ? convertRgb(this.data[1].Datas.BackgroundColor) : null
        },

        items() {
            return this.data ? this.data[3].Items : null
        },

        itemSheetDimensions(type) {
            return this.data ? this.data[1].Datas.Items[type].ItemsSheetDimensions : null;
        },

        itemSheetImage(type) {
            return this.data ? '/sources/' + this.trackerName + '/' + this.data[1].Datas.Items[type].ItemsSheet : null;
        },

        fonts() {
            return Object.entries(this.data[2].Fonts).map(([key, value]) => {
                return {
                    name: key,
                    filename: value.Name
                }
            })
        }
    },
});
