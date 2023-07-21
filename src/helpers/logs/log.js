export function log(type, layer, method, message, fileName) {
    const timestamp = new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' | ' + new Date().toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    let logColor = '';

    // Set the color based on the log type
    switch (type.toLowerCase()) {
        case 'error':
            logColor = '\x1b[31m'; // Red color
            break;
        case 'warning':
            logColor = '\x1b[33m'; // Yellow color
            break;
        case 'info':
            logColor = '\x1b[36m'; // Cyan color
            break;
        case 'success':
            logColor = '\x1b[32m'; // Green color
            break;
        case 'debug':
            logColor = '\x1b[34m'; // Blue color
            break;
        default:
            logColor = '\x1b[0m'; // Reset color
    }

    // Log the message with the color, timestamp, fileName, type, layer, and method
    console.log(`${logColor}${timestamp} :: ${logColor}${fileName} :: ${type} :: ${layer} :: ${method} :: ${JSON.stringify(message)}\x1b[0m`);
}
