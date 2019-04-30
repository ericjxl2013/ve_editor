


export enum ActionType {
  Normal, Animation
}

export enum SequenceActionState {
  Initial, Prepared, Running, Pause
}

export enum StateActionType {
  Action, Assignment
}

export enum AssignType {
  Variable = 0,
  Template,
  TemplateVariable,
  Const,
}

export enum AssociatedFsmType {
  Object = 0,
  Template
}

export enum VariableScope {
  Local = 0,
  Fsm,
  Global,
  Scene
}