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
		verticalLineBg.style.left = '300px'
		verticalLineBg.style.top = '0px'

		verticalLineBg.style.transform = `translate3d(0px, 0px, 0px)`
	
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
	
	
		async function setCorrectScroll(lineDom) {
			async function getTranslate3dValues(element) {
				const matrix = await element.style.transform
				let match
				if (matrix && (match = matrix.match(/^translate3d\((.+)\)$/))) {
					const values = match[1].split(', ')
					return [parseFloat(values[0]), parseFloat(values[1])]
				}
		
				return [0, 0]
			}

			const lineDOmTransformValue = await getTranslate3dValues(lineDom)
			if (lineDOmTransformValue !== undefined && lineDOmTransformValue.length == 2) {
				const [initialVerticalLinePosition, initialHorizontalLinePosition] = lineDOmTransformValue

				async function correctScroll() {
						if (initialVerticalLinePosition !== undefined && initialHorizontalLinePosition !== undefined) {
							const xScrollOffset = window.scrollX
							const yScrollOffset = window.scrollY
							if (xScrollOffset !== undefined && yScrollOffset !== undefined) {
								function updateLines() {
									console.log('aaaaaaaa', xScrollOffset, yScrollOffset)
									lineDom.style.transform = `translate3d(${initialVerticalLinePosition + xScrollOffset}px, ${initialHorizontalLinePosition + yScrollOffset}px, 0px)`
								}
								requestAnimationFrame(updateLines)
							} else {
								console.error('xScrollOffset or yScrollOffset undefined')
							}
						} else {
							console.error('initialVerticalLinePosition or initialHorizontalLinePosition undefined')
						}
				}
				
				window.addEventListener('scroll', correctScroll)
			} else {
				console.error('lineDOmTransformValue undefined')
			}
			

			
			
		}
		setCorrectScroll(verticalLineBg)


	
	
	
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
