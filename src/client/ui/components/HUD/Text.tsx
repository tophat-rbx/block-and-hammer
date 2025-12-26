import Vide, { Derivable, derive } from "@rbxts/vide";
import { Fonts } from "shared/utilities/fonts";

interface Props {
	text: Derivable<string>;
	size: Derivable<number>;
	order?: Derivable<number>;
	width?: () => number;
}

const HUDText: Vide.Component<Props> = ({
	text,
	size,
	order,
	width,
}) => {
	return (
		<textlabel
			BackgroundTransparency={1}
			AutomaticSize={Enum.AutomaticSize.XY}
			Size={typeIs(width, "function") ? derive(() => UDim2.fromOffset(width(), 0)) : undefined}
			Text={text}
			TextSize={size}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			TextXAlignment={Enum.TextXAlignment.Center}
			FontFace={Fonts.Inter.Heavy}
			LayoutOrder={order}
		>
			<uistroke Thickness={6} LineJoinMode={Enum.LineJoinMode.Miter} Color={Color3.fromRGB(28, 28, 28)}>
				<uigradient Color={new ColorSequence(Color3.fromRGB(128, 128, 128), Color3.fromRGB(255, 255, 255))} Rotation={90} />
			</uistroke>
			<uigradient Color={new ColorSequence(Color3.fromRGB(128, 128, 128), Color3.fromRGB(255, 255, 255))} Rotation={90} />
		</textlabel>
	);
};

export default HUDText;
