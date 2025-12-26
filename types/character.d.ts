interface CharacterModel extends Model {
	readonly __attributes: {
		readonly time: number;
	};
	readonly Root: Part & {
		readonly AlignOrientation: AlignOrientation;
		readonly CenterAttachment: Attachment;
		readonly PlaneConstraint: PlaneConstraint;
		readonly TargetAttachment: Attachment;
	};
	readonly Body: Part & {
		readonly CenterAttachment: Attachment;
		readonly RigidConstraint: RigidConstraint;
		readonly Decal: Decal;
	};
	readonly Hammer: Model & {
		readonly Head: Part & {
			readonly AlignOrientation: AlignOrientation;
			readonly AlignPosition: AlignPosition;
			readonly TargetAttachment: Attachment;
			readonly Outline: MeshPart;
		};
		readonly Handle: Part & {
			readonly WeldConstraint: WeldConstraint;
			readonly Outline: MeshPart;
		};
	};
	readonly Range: Part & {
		readonly Attachment: Attachment;
		readonly RigidConstraint: RigidConstraint;
		readonly SurfaceOccludedGui: SurfaceGui & {
			readonly Frame: Frame & {
				readonly UICorner: UICorner;
				readonly UIStroke: UIStroke;
			};
		};
		readonly SurfaceTopGui: SurfaceGui & {
			readonly Frame: Frame & {
				readonly UICorner: UICorner;
				readonly UIStroke: UIStroke;
			};
		};
	};
}
