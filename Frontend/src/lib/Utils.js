export const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

export const formatTime = (createdAt) => {
    const date = new Date(createdAt);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}