import { Controller, OnStart } from "@flamework/core";
import { effect, peek } from "@rbxts/charm";
import { UserInputService } from "@rbxts/services";
import { InputStore } from "client/stores/input";
import { MenuStore } from "client/stores/menu";

@Controller({})
export class InputController implements OnStart {
	onStart(): void {
		effect(() => {
			const platformType = InputStore.platformTypeAtom();
			
			print("platformType:", platformType);
			
			if (platformType === Enum.PlatformType.Mobile) {
				InputStore.mouseProcessedAtom(false);
			}
		});
		
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) {
				return;
			}
			
			if (input.KeyCode === Enum.KeyCode.B) {
				const menuState = peek(MenuStore.stateAtom);
				
				MenuStore.stateAtom(menuState === Enum.MenuState.None ? Enum.MenuState.Menu : Enum.MenuState.None);
			}
		});
		
		UserInputService.InputChanged.Connect((input, gameProcessed) => {
			if (input.UserInputType === Enum.UserInputType.MouseMovement) {
				InputStore.mouseProcessedAtom(gameProcessed);
			}
		});
	}
}
