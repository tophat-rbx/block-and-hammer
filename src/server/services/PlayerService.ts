import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";

@Service({})
export class PlayerService implements OnStart {
	public onJoin = new Signal<(player: Player) => void>();
	public onLeaving = new Signal<(player: Player, exitReason: Enum.PlayerExitReason) => void>();
	
	onStart(): void {
		Players.PlayerAdded.Connect((player) => this.onJoin.Fire(player));
		
		Players.PlayerRemoving.Connect((player, reason) => {
			player.SetAttribute("leaving", true);
			
			this.onLeaving.Fire(player, reason);
		});
	}
	
	public getPlayers(): Array<Player> {
		return Players.GetPlayers();
	}
}
