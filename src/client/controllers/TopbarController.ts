import { Controller, OnStart } from "@flamework/core";
import { effect, peek } from "@rbxts/charm";
import { MenuStore } from "client/stores/menu";
import Icon from "shared/modules/Icon";
import { Fonts } from "shared/utilities/fonts";

@Controller({})
export class TopbarController implements OnStart {
	onStart(): void {
		Icon.setDisplayOrder(Enum.GuiDisplayOrder.Topbar);
		Icon.modifyBaseTheme(["IconLabel", "FontFace", Fonts.Inter.Bold]);
		
		const menuIcon = new Icon()
			.setLabel("Menu");
		
		const subMenuIcons = [
			new Icon()
				.setLabel("Settings")
				.oneClick(),
			new Icon()
				.setLabel("Level Select")
				.oneClick(),
			new Icon()
				.setLabel("Customization")
				.oneClick(),
			new Icon()
				.setLabel("Spectate")
				.oneClick(),
		];
		
		const jobIdIcon = new Icon()
			.setWidth(380)
			.modifyTheme(["IconLabel", "TextTransparency", 0.5])
			.modifyTheme(["IconLabel", "TextWrapped", false])
			.setLabel(game.JobId)
			.lock();
		
		for (const [index, subIcon] of pairs(subMenuIcons)) {
			subIcon.toggled.Connect(() => {
				MenuStore.stateAtom(index + 1);
			});
		}
		
		menuIcon.setMenu(subMenuIcons);
		
		menuIcon.modifyChildTheme([
			["PaddingLeft", "Size", UDim2.fromOffset(12, 0)],
			["PaddingRight", "Size", UDim2.fromOffset(12, 0)],
		]);
		
		menuIcon.toggled.Connect((_selected, source) => {
			if (source !== "User") {
				return;
			}
			
			const menuState = peek(MenuStore.stateAtom);
			
			MenuStore.stateAtom(menuState === Enum.MenuState.None ? Enum.MenuState.Menu : Enum.MenuState.None)
		});
		
		effect(() => {
			const menuState = MenuStore.stateAtom();
			
			if (menuState === Enum.MenuState.Menu) {
				menuIcon.select();
				jobIdIcon.setEnabled(false);
			} else {
				menuIcon.deselect();
				jobIdIcon.setEnabled(true);
			}
			
			menuIcon.setLabel(
				menuState === Enum.MenuState.Settings ? "Settings"
				: menuState === Enum.MenuState.LevelSelect ? "Level Select"
				: menuState === Enum.MenuState.Customization ? "Customization"
				: menuState === Enum.MenuState.Spectate ? "Spectate"
				: menuState === Enum.MenuState.Menu ? "X"
				: "Menu"
			);
		});
	}
}
