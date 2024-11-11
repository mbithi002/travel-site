export const validateAndFormatPhoneNumber = (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber?.trim();
    const phoneRegex = /^(07|01)\d{8}$/;

    if (!formattedPhoneNumber || !phoneRegex.test(formattedPhoneNumber)) {
        return null;
    }

    return `254${formattedPhoneNumber.slice(1)}`;
};