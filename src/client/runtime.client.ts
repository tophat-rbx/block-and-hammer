import { Flamework } from "@flamework/core";
import { UserInputService } from "@rbxts/services";

UserInputService.MouseIcon = "rbxassetid://85281168294273";
UserInputService.MouseIconEnabled = false;

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");

Flamework.ignite();
