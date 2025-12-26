import { atom } from "@rbxts/charm";
import { UserInputService } from "@rbxts/services";

export namespace InputStore {
	export function getPlatformType(lastInputType: Enum.UserInputType = UserInputService.GetLastInputType()): Enum.PlatformType {
		if (lastInputType === Enum.UserInputType.Touch || lastInputType === Enum.UserInputType.TextInput) {
			return Enum.PlatformType.Mobile;
		}
		
		return Enum.PlatformType.Desktop;
	}
	
	export const platformTypeAtom = atom<Enum.PlatformType>(getPlatformType());
	export const mouseProcessedAtom = atom<boolean>(false);
}
