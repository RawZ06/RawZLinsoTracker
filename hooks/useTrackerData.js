import {ref} from "vue";


export function useTrackerData(tracker) {
    const data = ref(null);
    const loading  = ref(true);

    const load = () => {
        fetch('/sources/' + tracker + '/tracker.json').then(async (res) => {
            try {
                data.value = await res.json();
                loading.value = false;
            } catch (error) {
                //failed loading is always true
            }
        })
    }

    return {data, load, loading}
}