import { OnStart, Service } from "@flamework/core";

@Service({})
export class AnticheatService implements OnStart {
	onStart(): void {
		// TODO:
		// cube/hammer velocity detection
		// detection for when hammer is too far away
	}
}
