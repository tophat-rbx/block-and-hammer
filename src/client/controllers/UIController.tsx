import { Controller, OnStart } from "@flamework/core";
import { mount } from "@rbxts/vide";
import App from "client/ui/components/App";
import { Client } from "client/utilities/player";

@Controller({})
export class UIController implements OnStart {
	onStart(): void {
		mount(App, Client.PlayerGui);
	}
}
