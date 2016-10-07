function GenericUploadPageViewModel(userCode,systemCode,moduleCode,functionCode) {
  userCode = userCode||'matrix_user';
  systemCode = systemCode || 'matrix_system';
  moduleCode = moduleCode || 'matrix_module';
  functionCode = functionCode || 'matrix_function';
  var self = this;
  self.uploadRef = null;
  self.key1 = ko.observable(userCode);
  self.key2 = ko.observable(systemCode);
  self.key3 = ko.observable(moduleCode);
  self.key4 = ko.observable(functionCode);
  self.alerts = new ResponseViewModel(); // This model is located in the generic_query.js
  self.uploadedFileUrls = ko.observableArray([]);

  //Keep DB Entity
  self.uploadedFileEntitys = [];

  self.validation_before_upload = function(){
    if (self.key1() && self.key2() && self.key3() && self.key4()) {
      vm.alerts.resultVisible(false);
    } else {
      self.alerts.warningResponse("Validation Error", "Tips:", "[Upload File Validation]");
      if(self.uploadRef){
        uploadRef.fileinput('cancel');
        uploadRef.fileinput('clear');
      }
    }
  };

  self.upload_error_handler = function(){
    self.alerts.warningResponse(msg, "Tips:", "[Upload File Error]");
  }
}


var initialize_pic_upload_environment = function(file_upload_component_id,vm,successListener,failerListener) {
  successListener = successListener||"SUCCESS_LISTENER";
  failerListener = failerListener || "FAILED_LISTENER";
  var $upload = $('#' + file_upload_component_id);
  vm.uploadRef = $upload;
  $upload.fileinput({
    uploadUrl: $.getServerRoot() + "/service_generic_query/GenericUploadService",
    previewFileIcon: '<i class="fa fa-file"></i>',
    uploadExtraData: function() {
      var obj = {
        'UNIQUE_ID': vm.key1(),
        'SYSTEM_ID': vm.key2(),
        'MODULE_ID': vm.key3(),
        'FUNCTION_ID': vm.key4()
      };
      return obj;
    },
    allowedFileExtensions: ["jpeg", "jpg", "png", "gif"],
    allowedPreviewTypes: null, // disable preview of standard types
    allowedPreviewMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'], // allow content to be shown only for certain mime types
    previewFileIconSettings: {
      'docx': '<i class="fa fa-file-word-o text-primary"></i>',
      'xls': '<i class="fa fa-file-excel-o text-success"></i>',
      'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
      'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
      'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
      'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
    },
    uploadAsync: true,
    maxFileSize: 10096,
    maxFileCount: 1,
    showBrowse: false,
    browseOnZoneClick: true
  });
  $upload.on('filepreupload', function(event, data, previewId, index) {
    // validation_before_upload(vm);
    if(vm && vm.validation_before_upload){
      vm.validation_before_upload();
    }
    console.log('File pre upload triggered');
  });
  $upload.on('fileuploaded', function(event, data, previewId, index) {

    var form = data.form,
      files = data.files,
      extra = data.extra,
      response = data.response,
      reader = data.reader;

    console.log(response);
    $.dispatchGenericResponse(response, successListener, failerListener);
    $upload.fileinput('refresh');
  });


  $upload.on('fileuploaderror', function(event, data, msg) {
    var form = data.form,
      files = data.files,
      extra = data.extra,
      response = data.response,
      reader = data.reader;
    console.log('File upload error');
    // get message
    console.log(msg);
    if(vm && vm.upload_error_handler){
      vm.upload_error_handler();
    }
  });




  //hide
  $('.file-caption-main').css('display','none');
}
