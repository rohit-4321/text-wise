export type Listener<K> = (value: K, prev: K) => void;
export class EventEmitter<T extends string> {
	private _proxy: T;
	private listener: Listener<T>[];
	constructor(value: T) {
		this._proxy = value;
		this.listener = [];
	}

	public onChange(func: Listener<T>) {
		this.listener.push(func);
		return () => {
			const ind = this.listener.indexOf(func);
			this.listener.splice(ind, 1);
		};
	}
	public set(value: T) {
		this._proxy = value;
		console.debug("Setting ", value);
		return this._proxy;
	}
}
