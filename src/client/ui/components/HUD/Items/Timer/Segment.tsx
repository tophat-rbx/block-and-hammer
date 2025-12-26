import { GuiService, TextService } from "@rbxts/services";
import Vide, { mount, Show, source } from "@rbxts/vide";
import HUDText from "client/ui/components/HUD/Text";
import { event } from "client/ui/utilities/event";
import { Fonts } from "shared/utilities/fonts";

interface Props {
	order: number;
	size: number;
	value: () => string;
	leftPadding: () => boolean;
}

const Segment: Vide.Component<Props> = ({
	order,
	size,
	value,
	leftPadding,
}) => {
	const digitWidth = source<number>(0);
	
	const updateSize = () => {
		const params = new Instance("GetTextBoundsParams");
		params.Size = size;
		params.Font = Fonts.Inter.Heavy;
		
		let maxWidth = 0;
		
		for (const number of $range(0, 9)) {
			params.Text = tostring(number);
			
			const bounds = TextService.GetTextBoundsAsync(params);
			
			maxWidth = math.max(maxWidth, bounds.X);
		}
		
		params.Destroy();
		
		digitWidth(maxWidth);
	};
	
	mount(() => {
		task.spawn(updateSize);
	});
	
	event(GuiService.GetPropertyChangedSignal("PreferredTextSize"), () => {
		task.spawn(updateSize);
	});
	
	return (
		<frame BackgroundTransparency={1} AutomaticSize={Enum.AutomaticSize.XY} LayoutOrder={order}>
			<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
			<Show when={() => leftPadding() || value().sub(1, 1) !== "0"}>{() => (
				<HUDText width={digitWidth} size={size} text={() => value().sub(1, 1)} order={0} />
			)}</Show>
			<HUDText width={digitWidth} size={size} text={() => value().sub(2, 2)} order={1} />
		</frame>
	);
};

export default Segment;
