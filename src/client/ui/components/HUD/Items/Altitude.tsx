import { RunService } from "@rbxts/services";
import Vide, { source } from "@rbxts/vide";
import { useAtom } from "@rbxts/vide-charm";
import { CharacterStore } from "client/stores/character";
import Item from "client/ui/components/HUD/Item";
import HUDText from "client/ui/components/HUD/Text";
import { event } from "client/ui/utilities/event";
import { toMeters } from "shared/utilities/conversions";
import { normalizeZero } from "shared/utilities/normalize-zero";

const Altitude: Vide.Component = () => {
	const character = useAtom(CharacterStore.characterAtom);
	
	const text = source<string>("--");
	
	event(RunService.PostSimulation, () => {
		const characterModel = character();
		
		if (!characterModel) {
			text("--");
			
			return;
		}
		
		text("%dm".format(normalizeZero(math.round(toMeters(characterModel.Root.Position.Y)))));
	});
	
	return (
		<Item image={Assets.HUDBackground.Center} xScale={0.5} minWidth={300} alignment={Enum.HorizontalAlignment.Center} paddingSides={[60, 60]}>
			<HUDText text={text} size={70} />
		</Item>
	);
};

export default Altitude;
