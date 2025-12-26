import { GuiService, UserInputService } from "@rbxts/services";
import Vide, { effect, source } from "@rbxts/vide";
import { useAtom } from "@rbxts/vide-charm";
import { useSpring } from "@rbxts/vide-ripple";
import { CharacterStore } from "client/stores/character";
import { InputStore } from "client/stores/input";
import { MenuStore } from "client/stores/menu";
import ScreenGui from "client/ui/components/ScreenGui";
import { bindRenderStepped } from "client/ui/utilities/bind-render-stepped";
import { event } from "client/ui/utilities/event";
import { Camera } from "client/utilities/camera";

const Cursor: Vide.FunctionNode = () => {
	const position = source<UDim2>(UDim2.fromOffset(0, 0));
	const image = source<string>(Assets.Mouse.Normal);
	const visible = source<boolean>(false);
	
	const [scale, scaleSpring] = useSpring<number>(1, { tension: 400, friction: 14 });
	
	const characterModel = useAtom(CharacterStore.characterAtom);
	const inputMode = useAtom(CharacterStore.inputModeAtom);
	const relativeHammerPosition = useAtom(CharacterStore.Hammer.relativePositionAtom);
	const platformType = useAtom(InputStore.platformTypeAtom);
	const mouseProcessed = useAtom(InputStore.mouseProcessedAtom);
	const menuState = useAtom(MenuStore.stateAtom);
	
	bindRenderStepped(Enum.RenderSteppedPriority.Mouse, () => {
		const input = inputMode();
		
		if (input === Enum.CharacterInputMode.Screen) {
			const mousePosition = UserInputService.GetMouseLocation();
			
			position(UDim2.fromOffset(mousePosition.X, mousePosition.Y));
		} else if (input === Enum.CharacterInputMode.World) {
			const character = characterModel();
			
			if (!character) {
				position(UDim2.fromScale(0.5, 0.5));
				
				return;
			}
			
			const worldPosition = character.Root.Position.add(relativeHammerPosition());
			const [screenPosition] = Camera.WorldToViewportPoint(worldPosition);
			
			position(UDim2.fromOffset(screenPosition.X, screenPosition.Y));
		}
	});
	
	event(GuiService.MenuOpened, () => {
		visible(false);
	});
	
	event(GuiService.MenuClosed, () => {
		visible(true);
	});
	
	effect(() => {
		if (platformType() === Enum.PlatformType.Mobile) {
			visible(false);
			
			return;
		}
		
		const mousePosition = position();
		const topbarInset = GuiService.TopbarInset;
		
		const iconEnabled = mousePosition.Y.Offset < topbarInset.Height && mousePosition.X.Offset < topbarInset.Min.X
			? true
			: mouseProcessed();
		
		UserInputService.MouseIconEnabled = iconEnabled;
		
		visible(!iconEnabled);
	});
	
	effect(() => {
		if (!visible()) {
			return;
		}
		
		if (menuState() !== Enum.MenuState.None) {
			image(Assets.Mouse.Normal);
			
			return;
		}
		
		const input = inputMode();
		
		if (input === Enum.CharacterInputMode.World) {
			image(Assets.Mouse.CircleAlt);
		} else if (input === Enum.CharacterInputMode.Screen) {
			image(position().Y.Offset < GuiService.TopbarInset.Height ? Assets.Mouse.Normal : Assets.Mouse.Circle);
		}
	});
	
	effect(() => {
		image();
		
		scaleSpring.setPosition(1.3);
	});
	
	return (
		<ScreenGui DisplayOrder={Enum.GuiDisplayOrder.Cursor} Name={"Cursor"}>
			<imagelabel
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={UDim2.fromOffset(64, 64)}
				Position={position}
				Image={image}
				Visible={visible}
			>
				<uiscale Scale={scale} />
			</imagelabel>
		</ScreenGui>
	);
};

export default Cursor;
