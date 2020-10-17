export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._array = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	addItem(element) {
		this._container.prepend(element);
	}

	setItem(element) {
		this._container.append(element);
	}

	renderItems() {
		this._array.forEach((item) => {
			this._renderer(item);
		});
	}
}
