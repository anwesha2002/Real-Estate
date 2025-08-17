export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
        // month: 'short',
        // day: 'numeric',
        // year: 'numeric'

        hour: '2-digit',
        minute: '2-digit',


    });
};