/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Xinyuanka_3() {
    var self = this;
    self.dream_type = ko.observable(" ");
    self.isPlaneSelected = ko.observable();
    self.isCarSelected = ko.observable();
    self.isHouseSelected = ko.observable();
    self.isTravelSelected = ko.observable();
    self.isTCareerSelected = ko.observable();

    self.inputContent = ko.observable();
}

function chooseType(type) {
    console.log("choose type in and type = " + type)

    xinyuanka_3.dream_type(type);

//    $('#whole_page').css('background', 'url(assets/self-owned/img/xinyuanka/'+type+'.jpg)');

    $('.img_size').css('width', "40px");
    $('.img_size').css('height', "40px");

//    $('#car_image').css('width', "40px");
//    $('#car_image').css('height', "40px");
//
//    $('#house_image').css('width', "40px");
//    $('#house_image').css('height', "40px");
//
//    $('#travel_image').css('width', "40px");
//    $('#travel_image').css('height', "40px");
//
//    $('#career_image').css('width', "40px");
//    $('#career_image').css('height', "40px");

    switch (type) {
        case "plane":
            $('#plane_image').css('width', "60px");
            $('#plane_image').css('height', "60px");
            break;
        case "car":
            $('#car_image').css('width', "60px");
            $('#car_image').css('height', "60px");
            break;
        case "house":
            $('#house_image').css('width', "60px");
            $('#house_image').css('height', "60px");
            break;
        case "travel":
            $('#travel_image').css('width', "60px");
            $('#travel_image').css('height', "60px");
            break;
        case "career":
            $('#career_image').css('width', "60px");
            $('#career_image').css('height', "60px");
            break;
        default:
    }
}