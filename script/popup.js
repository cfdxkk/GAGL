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
		console.log('error when get active tag')
		return undefined
	}
}

const addVerticalLineOnYourPageTrigger = () => {
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
	addVerticalLineButton.addEventListener('click', addVerticalLineOnYourPageTrigger)
}


const addHorizontalLineOnYourPageTrigger = () => {
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
	addHorizontalLineButton.addEventListener('click', addHorizontalLineOnYourPageTrigger)
}


const removeAllLinesTrigger = () => {
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
	removeAllLinesButton.addEventListener('click', removeAllLinesTrigger)
}




