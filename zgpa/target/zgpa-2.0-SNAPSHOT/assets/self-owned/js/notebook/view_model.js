/**
 * View Model for the console zone in the notebook
 *
 */
function ConsoleViewModel(data, isChecked, isDisplay) {
  var self = this;
  self.data = data;
  self.inputContent = ko.observable('#Note: \n Please select your favor language and input the context...');
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
  self.isBlocking = ko.observable(false);
  self.currentBookmark = ko.observable();
}

/**
 * View Model for the result zone in the notebook
 *
 */
function ResultViewModel(data, isChecked, isDisplay,notebook) {
  var self = this;
  self.notebook = notebook;
  self.data = data;
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
  self.isDisplay_hive = ko.observable(false);
  self.isDisplay_sql = ko.observable(false);
  self.isDisplay_pig = ko.observable(false);
  self.isDisplay_spark = ko.observable(false);
  self.isDisplay_impala = ko.observable(false);
  self.isDisplay_markdown = ko.observable(false);

  self.result_hive = new HiveResultViewModel(notebook);
  self.result_sql = new SqlResultViewModel();
  self.result_pig = new PigResultViewModel();
  self.result_spark = new SparkResultViewModel();
  self.result_impala = new ImpalaResultViewModel();
  self.result_markdown = new MarkdownResultViewModel();

}

function HiveResultViewModel(notebook){
  var self = this;
  self.notebook = notebook;
  self.data_server = null;

  self.vm_server = new ListViewModel();
  self.vm_server_has_result = ko.observable(false);

  self.vm_analyze = new ListViewModel();
  self.vm_analyze_has_result = ko.observable(false);
}
function SqlResultViewModel(){
  var self = this;
}
function PigResultViewModel(){
  var self = this;
}
function SparkResultViewModel(){
  var self = this;
}
function ImpalaResultViewModel(){
  var self = this;
}
function MarkdownResultViewModel(){
  var self = this;
  self.data = ko.observable();
}


/**
 * View Model for the status zone in the notebook
 *
 */
function StatusViewModel(data, isChecked, isDisplay) {
  var self = this;
  self.data = data;
  self.currentStatus = ko.observable('READY');
  self.currentStatusClass = ko.observable('fa fa-plug');
  self.progress= ko.observable(0);
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
}


/**
 * View Model for the single notebook
 *
 */
function NotebookViewModel(data, isChecked, isDisplay) {
  var self = this;
  self.data = data;
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
  self.console = new ConsoleViewModel(null, false, true);
  self.result = new ResultViewModel(null, false, false,self);
  self.status = new StatusViewModel(null, false, false);
  self.alerts = new ResponseViewModel(); // This model is located in the generic_query.js
}

/**
 * View Model for the whole DOM, it holds the whole notebook list elements
 *
 */
function NotebookListViewModel() {
  var self = this;
  self.data = null;
  // notebook elements for the whole DOM
  self.notebooks = ko.observableArray();
  // self.currentNotebook = ko.observable();
  self.chartPanel = new ChartListViewModel(self);


  //单纯的界面逻辑函数： 重置当前notebook list
  self.resetNotebook = function() {
    resetNotebook_businessLogic(self);
  };

  //单纯的界面逻辑函数： 新增一个notebook
  self.addNotebook = function() {
    addNotebook_businessLogic(self);
  };

  //单纯的界面逻辑函数： 删除当前notebook
  self.removeNotebook = function(current) {
    self.notebooks.remove(current);
  };

  //单纯的界面逻辑函数： 切换当前notebook的console,result,status区域的显示状态
  self.switchState = function(notebook, componentType) {
    switchState_businessLogic(notebook, componentType);
  };


  self.switchBookmark = function(ni,bi) {
    switchBookmark_businessLogic(ni,bi,self);
  };

  self.run = function(currentData, currentIndex) {
    run_businessLogic(currentData, currentIndex,self);
  }

  self.download = function(headers,data,type,notebook){
    download_businessLogic(headers,data,type,notebook);
  }
  self.prepare_analyze = function(headers,data,notebook){
    prepare_analyze_businessLogic(headers,data,notebook);
  }

  self.prepare_charting = function(headers,data,notebook){
    prepare_charting_businessLogic(headers,data,notebook);
  }

}

//-----------------------------mock
