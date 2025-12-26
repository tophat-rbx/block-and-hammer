import { Controller, Flamework, OnStart } from "@flamework/core";
import { createMotion } from "@rbxts/ripple";
import { Workspace } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Events } from "client/network";
import { CharacterStore } from "client/stores/character";
import { Client } from "client/utilities/player";

const CharacterModel = Flamework.createGuard<CharacterModel>();

@Controller({})
export class CharacterController implements OnStart {
	public resetCallbackEvent = new Instance("BindableEvent");
	public onAdded = new Signal<(character: CharacterModel) => void>();
	public onRespawn = new Signal<(character: CharacterModel) => void>();
	public onRemoving = new Signal();
	public readonly bodyTransparencyMotion = createMotion<number>(0, { tween: { easing: "linear", duration: 0.5 } });
	
	onStart(): void {
		CharacterStore.characterAtom(undefined);
		
		if (Client.Character) {
			this._onCharacterAdded(Client.Character);
		}
		
		Client.CharacterAdded.Connect((character) => this._onCharacterAdded(character));
		
		Client.CharacterRemoving.Connect(() => {
			this._onCharacterRemoving();
		});
		
		this.resetCallbackEvent.Event.Connect(async () => {
			const character = CharacterStore.characterAtom();
			
			if (character) {
				Events.quickReset();
				
				this.onRespawn.Fire(character);
				
				for (const part of character.QueryDescendants("BasePart")) {
					part.AssemblyLinearVelocity = Vector3.zero;
					part.AssemblyAngularVelocity = Vector3.zero;
				}
				
				character.Root.TargetAttachment.CFrame = CFrame.identity;
				character.SetAttribute("time", Workspace.GetServerTimeNow());
				
				character.PivotTo(new CFrame(0, 1, 0).mul(CFrame.fromOrientation(0, math.pi / 2, 0)));
				character.Hammer.PivotTo(character.Root.CFrame);
			} else {
				Events.requestRespawn();
			}
		});
		
		this.bodyTransparencyMotion.onChange((transparency) => {
			const character = CharacterStore.characterAtom();
			
			if (!character) {
				return;
			}
			
			character.Body.LocalTransparencyModifier = transparency;
			character.Body.Decal.LocalTransparencyModifier = transparency;
		});
	}
	
	private _onCharacterAdded(character: Model): void {
		const onDescendantAdded = () => {
			if (!CharacterModel(character)) {
				return;
			}
			
			connection.Disconnect();
			
			character.Range.SurfaceTopGui.Enabled = true;
			character.Range.SurfaceOccludedGui.Enabled = true;
			
			this.bodyTransparencyMotion.setPosition(0);
			this.bodyTransparencyMotion.setVelocity(0);
			
			CharacterStore.characterAtom(character);
			
			this.onAdded.Fire(character);
			this.onRespawn.Fire(character);
			
			character.DescendantRemoving.Connect(() => {
				if (!CharacterModel(character)) {
					this._onCharacterRemoving();
				}
			});
			
			character.Destroying.Connect(() => {
				this._onCharacterRemoving();
			});
		};
		
		const connection = character.DescendantAdded.Connect(onDescendantAdded);
		
		onDescendantAdded();
	}
	
	private _onCharacterRemoving(): void {
		this.onRemoving.Fire();
		
		CharacterStore.characterAtom(undefined);
	}
}
