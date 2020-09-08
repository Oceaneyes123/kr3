    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
// 신청하기 클릭 시
function mf_freeApply(Type) {

    if (getParameterByName("PartnerCode") == 2060) {
        gtag('event', 'PC_apply', { 'event_category': 'Apply' });
    }

    smartHttpsConv('milk_ele_event_May_2', '');

    var name = $("#txt_Name_" + Type).val();

    var typeCode = "";
    typeCode = $(".chk_area span input[name='chk_service']:checked").val();

    var phone = "";
    if ($("#txt_Phone_" + Type).val().indexOf("-")) {
        phone = $("#txt_Phone_" + Type).val().replace(/-/gi, "");
    }
    else {
        phone = $.trim($("#txt_Phone_" + Type).val());
    }

    var phoneChk = $("#txt_PhoneChkNum_" + Type).val();


    var grade = $("#gradeChk input:checked").val();

    if (grade == null) {
        grade = 0;
    }

    var pName = $("#txt_PName_" + Type).val();

    if (name == "" || name == "학습생 이름을 입력해주세요.") {
        alert("이름을 입력해 주세요!");
        $("#txt_Name_" + Type).focus();
        return;
    }
    else if (grade == "") {
        alert("학년을 선택해 주세요!");
        return;
    }
    else if (pName == "") {
        alert("학부모의 이름을 입력해 주세요!");
        $("#txt_PName_" + Type).focus();
        return;
    }
    else if (phone == "" || phone == " 없이 숫자번호만 입력") {
        alert("휴대폰번호를 입력해 주세요!");
        $("#txt_Phone_" + Type).focus();
        return;
    }
    else if (phoneChk == "" || phoneChk == "인증번호 발송 후 입력해주세요.") {
        alert("인증번호를 입력해 주세요!");
        $("#txt_PhoneChkNum_" + Type).focus();
        return;
    }
    else if (!$("#chk_agent").is(":checked")) {
        alert("만 14세 미만 아동 신청 시 법정대리인의 동의가 필요합니다.");
        return;
    }
    else if (!$("#termsCheck").is(":checked")) {
        alert("이용약관에 동의해 주세요.");
        return;
    } else if (!$("#privacyCheck").is(":checked")) {
        alert("개인정보 수집 및 활용에 동의해 주세요.");
        return;
    } else {
        if (phone.length < 10) {
            alert("휴대폰번호를 바르게 입력해 주세요.");
            if (Type == "M") {
                $("#txt_Phone_" + Type).focus();
            }
            else {
                $("#txt_Phone_" + Type + "1").focus();
            }
            return;
        }
    }

    if (Creti == "Y") {
        // 버튼 클릭 막기
        $('#p_btn_submit').click(function () { return false; });

        $.ajax({
            url: "/Partner/PartnerMember_joinChk",
            type: "post",
            dataType: "json",
            data: ({ Name: pName, Phone: phone, Grade: grade, partnerCode: Code }),
            success: function (result) {
                // ask#38011
                if (result == "Y" || result == "Z") {
                    alert("밀크T를 다시 신청해주셔서 감사합니다:)\n빠른시간 내 담당 선생님으로부터 무료체험 신청 해피콜이 진행될 예정입니다.");
                    window.location.reload(true);
                } else if (result == "D") {
                    alert("밀크T중학에서 학습 중이므로 체험 신청이 불가합니다.");
                    window.location.reload(true);
                } else if (result == "N") {
                    // 가입
                    PartnerJoin(name, phone, grade, typeCode, pName);
                }
                else {
                    alert("다시 신청 해주세요.");
                    window.location.reload(true);
                }
            },
            error: function (e) {
                alert(e.toString());
            }
        });
    }
    else {
        alert("휴대폰 인증을 해주세요!");
        return;
    }
}

// 가입
function PartnerJoin(name, phone, grade, TypeCode, pName) {

    var tMProvision = 0; // ask#35461

    if ($("#maketingCheck").is(":checked")) {
        tMProvision = 1;
    } else {
        tMProvision = 0;
    }

    $.ajax({
        url: "/Partner/PartnerMember_join",
        type: "post",
        dataType: "json",
        data: ({ Name: pName, Phone: phone, Grade: grade, RecomType: "", RecomId: "", PartnerCode: Code, TypeClass: "0001", TypeCode: TypeCode, TMProvision: tMProvision, sName: name }), // ask#35461
        success: function (result) {
            if (result[0].RESULT == "Y") {
                // 문자발송
                //fn_sendsmsMgm(name, phone);
                //var date = new Date();
                //document.cookie = 'hpscript=' + phone + ';expires=' + date.setTime(date.getTime() + 1 * 60 * 60 * 1000).toString() + ';path=/';
                setsave("phone", phone, 1);
                setsave("l_name", name, 1);
                if (location.pathname.toString().toLowerCase() == "/partner/partner191211") {
                    alert("밀크T 무료체험 신청이 완료되었습니다. 신청 후 3일 이내에 무료체험 안내 해피콜이 진행 될 예정입니다.")
                    window.close();
                    close();
                    self.close();
                } else {
                    document.location.href = pfUrl + Code;
                }
            }
            else if (result[0].RESULT == "Z") {
                alert("이미 신청한 회원입니다.");
                window.location.reload(true);
            }
            else {
                alert("체험 신청이 실패하였습니다. 다시 시도해 주세요.");
                window.location.reload(true);
            }
        },
        error: function (e) {
            alert(e.toString());
        }
    });
}

function fn_sendsmsMgm(name, phone) {
    $.ajax({
        url: "/Partner/Partner_send_sms",
        type: "post",
        dataType: "json",
        data: ({ UserName: name, Phone: phone, Key: "991FA1B09470418FBBDF53DD827E5850" }),
        success: function (data) {

            if (data != "0") {
                return;
            }
            else {
                return;
            }
        },
        error: function (e) {
            alert(JSON.stringify(e));
        }
    });
}

// 숫자만 입력했는지 여부 체크
function onlyNumber(checkTag) {
    if (!isNumber(checkTag)) {
        alert("숫자만 입력하세요");
        checkTag.value = "";
        checkTag.focus();
    }
}

function isNumber(input) {
    var chars = "0123456789";
    return containsCharsOnly(input, chars);
}

function containsCharsOnly(input, chars) {
    for (var inx = 0; inx < input.value.length; inx++) {
        if (chars.indexOf(input.value.charAt(inx)) == -1)
            return false;
    }
    return true;
}

//숫자만 누를수 있게 처리.
function checkInt() {
    if (event.keyCode < 45 || event.keyCode > 57)
        event.returnValue = false
    else
        event.returnValue = true;
}
// 숫자만 입력했는지 여부 체크 끝

// 비어있는지 체크
function isEmpty(input) {
    if (input == null || input.value == null || input.value.replace(/ /gi, "") == "") {
        return true;
    }
    return false
}

// 휴대폰 인증
function PhoneCheck(Type) {

    var name = $("#txt_PName_" + Type).val();
    var phone = "";

    if ($("#txt_Phone_" + Type).val().indexOf("-")) {
        phone = $("#txt_Phone_" + Type).val().replace(/-/gi, "");
    }
    else {
        phone = $.trim($("#txt_Phone_" + Type).val());
    }

    var phoneChk = $("#txt_PhoneChkNum_" + Type).val();

    if (phoneChk == "" || phoneChk == "인증번호 발송 후 입력해주세요.") {

        if (name == "" || name == "학부모의 이름을 입력해주세요.") {
            alert("학부모의 이름을 입력해주세요.");
            $("#txt_PName_" + Type).focus();
            return;
        } if (phone == "" || phone == "‘-’ 없이 입력해주세요.") {
            alert("휴대폰번호를 입력해 주세요!");
            $("#txt_Phone_" + Type).focus();
            return;
        } else {
            if (phone.length < 10) {
                alert("휴대폰번호를 바르게 입력해 주세요.");
                $("#txt_Phone_" + Type).focus();
                return;
            }
        }

        $.ajax({
            url: "/Partner/PartnerSms_Certi",
            type: "post",
            dataType: "json",
            data: ({ Name: name, Phone: phone }),
            success: function (data) {

                if (data[0].RESULT == "Y") {
                    // 인증번호 발송 후 이름, 휴대폰 번호 수정 방지
                    $("#txt_PName_" + Type).attr("readonly", "readonly");
                    $("#txt_Phone_" + Type).attr("readonly", "readonly");

                    alert("인증번호가 발송되었습니다. \n ※인증번호는 카카오톡 알림톡으로 확인해주세요.");
                } else {
                    alert("인증번호 발송 실패");
                }
            },
            error: function (e) {
                alert(e.toString());
            }
        });
    }
}

// 인증확인
function PhoneConfirm(Type) {

    var name = $("#txt_PName_" + Type).val();
    var phone = "";

    if ($("#txt_Phone_" + Type).val().indexOf("-")) {
        phone = $("#txt_Phone_" + Type).val().replace(/-/gi, "");
    }
    else {
        phone = $.trim($("#txt_Phone_" + Type).val());
    }

    var phoneChk = $("#txt_PhoneChkNum_" + Type).val();

    if (name == "" || name == "학부모의 이름을 입력해주세요.") {
        alert("학부모의 이름을 입력해주세요.");
        $("#txt_PName_" + Type).focus();
        return;
    } else if (phone == "" || phone == "‘-’ 없이 입력해주세요.") {
        alert("휴대폰번호를 입력해 주세요!");
        $("#txt_Phone_" + Type).focus();
        return;
    }

    if (phoneChk == "" || phoneChk == "인증번호 발송 후 입력해주세요.") {
        alert("인증번호를 입력해 주세요!");
        $("#txt_PhoneChkNum_" + Type).focus();
        return;
    } else {
        if (phone.length < 10) {
            alert("휴대폰번호를 바르게 입력해 주세요.");
            $("#txt_Phone_" + Type).focus();
            return;
        }
    }

    $.ajax({
        url: "/Partner/PartnerSms_Certi_Chk",
        type: "post",
        dataType: "json",
        data: ({ Name: name, Phone: phone, ChkNum: phoneChk }),
        async: false,
        success: function (data) {

            if (data[0].RESULT == "Y") {
                alert("인증번호 확인 성공");
                $("#txt_PName_" + Type).attr("readonly", "readonly");
                $("#txt_Phone_" + Type).attr("readonly", "readonly");
                $("#txt_PhoneChkNum_" + Type).attr("readonly", "readonly");
                Creti = data[0].RESULT;
            } else {
                alert("인증번호 확인 실패");
                Creti = "N";
            }
        },
        error: function (e) {
            alert(e.toString());
        }
    });
}

$(document).ready(function () {
    $("#txt_Name_W").on("blur", function () {
        var regExp3 = /^[a-zA-Z]+$/;
        var regExp5 = /^[가-힣]+$/;
        if (!regExp3.test($("#txt_Name_W").val().substr(0, 1))) {
            if (!regExp5.test($("#txt_Name_W").val()) && $("#txt_Name_W").val() != "") {
                $("#txt_Name_W").val($("#txt_Name_W").val().toString().replace(/[^가-힣]/gi, ''));
                alert("자음, 모음만 있는 한글은 입력이 불가합니다.")
            }
        }
    })

    $("#txt_PName_W").on("blur", function () {
        var regExp3 = /^[a-zA-Z]+$/;
        var regExp5 = /^[가-힣]+$/;
        if (!regExp3.test($("#txt_PName_W").val().substr(0, 1))) {
            if (!regExp5.test($("#txt_PName_W").val()) && $("#txt_PName_W").val() != "") {
                $("#txt_PName_W").val($("#txt_PName_W").val().toString().replace(/[^가-힣]/gi, ''));
                alert("자음, 모음만 있는 한글은 입력이 불가합니다.")
            }
        }
    })

    $("#txt_Name_W").on("keyup", function () {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@@\#$%&\\\=\(\'\"]/gi;
        var regExp2 = /[0-9]/;
        var regExp3 = /^[a-zA-Z]+$/;
        var regExp4 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\u119E\u11A2]+$/;
        var maxLength = 0;

        if (!regExp3.test($("#txt_Name_W").val().substr(0, 1))) {
            maxLength = 5;
        }

        if (!regExp4.test($("#txt_Name_W").val().substr(0, 1))) {
            maxLength = 10;
        }

        if ($("#txt_Name_W").val().toString().indexOf(' ') != -1) {
            alert("이름에 공백을 포함할 수 없습니다. ")
            $("#txt_Name_W").val($("#txt_Name_W").val().toString().replace(/ /gi, ''));
            $("#txt_Name_W").val($("#txt_Name_W").val().substr(0, maxLength));
        } else if (regExp.test($("#txt_Name_W").val()) && $("#txt_Name_W").val().length >= 1) {
            alert("이름에 특수기호를 포함할 수 없습니다.")
            $("#txt_Name_W").val($("#txt_Name_W").val().replace(regExp, ''));
            $("#txt_Name_W").val($("#txt_Name_W").val().substr(0, maxLength));
        } else if (regExp2.test($("#txt_Name_W").val())) {
            alert("이름에 숫자를 포함할 수 없습니다.")
            while (regExp2.test($("#txt_Name_W").val())) {
                $("#txt_Name_W").val($("#txt_Name_W").val().replace(regExp2, ''));
            }
            $("#txt_Name_W").val($("#txt_Name_W").val().substr(0, maxLength));
        }


        if (!regExp3.test($("#txt_Name_W").val().substr(0, 1))) {
            if (!regExp4.test($("#txt_Name_W").val()) && $("#txt_Name_W").val().length > 1) {
                $("#txt_Name_W").val($("#txt_Name_W").val().toString().replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, ''));
                alert("한글과 영문은 혼용 불가입니다.")
            }
        }

        if (!regExp4.test($("#txt_Name_W").val().substr(0, 1))) {
            if (!regExp3.test($("#txt_Name_W").val()) && $("#txt_Name_W").val().length > 1) {
                $("#txt_Name_W").val($("#txt_Name_W").val().toString().replace(/[^a-z]/gi, ''));
                alert("한글과 영문은 혼용 불가입니다.")

            }
        }

        if ($("#txt_Name_W").val().toString().length > 5) {
            if ($("#txt_Name_W").val().toString().length > maxLength) {
                $("#txt_Name_W").val($("#txt_Name_W").val().substr(0, maxLength));
                alert(maxLength + "자 이내로 작성해주세요.")
            }
        }
        return false;
    })

    $("#txt_PName_W").on("keyup", function () {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@@\#$%&\\\=\(\'\"]/gi;
        var regExp2 = /[0-9]/;
        var regExp3 = /^[a-zA-Z]+$/;
        var regExp4 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\u119E\u11A2]+$/;
        var maxLength = 0;

        if (!regExp3.test($("#txt_PName_W").val().substr(0, 1))) {
            maxLength = 5;
        }

        if (!regExp4.test($("#txt_PName_W").val().substr(0, 1))) {
            maxLength = 10;
        }

        if ($("#txt_PName_W").val().toString().indexOf(' ') != -1) {
            alert("이름에 공백을 포함할 수 없습니다. ")
            $("#txt_PName_W").val($("#txt_PName_W").val().toString().replace(/ /gi, ''));
            $("#txt_PName_W").val($("#txt_PName_W").val().substr(0, maxLength));
        } else if (regExp.test($("#txt_PName_W").val()) && $("#txt_PName_W").val().length >= 1) {
            alert("이름에 특수기호를 포함할 수 없습니다.")
            $("#txt_PName_W").val($("#txt_PName_W").val().replace(regExp, ''));
            $("#txt_PName_W").val($("#txt_PName_W").val().substr(0, maxLength));
        } else if (regExp2.test($("#txt_PName_W").val())) {
            alert("이름에 숫자를 포함할 수 없습니다.")
            while (regExp2.test($("#txt_PName_W").val())) {
                $("#txt_PName_W").val($("#txt_PName_W").val().replace(regExp2, ''));
            }
            $("#txt_PName_W").val($("#txt_PName_W").val().substr(0, maxLength));
        }


        if (!regExp3.test($("#txt_PName_W").val().substr(0, 1))) {
            if (!regExp4.test($("#txt_PName_W").val()) && $("#txt_PName_W").val().length > 1) {
                $("#txt_PName_W").val($("#txt_PName_W").val().toString().replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, ''));
                alert("한글과 영문은 혼용 불가입니다.")
            }
        }

        if (!regExp4.test($("#txt_PName_W").val().substr(0, 1))) {
            if (!regExp3.test($("#txt_PName_W").val()) && $("#txt_PName_W").val().length > 1) {
                $("#txt_PName_W").val($("#txt_PName_W").val().toString().replace(/[^a-z]/gi, ''));
                alert("한글과 영문은 혼용 불가입니다.")

            }
        }

        if ($("#txt_PName_W").val().toString().length > 5) {
            if ($("#txt_PName_W").val().toString().length > maxLength) {
                $("#txt_PName_W").val($("#txt_PName_W").val().substr(0, maxLength));
                alert(maxLength + "자 이내로 작성해주세요.")
            }
        }
        return false;
    })


});