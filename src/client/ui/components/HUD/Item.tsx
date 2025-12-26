import { Dependency } from "@flamework/core";
import Vide from "@rbxts/vide";
import { config, useSpring } from "@rbxts/vide-ripple";
import { CharacterController } from "client/controllers/CharacterController";
import Padding from "client/ui/components/Padding";
import { event } from "client/ui/utilities/event";

interface Props extends Vide.PropsWithChildren {
	image: Assets.HUDBackground;
	xScale: number;
	minWidth: number;
	alignment: Enum.HorizontalAlignment;
	paddingSides: [number, number];
}

const Item: Vide.Component<Props> = ({
	image,
	xScale,
	minWidth,
	paddingSides,
	alignment,
	children,
}) => {
	const [size, sizeSpring] = useSpring<UDim2>(UDim2.fromOffset(0, 0), config.stiff);
	
	const characterController = Dependency<CharacterController>();
	
	event(characterController.onRespawn, () => {
		sizeSpring.setPosition(UDim2.fromOffset(0, 0));
	});
	
	return (
		<frame
			BackgroundTransparency={1}
			Position={UDim2.fromScale(xScale, 1)}
			AnchorPoint={new Vector2(xScale, 1)}
			AutomaticSize={Enum.AutomaticSize.XY}
		>
			<imagelabel
				BackgroundTransparency={1}
				Position={UDim2.fromScale(xScale, 1)}
				AnchorPoint={new Vector2(xScale, 1)}
				Size={size}
				Image={image}
				ImageColor3={Color3.fromRGB(0, 0, 0)}
				ImageTransparency={0.5}
				ScaleType={Enum.ScaleType.Slice}
				SliceCenter={new Rect(256, 512, 256, 512)}
			/>
			<frame
				BackgroundTransparency={1}
				Size={UDim2.fromOffset(minWidth, 0)}
				AutomaticSize={Enum.AutomaticSize.XY}
				AbsoluteSizeChanged={(absoluteSize) => {
					sizeSpring.setGoal(UDim2.fromOffset(absoluteSize.X, absoluteSize.Y));
				}}
			>
				<Padding padding={[20, paddingSides[1], 20, paddingSides[0]]} />
				<uilistlayout FillDirection={Enum.FillDirection.Horizontal} HorizontalAlignment={alignment} />
				{children}
			</frame>
		</frame>
	);
};

export default Item;
