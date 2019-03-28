var example = document.getElementById('VeryTable');
var hot1 = new Handsontable(example, {
	data: Handsontable.helper.createEmptySpreadsheetData(300, 9),
	colWidths: 100,
	width: '50%',
	height: '100%',
	rowHeights: 23,
	rowHeaders: true,
	colHeaders: true,
	licenseKey: 'non-commercial-and-evaluation',
	fixedRowsTop: 1, // 固定显示第一行
	manualColumnResize: true, // 允许手动设置列宽
	manualRowResize: true, // 允许手动设置行宽
	manualRowMove: true, // 允许拖拽移动某一行
	contextMenu: {
		items: {
			row_above: {
				name: '插入行（当前行上方）'
			},
			row_below: {
				name: '插入行（当前行下方）'
			},
			separator: Handsontable.plugins.ContextMenu.SEPARATOR,
			remove_row: {
				name: '删除行',
				disabled: function() {
					// `disabled` can be a boolean or a function
					// Disable option when first row was clicked
					return this.getSelectedLast()[0] === 0; // `this` === hot3
				}
			},
			clear_cell: {
				name: '清除内容',
				callback: function() {
					console.log(this.getSelected());
				}
			},
			clear_all: {
				name: '清空表格',
				callback: function() {
					this.clear();
				}
			},
			separator: Handsontable.plugins.ContextMenu.SEPARATOR,
			undo: {
				name: '撤销'
			},
			redo: {
				name: '重做'
			},
			separator: Handsontable.plugins.ContextMenu.SEPARATOR,
			make_read_only: {
				name: '设为只读'
			},
			separator: Handsontable.plugins.ContextMenu.SEPARATOR,
			alignment: {
				name: '对齐方式'
			},
			separator: Handsontable.plugins.ContextMenu.SEPARATOR,
			copy: {
				name: '复制'
			},
			cut: {
				name: '剪切'
			}
		}
	},
	stretchH: 'all',
	afterChange: changes => {
		if (changes && changes[0][0] !== 0) {
			//第一行标题忽略掉
			// console.log(changes[0]);
			saveData();
		}
	}
});

hot1.setDataAtCell(0, 0, '对象/模板对象');
hot1.setDataAtCell(0, 1, '触发激活条件');
hot1.setDataAtCell(0, 2, '触发ID');
hot1.setDataAtCell(0, 3, '触发参数');
hot1.setDataAtCell(0, 4, '逻辑条件');
hot1.setDataAtCell(0, 5, '变量定义/状态定义和赋值');
hot1.setDataAtCell(0, 6, '响应ID/变量赋值');
hot1.setDataAtCell(0, 7, '响应参数');
hot1.setDataAtCell(0, 8, '关联状态');

// 第一行为ReadOnly、居中
hot1.updateSettings({
	cells: function(row, column, prop) {
		const cellProperties = {};
		if (row === 0) {
			cellProperties.readOnly = true;
			cellProperties.editor = false;
			cellProperties.className = 'htCenter htMiddle';
			cellProperties.allowRemoveRow = false;
		}
		return cellProperties;
	}
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

// 加载数据
const loadData = () => {
	// 获取表格数据
	axios
		.get('/data/table/acquire')
		.then(function(response) {
			let data = response.data;
			// console.log(data);
			if (data.code === '00000') {
				// 先将json转化为字符串
				let tempData = JSON.stringify(data.data);
				// 对字符串再进行反转义
				tempData = escape2Html(tempData);
				// 转化为json后，赋值给表格
				hot1.loadData(JSON.parse(tempData).table);
			} else {
				// Do nothing
				console.log('load not right: ' + data.message);
			}
		})
		.catch(function(error) {
			console.log('load error: ' + error);
		});
};

var saveFlag;
// 保存数据，延迟5秒
const saveData = () => {
	if (saveFlag) {
		clearTimeout(saveFlag);
	}
	saveFlag = setTimeout(saveImmediate, 5000);

};

const saveImmediate = () => {
	console.log('saved now');
	// 格式化数据
	// 转化成json格式
	let data = { table: hot1.getData() };
	// 转成json字符串
	let table = JSON.stringify(data);
	// 将字符串中的转义字符及html相关格式文本进行转化
	table = html2Escape(table);
	// console.log(table);
	axios
		.post('/data/table/commit', JSON.parse(table))
		.then(function(response) {
			let data = response.data;
			if (data.code === '00000') {
				console.log('save success');
			} else {
				// Do nothing
				console.log('save error');
			}
		})
		.catch(function(error) {
			console.log(error);
		});
};

// 初始化
(function() {
	loadData();
})();

const loadTxt = function(name, table) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'data/' + name + '.txt', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				// if (!checkTypescriptSupport(xhr)) {
				// 	return;
				// }

				xhr.onreadystatechange = null;
				parserData(xhr.responseText, table);

				// blockEditorChange = true;
				// jsEditor.setValue(xhr.responseText);
				// jsEditor.setPosition({ lineNumber: 0, column: 0 });
				// blockEditorChange = false;
				// compileAndRun();

				// setToMultipleID("currentScript", "innerHTML", title);

				// currentSnippetToken = null;
			}
		}
	};
	xhr.send(null);
};

const parserData = function(data, table) {
	if (data) {
		// 解析数据，允许\n存在，所以要寻找一个通用的方式

		table.setDataAtCell(3, 3, data);
	}
};

//HTML标签转义（< -> &lt;）
function html2Escape(sHtml) {
	var temp = document.createElement('div');
	temp.textContent != null
		? (temp.textContent = sHtml)
		: (temp.innerText = sHtml);
	var output = temp.innerHTML;
	temp = null;
	return output;
}

//HTML标签反转义（&lt; -> <）
function escape2Html(str) {
	var temp = document.createElement('div');
	temp.innerHTML = str;
	var output = temp.innerText || temp.textContent;
	temp = null;
	return output;
}
