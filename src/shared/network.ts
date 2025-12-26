import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	requestRespawn: () => void;
	quickReset: () => void;
}

interface ServerToClientEvents {
	
}

interface ClientToServerFunctions {
	
}

interface ServerToClientFunctions {
	
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
