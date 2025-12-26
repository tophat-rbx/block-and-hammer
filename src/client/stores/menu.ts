import { atom } from "@rbxts/charm";

export namespace MenuStore {
	export const stateAtom = atom<Enum.MenuState>(Enum.MenuState.None);
}
