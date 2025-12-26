import { Workspace } from "@rbxts/services";

export const Camera = Workspace.CurrentCamera ?? Workspace.WaitForChild("Camera");
