import Vide from "@rbxts/vide";

interface Props {
	padding: number | [number, number] | [number, number, number, number];
}

const Padding: Vide.Component<Props> = ({ padding }) => {
	if (typeIs(padding, "number")) {
		return (
			<uipadding
				Name={"Padding"}
				PaddingTop={new UDim(0, padding)}
				PaddingRight={new UDim(0, padding)}
				PaddingBottom={new UDim(0, padding)}
				PaddingLeft={new UDim(0, padding)}
			/>
		);
	} else if (typeIs(padding, "table")) {
		if (padding.size() === 4) {
			return (
				<uipadding
					Name={"Padding"}
					PaddingTop={new UDim(0, padding[0])}
					PaddingRight={new UDim(0, padding[1])}
					PaddingBottom={new UDim(0, padding[2])}
					PaddingLeft={new UDim(0, padding[3])}
				/>
			);
		} else if (padding.size() === 2) {
			return (
				<uipadding
					Name={"Padding"}
					PaddingTop={new UDim(0, padding[0])}
					PaddingRight={new UDim(0, padding[1])}
					PaddingBottom={new UDim(0, padding[0])}
					PaddingLeft={new UDim(0, padding[1])}
				/>
			);
		}
		
		throw "unexpected padding length: " + padding.size();
	}
	
	throw "unexpected padding type: " + typeOf(padding);
};

export default Padding;
