export const isEmailValid = (text) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return reg?.test(text)
}

export const isStrongPassword = (text) => {
    // password should be 6 digits and have one capital, one special char and a number
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{6,}$/
    return strongPasswordRegex?.test(text)
}

export const isValidNumber = (text) => {
    //validate internation phone numbers
    const validPhoneRegex = /^\+?(\d{1,4})?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/
    return validPhoneRegex?.test(text)
}