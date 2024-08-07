export const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "No due date";
    const dateObject = date instanceof Date ? date : new Date(date);
    return isNaN(dateObject.getTime()) ? "Invalid date" : dateObject.toDateString();
};