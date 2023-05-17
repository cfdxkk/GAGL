export const getCurrentTab = async () => {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

export const getCurrentTabId = async () => {
	const currentTab = await getCurrentTab()
	if (currentTab && currentTab.id) {
		return currentTab.id
	} else {
		console.log('error when get active gat')
		return undefined
	}
}