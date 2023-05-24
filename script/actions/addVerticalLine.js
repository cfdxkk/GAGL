async function addVerticalLine() {
	const bodyDom = document.body
	const verticalLineBgId = `gagl-vertical-line-bg`
	const verticalLineId = `gagl-vertical-line`
	const gaglLineBgClass = `gagl-line-bg`
	let verticalLinePosition = 300
	
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
		verticalLineBg.style.height = '100$'
	
		verticalLineBg.style.position = 'fixed'
		verticalLineBg.style.transform = `translate3d(${verticalLinePosition}px, 0, 0)`
		verticalLineBg.style.left = '0px'
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

		async function makeGuideLine(element, isVerticalLine = true) {

			async function getTranslate3dValues(element) {
				// const style = window.getComputedStyle(element)
				// console.log('style', style)
				// const matrix = style.transform 
				const matrix = await element.style.transform
				console.log('matrix', matrix)
				let match
				console.log(`matrix.match(/^matrix3d\((.+)\)$/)`, matrix.match(/^translate3d\((.+)\)$/))
				// if (matrix) {
				if (matrix && (match = matrix.match(/^translate3d\((.+)\)$/))) {
					console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
					const values = match[1].split(', ')
					return [parseFloat(values[0]), parseFloat(values[1])]
				}
		
				return [0, 0]
			}

			let linePosition = isVerticalLine ? getTranslate3dValues(element)[0] : getTranslate3dValues(element)[1]
			let isDragging = false
			console.log('linePosition', linePosition)
			console.log('verticalLineBg.style.transform', element.style.transform)
			console.log('getTranslate3dValues(element)', await getTranslate3dValues(element))

			element.addEventListener('mousedown', () => {
				isDragging = true
				mouseIsDown = true
			})

			window.addEventListener('mouseup', () => {
				isDragging = false
				mouseIsDown = false
			})

			window.addEventListener('mousemove', (event) => {
				if (isDragging) {
					linePosition = isVerticalLine ? event.clientX : event.clientY
					element.style.transform = isVerticalLine ? `translate3d(${linePosition}px, 0, 0)` : `translate3d(0, ${linePosition}px, 0)`
				}
			})

			function updateLine() {
				if (!isDragging) {
					element.style.transform = isVerticalLine ? `translate3d(${linePosition - window.scrollX}px, 0, 0)` : `translate3d(0, ${window.scrollY + linePosition}px, 0)`
				}

				requestAnimationFrame(updateLine)
			}

			requestAnimationFrame(updateLine)
		}

		await makeGuideLine(verticalLineBg, true)
	
	
	
	
		const verticalLine = document.createElement('div')
	
		verticalLine.id = verticalLineId
	
		verticalLine.style.width = '2px'
		verticalLine.style.height = '100vh'
	
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
	}	
}

addVerticalLine()
