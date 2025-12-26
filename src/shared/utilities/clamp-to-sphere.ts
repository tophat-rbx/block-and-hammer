import { Epsilon } from "shared/utilities/constants";

export function clampToSphere(position: Vector3, center: Vector3, radius: number): Vector3 {
	const delta = position.sub(center);
	
	return delta.Magnitude < radius ? position : delta.Magnitude > Epsilon ? delta.Unit.mul(radius).add(center) : center;
}
