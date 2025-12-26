declare class NumberSpinner {
	static fromGuiObject(this: void, GuiObject: GuiObject): NumberSpinner;
	public Value: number;
	public Prefix: string;
	public Suffix: string;
	public Decimals: number;
	public Duration: number;
	public Commas: boolean;
	
	public TextSize: number;
	public FontFace: Font;
	public Parent?: Instance;
	public Destroy(): void;
}

export = NumberSpinner;
