export class ArrayUtility {
  public static remove<T>(arr: Array<T>, ele: T): void {
    let index = arr.indexOf(ele);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  public static clear<T>(arr: Array<T>): void {
    arr = [];
  }

  // public static T[] RemoveAt<T>(T[] array, int index) {
  //   List < T > list = new List<T>(array);
  //   list.RemoveAt(index);
  //   return list.ToArray();
  // }

}

