async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

async function getCurrentTabId() {
	const currentTab = await getCurrentTab()
	if (currentTab && currentTab.id) {
		return currentTab.id
	} else {
		console.log('error when get active gat')
		return undefined
	}
}


getCurrentTabId().then(tabId => {
	const bodyDom = document.body
	const horizontalLineBgId = `gagl-${tabId}`
	console.log('horizontalLineBgId', horizontalLineBgId)
	if (bodyDom) {
		const horizontalLineBg = document.createElement('div')

		horizontalLineBg.id = horizontalLineBgId

		horizontalLineBg.style.width = '20px'
		horizontalLineBg.style.height = '100vh'
		horizontalLineBg.style.backgroundColor = 'red'
		horizontalLineBg.addEventListener('mouseover', horizontalLineBgMouseOverEvent)
		horizontalLineBg.addEventListener('mouseover', horizontalLineBgMouseOutEvent)

		bodyDom.appendChild(horizontalLineBg)
	}


	const horizontalLineBgMouseOverEvent = () => {
		const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
		if (horizontalLineBgDom) {
			dom.style.backgroundColor = '#FF000020'
		}
	}

	const horizontalLineBgMouseOutEvent = () => {
		const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
		if (horizontalLineBgDom) {
			dom.style.backgroundColor = 'red'
		}
	}

})
