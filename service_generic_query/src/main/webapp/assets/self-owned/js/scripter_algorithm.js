var AlgorithmPOJO = AlgorithmPOJO || {};



AlgorithmPOJO = {
  mathOperatorLabels: ['+', '-', '*', '/', '%'],
  valueOperatorLabels: ["无", "绝对值", "四舍五入", "向上取整", "向下取整", "保留2位小数", "正弦", "余弦", "正切", "反正弦", "反余弦", "反正切", "对数", "平方根"],
  mathOperates: {
    '+': function(num1, num2) {
      return num1 + num2;
    },
    '-': function(num1, num2) {
      return num1 - num2;
    },
    '*': function(num1, num2) {
      return num1 * num2;
    },
    '/': function(num1, num2) {
      return num2 === 0 ? 0 : num1 / num2;
    },
    '%': function(num1, num2) {
      return num1 % num2;
    },
    "无": function(num1) {
      return num1;
    },
    "绝对值": function(num1) {
      return Math.abs(num1);
    },
    "四舍五入": function(num1) {
      return Math.round(num1);
    },
    "向上取整": function(num1) {
      return Math.cell(num1);
    },
    "向下取整": function(num1) {
      return Math.floor(num1);
    },
    "保留2位小数": function(num1) {
      return Number(num1).toFixed(2);
    },
    "正弦": function(num1) {
      return Math.sin(num1);
    },
    "余弦": function(num1) {
      return Math.cos(num1);
    },
    "正切": function(num1) {
      return Math.tan(num1);
    },
    "反正弦": function(num1) {
      return Math.asin(num1);
    },
    "反余弦": function(num1) {
      return Math.acos(num1);
    },
    "反正切": function(num1) {
      return Math.atan(num1);
    },
    "对数": function(num1) {
      return Math.log(num1);
    },
    "平方根": function(num1) {
      return Math.sqrt(num1);
    }
  },




  /**
   * 将数据（一般是数组数据）按照属性提取出标准的key属性列表
   * 举例：
   *  原始数据 [{"key_time":"20150513","key_1":"安徽","key_2":"移动","key_3":"3rdpartyflow"}]
   *  返回结果 ["key_time", "key_1", "key_2", "key_3"]
   */
  buildKeys: function(inputDataArray) {
    var finished = false;
    var result = [];
    $.each(inputDataArray, function(i, data) {
      if (finished) {
        return;
      }
      for (var key in data) {
        result.push(key);
      }
      finished = true;
    });
    return result;
  },

  /**
   *   通过属性Key来对数据进行聚合
   *
   */
  aggregateDataByKey: function(inputDataArray, key, fillFlag) {
    // 返回的结果集封装对象：
    // key:       聚合的属性key
    // value:     依据key聚合的结果数组，每一个原子结果对象依旧是一个key+value的对象
    var resultArray = {
      'key': key,
      'value': [],
      'keyValueArray': [],
      'keySumArray': []
    };

    var keyValueArray = [];
    var keySumArray = [];
    $.each(inputDataArray, function(i, data) {
      var keyValue = data[key];
      var keyValueIndex = $.inArray(keyValue, keyValueArray);
      if (keyValueIndex > -1) {
        if (fillFlag) {
          resultArray.value[keyValueIndex].value.push(data);
        }
        keySumArray[keyValueIndex] += 1;
      } else {
        keyValueArray.push(keyValue);
        var result = {
          'key': keyValue,
          'value': []
        };
        if (fillFlag) {
          result.value.push(data);
          resultArray.value.push(result);
        }
        keySumArray.push(1);
      }
    });
    // console.log(JSON.stringify(resultArray));

    resultArray.keyValueArray = keyValueArray;
    resultArray.keySumArray = keySumArray;
    // console.log(resultArray);
    return resultArray;
  },

  transferToXYTable: function(inputDataArray, key_y_axis, key_x_axis) {
    var rowArray = {
      'keyValueArray': [],
      'keySumArray': []
    };
    var columnArray = [];
    if (key_y_axis != null) {
      rowArray = AlgorithmPOJO.aggregateDataByKey(inputDataArray, key_y_axis, false);
    }
    columnArray = AlgorithmPOJO.aggregateDataByKey(inputDataArray, key_x_axis, true);


    var totalRows = rowArray.keyValueArray.length + 1;
    var totalColumns = 1 + columnArray.keyValueArray.length + 1;

    var rowTableArray = [];

    $.each(rowArray.keyValueArray, function(index, data) {

      var tableRowElement = new TableRow();
      tableRowElement.rowName = data;

      for (var i = 0; i < totalColumns; i++) {
        var tableCellElement = new TableCell();
        tableCellElement.rowName = tableRowElement.rowName;
        if (i == 0) {
          tableCellElement.columnName = key_y_axis;
          tableCellElement.data = data;
          tableCellElement.displayValue = data;
        } else if (i == (totalColumns - 1)) {
          tableCellElement.columnName = "合计";
          tableCellElement.data = rowArray.keySumArray[index];
          tableCellElement.displayValue = rowArray.keySumArray[index];
        } else {
          var columnName = columnArray.keyValueArray[i - 1];
          tableCellElement.columnName = columnName;
        }
        tableRowElement.cells.push(tableCellElement);
      }


      rowTableArray.push(tableRowElement);
    })

    var tableRowElement = new TableRow();
    tableRowElement.rowName = "合计";

    for (var i = 0; i < totalColumns; i++) {
      var tableCellElement = new TableCell();
      tableCellElement.rowName = tableRowElement.rowName;
      var columnName = columnArray.keyValueArray[i - 1];
      tableCellElement.columnName = columnName;
      if (i == 0) {
        tableCellElement.data = tableCellElement.rowName;
        tableCellElement.displayValue = tableCellElement.rowName;
      } else if (i == (totalColumns - 1)) {
        tableCellElement.data = inputDataArray.length;
        tableCellElement.displayValue = tableCellElement.data;
      }
      tableRowElement.cells.push(tableCellElement);
    }
    rowTableArray.push(tableRowElement);




    $.each(columnArray.keyValueArray, function(index, data) {

      var columnName = data;
      var columnObject = columnArray['value'][index];
      var columnValueArray = columnObject['value'];
      var columnIndex = index + 1;

      $.each(columnValueArray, function(ind, val) {
        // console.log("outter index is "+index +" and inner index is "+ind);
        // console.log(val[key_y_axis]);
        // console.log(val[key_y_axis]);
        // console.log(rowArray.keyValueArray);
        var rowIndex = $.inArray(val[key_y_axis], rowArray.keyValueArray);
        rowTableArray[rowIndex].cells[columnIndex].data.push(val);
        rowTableArray[rowIndex].cells[columnIndex].displayValue++;
      })

      rowTableArray[rowTableArray.length - 1].cells[columnIndex].data = columnArray.keySumArray[index];
      rowTableArray[rowTableArray.length - 1].cells[columnIndex].displayValue = columnArray.keySumArray[index];
    });

    // console.log(rowTableArray);
    return rowTableArray;
  },




  add_X_axisForTable: function(rowTableArray, key_X_axis, keyValueArray) {
    var new_rowTableArray = [];
    $.each(rowTableArray, function(index, value) {
      if (index != rowTableArray.length - 1) {
        var newTableRow = AlgorithmPOJO.transferTableRow(value, key_X_axis, keyValueArray);
        new_rowTableArray.push(newTableRow);
      } else {
        //合计row


        var lastRow = rowTableArray[rowTableArray.length - 1];

        var newTableRow = new TableRow();
        var tableRow = value;
        newTableRow.rowName = tableRow.rowName;
        $.each(new_rowTableArray[0].cells, function(index, value) {

          if (index == 0) {
            newTableRow.cells.push(lastRow.cells[index]);
          } else if (index == new_rowTableArray[0].cells.length - 1) {
            newTableRow.cells.push(lastRow.cells[lastRow.cells.length - 1]);
          } else {
            var sum = 0;
            for (var i = 0; i < new_rowTableArray.length; i++) {
              sum += new_rowTableArray[i].cells[index].displayValue;
            }

            var newCell = new TableCell();
            newCell.cellName = value.cellName;
            newCell.rowName = value.rowName;
            newCell.columnName = value.columnName;
            newCell.displayValue = sum;
            newTableRow.cells.push(newCell);

          }
        });
        new_rowTableArray.push(newTableRow);
      }
    });
    return new_rowTableArray;
  },

  transferTableRow: function(tableRow, key, keyValueArray) {
    var newTableRow = new TableRow();
    newTableRow.rowName = tableRow.rowName;
    $.each(tableRow.cells, function(index, value) {
      if (index == 0 || index == tableRow.cells.length - 1) {
        newTableRow.cells.push(value);
      } else {
        var newCellArray = AlgorithmPOJO.splitCell(value, key, keyValueArray);
        $.each(newCellArray, function(ind, cell) {
          newTableRow.cells.push(cell);
        });
      }
    });
    return newTableRow;
  },

  //todo:增添0值监测,提高性能
  splitCell: function(cell, key, keyValueArray) {

    var newCellArray = [];



    $.each(keyValueArray, function(index, value) {
      var newCell = new TableCell();
      newCell.cellName = value;
      newCell.rowName = cell.rowName;
      newCell.columnName = cell.columnName + "_" + value;
      newCellArray.push(newCell);
    });
    //如果原有cell的数据为0，那么只需要裂变，不再需要进行索引查询操作来提高性能
    if (cell.displayValue === 0) {
      //do nothing
    } else {
      $.each(cell.data, function(index, val) {
        var cellIndex = $.inArray(val[key], keyValueArray);
        newCellArray[cellIndex].data.push(val);
        newCellArray[cellIndex].displayValue++;
      });
    }
    // console.log(JSON.stringify(newCellArray));
    return newCellArray;
  },
  /**
   * 给Table新增一列
   *
   */
  addColumn: function(rowTableArray, columnName) {
    $.each(rowTableArray, function(index, tableRow) {
      var newCell = new TableCell();

      newCell.rowName = tableRow.rowName;
      newCell.columnName = columnName;


      tableRow.cells.push(newCell)
    });
    return rowTableArray;
  },

  getTableCells: function(tableRow, columnNameArray) {
    var result = [];
    $.each(tableRow.cells, function(index, tableCell) {
      $.each(columnNameArray, function(ind, columnName) {
        {
          if (tableCell.columnName == columnName) {
            result.push(tableCell);
          }
        }
      });
    });
    return result;
  },

  addColumnAndOperate: function(rowTableArray, newColumnName, operatorColumnNameArray, mathOperatorLabel, valueOperatorLabel) {
    $.each(rowTableArray, function(index, tableRow) {
      var operatorTableCells = AlgorithmPOJO.getTableCells(tableRow, operatorColumnNameArray);
      //如果mathOperatorLabel为空或者需要操作的table cell数量只有1个，那么只进行value操作
      //如果mathOperatorLabel不为空并且需要操作的table cell数量为2个，那么先进行数学运算，在进行value运算
      if (!valueOperatorLabel) {
        valueOperatorLabel = "无";
      }
      var newValue = 0;
      if (!mathOperatorLabel || operatorTableCells.length == 1) {
        newValue = AlgorithmPOJO.mathOperates[valueOperatorLabel](Number(operatorTableCells[0].displayValue));
      } else if (mathOperatorLabel && operatorTableCells.length == 2) {
        newValue = AlgorithmPOJO.mathOperates[mathOperatorLabel](Number(operatorTableCells[0].displayValue), Number(operatorTableCells[1].displayValue));
        newValue = AlgorithmPOJO.mathOperates[valueOperatorLabel](newValue);
      } else {
        return;
      }

      var newCell = new TableCell();
      newCell.rowName = tableRow.rowName;
      newCell.columnName = newColumnName;
      newCell.displayValue = newValue;

      tableRow.cells.push(newCell)
    });
    return rowTableArray;
  },



  printTable: function(rowTableArray) {
    AlgorithmPOJO.printTableHeader(rowTableArray);
    $.each(rowTableArray, function(index, rowData) {
      var contentEcho = "";
      $.each(rowData.cells, function(index, data) {
        // contentEcho += (data.displayValue + "("+data.rowName+"_"+data.columnName+")"+" | ");
        contentEcho += (data.displayValue + " | ");
        // contentEcho += (JSON.stringify(data.data) +" | ");
      });
      console.log(contentEcho);
    });
  },



  /**
   *
   *
   */
  printTableHeader: function(rowTableArray) {
    if (rowTableArray && rowTableArray.length > 0) {
      var firstRow = rowTableArray[0];
      var headerEcho = "";
      $.each(firstRow.cells, function(index, data) {
        headerEcho += (data.columnName + " | ");
      });
      console.log(headerEcho);
    }
  },

  getTableHeader: function(rowTableArray) {
    var header = [];
    if (rowTableArray && rowTableArray.length > 0) {
      var firstRow = rowTableArray[0];
      $.each(firstRow.cells, function(index, data) {
        header.push(data.columnName);
      });
    }
    return header;
  },
}

/**
 *   TableRow模型： 一个Table的数据集是由一个TableRow组成的有序列表构成，一个TableRow代表其中的一行，它包含着TableCell的列表
 *   rowName
 *   cells   TableCell的列表
 */
function TableRow() {
  var self = this;
  self.rowName = '';
  self.cells = [];
}


/**
 *   TableCell模型：
 *   cellName
 *   rowName
 *   columnName
 *   data          储存的数据，以数据表达，其中可承放单原子数据或多数量数据(统计)，当作为统计时也可以不设置此属性，根据需要
 *   displayValue  UI的显示值，在数据透视图中往往显示为data的统计数值
 */
function TableCell() {
  var self = this;
  self.cellName = '';
  self.rowName = '';
  self.columnName = '';
  self.data = [];
  self.displayValue = 0;
}


var DataTransferPOJO = DataTransferPOJO || {};

DataTransferPOJO = {

  seperateByComma: function(input) {
    var arr = input.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    /* will match:

        (
            ".*?"       double quotes + anything but double quotes + double quotes
            |           OR
            [^",\s]+    1 or more characters excl. double quotes, comma or spaces of any kind
        )
        (?=             FOLLOWED BY
            \s*,        0 or more empty spaces and a comma
            |           OR
            \s*$        0 or more empty spaces and nothing else (end of string)
        )

    */
    arr = arr || [];
    return arr;
  },
  transferHiveData: function(inputData, needJson) {
    var resultJsonObject = {};
    var resultArray = [];
    var header = [];
    var rowArray = inputData.split("\n");
    $.each(rowArray, function(index, rowData) {
      if (rowData != "") {
        var cellArray = DataTransferPOJO.seperateByComma(rowData);
        //retrieve header array
        if (index == 0) {
          header = cellArray;

        } else {
          if (needJson) {
            var json = DataTransferPOJO.transferArray2JsonObject(header, cellArray);
            resultArray.push(json);
          } else {
            resultArray.push(cellArray);
          }
        }
      }
    });
    resultJsonObject["header"] = header;
    resultJsonObject["result"] = resultArray;

    return resultJsonObject;
  },

  transferArray2JsonObject: function(headerArray, dataArray) {
    var json = {};
    $.each(headerArray, function(index, data) {
      json[data] = dataArray[index];
    });
    console.log(json);
    return json;
  },

  //return : {header:[],result:[[],[],[]]}
  serverData2TableData: function(inputData) {
    return DataTransferPOJO.transferHiveData(inputData);
  },
  //original: [{},{},{}]
  //return : {header:[],result:[[],[],[]]}
  serverJsonData2TableData: function(inputData) {
    var resultJsonObject = {};
    var headers = AlgorithmPOJO.buildKeys(inputData);

    var dataArray = [];
    $.each(inputData, function(index, value) {
      var singleRowData = [];
      $.each(headers, function(i, v) {
        if (value[v]!=undefined&&value[v]!=null) {
          singleRowData.push(value[v]);
        } else {
          singleRowData.push("");
        }
      });
      dataArray.push(singleRowData);
    });
    resultJsonObject["header"] = headers;
    resultJsonObject["result"] = dataArray;

    return resultJsonObject;
  },
  tableData2AnalyzeData: function(tableHeaderArray, tableDataArray) {
    var rowTableArray = [];
    $.each(tableDataArray, function(index, eachRowData) {
      var tableRowElement = new TableRow();
      var rowName = eachRowData[0];
      tableRowElement.rowName = rowName;
      $.each(eachRowData, function(cellIndex, eachCellData) {
        var tableCellElement = new TableCell();
        tableCellElement.rowName = rowName;
        tableCellElement.columnName = tableHeaderArray[cellIndex];
        tableCellElement.displayValue = eachCellData;
        tableRowElement.cells.push(tableCellElement);
      });
      rowTableArray.push(tableRowElement);
    });

    return rowTableArray;
  },
  analyzeData2TableData: function(inputData, analyzeType) {
    var resultJsonObject = {};
    var resultArray = [];
    var header = [];
    if (analyzeType == 'baseOnColumn') {
      //aggregate json type
      //  var resultArray = {
      //    'key': key,
      //    'value': [],
      //    'keyValueArray': [],
      //    'keySumArray': []
      //  };
      header = inputData.keyValueArray;
      resultArray.push(inputData.keySumArray);

    } else if (analyzeType == 'baseOnMultiColumn' || analyzeType == 'baseOnExtendColumn') {
      // data should be rowTableArray like
      var rowTableArray = inputData;

      header = AlgorithmPOJO.getTableHeader(rowTableArray);
      //empty the first header
      header[0] = "";
      $.each(rowTableArray, function(index, rowData) {
        var rowArray = [];
        $.each(rowData.cells, function(index, data) {
          rowArray.push(data.displayValue);
        });
        resultArray.push(rowArray);
      });

    } else {
      return;
    }
    resultJsonObject["header"] = header;
    resultJsonObject["result"] = resultArray;
    return resultJsonObject;
  },

  //[{key1:value1,key2:value2},{}]
  tableData2JsonDataArray: function(header, rowArray) {
    var resultArray = [];
    $.each(rowArray, function(index, rowData) {
      if (rowData != "") {
        var json = DataTransferPOJO.transferArray2JsonObject(header, rowData);
        resultArray.push(json);
      }
    });
    return resultArray;
  },
  tableData2SigleColumnData: function(tableHeaderArray, tableDataArray, wantedColumnHeader) {
    var resultArray = [];
    var index = tableHeaderArray.indexOf(wantedColumnHeader);
    if (index > -1) {
      $.each(tableDataArray, function(ind, eachRowData) {
        if (eachRowData[index]) { // remove empty || null || undefined data
          resultArray.push(eachRowData[index]);
        }
      })
    }
    return resultArray;
  },
  tableData2PieChartData: function(tableHeaderArray, tableDataArray, wantedColumnHeader) {
    
    var resultArray = [];
    var index = tableHeaderArray.indexOf(wantedColumnHeader);
    if (index > -1) {
      $.each(tableDataArray, function(ind, eachRowData) {
        if (eachRowData[index]) { // remove empty || null || undefined data
          resultArray.push({
            value: eachRowData[index],
            name: eachRowData[0]
          });
        }
        //remove the total sum (last row)
        resultArray.pop();
      })
    }
    return resultArray;
  },

  tableData2ChartData: function(tableHeaderArray, tableDataArray, wantedColumnHeaders) {
    var resultArray = [];
    var headerIndexArray = [];
    $.each(wantedColumnHeaders, function(index, columnHeader) {
      var index = tableHeaderArray.indexOf(columnHeader);
      if (index > -1) {
        headerIndexArray.push(index);
      }
    })

    $.each(tableDataArray, function(ind, eachRowData) {
      var chartData = [];
      $.each(headerIndexArray, function(i, headerIndex) {
        chartData.push(eachRowData[headerIndex]);
      })
      resultArray.push(chartData);
    })
    return resultArray;
  },
}
