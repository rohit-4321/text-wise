// console.log("range.startContainer", range.startContainer);
// console.log("range.endContainer", range.endContainer);
// console.log("range.startOffset", range.startOffset);
// console.log("range.endOffset", range.endOffset);
// console.log("range.getBoundingClientRect()", range.getBoundingClientRect());
// console.log("range.getClientRects()", range.getClientRects());
// console.log("selection.anchorNode", selection.anchorNode);
// console.log(
//     "selection.anchorNode?.parentNode",
//     selection.anchorNode?.parentNode,
// );
// console.log("selection.focusNode", selection.focusNode);
// console.log(
//     "selection.focusNode?.parentNode",
//     selection.focusNode?.parentNode,
// );
// console.log("selection.focusOffset", selection.focusOffset);

// console.log("range.cloneContents()", range.cloneContents());
// const fragment = range.cloneContents();
// const middleContainers = Array.from(fragment.childNodes);

// console.log("Middle containers:", middleContainers);
export function getOffSet(selection: Selection) {
	const range = selection.getRangeAt(0).cloneRange();
	const { x, y } = range.getBoundingClientRect();
	if (range.startContainer === range.endContainer) {
		return { x, y };
	}
	return null;
}
