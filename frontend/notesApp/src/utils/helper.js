export const validateEmail=(email) => {
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// This method tests whether the email string matches the specified regex(regular-expression) pattern.