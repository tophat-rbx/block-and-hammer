import NumberSpinner from "shared/modules/NumberSpinner";

type IconState =
	| "Selected"
	| "Deselected"
	| "Viewing";

type Alignment =
	| "Left"
	| "Center"
	| "Right";

type SourceType =
	| "User"
	| "OneClick"
	| "AutoDeselect"
	| "HideParentFeature"
	| "Overflow";

interface WidgetInstances {
	Widget: Frame & {
		DesiredWidth: number;
		MinimumWidth: number;
		MinimumHeight: number;
		BorderSize: number;
	};
	
	IconCorners: UICorner;
	Selection: Frame & {
		RotationSpeed: number;
	};
	SelectionGradient: UIGradient;
	
	IconImage: ImageLabel;
	IconImageRatio: UIAspectRatioConstraint;
	IconLabel: TextLabel;
	IconButton: TextButton;
	IconImageScale: NumberValue;
	IconImageCorner: UICorner;
	IconSpot: Frame;
	IconOverlay: Frame;
	IconSpotGradient: UIGradient;
	IconGradient: UIGradient;
	ClickRegion: Frame;
	Menu: Frame & {
		MaxIcons: number;
	};
	ContentsList: UIListLayout;
	Dropdown: Frame & {
		MaxIcons: number;
	};
	Notice: Frame;
	NoticeLabel: TextLabel;
	PaddingLeft: Frame;
	PaddingRight: Frame;
}

type Modification<
	T extends keyof WidgetInstances = keyof WidgetInstances,
	I extends WidgetInstances[T] = WidgetInstances[T],
	P extends keyof I = keyof InstanceProperties<I>,
	V extends I[P] = I[P],
> =
	| [T, P, V]
	| [T, P, V, IconState];

declare class Icon {
	/**
	 * Returns a dictionary of icons where the key is the icon's UID and value the icon.
	 * ```ts
	 * const icons = Icon.getIcons();
	 * ```
	 */
	static getIcons(this: void): Record<string, Icon>;
	/**
	 * Returns an icon of the given name or UID.
	 * ```ts
	 * const icon = Icon.getIcon(nameOrUID);
	 * ```
	 */
	static getIcon(this: void, nameOrUID: string): Icon;
	/**
	 * When set to `false` all TopbarPlus ScreenGuis are hidden. This does not impact Roblox's Topbar.
	 * ```ts
	 * Icon.setTopbarEnabled(false);
	 * ```
	 */
	static setTopbarEnabled(this: void, bool: boolean): void;
	/**
	 * Updates the appearance of all icons. See [themes](https://1foreverhd.github.io/TopbarPlus/features/#modify-theme) for more details.
	 * ```ts
	 * Icon.modifyBaseTheme({ ... });
	 * ```
	 */
	static modifyBaseTheme<T extends keyof WidgetInstances>(this: void, modifications: Modification<T> | Array<unknown>): void;
	/**
	 * Sets the base DisplayOrder of all TopbarPlus ScreenGuis.
	 * ```ts
	 * Icon.setDisplayOrder(1);
	 * ```
	 */
	static setDisplayOrder(this: void, integer: number): void;
	
	/**
	 * Constructs an empty `32x32` icon on the topbar.
	 * ```ts
	 * const icon = new Icon();
	 * ```
	 */
	constructor();
	
	/**
	 * Sets the name of the Widget instance. This can be used in conjunction with Icon.getIcon(name).
	 * ```ts
	 * icon.setName("string");
	 * ```
	 */
	public setName(name: string): Icon;
	/**
	 * Returns the first descendant found within the widget of name instanceName.
	 * ```ts
	 * const instance = icon.getInstance("descendantName");
	 * ```
	 */
	public getInstance(instanceName: string): Instance;
	/**
	 * Updates the appearance of the icon. See [themes](https://1foreverhd.github.io/TopbarPlus/features/#modify-theme) for more details.
	 * ```ts
	 * 
	 * ```
	 */
	public modifyTheme<T extends keyof WidgetInstances>(modifications: Modification<T> | Array<unknown>): Icon;
	/**
	 * Updates the appearance of all icons that are parented to this icon (for example when a menu or dropdown). See themes for more details.
	 * ```ts
	 * icon.modifyTheme(modifications);
	 * ```
	 */
	public modifyChildTheme<T extends keyof WidgetInstances>(modifications: Modification<T> | Array<unknown>): Icon;
	/**
	 * When set to `false` the icon will be disabled and hidden.
	 * ```ts
	 * icon.setEnabled(false);
	 * ```
	 */
	public setEnabled(bool: boolean): Icon;
	/**
	 * Selects the icon (as if it were clicked once).
	 * ```ts
	 * icon.select();
	 * ```
	 */
	public select(): Icon;
	/**
	 * Deselects the icon (as if it were clicked, then clicked again).
	 * ```ts
	 * icon.deselect();
	 * ```
	 */
	public deselect(): Icon;
	/**
	 * Prompts a notice bubble which accumulates the further it is prompted. If the icon belongs to a dropdown or menu, then the notice will appear on the parent icon when the parent icon is deselected.
	 * ```ts
	 * icon.notify();
	 * ```
	 */
	public notify(clearNoticeEvent?: () => void): Icon;
	/**
	 * Clears notice bubble.
	 * ```ts
	 * icon.clearNotices();
	 * ```
	 */
	public clearNotices(): Icon;
	/**
	 * When set to `true`, disables the shade effect which appears when the icon is pressed and released.
	 * ```ts
	 * icon.disableStateOverlay(true);
	 * ```
	 */
	public disableOverlay(bool?: boolean): Icon;
	/**
	 * Applies an image to the icon based on the given `imageId`. `imageId` can be an assetId or a complete asset string.
	 * ```ts
	 * icon.setImage("rbxassetid://123456789", "Viewing");
	 * ```
	 */
	public setImage(imageId?: number | string, iconState?: IconState): Icon;
	/**
	 * Applies text to the icon.
	 * ```ts
	 * icon.setLabel("Icon Text", "Viewing");
	 * ```
	 */
	public setLabel(text?: string, iconState?: IconState): Icon;
	/**
	 * Sets the order of the icon.
	 * ```ts
	 * icon.setOrder(1, "Viewing");
	 * ```
	 */
	public setOrder(order?: number, iconState?: IconState): Icon;
	/**
	 * Sets the corner radius of the icon.
	 * ```ts
	 * icon.setCornerRadius(0, 0, "Viewing");
	 * ```
	 */
	public setCornerRadius(scale?: number, offset?: number, iconState?: IconState): Icon;
	/**
	 * This enables you to set the icon to the `"Left"` (default), `"Center"` or `"Right"` side of the screen. See [alignments](https://1foreverhd.github.io/TopbarPlus/features/#alignments) for more details.
	 * ```ts
	 * icon.align("Center");
	 * ```
	 */
	public align(alignment: Alignment): Icon;
	/**
	 * This sets the minimum width the icon can be (it can be larger for instance when setting a long label). The default width is `44`.
	 * ```ts
	 * icon.setWidth(44, "Viewing");
	 * ```
	 */
	public setWidth(mininumSize?: number, iconState?: IconState): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setImageScale(number?: number, iconState?: IconState): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setImageRatio(number?: number, iconState?: IconState): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setTextSize(number?: number, iconState?: IconState): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setTextColor(color?: Color3, iconState?: IconState): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setTextFont(font?: string | Enum.Font | number, fontWeight?: Enum.FontWeight, fontStyle?: Enum.FontStyle, iconState?: IconState): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public bindToggleItem(guiObjectOrLayerCollector: GuiObject | LayerCollector): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public unbindToggleItem(guiObjectOrLayerCollector: GuiObject | LayerCollector): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public bindEvent(iconEventName: string, callback: (...args: Array<any>) => void): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public unbindEvent(iconEventName: string): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public bindToggleKey(keyCodeEnum: Enum.KeyCode): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public unbindToggleKey(keyCodeEnum: Enum.KeyCode): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public call(func: () => void): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public addToJanitor(userdata: any): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public lock(): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public unlock(): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public debounce(seconds: number): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public autoDeselect(bool: boolean): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public oneClick(bool?: boolean): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setCaption(text: string): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setCaptionHint(keyCodeEnum: Enum.KeyCode): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setDropdown(arrayOfIcons: Array<Icon>): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public joinDropdown(parentIcon: Icon): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setMenu(arrayOfIcons: Array<Icon>): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public setFixedMenu(arrayOfIcons: Array<Icon>): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public joinMenu(parentIcon: Icon): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public leave(): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public convertLabelToNumberSpinner(numberSpinner: NumberSpinner): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public destroy(): Icon;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public selected: RBXScriptSignal<(fromSource: SourceType) => void>;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public deselected: RBXScriptSignal<(fromSource: SourceType) => void>;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public toggled: RBXScriptSignal<(isSelected: boolean, fromSource: SourceType) => void>;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public viewingStarted: RBXScriptSignal<() => void>;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public viewingEnded: RBXScriptSignal<() => void>;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public notified: RBXScriptSignal<() => void>;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public readonly name: string;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public readonly isSelected: boolean;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public readonly isEnabled: boolean;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public readonly totalNotices: number;
	/**
	 * 
	 * ```ts
	 * 
	 * ```
	 */
	public readonly locked: boolean;
}

export = Icon;
