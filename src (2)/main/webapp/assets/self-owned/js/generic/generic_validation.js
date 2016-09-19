var ValidationPOJO = ValidationPOJO || {};
ValidationPOJO = {
  validateNotNull: function(input) {
    if (ValidationPOJO.validateMustNumber(input)) {
      return true;
    } else {
      var result = false;
      if (input && input.length > 0) {
        result = true;
      } else {
        result = false;
      }
      return result;
    }
  },
  validateNotMax: function(input) {
    var result = false;
    if (input && input.length <= 255) {
      result = true;
    } else {
      result = false;
    }
    return result;
  },
  validateNoMoreThan5000: function(input) {
    var result = false;
    if (input && input.length < 5000) {
      result = true;
    } else {
      result = false;
    }
    return result;
  },
  validateMustNumber: function(input) {
    try {
      input = parseFloat(input);
      if (typeof input == 'number') {
        return true;
      } else {
        return false;
      }
    } catch (ex) {
      return false;
    }
  },
  validateNOTNegative: function(input) {
    if (ValidationPOJO.validateMustNumber(input) && input >= 0) {
      return true;
    } else {
      return false;
    }
  },
  validateSpecialChars: function(input) {
    // console.log("The validate input special chars operation has been invoked!");
    var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#@!~\]\[{}\\/`\|])*)$/);
    var result = input.match(regEx);
    if (result == null) {
      // console.log("The validate input operation result: false---"+input);
      return false;
    } else {
      // console.log("The validate input operation result: true---"+input);
      return true;
    }
  },
  validateInputLength: function(input) {
    //        console.log("The validate input length operation has been invoked!");
    var result = false;
    if (input && input.length >= 6 && input.length <= 20) {
      result = true;
    } else {
      result = false;
    }
    //        console.log("The validate input length operation result:[" + input + "] is " + result);
    return result;
  },
  validateEmailPattern: function(input) {
    // console.log("The validate input email pattern operation has been invoked!");
    var reMail = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    var regEx = new RegExp(reMail);
    var result = false;
    if (regEx.test(input)) {
      result = true;
    }
    // console.log("The validate input email pattern operation result:["+input+"] is "+result);
    return result;
  },
  validatePhonePattern: function(input) {
    var tel = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
    var regEx = new RegExp(tel);
    var result = false;
    if (regEx.test(input)) {
      result = true;
    }
    return result;
  },
  KEY_NOT_NULL: 'KEY_NOT_NULL',
  KEY_ARRAY_NOT_NULL: 'KEY_ARRAY_NOT_NULL',
  KEY_NOT_MAX: 'KEY_NOT_MAX',
  KEY_TOO_LONG: 'KEY_TOO_LONG',
  KEY_SPECIAL: 'KEY_SPECIAL',
  KEY_EMAIL: 'KEY_EMAIL',
  KEY_LENGTH_SCOPE: 'KEY_LENGTH_SCOPE',
  KEY_NOT_NEGATIVE: 'KEY_NOT_NEGATIVE',
  KEY_MUST_NUMBER: 'KEY_MUST_NUMBER',
  KEY_MUST_PHONE_NUMBER: 'KEY_MUST_PHONE_NUMBER',
  validate: function(inputName, inputValue, errorMessageRef, validateFunctions, emptyFlag) {
    if (emptyFlag) {

    } else {
      if (!inputValue) {
        errorMessageRef.push(inputName + " 不能为空");
        return;
      };
    }

    if (inputName && inputValue && errorMessageRef && validateFunctions) {
      for (i = 0; i < validateFunctions.length; i++) {
        var key = validateFunctions[i];
        if (ValidationPOJO.KEY_NOT_NULL == key) {
          if (!ValidationPOJO.validateNotNull(inputValue)) {
            errorMessageRef.push(inputName + " 不能为空");
          }
        };
        if (ValidationPOJO.KEY_ARRAY_NOT_NULL == key) {
          if (!ValidationPOJO.validateNotNull(inputValue)) {
            errorMessageRef.push(inputName + " 不能为空数组");
          }
        };
        if (ValidationPOJO.KEY_TOO_LONG == key) {
          if (!ValidationPOJO.validateNoMoreThan5000(inputValue)) {
            errorMessageRef.push(inputName + " 超过输入最大限制[5000字符]");
          }
        };
        if (ValidationPOJO.KEY_NOT_MAX == key) {
          if (!ValidationPOJO.validateNotMax(inputValue)) {
            errorMessageRef.push(inputName + " 超过输入最大限制");
          }
        };
        if (ValidationPOJO.KEY_SPECIAL == key) {
          if (!ValidationPOJO.validateSpecialChars(inputValue)) {
            errorMessageRef.push(inputName + " 含有特殊字符");
          }
        };
        if (ValidationPOJO.KEY_EMAIL == key) {
          if (!ValidationPOJO.validateEmailPattern(inputValue)) {
            errorMessageRef.push(inputName + " 不符合正确的邮箱格式");
          }
        };
        if (ValidationPOJO.KEY_LENGTH_SCOPE == key) {
          if (!ValidationPOJO.validateInputLength(inputValue)) {
            errorMessageRef.push(inputName + " 长度不满足格式要求");
          }
        };
        if (ValidationPOJO.KEY_NOT_NEGATIVE == key) {
          if (!ValidationPOJO.validateNOTNegative(inputValue)) {
            errorMessageRef.push(inputName + " 必须为非负数");
          }
        };
        if (ValidationPOJO.KEY_MUST_NUMBER == key) {
          if (!ValidationPOJO.validateMustNumber(inputValue)) {
            errorMessageRef.push(inputName + " 必须是数字");
          }
        };
        if (ValidationPOJO.KEY_MUST_PHONE_NUMBER == key) {
          if (!ValidationPOJO.validatePhonePattern(inputValue)) {
            errorMessageRef.push(inputName + " 必须是合法的电话号码");
          }
        };
      }
    } else {
      return;
    }
  }
}
