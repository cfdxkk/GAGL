function addHorizontalLine() {
	const bodyDom = document.body
	const horizontalLineBgId = `gagl-horizontal-line-bg`
	const horizontalLineId = `gagl-horizontal-line`
	
	let mouseIsDown = false
	
	const horizontalLineBgMouseOverEvent = () => {
		const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
		if (horizontalLineBgDom) {
			horizontalLineBgDom.style.backgroundColor = '#C0C0C030'
		}
	}
	
	const horizontalLineBgMouseOutEvent = (e) => {
		if (!mouseIsDown) {
			const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
			if (horizontalLineBgDom) {
				horizontalLineBgDom.style.backgroundColor = '#00000000'
			}
		}
	}
	
	
	
	
	const horizontalLineBgDom = document.getElementById(horizontalLineBgId)
	if (bodyDom && !horizontalLineBgDom) {
		const horizontalLineBg = document.createElement('div')
	
		horizontalLineBg.id = horizontalLineBgId
	
		horizontalLineBg.style.width = '100vw'
		horizontalLineBg.style.height = '16px'
	
		horizontalLineBg.style.position = 'fixed'
		horizontalLineBg.style.left = '0px'
		horizontalLineBg.style.top = '300px'
	
		horizontalLineBg.style.cursor = 'row-resize'
	
		horizontalLineBg.style.backgroundColor = '#00000000'
	
		horizontalLineBg.style.display = 'flex'
		horizontalLineBg.style.justifyContent = 'center'
		horizontalLineBg.style.alignItems = 'center'
		horizontalLineBg.style.flexDirection = 'row'
	
		horizontalLineBg.style.zIndex = '9999'
	
		horizontalLineBg.addEventListener('mouseover', horizontalLineBgMouseOverEvent)
		horizontalLineBg.addEventListener('mouseout', horizontalLineBgMouseOutEvent)
	
		let active = false
		let currentY
		let initialY
		let yOffset = 0
	
		const dragStart = (e) => {
			mouseIsDown = true
			initialY = e.clientY - yOffset
			if (e.target === horizontalLineBg) {
				active = true
			}
		}
	
		const dragEnd = (e) => {
			mouseIsDown = false
			initialY = currentY
			active = false
		}
	
		const drag = (e) => {
			if (active) {
				e.preventDefault()
				currentY = e.clientY - initialY
				yOffset = currentY
				setTranslate(currentY)
			}
		}
	
		const setTranslate = (yPos) => {
			requestAnimationFrame(() => {
				horizontalLineBg.style.transform = `translate3d(0, ${yPos}px, 0)`
			})
		}
	
		horizontalLineBg.addEventListener("mousedown", dragStart, false)
		document.addEventListener("mouseup", dragEnd, false)
		document.addEventListener("mousemove", drag, false)
	
	
	
	
	
	
		const horizontalLine = document.createElement('div')
	
		horizontalLine.id = horizontalLineId
	
		horizontalLine.style.width = '100vw'
		horizontalLine.style.height = '2px'
	
		horizontalLine.style.backgroundColor = '#00D875C0'
	
		horizontalLine.style.pointerEvents = 'none'
	
		horizontalLineBg.appendChild(horizontalLine)
	
	
	
	
		// // 如果元素被移除，我们需要停止监听以防止内存泄露
		// const observer = new MutationObserver((mutations) => {
		// 	mutations.forEach((mutation) => {
		// 		if (!document.contains(horizontalLineBg)) {
		// 			document.removeEventListener("mouseup", dragEnd, false)
		// 			document.removeEventListener("mousemove", drag, false)
		// 			horizontalLineBg.removeEventListener("mousedown", dragStart, false)
		// 			observer.disconnect()
		// 		}
		// 	})
		// })
	
		// observer.observe(document, { childList: true, subtree: true })
	
	
	
		bodyDom.appendChild(horizontalLineBg)
	}	
}

addHorizontalLine()
