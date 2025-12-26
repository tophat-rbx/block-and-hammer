declare namespace Enum {
	export const enum PlatformType {
		Mobile,
		Desktop,
	}
	
	export const enum CharacterInputMode {
		Screen,
		World,
	}
	
	export const enum GuiDisplayOrder {
		Nametags = 1,
		HUD = 2,
		Topbar = 40, // for topbar+
		Cursor = 50,
	}
	
	export const enum RenderSteppedPriority {
		Mouse = 1,
		HUDTimer = 2,
	}
	
	export const enum MenuState {
		None,
		Menu,
		Settings,
		LevelSelect,
		Customization,
		Spectate,
	}
}
