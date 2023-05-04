
export const validateEmail = (email: string) => {
    return String(email)
        .trim()
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const validateNumberString = (numString: string | number) => {
    return /^\d+$/.test(numString.toString());
};


export function fieldFilters(listOfFields: any, obj: any) {
    let returnedObject = {}
    const fieldKeys = Object.keys(obj);
    let filteredFileds = fieldKeys.filter(e => {
        if ((listOfFields.includes(e))) return true
        return false
    });
    filteredFileds.forEach(elem => {
        returnedObject = { ...returnedObject, [elem]: obj[elem] }
    })
    return returnedObject;
}