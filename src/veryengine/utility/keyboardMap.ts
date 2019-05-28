export class VE_KeyboardMap {

  private static _keyMap: { [key: string]: string } = {};
  private static _initialized = false;

  private static init(): void {
    this._keyMap['backspace'] = 'Backspace';
    this._keyMap['退格'] = 'Backspace';
    this._keyMap['tab'] = 'Tab';
    this._keyMap['enter'] = 'Enter';
    this._keyMap['回车'] = 'Enter';
    this._keyMap['shift'] = 'Shift';
    this._keyMap['control'] = 'Control';
    this._keyMap['ctrl'] = 'Control';
    this._keyMap['alt'] = 'Alt';
    this._keyMap['pause'] = 'Pause';
    this._keyMap['capsLock'] = 'CapsLock';
    this._keyMap['escape'] = 'Escape';
    this._keyMap['pageup'] = 'PageUp';
    this._keyMap['上一页'] = 'PageUp';
    this._keyMap['pagedown'] = 'PageDown';
    this._keyMap['下一页'] = 'PageDown';
    this._keyMap['end'] = 'End';
    this._keyMap['home'] = 'Home';
    this._keyMap['arrowleft'] = 'ArrowLeft';
    this._keyMap['左'] = 'ArrowLeft';
    this._keyMap['arrowup'] = 'ArrowUp';
    this._keyMap['上'] = 'ArrowUp';
    this._keyMap['arrowright'] = 'ArrowRight';
    this._keyMap['右'] = 'ArrowRight';
    this._keyMap['arrowdown'] = 'ArrowDown';
    this._keyMap['下'] = 'ArrowDown';
    this._keyMap['insert'] = 'Insert';
    this._keyMap['插入'] = 'Insert';
    this._keyMap['delete'] = 'Delete';
    this._keyMap['删除'] = 'Delete';
    this._keyMap['0'] = '0';
    this._keyMap['1'] = '1';
    this._keyMap['2'] = '2';
    this._keyMap['3'] = '3';
    this._keyMap['4'] = '4';
    this._keyMap['5'] = '5';
    this._keyMap['6'] = '6';
    this._keyMap['7'] = '7';
    this._keyMap['8'] = '8';
    this._keyMap['9'] = '9';
    this._keyMap[')'] = ')';
    this._keyMap['）'] = ')';
    this._keyMap['!'] = '!';
    this._keyMap['！'] = '!';
    this._keyMap['@'] = '@';
    this._keyMap['#'] = '#';
    this._keyMap['$'] = '$';
    this._keyMap['￥'] = '$';
    this._keyMap['%'] = '%';
    this._keyMap['^'] = '^';
    this._keyMap['……'] = '^';
    this._keyMap['&'] = '&';
    this._keyMap['*'] = '*';
    this._keyMap['('] = '(';
    this._keyMap['（'] = '(';
    this._keyMap['meta'] = 'meta';
    this._keyMap['windows'] = 'meta';
    this._keyMap['contextmenu'] = 'ContextMenu';
    this._keyMap['快捷菜单'] = 'ContextMenu';
    this._keyMap['f1'] = 'F1';
    this._keyMap['f2'] = 'F2';
    this._keyMap['f3'] = 'F3';
    this._keyMap['f4'] = 'F4';
    this._keyMap['f5'] = 'F5';
    this._keyMap['f6'] = 'F6';
    this._keyMap['f7'] = 'F7';
    this._keyMap['f8'] = 'F8';
    this._keyMap['f9'] = 'F9';
    this._keyMap['f10'] = 'F10';
    this._keyMap['f11'] = 'F11';
    this._keyMap['f12'] = 'F12';
    this._keyMap['scrolllock'] = 'ScrollLock';
    this._keyMap[';'] = ';';
    this._keyMap['；'] = ';';
    this._keyMap[':'] = ':';
    this._keyMap['：'] = ':';
    this._keyMap['='] = '=';
    this._keyMap['+'] = '+';
    this._keyMap['-'] = '-';
    this._keyMap['_'] = '_';
    this._keyMap['——'] = '_';
    this._keyMap[','] = ',';
    this._keyMap['，'] = ',';
    this._keyMap['<'] = '<';
    this._keyMap['《'] = '<';
    this._keyMap['.'] = '.';
    this._keyMap['。'] = '.';
    this._keyMap['>'] = '>';
    this._keyMap['》'] = '>';
    this._keyMap['?'] = '?';
    this._keyMap['？'] = '?';
    this._keyMap['/'] = '/';
    this._keyMap['`'] = '`';
    this._keyMap['·'] = '`';
    this._keyMap['~'] = '~';
    this._keyMap['|'] = '|';
    this._keyMap['\\'] = '\\';
    this._keyMap['\\'] = '\\';
    this._keyMap['numlock'] = 'NumLock';
    this._keyMap['a'] = 'a';
    this._keyMap['b'] = 'b';
    this._keyMap['c'] = 'c';
    this._keyMap['d'] = 'd';
    this._keyMap['e'] = 'e';
    this._keyMap['f'] = 'f';
    this._keyMap['g'] = 'g';
    this._keyMap['h'] = 'h';
    this._keyMap['i'] = 'i';
    this._keyMap['j'] = 'j';
    this._keyMap['k'] = 'k';
    this._keyMap['l'] = 'l';
    this._keyMap['m'] = 'm';
    this._keyMap['n'] = 'n';
    this._keyMap['o'] = 'o';
    this._keyMap['p'] = 'p';
    this._keyMap['q'] = 'q';
    this._keyMap['r'] = 'r';
    this._keyMap['s'] = 's';
    this._keyMap['t'] = 't';
    this._keyMap['u'] = 'u';
    this._keyMap['v'] = 'v';
    this._keyMap['w'] = 'w';
    this._keyMap['x'] = 'x';
    this._keyMap['y'] = 'y';
    this._keyMap['z'] = 'z';
    

  }

  public static GetKey(key_str: string): string {
    if(!this._initialized) {
      this.init();
      this._initialized = true;
    }
    key_str = key_str.trim().toLowerCase();
    if (this._keyMap[key_str]) {
      return this._keyMap[key_str];
    } else {
      return 'null';
    }
  }



}