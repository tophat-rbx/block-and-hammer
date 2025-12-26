import { cleanup } from "@rbxts/vide";

export function event<T extends RBXScriptSignal>(event: T, callback: Parameters<T["Connect"]>[0]): void {
	cleanup(event.Connect(callback));
}
