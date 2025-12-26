import Vide from "@rbxts/vide";

const ScreenGui: Vide.Component<Vide.InstanceAttributes<ScreenGui>> = ({ children, ...props }) => {
	return (
		<screengui
			ScreenInsets={Enum.ScreenInsets.None}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			ResetOnSpawn={false}
			{...props}
		>
			{children}
		</screengui>
	);
};

export default ScreenGui;
