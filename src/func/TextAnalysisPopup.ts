const generateButtonHtml = (bookmark: string, meaning: string) => {
	return `<button class="flex-item" id="__meaning__">
        <img src=${meaning} width="22px" />
        <span>Meaning</span>
    </button>

    <button class="flex-item" id="__bookmark__">
        <img src=${bookmark} width="15px" />
        <span>Bookmark</span>
    </button>`;
};
export class TextAnalysisPopup {
	private _box: HTMLDivElement;
	constructor() {
		this._box = document.createElement("div");
		this._box.className = "__box__";
	}
	createEl(x: number, y: number) {
		this._box.style.setProperty("--y", `${y}px`);
		this._box.style.setProperty("--x", `${x}px`);

		const meaning = chrome.runtime.getURL("assets/meaning.png");
		const bookMarkPath = chrome.runtime.getURL("assets/bookmark.png");

		this._box.innerHTML = generateButtonHtml(bookMarkPath, meaning);
	}
	addToDom() {
		document.documentElement.appendChild(this._box);
	}
	existInDom() {
		return Boolean(document.querySelector(".__box__"));
	}
	removeFromDom() {
		document.documentElement.removeChild(this._box);
	}
	onOutSideClick(ev: MouseEvent) {
		this.removeFromDom();
	}

	containTargetNode(node: Node) {
		return this._box.contains(node);
	}
	meaningButtonClick(func: (ev: MouseEvent) => void) {
		const meaningButton = this._box.querySelector(
			"#__meaning__",
		) as HTMLButtonElement;
		meaningButton.addEventListener("click", func);
	}

	bookmarkButtonClick(func: (ev: MouseEvent) => void) {
		const bookmarkButton = this._box.querySelector(
			"#__bookmark__",
		) as HTMLButtonElement;
		bookmarkButton.addEventListener("click", func);
	}
}
