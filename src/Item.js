class Item {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.selected = false;
	}

	select() {
		const selected = getSelected();
		setSelected(this);
	}
}
default export Item;
