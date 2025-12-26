const meterConversionFactor = 0.28;

export function toMeters(studs: number): number {
	return studs * meterConversionFactor;
}

export function toStuds(meters: number): number {
	return meters / meterConversionFactor;
}
