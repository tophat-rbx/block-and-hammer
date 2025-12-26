import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

const getPlayerFromCharacter = (character: Instance) => {
	return Players.GetPlayerFromCharacter(character) ?? Players.FindFirstChild(character.Name);
};

@Component({ tag: "CharacterModel", predicate: (instance) => getPlayerFromCharacter(instance) !== undefined })
export class CharacterComponent extends BaseComponent<{}, CharacterModel> implements OnStart {
	public player!: Player;
	
	onStart(): void {
		this.player = getPlayerFromCharacter(this.instance)!;
		
		// print("character created:", this.instance);
	}
}
