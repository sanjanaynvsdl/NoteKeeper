// This method tests whether the email string matches the specified regex(regular-expression) pattern.
export const validateEmail=(email) => {
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
//The loop iterates up to the first two words (or fewer if there are less than two words) Math.min(words.len,2)
//This line adds the first character of each word to the intials string. words[i][0]
export const getIntials=(name) => {
    if(!name) return "";

    const words=name.split(" ");
    let intials=" ";
    for(let i=0;i<Math.min(words.length,2);i++) {
        intials+=words[i][0];
    }
    return intials;
}