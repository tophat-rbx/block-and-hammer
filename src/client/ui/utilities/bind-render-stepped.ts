import { HttpService, RunService } from "@rbxts/services";
import { cleanup } from "@rbxts/vide";

export function bindRenderStepped(priority: number, callback: (deltaTime: number) => void): void {
	const id = HttpService.GenerateGUID();
	
	RunService.BindToRenderStep(id, priority, callback);
	
	cleanup(() => RunService.UnbindFromRenderStep(id));
}
