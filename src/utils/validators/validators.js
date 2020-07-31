export const required = value => {
    if (value) return undefined;
    return "Заполните поле!";
}

export const checked = value =>{
    if (value !== true) return "Примите условия"
    return undefined
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
