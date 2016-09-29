/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Xinyuanka_3() {
    var self = this;
    self.dream_type = ko.observable();

    self.key_1 = null;
    self.key_2 = null;

    self.inputContent = ko.observable();
}

function chooseType(type) {
    console.log("choose type in and type = " + type)

    xinyuanka_3.dream_type(type);

//    $('#whole_page').css('background', 'url(assets/self-owned/img/xinyuanka/'+type+'.jpg)');

    $('.img_size').css('width', "60px").css('height', "60px").css('border', "2px solid grey");

    var type_name="";
    switch (type) {
        case '1':
            type_name="plane"
            break;
        case '2':
            type_name="car"
            break;
        case '3':
            type_name="house"
            break;
        case '4':
            type_name="travel"
            break;
        case '5':
            type_name="career"
            break;
    }
    var $element = $('#' + type_name + '_image');
    if ($element.length) {
        $element.css('width', "70px").css('height', "70px").css('border', "5px solid yellow");
    }
}
