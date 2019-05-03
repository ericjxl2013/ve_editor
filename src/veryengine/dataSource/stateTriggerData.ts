export class VE_StateTriggerData {

  public triggerID: string;
  public logicalSwitch: string;
  public logicalExp: string;

  public static get Empty(): VE_StateTriggerData {
    return new VE_StateTriggerData('');
  }

  constructor(trigger_id: string) {
    this.triggerID = trigger_id;
    this.logicalSwitch = '';
    this.logicalExp = '';
   }
}