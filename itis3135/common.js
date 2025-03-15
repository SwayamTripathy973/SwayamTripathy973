async function loadHeaderFooter() {
    const currentPath = window.location.pathname;

    // List of folders to exclude
    const excludedFolders = ['/stuff/', '/NewBoardGames/', '/Tripathywebsolutions.co/'];

    // Check if the current path starts with any of the excluded folders
    if (excludedFolders.some(folder => currentPath.startsWith(folder))) {
        return; // Exit the function if it's an excluded folder
    }

    try {
        const headerResponse = await fetch('header.html');
        const footerResponse = await fetch('footer.html');

        if (!headerResponse.ok || !footerResponse.ok) {
            throw new Error('Failed to load header or footer');
        }

        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();

        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        document.body.insertAdjacentHTML('beforeend', footerHtml);
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

loadHeaderFooter();
