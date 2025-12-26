import { Controller, OnStart } from "@flamework/core";
import { StarterGui } from "@rbxts/services";
import { CharacterController } from "client/controllers/CharacterController";

@Controller({})
export class CoreGUIController implements OnStart {
	constructor(
		private readonly characterController: CharacterController,
	) {}
	
	onStart(): void {
		while (true) {
			try {
				StarterGui.SetCore("ResetButtonCallback", this.characterController.resetCallbackEvent);
				
				StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Health, false);
				StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Captures, false);
				StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);
				StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.EmotesMenu, false);
				StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.SelfView, false);
				
				break;
			} catch {
				task.wait(0.5);
			}
		}
	}
}
