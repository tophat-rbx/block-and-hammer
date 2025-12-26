import { Flamework, OnStart, Service } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { throttle } from "@rbxts/set-timeout";
import { Events } from "server/network";
import { PlayerService } from "server/services/PlayerService";
import computeNameColor from "shared/utilities/name-color";

const CharacterModel = Flamework.createGuard<CharacterModel>();

@Service({})
export class CharacterService implements OnStart {
	constructor(
		private readonly PlayerService: PlayerService,
	) {}
	
	onStart(): void {
		for (const player of this.PlayerService.getPlayers()) {
			this.respawnPlayer(player);
		}
		
		const throttledOnRequestRespawn = throttle((player: Player) => {
			player.Character?.Destroy();
		}, 1);
		
		this.PlayerService.onJoin.Connect((player) => {
			this.respawnPlayer(player);
		});
		
		Events.requestRespawn.connect((player) => throttledOnRequestRespawn(player));
		
		Events.quickReset.connect((player) => {
			const character = player.Character;
			
			if (!CharacterModel(character)) {
				return;
			}
			
			character.SetAttribute("time", Workspace.GetServerTimeNow());
		});
	}
	
	public respawnPlayer(player: Player): void {
		if (player.GetAttribute("leaving")) {
			return;
		}
		
		const color = computeNameColor(player.Name);
		
		const character = ReplicatedStorage.Assets.Character.Clone();
		character.Name = player.Name;
		character.Body.Color = color;
		character.Range.SurfaceTopGui.Enabled = false;
		character.Range.SurfaceOccludedGui.Enabled = false;
		character.Parent = Workspace;
		
		character.Body.SetNetworkOwner(player);
		
		character.SetAttribute("time", Workspace.GetServerTimeNow());
		
		player.Character = character;
		
		character.Destroying.Once(() => {
			if (player.Character !== character) {
				return;
			}
			
			player.Character = undefined;
			
			this._onDeath(player);
		});
		
		character.DescendantRemoving.Connect(() => {
			if (CharacterModel(character) || player.Character !== character) {
				return;
			}
			
			player.Character = undefined;
			(character as Model).Destroy();
			
			this._onDeath(player);
		});
	}
	
	private _onDeath(player: Player): void {
		this.respawnPlayer(player);
	}
}
