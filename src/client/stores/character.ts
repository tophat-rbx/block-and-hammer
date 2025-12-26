import { atom } from "@rbxts/charm";

export namespace CharacterStore {
	export const characterAtom = atom<CharacterModel>();
	export const inputModeAtom = atom<Enum.CharacterInputMode>(Enum.CharacterInputMode.Screen);
	
	export namespace Hammer {
		export const relativePositionAtom = atom<Vector3>(Vector3.zero);
	}
}
