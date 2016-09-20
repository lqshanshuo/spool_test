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
    
    $('#whole_page').css('background', 'url(assets/self-owned/img/xinyuanka/'+type+'.jpg)');
    
//    switch (type) {
//        case "plane":
//            $('#body').css('background', 'url(assets/self-owned/img/xinyuanka/plane.jpg)');
//            break;
//        case "car":
//            $('#body').css('background', 'url(assets/self-owned/img/xinyuanka/car.jpg)');
//            break;
//        case "house":
//            $('#body').css('background', 'url(assets/self-owned/img/xinyuanka/house.jpg)');
//            break;
//        case "travel":
//            $('#body').css('background', 'url(assets/self-owned/img/xinyuanka/p.jpg)');
//            break;
//        case "career":
//            break;
//        default:
//    }
}