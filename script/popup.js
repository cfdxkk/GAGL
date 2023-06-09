const getCurrentTab = async () => {
	let queryOptions = { active: true, lastFocusedWindow: true }
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	// @ts-ignore
	let [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

const getCurrentTabId = async () => {
	const currentTab = await getCurrentTab()
	if (currentTab && currentTab.id) {
		return currentTab.id
	} else {
		console.error('error when get active tag')
		return undefined
	}
}

const addVerticalLineOnYourPage = () => {
	getCurrentTabId().then(currentTabId => {
		// @ts-ignore
		chrome.scripting.executeScript({
      target : {tabId : currentTabId},
      files : [ "script/actions/addVerticalLine.js" ],
    })
    .then(() => console.log("addVerticalLine script injected"))
	})
}

const addVerticalLineButton = document.getElementById('add-vertical-line')
if (addVerticalLineButton) {
	addVerticalLineButton.addEventListener('click', addVerticalLineOnYourPage)
}


const addHorizontalLineOnYourPage = () => {
	getCurrentTabId().then(currentTabId => {
		// @ts-ignore
		chrome.scripting.executeScript({
      target : {tabId : currentTabId},
      files : [ "script/actions/addHorizontalLine.js" ],
    })
    .then(() => console.log("addHorizontalLine script injected"))
	})
}

const addHorizontalLineButton = document.getElementById('add-horizontal-line')
if (addHorizontalLineButton) {
	addHorizontalLineButton.addEventListener('click', addHorizontalLineOnYourPage)
}


const removeAllLines = () => {
	getCurrentTabId().then(currentTabId => {
		// @ts-ignore
		chrome.scripting.executeScript({
      target : {tabId : currentTabId},
      files : [ "script/actions/removeAllLines.js" ],
    })
    .then(() => console.log("removeAllLines script injected"))
	})
}

const removeAllLinesButton = document.getElementById('remove-all-lines')
if (removeAllLinesButton) {
	removeAllLinesButton.addEventListener('click', removeAllLines)
}




