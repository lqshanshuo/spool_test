
function ChartListViewModel(parent) {
  var self = this;
  var parent = parent;
  self.isDisplay = ko.observable(false);
  self.charts = ko.observableArray();
  self.addChart = function () {
    var chartViewModel = new ChartViewModel(self);
    self.charts.push(chartViewModel);
    return chartViewModel;
  };
  self.removeChart = function (current) {
    self.charts.remove(current);
  };
}

// the chart view model which holds the chart's component and relevant attributes
function ChartViewModel(parent) {
  var self = this;

  // the parent of this chart view model, general is the ChartListViewModel
  var parent = parent;

  // this is the chart setting object
  self.chartSetting = null;

  // error flag for error DIV & message dynamic binding
  self.hasError = ko.observable(false);

  // display flag for visible
  self.isDisplay = ko.observable(true);

  //chart instance of the echart js component
  self.echartComponent = null;

  self.tableData = null;
  self.tableHeaders = null;


  // the auto compute chart element div style
  // when only one chart, it holds the entire row
  // when has two chart, they seperate the row by equal
  // when greater than two chart, each row holds three chart element
  self.chart_div_style = ko.computed(function () {
    var result = "col-md-12";
    if (parent.charts && parent.charts().length > 2) {
      result = "col-md-4";
    } else if (parent.charts && parent.charts().length > 1) {
      result = "col-md-6";
    }
    return result;
  }, self);


  // auto adjust the echart component size when the wrapper DIV size changed
  self.chart_div_style.subscribe(function (newValue) {
    if (self.echartComponent) {
      setTimeout(self.refresh, 500);
    }
  });

  self.getSelfId = function () {
    return 'chart' + parent.charts.indexOf(self);
  };

  // refresh the echart component
  self.refresh = function () {
    if (self.echartComponent) {
      self.echartComponent.resize();
    }
  }

  self.removeSelf = function () {
    parent.charts.remove(self);
  };


  self.popuUpAddSeriesModal = function () {
    if(self.chartSetting){
      prepare_series_add_businessLogic(self);
    }
  }
  self.popuUpRemoveSeriesModal = function () {
    if(self.chartSetting){
      prepare_series_remove_businessLogic(self);
    }
  }

}




$.subscribe("NOTEBOOK_CHARTING_EVENT", listener_NOTEBOOK_CHARTING_EVENT);
function listener_NOTEBOOK_CHARTING_EVENT() {
  if (arguments && arguments[1]) {
    console.log("Catch event [NOTEBOOK_CHARTING_EVENT] and the response data are:");
    console.log(arguments[1]);
    var chartSetting = arguments[1].chartSetting;
    charting_result_display_businessLogic(chartSetting);
    ModalUtil.modal_close('popupModalPro');
  }
}
$.subscribe("NOTEBOOK_CHARTING_SERIES_ADD_EVENT", listener_NOTEBOOK_CHARTING_SERIES_ADD_EVENT);
function listener_NOTEBOOK_CHARTING_SERIES_ADD_EVENT() {
  if (arguments && arguments[1]) {
    console.log("Catch event [NOTEBOOK_CHARTING_SERIES_ADD_EVENT] and the response data are:");
    console.log(arguments[1]);
    var chartViewModel = arguments[1].chartViewModel;
    series_add_result_display_businessLogic(chartViewModel);
    ModalUtil.modal_close('popupModalPro');
  }
}
$.subscribe("NOTEBOOK_CHARTING_SERIES_REMOVE_EVENT", listener_NOTEBOOK_CHARTING_SERIES_REMOVE_EVENT);
function listener_NOTEBOOK_CHARTING_SERIES_REMOVE_EVENT() {
  if (arguments && arguments[1]) {
    console.log("Catch event [NOTEBOOK_CHARTING_SERIES_REMOVE_EVENT] and the response data are:");
    console.log(arguments[1]);
    var chartViewModel = arguments[1].chartViewModel;
    var seriesRemoveSetting = arguments[1].seriesRemoveSetting;
    series_remove_result_display_businessLogic(chartViewModel,seriesRemoveSetting);
    ModalUtil.modal_close('popupModalPro');
  }
}


var prepare_charting_businessLogic = function(headers, data, notebook) {
  if (headers && data) {
    headers = headers.filter(UtilPOJO.removeEmptyChars);
    // do something...
    var pojo = {
      'headers': headers,
      'data': data,
      'notebook': notebook
    }
    ModalUtil.popup_modal_with_businessPOJO('数据出图参数设置', '/prototype_scripter_notebook_modal_chart.html', pojo);
  } else {
    notebook.alerts.warningResponse("当前没有合适出图的数据结果", "提示:", "[出图设置]");
  }
}

var prepare_series_add_businessLogic = function(chartViewModel) {
  if (chartViewModel) {
    var pojo = {
      'chartViewModel':chartViewModel
    }
    ModalUtil.popup_modal_with_businessPOJO('数据出图参数设置', '/prototype_scripter_notebook_modal_chart_series_add.html', pojo);
  } else {
    // should not in this block when the code is strong enough
  }
}

var prepare_series_remove_businessLogic = function(chartViewModel) {
  if (chartViewModel) {
    var pojo = {
      'chartViewModel':chartViewModel
    }
    ModalUtil.popup_modal_with_businessPOJO('数据出图参数设置', '/prototype_scripter_notebook_modal_chart_series_remove.html', pojo);
  } else {
    // should not in this block when the code is strong enough
  }
}

var charting_result_display_businessLogic = function(chartSetting) {

  if (chartSetting && notebookListViewModel) {
    var chartPanel = notebookListViewModel.chartPanel;
    //创建一个新的ChartViewModel
    var chartViewModel = chartPanel.addChart();

    chartViewModel.chartSetting = chartSetting;
    //如果chartPanel隐藏，显示之
    if (!chartPanel.isDisplay()) {
      chartPanel.isDisplay(true);
    }
    //为chart view model 生成chart
    var chartName = chartSetting.chartName();
    var chosenChartType = chartSetting.chosenChartType();
    var headers = chartSetting.availableColumnNames();
    var y_Axis_name = chartSetting.selectedColumn_y();
    var serverData = chartSetting.data.data;
    var series_name = y_Axis_name;
    chartViewModel.tableData = serverData;
    chartViewModel.tableHeaders = chartSetting.data.headers;
    if (chosenChartType === "pie") {
      var series_data = DataTransferPOJO.tableData2PieChartData(headers, serverData, y_Axis_name);
      chartViewModel.echartComponent = ChartPOJO.generatePieChart(chartViewModel.getSelfId(), series_name, series_data);
    } else {
      var x_Axis_name = chartSetting.selectedColumn_x();
      var series_data = DataTransferPOJO.tableData2SigleColumnData(headers, serverData, y_Axis_name);
      var x_Axis_data = DataTransferPOJO.tableData2SigleColumnData(headers, serverData, x_Axis_name);
      chartViewModel.echartComponent = ChartPOJO.generateGridChart(chartViewModel.getSelfId(), chosenChartType, chartName, false, x_Axis_data, series_name, series_data);
    }

  }
}

var series_add_result_display_businessLogic = function(chartViewModel) {
  var self = chartViewModel;
  var chart = self.echartComponent;
  var headers = self.tableHeaders;
  var serverData = self.tableData;
  var series_name = self.chartSetting.selectedColumn_y();
  var series_type = self.chartSetting.chosenChartType();
  var series_data = DataTransferPOJO.tableData2SigleColumnData(headers, serverData, series_name);

  self.echartComponent = ChartPOJO.addSeries(chart, series_name, series_type, series_data);
}
var series_remove_result_display_businessLogic = function(chartViewModel,seriesRemoveSetting) {
  var self = chartViewModel;
  var chart = self.echartComponent;
  var series_name = seriesRemoveSetting.selectedColumn_y();
  self.echartComponent = ChartPOJO.removeSeries(chart, series_name);
}
