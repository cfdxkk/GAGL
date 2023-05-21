async function removeAllLines() {
	const gaglLineBgClass = `gagl-line-bg`
	const lineDoms = await document.getElementsByClassName(gaglLineBgClass)
	if (lineDoms && lineDoms.length > 0) {
		const lineDOmsArray = []
		for(let i = 0; i < lineDoms.length; i++) {
			lineDOmsArray.push(lineDoms[i])
		}
		if (lineDOmsArray && lineDOmsArray.length > 0) {
			for (let j = 0; j < lineDOmsArray.length; j++) {
				lineDOmsArray[j].remove()
			}
		}
	}
}

removeAllLines()
