var ModalUtil = ModalUtil || {};
ModalUtil = {
  businessPOJO:{},
  modal_close : function(modalName) {
    if(!modalName){
      modalName = "popupModal";
    }
    $('#'+modalName).modal('hide');
  },

  responseData:{
    modalTitle:"",
    hasError:false,
    resultTitle:"",
    resultSubTitle:"",
    resultContent:""
  },

  popup_response_modal:function(){
    if(ModalUtil.responseData){
      ModalUtil.popup_modal(ModalUtil.responseData.modalTitle, '/assets/self-owned/html/generic_modal_response_content.html');
    }
  },

  popup_modal_with_businessPOJO:function(componentTitle,componentLocation,pojo){
    ModalUtil.businessPOJO=pojo;
    ModalUtil.popup_modal(componentTitle,componentLocation);
  },

  popup_modal:function(componentTitle,componentLocation,popupModalId,popupModalLabel,modalContentDIV,contentTitle,businessType) {
    popupModalId = popupModalId || "popupModalPro";
    popupModalLabel = popupModalLabel || "popupModalLabelPro";
    modalContentDIV = modalContentDIV || "modalContentDIVPro";
    $('#'+popupModalId).modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#'+popupModalLabel).html(componentTitle);
    $('#'+modalContentDIV).load($.getRootPath() + componentLocation);
    contentTitle = contentTitle || "Content Title";
    ModalUtil.businessPOJO.contentTitle=contentTitle;
    if(businessType){
      ModalUtil.businessPOJO.businessType=businessType;
    }

  }
};

function GenericModalViewModel() {
  var self = this;
  // Attribute for validation error flag
  self.hasError = ko.observable(false);
  self.errorMessage = ko.observableArray([]);

  // Attribute for server side response flag
  self.hasResult= ko.observable(false);

  // Attribute for result display DIV
  // styleClass use for display success or failed style, it include "alert-success" & "alert-danger"
  self.styleClass=  ko.observable("alert-success");
  self.resultTitle=  ko.observable("Result Title");
  self.resultSubTitle=  ko.observable("Sub Title");
  self.resultContent=  ko.observable("Content...");

  // Business POJO|Model for reference
  self.businessPOJO=ko.observable();


  self.validation = function(fn){
    var flag = false;
    if(fn && jQuery.isFunction(fn)){
      console.log("Now validation the paging elements with business function...")
      self.clearMessageDIV();
      var errorMessages = fn();
      if (errorMessages.length > 0) {
        self.errorMessage(errorMessages);
      } else {
        flag = true;
      }
      self.hasError(!flag);
    }else{
      console.log("validation not passed the business function, please fix it...");
    }
    return flag;
  };

  self.clearMessageDIV = function () {
    self.errorMessage.removeAll();
    genericModalViewModel.hasError(false);
  };

  self.response = function(successFlag,resultTitle,resultSubTitle,resultContent){
    self.hasResult(true);
    self.resultTitle(resultTitle);
    if(successFlag){
      self.styleClass("alert-success");
    }else{
      self.styleClass("alert-danger");
    }
    self.resultSubTitle(resultSubTitle);
    self.resultContent(resultContent);
  }
}
