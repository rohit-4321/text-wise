import { EventEmitter } from "./EventEmitter";
import { getOffSet } from "./selection";
import "../content.css";
import { TextAnalysisPopup } from "./TextAnalysisPopup";

function addBox(selection: Selection, textAnalysisPopUp: TextAnalysisPopup) {
	const position = getOffSet(selection);
	if (!position) return null;
	if (textAnalysisPopUp.existInDom()) return;

	const { x, y } = position;
	textAnalysisPopUp.createEl(x, y);
	textAnalysisPopUp.addToDom();

	const onOutsideClick = (ev: MouseEvent) => {
		if (!textAnalysisPopUp.containTargetNode(ev.target as Node)) {
			textAnalysisPopUp.removeFromDom();
			document.removeEventListener("click", onOutsideClick);
		}
	};
	document.addEventListener("click", onOutsideClick);
	textAnalysisPopUp.meaningButtonClick((ev) => {
		console.log("meaning click");
	});
	textAnalysisPopUp.bookmarkButtonClick((ev) => {
		console.log("Bookmark  click");
	});
}
export function init() {
	const text = new EventEmitter<string>("");
	const body = document.body;

	let timpeOutId: undefined | number = undefined;
	body.addEventListener("mousemove", (ev) => {
		clearTimeout(timpeOutId);
		timpeOutId = setTimeout(() => {
			const selection = window.getSelection();
			const windowSelection = selection?.toString();
			if (windowSelection && selection && selection.rangeCount > 0) {
				text.set(windowSelection);
				const textAnalysisPopUp = new TextAnalysisPopup();
				addBox(selection, textAnalysisPopUp);
			}
		}, 300);
	});
}
