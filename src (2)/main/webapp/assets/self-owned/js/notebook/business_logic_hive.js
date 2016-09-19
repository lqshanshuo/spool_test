var analyze_result_display_businessLogic_hive = function(tableData,notebook) {
  console.log("function[analyze_result_display_businessLogic_hive] invoked...");
  tableData.header;
  tableData.result;
  notebook.result.result_hive.vm_analyze

  var tableModel = notebook.result.result_hive.vm_analyze;
  tableModel.buildData(tableData.result);
  tableModel.columnNames(tableData.header);
  tableModel.buildView();
  notebook.result.result_hive.vm_analyze_has_result(true);
}
