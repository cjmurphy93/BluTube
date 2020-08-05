export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';

export const openSidebar = page => ({
    type: OPEN_SIDEBAR,
    page
});

export const closeSidebar = page => ({
    type: CLOSE_SIDEBAR,
    page
});
