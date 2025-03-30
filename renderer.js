// This file is required by the index.html file and will
// be executed in the renderer process for that window.

// Listen for messages from the main process
if (window.ipc) {
    window.ipc.receive('perform-search', (query) => {
        window.dispatchEvent(new CustomEvent('message', {
            detail: {
                type: 'perform-search',
                query: query
            }
        }));
    });

    window.ipc.receive('perform-navigation', (url) => {
        window.dispatchEvent(new CustomEvent('message', {
            detail: {
                type: 'perform-navigation',
                url: url
            }
        }));
    });
} 