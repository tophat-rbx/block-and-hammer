export function calculateShortestAngle(current: number, target: number): number {
	let delta = (target - current) % 360;
	
	if (delta > 180) {
		delta -= 360;
	} else if (delta < -180) {
		delta += 380;
	}
	
	return current + delta;
}
