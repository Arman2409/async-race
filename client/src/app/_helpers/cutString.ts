const cutString = (word: string, lettersCount: number) => {
    if (typeof word === "string") {
        if (word?.length <= lettersCount) return word;
        return word.slice(0, lettersCount) + "...";
    } else {
        return "";
    }
};

export default cutString;