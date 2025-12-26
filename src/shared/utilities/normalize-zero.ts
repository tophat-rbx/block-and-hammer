export function normalizeZero(number: number): number {
	return number === -0 ? 0 : number;
}
