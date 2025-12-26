import { RunService, Workspace } from "@rbxts/services";
import Vide, { Show, source } from "@rbxts/vide";
import { useAtom } from "@rbxts/vide-charm";
import { CharacterStore } from "client/stores/character";
import Item from "client/ui/components/HUD/Item";
import Segment from "client/ui/components/HUD/Items/Timer/Segment";
import HUDText from "client/ui/components/HUD/Text";
import { event } from "client/ui/utilities/event";

export const enum DisplayMode {
	None,
	Seconds,
	Minutes,
	Hours,
}

const Timer: Vide.Component = () => {
	const character = useAtom(CharacterStore.characterAtom);
	
	const mode = source<DisplayMode>(DisplayMode.None)
	const milliseconds = source<string>("00");
	const seconds = source<string>("00");
	const minutes = source<string>("00");
	const hours = source<string>("00");
	
	event(RunService.PreRender, () => {
		const characterModel = character();
		
		if (!characterModel) {
			mode(DisplayMode.None);
			
			return;
		}
		
		const currentTime = Workspace.GetServerTimeNow();
		const startTime = tonumber(characterModel.GetAttribute("time")) ?? currentTime;
		
		const elapsedTime = currentTime - startTime;
		
		milliseconds("%02d".format(math.round(math.modf(elapsedTime)[1] * 100) % 100));
		seconds("%02d".format(math.floor(elapsedTime % 60)));
		
		if (elapsedTime < 60) {
			mode(DisplayMode.Seconds);
			
			return;
		}
		
		minutes("%02d".format(elapsedTime.idiv(60) % 60));
		
		if (elapsedTime < 3600) {
			mode(DisplayMode.Minutes);
			
			return;
		}
		
		hours("%02d".format(elapsedTime.idiv(3600) % 60));
		
		mode(DisplayMode.Hours);
	});
	
	const size = 60;
	
	return (
		<Item image={Assets.HUDBackground.Right} xScale={1} minWidth={250} alignment={Enum.HorizontalAlignment.Right} paddingSides={[60, 20]}>
			<Show when={() => mode() !== DisplayMode.None} fallback={() => <HUDText size={size} text={"--"} />}>{() => (
				<frame BackgroundTransparency={1} AutomaticSize={Enum.AutomaticSize.XY}>
					<uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 4)} />
					<Segment order={4} size={size} leftPadding={() => true} value={milliseconds} />
					<HUDText order={3} size={size} text={"."} />
					<Segment order={2} size={size} leftPadding={() => mode() > DisplayMode.Seconds} value={seconds} />
					<Show when={() => mode() > DisplayMode.Seconds}>{() => (
						<frame LayoutOrder={1} BackgroundTransparency={1} AutomaticSize={Enum.AutomaticSize.XY}>
							<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
							<HUDText order={1} size={size} text={":"} />
							<Segment order={0} size={size} leftPadding={() => mode() > DisplayMode.Minutes} value={minutes} />
						</frame>
					)}</Show>
					<Show when={() => mode() > DisplayMode.Minutes}>{() => (
						<frame LayoutOrder={0} BackgroundTransparency={1} AutomaticSize={Enum.AutomaticSize.XY}>
							<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
							<HUDText order={1} size={size} text={":"} />
							<Segment order={0} size={size} leftPadding={() => false} value={hours} />
						</frame>
					)}</Show>
				</frame>
			)}</Show>
		</Item>
	);
};

export default Timer;
