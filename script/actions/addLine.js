// async function getCurrentTab() {
// 	let queryOptions = { active: true, lastFocusedWindow: true };
// 	// `tab` will either be a `tabs.Tab` instance or `undefined`.
// 	let [tab] = await chrome.tabs.query(queryOptions);
// 	return tab;
// }

// async function getCurrentTabId() {
// 	const currentTab = await getCurrentTab()
// 	if (currentTab && currentTab.id) {
// 		return currentTab.id
// 	} else {
// 		console.log('error when get active gat')
// 		return undefined
// 	}
// }

const bodyDom = document.body
const horizontalLineBgId = `gagl-horizon-line-bg`
const horizontalLineId = `gagl-horizon-line`

const horizontalLineBgMouseOverEvent = () => {
	const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
	if (horizontalLineBgDom) {
		horizontalLineBgDom.style.backgroundColor = '#FF000020'
	}
}

const horizontalLineBgMouseOutEvent = () => {
	const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
	if (horizontalLineBgDom) {
		horizontalLineBgDom.style.backgroundColor = 'red'
	}
}

const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
if (bodyDom && !horizontalLineBgDom) {
	const horizontalLineBg = document.createElement('div')

	horizontalLineBg.id = horizontalLineBgId

	horizontalLineBg.style.width = '16px'
	horizontalLineBg.style.height = '100vh'

	horizontalLineBg.style.position = 'fixed'
	horizontalLineBg.style.left = '30px'
	horizontalLineBg.style.top = '0px'

	horizontalLineBg.style.cursor = 'col-resize'

	horizontalLineBg.style.backgroundColor = 'red'

	horizontalLineBg.style.display = 'flex'
	horizontalLineBg.style.justifyContent = 'center'
	horizontalLineBg.style.alignItems = 'center'
	horizontalLineBg.style.flexDirection = 'column'

	horizontalLineBg.addEventListener('mouseover', horizontalLineBgMouseOverEvent)
	horizontalLineBg.addEventListener('mouseout', horizontalLineBgMouseOutEvent)




	const horizontalLine = document.createElement('div')

	horizontalLine.id = horizontalLineId

	horizontalLine.style.width = '2px'
	horizontalLine.style.height = '100vh'

	horizontalLine.style.backgroundColor = 'green'

	horizontalLineBg.appendChild(horizontalLine)




	console.log('aaaaaaaaaaaaaaaaaaaaaaa')
	bodyDom.appendChild(horizontalLineBg)
}
console.log('bbbbbbbbbbbbbb', bodyDom, horizontalLineBgId)

