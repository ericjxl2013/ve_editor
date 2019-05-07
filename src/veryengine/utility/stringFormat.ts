export class VE_StringFormat {

  private static _illegalChar: { [key: string]: boolean } = {};
  private static _formulaChar: { [key: string]: boolean } = {};
  private static _escapeCharacters: { [key: string]: string } = {};

  constructor() {

  }

  public static init() {
    this._escapeCharacters['n'] = '\n';
    this._escapeCharacters['b'] = '\b';
    this._escapeCharacters['r'] = '\r';
    this._escapeCharacters['t'] = '\t';
    this._escapeCharacters['v'] = '\v';
    this._escapeCharacters['f'] = '\f';
    this._escapeCharacters['0'] = '\0';

    this._illegalChar['='] = true;
    this._illegalChar[','] = true;
    this._illegalChar['，'] = true;
    this._illegalChar[':'] = true;
    this._illegalChar['：'] = true;
    this._illegalChar['*'] = true;
    this._illegalChar['('] = true;
    this._illegalChar['（'] = true;
    this._illegalChar[')'] = true;
    this._illegalChar['）'] = true;
    this._illegalChar['@'] = true;
    this._illegalChar['#'] = true;
    this._illegalChar['$'] = true;
    this._illegalChar['%'] = true;
    this._illegalChar['&'] = true;
    this._illegalChar['^'] = true;
    this._illegalChar['-'] = true;
    this._illegalChar['+'] = true;
    this._illegalChar['|'] = true;
    this._illegalChar['/'] = true;
    this._illegalChar['['] = true;
    this._illegalChar['【'] = true;
    this._illegalChar[']'] = true;
    this._illegalChar['】'] = true;
    this._illegalChar['{'] = true;
    this._illegalChar['}'] = true;
    this._illegalChar['.'] = true;
    this._illegalChar['。'] = true;
    this._illegalChar['<'] = true;
    this._illegalChar['>'] = true;
    this._illegalChar[';'] = true;
    this._illegalChar['；'] = true;
    this._illegalChar['?'] = true;
    this._illegalChar['\"'] = true;
    this._illegalChar['“'] = true;
    this._illegalChar['”'] = true;
    this._illegalChar['\''] = true;
    this._illegalChar['‘'] = true;
    this._illegalChar['’'] = true;
    this._illegalChar['!'] = true;
    this._illegalChar['！'] = true;
    this._illegalChar['`'] = true;
    this._illegalChar['·'] = true;
    this._illegalChar['~'] = true;

    this._formulaChar['('] = true; this._formulaChar[')'] = true; this._formulaChar['（'] = true; this._formulaChar['）'] = true;
    this._formulaChar['!'] = true; this._formulaChar['！'] = true;
    this._formulaChar['^'] = true; this._formulaChar['%'] = true; this._formulaChar['&'] = true; this._formulaChar['-'] = true; this._formulaChar['+'] = true; this._formulaChar['='] = true;
    this._formulaChar['<'] = true; this._formulaChar['>'] = true; this._formulaChar['|'] = true;
  }

  /**
   * 输入参数字符串格式化，识别转义字符
   * @param para_str 原始字符串
   */
  public static strEscapeCharacterAction(para_str: string): string {
    let tmpStr: string = "";
    for (let i: number = 0; i < para_str.length; i++) {
      if (para_str[i] == '\\' && i != para_str.length - 1) {
        tmpStr += this.getEscapeCharacter(para_str[i + 1]);
        i++;
      }
      else {
        tmpStr += para_str[i];
      }
    }
    return tmpStr;
  }

  /**
   * 输入参数字符串格式化，识别“（）”， 输出格式化字符串；；
   * @param para_str 输入字符串；
   */
  public static strSubsectionAction(para_str: string): string[] {
    let strBuilder: string = '';
    let rStr: string[] = [];
    let bracketFlag: boolean = false;
    let hasQuote: boolean = false;
    for (let i: number = 0; i < para_str.length; i++) {
      if (para_str[i] == '\\') {
        if (i < para_str.length - 1) {
          strBuilder += para_str[i + 1];
          i++;
          continue;
        }
        else {
          strBuilder += para_str[i];
          break;
        }
      }

      if (!hasQuote && (para_str[i] === '\"' || para_str[i] === '“')) {
        hasQuote = true;
        bracketFlag = true;
        strBuilder += '\"';
      }
      else if (hasQuote && (para_str[i] === '\"' || para_str[i] === '”')) {
        strBuilder += '\"';
        bracketFlag = false;
        hasQuote = false;
        if (strBuilder !== '') {
          rStr.push(strBuilder);
        }
        strBuilder = '';
      }
      else if (para_str[i] === ',' || para_str[i] === '，') {
        if (!bracketFlag) {
          if (strBuilder !== "") {
            rStr.push(strBuilder);
          }
          strBuilder = '';
        }
        else {
          strBuilder += para_str[i];
        }
      }
      else if (para_str[i] === ' ') {
        continue;
      }
      else {
        strBuilder += para_str[i];
      }
    }
    if (strBuilder !== "") {
      rStr.push(strBuilder);
    }
    return rStr;
  }


  private static getEscapeCharacter(para_char: string): string {
    if (this._escapeCharacters[para_char])
      return this._escapeCharacters[para_char];
    else
      return para_char;
  }

  private static getEscapeCharacter2(para_char: string, is_escape: boolean[]): string {
    if (this._escapeCharacters[para_char]) {
      is_escape[0] = true;
      return this._escapeCharacters[para_char];
    }
    else {
      is_escape[0] = false;
      return para_char;
    }
  }

  /**
   * 输入参数字符串格式化，识别“（）”，"（XXX）"或者"“XXX”"当中的XXX会自动成为一个单独的字符串；
   * @param para_str 输入字符串；
   */
  public static strSubsection(para_str: string): string[] {
    let strBuilder: string = '';
    let rStr: string[] = [];
    let bracketFlag: boolean = false;
    let needSpace: boolean = false;
    for (let i: number = 0; i < para_str.length; i++) {
      if (para_str[i] == '\\') {
        if (i < para_str.length - 1) {
          strBuilder += this.getEscapeCharacter(para_str[i + 1]);
          i++;
          continue;
        }
        else {
          strBuilder += para_str[i];
          break;
        }
      }
      if (para_str[i] === '(' || para_str[i] === '（' || para_str[i] === '\"' || para_str[i] === '“') {
        bracketFlag = true;
        needSpace = false;
      }
      else if (para_str[i] === ')' || para_str[i] === '）' || para_str[i] === '\"' || para_str[i] === '”') {
        bracketFlag = false;
        if (strBuilder !== "") {
          rStr.push(strBuilder);
        }
        strBuilder = '';
        needSpace = false;
      }
      else if (para_str[i] === ',' || para_str[i] === '，') {
        if (!bracketFlag) {
          if (strBuilder !== "") {
            rStr.push(strBuilder);
          }
          strBuilder = '';
        }
        else {
          strBuilder += para_str[i];
        }
        needSpace = false;
      }
      else if (para_str[i] === ' ' && !needSpace) {
        continue;
      }
      else {
        strBuilder += para_str[i];
        needSpace = true;
      }
    }
    if (strBuilder !== "") {
      rStr.push(strBuilder);
    }
    return rStr;
  }

  /**
   * 将输入参数字符串进行格式化，识别$开头的公式变量，转化为相应的值；
   * @param project_name 项目名；
   * @param para_array 参数字符串列表；
   */
  public static getParaArrayAll(project_name: string, para_array: string[]): string[] {
    let coloneStr: string[] = para_array.slice();
    for (let i: number = 0; i < coloneStr.length; i++) {
      if (coloneStr[i].startsWith("$")) {
        //递归处理“（）”中的参数
        if (coloneStr[i].indexOf(",") > -1 || coloneStr[i].indexOf("，")) {
          let paraArray: string[] = coloneStr[i].split(/,|，/);
          paraArray = this.getParaArrayAll(project_name, paraArray);
          let newPara: string = '';
          for (let j: number = 0; j < paraArray.length; j++) {
            if (j === paraArray.length - 1) {
              newPara += paraArray[j];
            }
            else {
              newPara += paraArray[j];
              newPara += ",";
            }
          }
          coloneStr[i] = newPara;
        }
        else {
          // TODO
          console.log("变量名：" + coloneStr[i] + "，该变量未被创建！");
        }
      }
      else if (coloneStr[i].startsWith("%")) {
        //递归处理“（）”中的参数
        if (coloneStr[i].indexOf(",") > -1 || coloneStr[i].indexOf("，") > -1) {
          let paraArray: string[] = coloneStr[i].split(/,|，/);
          paraArray = this.getParaArrayAll(project_name, paraArray);
          let newPara: string = '';
          for (let j: number = 0; j < paraArray.length; j++) {
            if (j == paraArray.length - 1) {
              newPara += paraArray[j];
            }
            else {
              newPara += paraArray[j];
              newPara += ",";
            }
          }
          coloneStr[i] = newPara;
        }
        else {
          // TODO
          console.log("变量名：" + coloneStr[i] + "，该BlurVar变量未被创建！");
        }
      }
      //递归处理“（）”中的参数
      else if (coloneStr[i].indexOf(",") > -1 || coloneStr[i].indexOf("，") > -1) {
        let paraArray: string[] = coloneStr[i].split(/,|，/);
        paraArray = this.getParaArrayAll(project_name, paraArray);
        let newPara: string = '';
        for (let j: number = 0; j < paraArray.length; j++) {
          if (j == paraArray.length - 1) {
            newPara += paraArray[j];
          }
          else {
            newPara += paraArray[j];
            newPara += ",";
          }
        }
        coloneStr[i] = newPara;
      }
    }
    return coloneStr;
  }

  /**
   * 参数字符串分割：
     1、字符串有双引号，且有字符串加法，无法分辨，所以字符串暂时不做任何处理；
     2、小括号有使用需求，需要按要求分析；
        （1）单独括号，后面接逗号：自动取消括号后返回；
        （2）前缀字符串 +（）：保留括号，整段返回；
        （3）（）+ 后缀字符串：保留括号，整段返回；
        （4）括号嵌套情况：1）内层括号全保存；2）外层参考123；
    返回字符串解析后的数组；
   * @param para_str 参数字符串；
   */
  public static paraSegment(para_str: string): string[] {
    let strBuilder = '';
    let rStr: string[] = [];
    let bracketFlag: boolean = false;
    let innerBracket: number = 0;
    let saveBracket: boolean = false;

    let quotationMark: boolean = false;

    for (let i: number = 0; i < para_str.length; i++) {
      //转义字符判断
      if (para_str[i] == '\\') {
        if (i < para_str.length - 1) {
          let isEscape: boolean[] = [true];
          let c: string = this.getEscapeCharacter2(para_str[i + 1], isEscape);
          if (isEscape[0]) {
            i++;
            strBuilder += c;
          }
          else {
            i++;
            strBuilder += para_str[i];
          }
          continue;
        }
        else {
          strBuilder += para_str[i];
          break;
        }
      }
      if (para_str[i] === '(' || para_str[i] === '（') {
        if (quotationMark) {
          strBuilder += para_str[i];
        }
        else {
          if (bracketFlag) {
            innerBracket++;
            strBuilder += para_str[i];
          }
          else if (strBuilder.trim() !== "") {
            strBuilder += para_str[i];
            saveBracket = true;
          }
          else if (i < para_str.length - 1) {
            if (this.needSaveBracket(para_str.substring(i + 1))) {
              strBuilder += para_str[i];
              saveBracket = true;
            }
          }
          bracketFlag = true;
        }
      }
      else if (para_str[i] === ')' || para_str[i] === '）') {
        if (quotationMark) {
          strBuilder += para_str[i];
        }
        else {
          if (innerBracket > 0) {
            innerBracket--;
            bracketFlag = true;
            strBuilder += para_str[i];
          }
          else if (bracketFlag && saveBracket) {
            strBuilder += para_str[i];
            saveBracket = false;
            bracketFlag = false;
          }
          else {
            bracketFlag = false;
          }
        }
      }
      else if (para_str[i] === '"') {
        strBuilder += para_str[i];
        quotationMark = !quotationMark;
      }
      else if (para_str[i] === ',' || para_str[i] === '，') {
        if (quotationMark) {
          strBuilder += para_str[i];
        }
        else {
          if (!bracketFlag) {
            if (strBuilder !== "") {
              rStr.push(strBuilder.trim());
            }
            strBuilder = '';
          }
          else {
            strBuilder += para_str[i];
          }
        }
      }
      else {
        strBuilder += para_str[i];
      }
    }
    if (strBuilder !== "") {
      rStr.push(strBuilder.trim());
    }
    return rStr;
  }


  private static needSaveBracket(str: string): boolean {
    let hasBracket: boolean = false;
    let innerBracket: number = 0;
    for (let i: number = 0; i < str.length; i++) {
      if (hasBracket) {
        if (str[i] === ' ') {
          continue;
        }
        else if (str[i] === ',' || str[i] === '，') {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        if (str[i] === '(' || str[i] === '（') {
          innerBracket++;
        }
        else if (str[i] === ')' || str[i] === '）') {
          if (innerBracket > 0) {
            innerBracket--;
          }
          else {
            hasBracket = true;
          }
        }
      }
    }
    return false;
  }


  public static isIDLegal(id: string): boolean {
    for (let i: number = 0; i < id.length; i++) {
      if (this._illegalChar[id[i]]) {
        return false;
      }
    }
    return true;
  }


  public static isFormulaString(var_str: string): boolean {
    for (let i: number = 0; i < var_str.length; i++)
    {
      if (this._formulaChar[var_str[i]]) {
        return true;
      }
    }
    return false;
  }


}

VE_StringFormat.init();

// console.log(VE_StringFormat.paraSegment("设置相机背景颜色, Main Camera, *插值背景色"));
// console.log(VE_StringFormat.paraSegment("颜色插值, *相机背景色, *目标背景色, 1, *插值背景色"));

// console.log(VE_StringFormat.paraSegment("创建模板对象, *针, Pin, Example/SpinAPin/Pin , null, (0, -6, 0), (0,0,90),false"));