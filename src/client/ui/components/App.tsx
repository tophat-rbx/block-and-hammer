import Vide from "@rbxts/vide";
import Cursor from "client/ui/components/Cursor";
import HUD from "client/ui/components/HUD/Items";

const App: Vide.FunctionNode = () => {
	return (
		<>
			<Cursor />
			<HUD />
		</>
	);
};

export default App;
