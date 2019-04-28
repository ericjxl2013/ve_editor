export class VE_StateTriggerData {

  triggerID: string;
  logicalSwitch: string;
  logicalExp: string;

  public static get Empty(): VE_StateTriggerData {
    return new VE_StateTriggerData('');
  }

  constructor(trigger_id: string) {
    this.triggerID = trigger_id;
    this.logicalSwitch = '';
    this.logicalExp = '';
   }
}