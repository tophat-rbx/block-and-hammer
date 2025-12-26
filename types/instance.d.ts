type Combinator =
	| ">"
	| ">>";

type LastInstance<T> =
	T extends `${string}${Combinator | " "}${infer K}`
		? K extends ""
			? Instance
			: K extends `${infer V}${"#" | "." | "["}${string}`
				? LastInstance<V>
				: LastInstance<K>
	: T extends keyof Instances
		? Instances[T]
		: Instance;

type QueryReturn<T> =
	T extends `${infer Left},${infer Right}`
		? LastInstance<Left> | QueryReturn<Right>
		: LastInstance<T>

interface Instance {
	readonly __attributes: Record<string, AttributeValue>;
	WaitForChild<K extends ExtractKeys<this, Instance> = ExtractKeys<this, Instance>>(childName: K): this[K];
	WaitForChild<K extends ExtractKeys<this, Instance> = ExtractKeys<this, Instance>>(childName: K, timeout: number): this[K] | undefined;
	WaitForChild<T extends Instance = Instance>(childName: string): T;
	WaitForChild<T extends Instance = Instance>(childName: string, timeout: number): T | undefined;
	FindFirstChild<K extends ExtractKeys<this, Instance> = ExtractKeys<this, Instance>>(childName: K, recursive?: boolean): this[K];
	FindFirstChild<T extends Instance = Instance>(childName: string | number, recursive?: boolean): T | undefined;
	FindFirstAncestor<T extends Instance = Instance>(name: string | number): T | undefined;
	FindFirstDescendant<T extends Instance = Instance>(name: string | number): T | undefined;
	GetAttribute<T extends Record<string, AttributeValue> = this["__attributes"], K extends keyof T = keyof T>(attribute: K): AttributeValue | undefined;
	SetAttribute<T extends Record<string, AttributeValue> = this["__attributes"], K extends keyof T = keyof T>(attribute: K, value: T[K]): void;
	QueryDescendants<T extends string = keyof Instances>(selector: T): Array<QueryReturn<T>>;
}
