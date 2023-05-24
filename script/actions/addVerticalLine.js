function addVerticalLine() {
	const bodyDom = document.body
	const verticalLineBgId = `gagl-vertical-line-bg`
	const verticalLineId = `gagl-vertical-line`
	const gaglLineBgClass = `gagl-line-bg`
	
	let mouseIsDown = false
	
	const verticalLineBgMouseOverEvent = () => {
		const verticalLineBgDom = document.getElementById(verticalLineBgId)
		if (verticalLineBgDom) {
			verticalLineBgDom.style.backgroundColor = '#C0C0C030'
		}
	}
	
	const verticalLineBgMouseOutEvent = (e) => {
		if (!mouseIsDown) {
			const verticalLineBgDom = document.getElementById(verticalLineBgId)
			if (verticalLineBgDom) {
				verticalLineBgDom.style.backgroundColor = '#00000000'
			}
		}
	}
	
	
	
	
	const verticalLineBgDom = document.getElementById(verticalLineBgId)
	if (bodyDom && !verticalLineBgDom) {
		const verticalLineBg = document.createElement('div')
	
		verticalLineBg.id = verticalLineBgId
		verticalLineBg.className = gaglLineBgClass
	
		verticalLineBg.style.width = '16px'
		verticalLineBg.style.height = '100vh'
	
		verticalLineBg.style.position = 'absolute'
		const windowScrollOffset = window.pageXOffset || 0
		verticalLineBg.style.left = `${windowScrollOffset + 300}px`
		verticalLineBg.style.top = '0px'
	
		verticalLineBg.style.cursor = 'col-resize'
	
		verticalLineBg.style.backgroundColor = '#00000000'
	
		verticalLineBg.style.display = 'flex'
		verticalLineBg.style.justifyContent = 'center'
		verticalLineBg.style.alignItems = 'center'
		verticalLineBg.style.flexDirection = 'column'
	
		verticalLineBg.style.zIndex = '9999'
	
		verticalLineBg.addEventListener('mouseover', verticalLineBgMouseOverEvent)
		verticalLineBg.addEventListener('mouseout', verticalLineBgMouseOutEvent)
	
		let active = false
		let currentX
		let initialX
		let xOffset = 0
	
		const dragStart = (e) => {
			mouseIsDown = true
			initialX = e.clientX - xOffset
			if (e.target === verticalLineBg) {
				active = true
			}
		}
	
		const dragEnd = (e) => {
			mouseIsDown = false
			initialX = currentX
			active = false
		}
	
		const drag = (e) => {
			if (active) {
				e.preventDefault()
				currentX = e.clientX - initialX
				xOffset = currentX
				setTranslate(currentX)
			}
		}
	
		const setTranslate = (xPos) => {
			requestAnimationFrame(() => {
				verticalLineBg.style.transform = `translate3d(${xPos}px, 0, 0)`
			})
		}
	
		verticalLineBg.addEventListener("mousedown", dragStart, false)
		document.addEventListener("mouseup", dragEnd, false)
		document.addEventListener("mousemove", drag, false)
	
	
	
	
	
	
		const verticalLine = document.createElement('div')
	
		verticalLine.id = verticalLineId
	
		verticalLine.style.width = '2px'
		verticalLine.style.height = '100%'
	
		verticalLine.style.backgroundColor = '#00D875C0'
	
		verticalLine.style.pointerEvents = 'none'
	
		verticalLineBg.appendChild(verticalLine)
	
	
	
	
		// // 如果元素被移除，我们需要停止监听以防止内存泄露
		// const observer = new MutationObserver((mutations) => {
		// 	mutations.forEach((mutation) => {
		// 		if (!document.contains(verticalLineBg)) {
		// 			document.removeEventListener("mouseup", dragEnd, false)
		// 			document.removeEventListener("mousemove", drag, false)
		// 			verticalLineBg.removeEventListener("mousedown", dragStart, false)
		// 			observer.disconnect()
		// 		}
		// 	})
		// })
	
		// observer.observe(document, { childList: true, subtree: true })
	
	
	
		bodyDom.appendChild(verticalLineBg)


		// 动态监听 body 的高度，并随之改变辅助线的高度
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const bodyHeight = entry.target.scrollHeight
				verticalLineBg.style.height = `${bodyHeight}px`
			}
		})

		resizeObserver.observe(document.body)
	}	
}

addVerticalLine()


