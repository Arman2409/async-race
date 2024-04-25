export const handleFetchError = (err: unknown) => {
    const { message = "Error Occured" } = { ...err || {} };
    console.error(`Error while fetching:${message}`);
    return false;
}