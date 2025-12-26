import { Controller, OnPhysics, OnRender, OnStart } from "@flamework/core";
import { effect, peek, subscribe } from "@rbxts/charm";
import { GuiService, UserInputService } from "@rbxts/services";
import { CharacterController } from "client/controllers/CharacterController";
import { CharacterStore } from "client/stores/character";
import { MenuStore } from "client/stores/menu";
import { Camera } from "client/utilities/camera";
import { clampToSphere } from "shared/utilities/clamp-to-sphere";

@Controller({})
export class HammerController implements OnStart, OnRender, OnPhysics {
	private _relativeTargetPosition = Vector3.zero;
	private _windowFocused = false;
	private _wasTransparent = false;
	private readonly _maxDistance = 13;
	private readonly _transparentDistance = 3;
	private readonly _responsivenessRange = new NumberRange(40, 60);
	private readonly _rotationOffset = CFrame.Angles(math.pi / 2, math.pi / 2, 0);
	
	constructor(
		private readonly characterController: CharacterController,
	) {}
	
	onStart(): void {
		subscribe(CharacterStore.inputModeAtom, () => {
			CharacterStore.Hammer.relativePositionAtom(Vector3.zero);
		});
		
		effect(() => {
			const inputMode = CharacterStore.inputModeAtom();
			const menuState = MenuStore.stateAtom();
			
			UserInputService.MouseBehavior = inputMode === Enum.CharacterInputMode.World && menuState === Enum.MenuState.None
				? Enum.MouseBehavior.LockCenter
				: Enum.MouseBehavior.Default;
		});
		
		this.characterController.onRespawn.Connect(() => {
			CharacterStore.Hammer.relativePositionAtom(Vector3.zero);
		});
		
		UserInputService.WindowFocusReleased.Connect(() => {
			this._windowFocused = false;
		});
		
		UserInputService.WindowFocused.Connect(() => {
			this._windowFocused = true;
		});
	}
	
	onRender(deltaTime: number): void {
		const character = peek(CharacterStore.characterAtom);
		const inputMode = peek(CharacterStore.inputModeAtom);
		
		if (!character) {
			return;
		}
		
		character.Range.Size = new Vector3(0.001, this._maxDistance * 2, this._maxDistance * 2);
		
		if (inputMode === Enum.CharacterInputMode.Screen) {
			this._updateAsScreen(character);
		} else if (inputMode === Enum.CharacterInputMode.World) {
			this._updateAsWorld();
		}
	}
	
	onPhysics(deltaTime: number): void {
		const bodyTransparencyMotion = this.characterController.bodyTransparencyMotion;
		const character = peek(CharacterStore.characterAtom);
		
		if (!character) {
			return;
		}
		
		const menuState = peek(MenuStore.stateAtom);
		
		if (this._windowFocused && !GuiService.MenuIsOpen && !menuState) {
			const targetPosition = character.Root.Position.add(this._relativeTargetPosition);
			const distance = this._relativeTargetPosition.Magnitude;
			
			const newResponsiveness = math.map(distance, 0, this._maxDistance, this._responsivenessRange.Min, this._responsivenessRange.Max);
			character.Hammer.Head.AlignPosition.Responsiveness = newResponsiveness;
			
			if (distance > 1e-2) {
				character.Root.TargetAttachment.WorldCFrame = CFrame.lookAt(targetPosition, character.Root.Position, Vector3.xAxis).mul(this._rotationOffset);
			} else {
				character.Root.TargetAttachment.CFrame = CFrame.lookAlong(Vector3.zero, Vector3.yAxis, Vector3.xAxis).mul(this._rotationOffset);
			}
		}
		
		const distance = character.Hammer.Head.Position.sub(character.Root.Position).Magnitude;
		const transparent = distance < this._transparentDistance;
		
		if (transparent !== this._wasTransparent) {
			bodyTransparencyMotion.tween(transparent ? 0.6 : 0);
		}
		
		this._wasTransparent = transparent;
	}
	
	private _updateAsScreen(character: CharacterModel): void {
		const mouseScreen = UserInputService.GetMouseLocation();
		const mouseRay = Camera.ViewportPointToRay(mouseScreen.X, mouseScreen.Y);
		
		const mouseWorldOrigin = mouseRay.Origin;
		const mouseWorldDirection = mouseRay.Direction.Unit;
		
		const mouseDistanceXZ = -mouseWorldOrigin.X / mouseWorldDirection.X;
		const mouseIntersectionYZ = mouseWorldOrigin.add(mouseWorldDirection.mul(mouseDistanceXZ)).mul(new Vector3(0, 1, 1));
		
		this._relativeTargetPosition = clampToSphere(mouseIntersectionYZ.sub(character.Root.Position), Vector3.zero, this._maxDistance);
	}
	
	private _updateAsWorld(): void {
		if (UserInputService.MouseBehavior !== Enum.MouseBehavior.LockCenter) {
			return;
		}
		
		const mouseDelta = UserInputService.GetMouseDelta();
		const smoothedMouseDelta = new Vector2(mouseDelta.X / 15, mouseDelta.Y / 15);
		
		CharacterStore.Hammer.relativePositionAtom((worldScreenPosition) => {
			const newPosition = new Vector3(0, worldScreenPosition.Y - smoothedMouseDelta.Y, worldScreenPosition.Z + smoothedMouseDelta.X);
			
			return newPosition.Magnitude < this._maxDistance * 8 ? newPosition : worldScreenPosition;
		});
		
		this._relativeTargetPosition = clampToSphere(peek(CharacterStore.Hammer.relativePositionAtom), Vector3.zero, this._maxDistance);
	}
}
