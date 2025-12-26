import Vide from "@rbxts/vide";
import Altitude from "client/ui/components/HUD/Items/Altitude";
import Speedometer from "client/ui/components/HUD/Items/Speedometer";
import Timer from "client/ui/components/HUD/Items/Timer";
import ScreenGui from "client/ui/components/ScreenGui";

const HUD: Vide.FunctionNode = () => {
	return (
		<ScreenGui DisplayOrder={Enum.GuiDisplayOrder.HUD} Name={"HUD"}>
			<Speedometer />
			<Altitude />
			<Timer />
		</ScreenGui>
	);
};

export default HUD;
