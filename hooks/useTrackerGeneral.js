import {computed} from "vue";
import {convertRgb} from "../utils/convertRgbToHex.js";

export const useTrackerGeneral = (data, tracker = 'oot64') => {
    const dimensions = computed(() => {
        return data.value ? data.value[1].Datas.Dimensions : null;
    })
    const background = computed(() => {
        return data.value ? '/sources/' + tracker + '/' + data.value[1].Datas.Background : null
    })
    const backgroundColor = computed(() => {
        return data.value ? convertRgb(data.value[1].Datas.BackgroundColor) : null
    })
    const items = computed(() => {
        return data.value ? data.value[3].Items : null
    })
    const itemSheetDimensions = computed(() => {
        return (type) => {
            return data.value ? data.value[1].Datas.Items[type].ItemsSheetDimensions : null;
        }
    })
    const itemSheetImage = computed(() => {
        return (type) => {
            return data.value ? '/sources/' + tracker + '/' + data.value[1].Datas.Items[type].ItemsSheet : null;
        }
    })
    const fonts = computed(() => {
        return Object.entries(data.value[2].Fonts).map(([key, value]) => {
            return {
                name: key,
                filename: value.Name
            }
        })
    })

    return {dimensions, background, backgroundColor, items, itemSheetImage, itemSheetDimensions, fonts}
}