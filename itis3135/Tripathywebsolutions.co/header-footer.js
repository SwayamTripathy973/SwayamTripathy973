async function loadHeaderFooter() { 
    const currentPath = window.location.pathname;
    const excludedFolders = ['/stuff/', '/NewBoardGames/']; // Removed '/Tripathywebsolutions.co/'
    if (excludedFolders.some((folder) => currentPath.startsWith(folder))) {
        return;
    }
    try {
        const headerResponse = await fetch('../components/header.html');
        const footerResponse = await fetch('../components/footer.html');
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
