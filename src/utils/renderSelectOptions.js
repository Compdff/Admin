export default function renderSelectOptions(
    array,
    value,
    label,
    additionalLabel,
) {
    let newArray = []

    if (additionalLabel === undefined) {
        newArray = array.map((item) => {
            return {
                value: item[value],
                label: item[label],
            }
        })
    } else {
        newArray = array.map((item) => {
            return {
                value: item[value],
                label: item[label] + ' (' + item[additionalLabel] + ')',
            }
        })
    }
    return newArray
}
