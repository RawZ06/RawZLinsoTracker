import {globalState} from "~/server/global-state";
import {diff} from "~/server/utils/date";

export default defineEventHandler(async () => {
    return Object.entries(globalState.list()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: {
            date: value.toISOString(),
            delay: diff(value).map(num => String(num).padStart(2, '0')).join(':')
        }
    }), {})
});
