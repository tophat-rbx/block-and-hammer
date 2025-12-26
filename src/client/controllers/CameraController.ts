import { Controller, OnRender, OnStart } from "@flamework/core";
import { peek } from "@rbxts/charm";
import { config, createSpring } from "@rbxts/ripple";
import { CharacterController } from "client/controllers/CharacterController";
import { CharacterStore } from "client/stores/character";
import { Camera } from "client/utilities/camera";
import { clampToSphere } from "shared/utilities/clamp-to-sphere";

@Controller({})
export class CameraController implements OnStart, OnRender {
	private readonly _positionMotion = createSpring<Vector2>(Vector2.zero, { ...config.gentle, start: false });
	private readonly _velocityMotion = createSpring<Vector3>(Vector3.zero, { ...config.molasses, start: false });
	private readonly _cameraOffset = 32;
	
	constructor(
		private readonly characterController: CharacterController,
	) {}
	
	onStart(): void {
		const character = peek(CharacterStore.characterAtom);
		
		if (character) {
			this._onRespawn(character);
		}
		
		this.characterController.onRespawn.Connect((character) => this._onRespawn(character));
	}
	
	onRender(deltaTime: number): void {
		const character = peek(CharacterStore.characterAtom);
		
		if (!character) {
			return;
		}
		
		const rootPart = character.Root;
		const rootVelocity = rootPart.AssemblyLinearVelocity;
		const newPosition = new Vector2(rootPart.Position.Z, rootPart.Position.Y);
		
		this._positionMotion.setGoal(newPosition);
		this._positionMotion.step(deltaTime);
		
		this._velocityMotion.setGoal(rootVelocity);
		this._velocityMotion.step(deltaTime);
		
		const currentVelocity = this._velocityMotion.getPosition();
		const position = this._positionMotion.getPosition();
		
		const worldPosition = new Vector3(0, position.Y, position.X);
		const lookPosition = worldPosition.Lerp(rootPart.Position, math.clamp(math.map(currentVelocity.Magnitude, 25, 350, 0, 1), 0, 1));
		const cameraPosition = clampToSphere(worldPosition, rootPart.Position, 50).sub(new Vector3(this._cameraOffset, 0, 0));
		
		Camera.CameraType = Enum.CameraType.Scriptable;
		Camera.CFrame = CFrame.lookAt(cameraPosition, lookPosition, Vector3.yAxis);
		Camera.FieldOfView = math.min(70 + math.max(rootVelocity.Magnitude - 40, 0) / 25, 120);
	}
	
	private _onRespawn(character: CharacterModel): void {
		const rootPosition = character.Root.Position;
		
		this._positionMotion.setPosition(new Vector2(rootPosition.Z, rootPosition.Y));
		this._positionMotion.setVelocity(Vector2.zero);
		
		this._velocityMotion.setPosition(Vector3.zero);
		this._velocityMotion.setVelocity(Vector3.zero);
	}
}
