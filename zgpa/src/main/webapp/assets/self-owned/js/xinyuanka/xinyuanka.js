/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Xinyuanka_3() {
    var self = this;
    self.dream_type = ko.observable("");
    self.isPlaneSelected = ko.observable();
    self.isCarSelected = ko.observable();
    self.isHouseSelected = ko.observable();
    self.isTravelSelected = ko.observable();
    self.isTCareerSelected = ko.observable();

    self.key_1=null;
    self.key_2=null;
    
    self.inputContent = ko.observable();
}

function chooseType(type) {
    console.log("choose type in and type = " + type)

    xinyuanka_3.dream_type(type);

//    $('#whole_page').css('background', 'url(assets/self-owned/img/xinyuanka/'+type+'.jpg)');

    $('.img_size').css('width', "60px").css('height', "60px").css('border', "2px solid grey");

    var $element = $('#'+type+'_image');
    if($element.length){
      $element.css('width', "70px").css('height', "70px").css('border', "5px solid yellow");
    }
}
