import { RunService } from "@rbxts/services";
import Vide, { source } from "@rbxts/vide";
import { useAtom } from "@rbxts/vide-charm";
import { CharacterStore } from "client/stores/character";
import Item from "client/ui/components/HUD/Item";
import HUDText from "client/ui/components/HUD/Text";
import { event } from "client/ui/utilities/event";
import { toMeters } from "shared/utilities/conversions";
import { normalizeZero } from "shared/utilities/normalize-zero";

const Speedometer: Vide.Component = () => {
	const character = useAtom(CharacterStore.characterAtom);
	
	const text = source<string>("--");
	
	event(RunService.PostSimulation, () => {
		const characterModel = character();
		
		if (!characterModel) {
			text("--");
			
			return;
		}
		
		text("%dm/s".format(normalizeZero(math.round(toMeters(characterModel.Root.AssemblyLinearVelocity.Magnitude)))));
	});
	
	return (
		<Item image={Assets.HUDBackground.Left} xScale={0} minWidth={250} alignment={Enum.HorizontalAlignment.Left} paddingSides={[20, 60]}>
			<HUDText text={text} size={60} />
		</Item>
	);
};

export default Speedometer;
