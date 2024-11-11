import {computed} from "vue";

export const useTrackerItem= (item) => {
    const sheet = computed(() => {
        return item ? {
            row: item.SheetInformation.row,
            column: item.SheetInformation.column,
            name: item.SheetInformation.SpriteSheet
        } : {}
    })

    const position = computed(() => {
        return item?.Positions
    })

    const name = computed(() => {
        return item?.Name
    })

    const disabledOpacity = computed(() => {
        return item?.OpacityDisable;
    })

    const itemType = computed(() => {
        return item?.Kind;
    })

    const defaultActive = computed(() => {
        return item?.isActive
    })

    const increments = computed(() => {
        return item.Increment
    })

    const next = computed(() => {
        return item.NextItems
    })

    const label = computed(() => {
        return item.Label
    })

    const count = computed(() => {
        return {
            min: item.valueMin ?? 0,
            max: item.valueMax ?? 100,
            step: item.valueIncrease ?? 1,
            start: item.valueStart ?? 0
        }
    })

    const labels = computed(() => {
        return item.LabelList
    })

    const checkItem = computed(() => {
        return item.CheckImageSheetInformation
    })

    const glow = computed(() => {
        return (tracker) => '/sources/' + tracker + '/' + item.BackgroundGlow
    })

    const max = computed(() => {
        return item.maxValue ?? 1;
    })

    return {sheet, position, name, itemType, disabledOpacity, defaultActive, increments, next, label, count, labels, checkItem, glow, max}
}