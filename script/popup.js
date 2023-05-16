const getCurrentTab = async () => {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

const getCurrentTabId = async () => {
	const currentTab = await getCurrentTab()
	if (currentTab && currentTab.id) {
		return currentTab.id
	} else {
		console.log('error when get active gat')
		return undefined
	}
}

const addLineOnYourPage = () => {
	getCurrentTabId().then(currentTabId => {
		chrome.scripting.executeScript({
      target : {tabId : currentTabId},
      files : [ "script/actions/addLine.js" ],
    })
    .then(() => console.log("script injected"));
	})
}

const addLineButton = document.getElementById('add-line')
if (addLineButton) {
	addLineButton.addEventListener('click', addLineOnYourPage)
}

