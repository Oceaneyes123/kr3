// JavaScript Document


/*
    함수명    : 메뉴 세팅
*/
$(document).ready(function(){
    //변수 셋팅
    var gnb             =   $("#gnb");                  // GNB 'ul'
    var snb             =   $("#snb");                  // LNB 'ul'   
    var lnb             =   $(".n_sub");                // LNB 'ul'

    var gnbResetArea    =   "#gnb";                     // 해당 영역에 mouseover, focusin시 GNB 초기화( 예: #container, #footer )
    var headerArea      =   "#header";                  // 해당 영역에 mouseover, focusin시 GNB 초기화( 예: #container, #footer )
    var snbResetArea    =   "#snb";                     // 해당 영역에 mouseover, focusin시 SNB 초기화( 예: #header, #content, #footer )

    var gnbDep1Type     =   "image";                    // GNB depth1 type( image | text | ir | none )
    var gnbDep2Type     =   "none";                     // GNB depth2 type( image | text | ir | none )    
    var gnbOpenAni      =   "none";                     // 메뉴 활성시 애니메이션 효과( slide | fade | none )
    var gnbCloseAni     =   "none";                     // 메뉴 비활성시 애니메이션 효과( slide | fade | none )    
    var lnbDep1Type     =   "image";                    // LNB depth2 type( image | text | none )
    var lnbDep2Type     =   "image";                    // LNB depth2 type( image | text | none )
    var lnbOpenAni      =   "none";                     // 메뉴 활성시 애니메이션 효과( slide | fade | none )
    var lnbCloseAni     =   "none";                     // 메뉴 비활성시 애니메이션 효과( slide | fade | none )
    var activeClass     =   "active";                   // 메뉴 활성화시 클래스

    var lnbResetArea    =   ".n_sub";                   // 해당 영역에 mouseover, focusin시 LNB 초기화( 예: #header, #content, #footer )

    //GNB, LNB 초기화
    try{gnbInit(lnbDep1)}catch(e){};
    try{lnbInit(lnbDep1, lnbDep2)}catch(e){};
    try{snbInit(lnbDep2)}catch(e){};

    //해당 영역에 포커스인시 GNB 초기화
    $(gnbResetArea).mouseleave(function(){
        gnbMouseleave(lnbDep1);
    }).focusin(function(){$(this).mouseenter()});

    //해당 영역에 포커스인시 LNB 초기화
    $(lnbResetArea).mouseleave(function(){
        lnbInit(lnbDep1, lnbDep2)
    }).focusin(function(){$(this).mouseover()});
    
    //해당 영역에 포커스인시 SNB 초기화
    $(snbResetArea).mouseleave(function(){
        snbInit(lnbDep2);
    }).focusin(function(){$(this).mouseover()});

    //GNB depth1 mouseover, focusin event
    gnb.find("> li > a").mouseover(function(){
        if (gnb.find(">li").hasClass("on")) {
            gnb.find(">li").removeClass("on");
        }
        if (gnb.find(">li").hasClass("hover")) {
            gnb.find(">li").removeClass("hover");
        }
        //GNB depth1 type 판별
        if ($(".gnb_back").css("height") == "0") {
            gnb.find(">li").each(function () {
                $(this).removeClass(activeClass);
                gnb.find(".n_sub").css({height:"0"});
                $(".gnb_back").css({height:"0"});
            });
            $(this).parent().addClass(activeClass);
        }
        $(".n_sub").stop(true).animate({"height":"270px"}, 500);
        $(".gnb_back").stop(true).animate({"height":"283px"}, 500);
    }).focusin(function(){$(this).mouseover()});
    
    //GNB 초기화 - 선택된 뎁스를 표시해줌
    function gnbInit(dep1){
        gnb.find(">li").each(function(){
            $(this).find("li").removeClass("on");
        });
        gnb.find(">li").removeClass(activeClass);
        gnb.find(".n_sub").css({height:"0"});
        $(".gnb_back").css({height:"0"});
        if(dep1 != 0){
            gnb.find(">li:eq("+ (dep1-1) +")").addClass(activeClass);
            gnb.find(">li:eq("+ (dep1-1) +")").addClass("on");
        }
        gnb.find(".n_sub").show();
        $(".gnb_back").show();
    }
    //GNB MouseLeave - 선택된 뎁스를 표시해줌
    function gnbMouseleave(dep1){
        gnb.find(">li").each(function(){
            $(this).find("li").removeClass("on");
        });
        gnb.find(">li").removeClass(activeClass);
        gnb.find(".n_sub").stop(true).animate({"height":"0"}, 500);
        $(".gnb_back").stop(true).animate({"height":"0"}, 500);
        if(dep1 != 0){
            gnb.find(">li:eq("+ (dep1-1) +")").addClass(activeClass);
            gnb.find(">li:eq("+ (dep1-1) +")").addClass("on");
        }
        
        gnb.find(".n_sub").show();
        $(".gnb_back").show();
    }
    
    //LNB depth1 mouseover, focusin event
    lnb.find("ul>li>a").mouseover(function(){
        //LNB depth1 type 판별
        lnb.find(">li>a").each(function(){
            $(this).find("a").removeClass("on");
            $(this).removeClass(activeClass);
        });
        gnb.find("li").each(function() {
           $(this).find(".n_sub > ul > li").removeClass(activeClass);
           $(this).find(".n_sub > ul > li  > a").removeClass("on"); 
        });
        $(this).parent().addClass(activeClass);
        $(this).find("a").addClass("on");
    }).focusin(function(){$(this).mouseover()});
    $('.n_sub').mouseover(function() {
        if ($(this).parent().parent().find("li").hasClass("hover")) {
            $(this).parent().parent().find("li").removeClass("hover");
        }
    });
    
    //LNB 초기화 - 선택된 뎁스를 표시해줌
    function lnbInit(dep1, dep2){
        gnb.find(">li .n_sub").find(">li").each(function(){
            $(this).find(">a").removeClass("on");
        });
        if(dep1 != 0){
//            수정해야함 _ 결제상품에 따른 페이지 스크립트 활성화 일시적인 처리로 _추후 로직 변경해야함
            var result_url = $(location).attr('href');
            var r_split = result_url.split("?");
            var r_split2 = r_split[1].split("=");
            if("Product"== r_split2[0]){
                $("#gnb").find(">li:eq("+ (3) +")").removeClass("on");
                $("#gnb").find(">li:eq(3) .n_sub").find("ul> li:eq(2)>a").removeClass("on");
            }
            else{
                gnb.find(">li:eq("+ (dep1-1) +") .n_sub").find("> li").each(function(){
                    $(this).removeClass(activeClass);
                    $(this).find(">a").removeClass("on");
                });
                gnb.find(">li:eq("+ (dep1-1) +")").addClass("hover");
                gnb.find(">li:eq("+ (dep1-1) +") .n_sub").find("ul> li:eq("+ (dep2-1) +")").addClass(activeClass);
                gnb.find(">li:eq("+ (dep1-1) +") .n_sub").find("ul> li:eq("+ (dep2-1) +")>a").addClass("on");
                /*
                    memo : 영재 교육 연구소 sub 메뉴 클릭_ 이벤트 수정
                    date : 2019-09-20
                    name : 안상욱
                */
                var tab_value;
                var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                    tab_value = value;               
                });
                if(tab_value == 1){
                   gnb.find(">li:eq("+ (4) +") .n_sub").find("ul> li:eq("+ (1) +")>a").addClass("on");
                   gnb.find(">li:eq("+ (4) +") .n_sub").find("ul> li:eq("+ (0) +")>a").removeClass("on");
                }
            }
           //            수정해야함 _ 결제상품에 따른 페이지 스크립트 활성화 일시적인 처리로 _추후 로직 변경해야함
     }
      else{
            /*
                memo : 사회 공헌 클릭 _ 이벤트 수정
                date : 2019-09-20
                name : 안상욱
            */
            var result_url = $(location).attr('href');
            var url = result_url.substr(result_url.length - 13);
            if(url == "partner190702"){
                // 사회 공헌 페이지 접속 시 
                gnb.find(">li:eq("+ (3) +")").addClass(activeClass);
                gnb.find(">li:eq("+ (3) +")").addClass("on");
                gnb.find(">li:eq("+ (3) +") .n_sub").find("ul> li:eq("+ (3) +")").addClass(activeClass);
                gnb.find(">li:eq("+ (3) +") .n_sub").find("ul> li:eq("+ (3) +")>a").addClass("on");
            }
            
        }
    }    

   //SNB depth1 mouseover, focusin event
    snb.find("> li > a").mouseover(function(){
        //SNB depth1 type 판별
        snb.find(">li").each(function(){
            $(this).removeClass("on");
        });
        $(this).parent().addClass('on');
        if(snb.find(">li>a").hasClass("on")){
            snb.find(">li>a").removeClass("on");
        }
    }).focusin(function(){$(this).mouseover()});

    //SNB 초기화 - 선택된 뎁스를 표시해줌
    function snbInit(dep1){
        snb.find(">li>a").removeClass("on");
        snb.find(">li>a").each(function(){
            $(this).find(">li>a").removeClass("on");
        });
        if(dep1 != 0){
            snb.find(">li:eq("+ (dep1-1) +") > a").addClass("on");
        }
    }
});

/*
    함수명    : 마우스 오버시 이미지 변환
    코멘트    - 대상 a엘리먼트에 'ui_btn' 클래스를 셋팅한다.
*/
$(function(){
    //마우스 오버,아웃시 이미지 on, off
    $(".ui_btn").mouseover(function(){
        imgReplace($(this).find("img"),"on");
    }).mouseout(function(){
        imgReplace($(this).find("img"),"off");
    });
});

/*
    함수명    : 이미지명 치환
    코멘트    - 넘겨받은 오브젝트의 src를 변경한다.
            - obj     = 대상 img
            - flag     = on, off
*/

function imgReplace(obj,flag){
    var imgSrc = obj.attr("src");
    if(flag == "on"){
        imgSrc = imgSrc.replace("_off","_on");
    } else if(flag == "off"){
        imgSrc = imgSrc.replace("_on","_off");
    }
    obj.attr("src",imgSrc);
}

/*
    함수명    : 셀렉트박스 디자인입히기
*/
var dSelectPack = { 
    init : function(){
        $(function(){
            // call create
            $('.eSelect').each(function(){
                var dClass = $(this).attr('design');
                if(!dClass){
                    $(this).removeAttr('design').removeAttr('class');
                    dClass = "selectDesign";
                } else {
                    $(this).removeAttr('design').removeAttr('class');
                }
                dSelectPack.create($(this), dClass);
            });
        });
    },
    create : function(target, dClass){
        // structure
        target.wrap('<div class="'+ dClass +'" />');
        target.before('<p class="now" />');
        target.before('<button type="button">토글</button>');
        target.before('<ul class="list" />');
        var wrap = target.parent();
        var p = target.siblings('p');
        var ul = target.siblings('ul');
        var button = target.siblings('button');
        target.find('option').each(function(){
            var text = $(this).text();
            ul.append('<li><a href="#none">'+ text +'</a></li>');
            if($(this).attr('selected') == "selected") {
                p.text(text);
            } 
        });
        // handler
        button.click(function(e){
            dSelectPack.toggle(wrap);
            e.preventDefault();
        });
        p.click(function(){
            dSelectPack.toggle(wrap);
        });
        wrap.mouseleave(function(){
            dSelectPack.hide(wrap);
        });
        wrap.find('a').each(function(){
            $(this).click(function(e){
                var text = $(this).text();
                dSelectPack.change(wrap, text);
                dSelectPack.toggle(wrap);
                e.preventDefault();
            });
        });
    },
    toggle : function(wrap){
        var list = wrap.find('.list');
        if(wrap.hasClass('show')){
            wrap.removeClass('show');
            list.hide();
            if($('#container').css('z-index')=="1"){
                $('#footer').css('z-index','2');
            }
        } else {
            wrap.addClass('show');
            list.show();
            if($('#container').css('z-index')=="1"){
                $('#footer').css('z-index','-1');
            }
        }
    },
    hide : function(wrap){
        wrap.removeClass('show');
        wrap.find('.list').hide();
        if($('#container').css('z-index')=="1"){
            $('#footer').css('z-index','2');
        }
    },
    change : function(wrap, text){
        wrap.find('p').text(text);
        wrap.find('select').val([text]);
    }
}

dSelectPack.init();     

//팝업설정
function gf_popupWindow(pUrl, pName, w, h, left, top, scroll) {
    var win = window.open(pUrl, pName, "width=" + w + ",height=" + h + ",left=" + left + ",top=" + top + ",scrollbars=" + scroll);
    if (win == null) {
        alert("팝업창이 차단되었습니다. 팝업창을 허용으로 변경해주세요.");
        return;
    }

    if (parseInt(navigator.appVersion) >= 4) {
        win.window.focus();
    }
}

/**
 * 함수설명 :: 유효성 - 비밀번호 체크(가입 시),특수문자/영문/숫자만 사용가능, 10~16자
 * @param {String} 체크할 문자열
 *
 * @return Boolean
 */
 // ask#24368
String.prototype.isPassword = function()
{
	return /^.*(?=^.{10,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=]).*$/.test(this); 
    //return /^[a-zA-Z0-9]{10,16}$/.test(this);
};

/**
 * 함수설명 :: 유효성 - 아이디 체크
 * @param {String} 체크할 문자열
 *
 * @return Boolean
 */
 // ask#24368
String.prototype.isUserId = function()
{
	return /^[a-zA-Z0-9]{8,16}$/.test(this);
};

/**
 * 함수설명 :: 유효성 - 이메일 체크
 * @param {String} 체크할 문자열
 *
 * @return Boolean
 */
String.prototype.isEmail = function()
{
	return /^(\.?[-!#$%&\'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/.test(this);
};

// ask#24368 - 휴대폰번호 아이디 체크
// 문자,숫자 + 휴대폰번호 / 문자,숫자 + 휴대폰번호 + 문자,숫자 / 휴대폰번호 + 문자,숫자
function IsPhoneNumChk(str){
    var regexp1 = /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/;
    var regexp2 = /^[a-zA-Z0-9]{1,5}(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/;
    var regexp3 = /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})[a-zA-Z0-9]{1,5}$/;
    var regexp4 = /^[a-zA-Z0-9]{1,5}(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})[a-zA-Z0-9]{1,5}$/;
    
    if (str.match(regexp1) != null || str.match(regexp2) != null || str.match(regexp3) != null || str.match(regexp4) != null){
        return true;
    } else {
        return false;
    }
   
}

// ask#24368 - 숫자체크
function IsNumberChk(str){
    var findStr = str.match(/^[0-9]{1,16}$/);

    if (str == findStr)
        return true;
    else
        return false;
}

// ask#24368
function IsNumberEng816(str) {
    var findStr = str.match(/^[a-zA-Z0-9]{8,16}$/);

    if (str == findStr)
        return true;
    else
        return false;
}

// ask#24368
function IsNumberEng413(str) {
    var findStr = str.match(/^[a-zA-Z0-9]{4,13}$/);

    if (str == findStr)
        return true;
    else
        return false;
}

/**
* 함수설명 :: 숫자만 입력
* @return boolean
*/
function gf_Num_chk(objTextBox) {

    for (var i = 0; i < objTextBox.value.length; i++) {
        var code = objTextBox.value.charCodeAt(i);

        if ((code < 48) || (code > 57)) {
            alert("숫자만 입력 가능합니다!");
            objTextBox.value = "";
            return false;
        }
    }

    return true;
}

// 한글만.
function IsKorean(objTextBox) {
    
    var findStr = objTextBox.value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/);

    if (objTextBox.value == findStr || event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 0){
        return true;
    }
    else{
        alert("한글만 입력 가능합니다!");
        objTextBox.value = "";
        return false;
    }
        
        
}

/**
* 함수설명 :: 다음 object 포커스 이동
*
* obj : 현재 포커스 object
* length : 현재 포커스 object 값 길이
* nextobj : 다음 포커스 이동 object
*
* @return boolean
*/
function gf_NextObject(obj, length, nextobj) {

    if (obj.value.length == length)
        nextobj.focus();

    return;
}

/*
    함수명    : 슬라이딩 퀵메뉴
    코멘트    - initMoving(id,좌표,상단,하단)
            - 모든 스크립트 로드후에 실행이 되어야함. 맨아래 둬야함. !필수!!필수!!필수!!필수!
*/
function initMoving(target, position, topLimit, btmLimit) {
    if (!target)
        return false;

    var obj = target;
    obj.initTop = position;
    obj.topLimit = topLimit;
    obj.bottomLimit = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - btmLimit - obj.offsetHeight;
    obj.style.position = "absolute";
    obj.top = obj.initTop;
    obj.left = obj.initLeft;

    
    if (typeof(window.pageYOffset) == "number") { //WebKit
        obj.getTop = function() {
            return window.pageYOffset;
        }
    } else if (typeof(document.documentElement.scrollTop) == "number") {
        obj.getTop = function() {
            return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        }
    } else {
        obj.getTop = function() {
            return 0;
        }
    }

    if (self.innerHeight) {    //WebKit
        obj.getHeight = function() {
            return self.innerHeight;
        }
    } else if(document.documentElement.clientHeight) {
        obj.getHeight = function() {
            return document.documentElement.clientHeight;
        }
    } else {
        obj.getHeight = function() {
            return 500;

        }
    }
    obj.move = setInterval(function() {
        //스크롤정지 기능 추가
        if($("#quickmenu input[type=checkbox]").attr("checked") != "checked"){
            if (obj.initTop > 0) {
                pos = obj.getTop() + obj.initTop;
            } else {
                pos = obj.getTop() + obj.getHeight() + obj.initTop;
                //pos = obj.getTop() + obj.getHeight() / 2 - 15;
            }

            if (pos > obj.bottomLimit)
                pos = obj.bottomLimit;
            if (pos < obj.topLimit)
                pos = obj.topLimit;

            interval = obj.top - pos;
            obj.top = obj.top - interval / 3;
            obj.style.top = obj.top + "px";
        }
    }, 30);
}

// 퀵메뉴
$(function(){
    setTimeout(function(){
    if ($("#spot").css('display')=='block') {
        initMoving(document.getElementById("quickmenu"), 153, 603, 450);
    }else{
        initMoving(document.getElementById("quickmenu"), 153, 153, 450);
    }
    }, 500);

    setTimeout(function(){
    if (location.href.indexOf('Eduinfo') > 0) {
        initMoving(document.getElementById("quickmenu"), 153, 153, 450);
    }
    }, 2000);
});

//$(window).scroll(function() {
//    console.log($(document).scrollTop() + 'px');
//    if($(0 < document).scrollTop() < 677) {
//        $('#quickmenu').css({
//           position:"absolute",
//           top:"680px"
//        });
//    } else {
//        initMoving(document.getElementById("quickmenu"), 705, 705, 550);
//    }
//});

function autoResize(t,i,h) {
    var iframeHeight;
    if (t == 't1')
        iframeHeight = (i).contentWindow.document.body.scrollHeight;
    else 
        iframeHeight = h + 120;
    (i).height = iframeHeight;
    return;
}

function comma(num) {     // 숫자에 콤마 삽입  
    var len, point, str;

    num = num + "";
    point = num.length % 3
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str != "") str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    }
    return str;

}

//쿠키설정-쿠키정보설정
function gf_SetCookie(name, value, day) {
    var path = "http://www.milkt.co.kr/";
    var domain = "";
    var secure = null;
    var expire = null;

    expire = new Date();
    expire.setDate(expire.getDate() + day);

    document.cookie = name + "=" + escape(value) + ((expire) ? "; expires=" + expire.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
    return true;
}

//쿠키설정-쿠키정보가져오기
function gf_GetCookie(name) {

    var arg = name + '=';
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;

    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return (getCookieVal(j));

        i = document.cookie.indexOf(' ', i) + 1;
        if (i == 0) break;
    }

    return "";
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(';', offset);

    if (endstr == -1)
        endstr = document.cookie.length;

    return unescape(document.cookie.substring(offset, endstr));
}


function KR_MilkT() {
    try {
        var viz = document.createElement("script");
        viz.type = "text/javascript";
        viz.async = true;
        viz.src = ("https:" == document.location.protocol ? "https://kr-tags.vizury.com" : "http://kr-tags.vizury.com") + "/analyze/pixel.php?account_id=VIZVRM3273";

        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(viz, s);
        viz.onload = function () {
            try {
                pixel.parse();
            } catch (i) {
            }
        };
        viz.onreadystatechange = function () {
            if (viz.readyState == "complete" || viz.readyState == "loaded") {
                try {
                    pixel.parse();
                } catch (i) {
                }
            }
        };
    } catch (i) {
    }
}

// 최대 입력 글자
function MaxByte(Comment, cMax) {
    var i = 0;
    var cByte = 0;
    var cLen = 0;
    var cOneChar = "";
    var cStr2 = "";
    var cStr = Comment.value;
    var cStrLen = cStr.length;
    var cMax = cMax;
    for (i = 0; i < cStrLen; i++) {
        cOneChar = cStr.charAt(i);

        if (escape(cOneChar).length > 4) cByte += 2;
        else cByte++;

        if (cByte <= cMax) cLen = i + 1;
    }
    if (cByte > cMax) {
        //alert(cMax + "글자내로 작성하셔야 합니다.");
        alert(Math.floor(cMax / 2) + "자 이내로 작성해주세요.");

        cStr2 = cStr.substr(0, cLen);
        Comment.value = cStr2;
    }
    Comment.focus();
}

function gf_FileDownhis(type, grade, term, subject, title, codename, codename1, lecname, leccode, filename) {
    $.ajax({
        url: "/Common/FileDown_His_Json",
        type: "post",
        dataType: "json",
        data: ({ type: type
                , grade: grade
                , term: term
                , subject: subject
                , title: title
                , codename: codename
                , codename1: codename1
                , lecname: lecname
                , leccode: leccode
                , filename: filename
        }),
        success: function (data, entry) {

        }
    });
}

function gf_Eng_News_FileDownhis(Eng_Title, Eng_Content, Shumb_Name, FileName, FileName1) {

    $.ajax({
        url: "/Common/Eng_News_FileDown_His_Json",
        type: "post",
        dataType: "json",
        data: ({ Eng_Title: Eng_Title
                , Eng_Content: Eng_Content
                , Shumb_Name: Shumb_Name
                , FileName: FileName
                , FileName1: FileName1
        }),
        success: function (data, entry) {

        }
    });
}

//HTML태그 제거
function gf_RemoveHTMLTag(strText)
{
     return strText.replace(/(<([^>]+)>)/gi, "");
}

//layer paging
function EventPageLink(curPage, totalPages, funName, PrevImg, NextImg) {

    pageUrl = "";

    var pageLimit = 10;

    var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;

    var endPage = startPage + pageLimit - 1;

    if (totalPages < endPage) endPage = totalPages;

    var nextPage = endPage + 1;


    if (curPage > pageLimit) {
        pageUrl += "<a href='javascript:" + funName + "(" + (startPage == 1 ? 1 : startPage - 1) + ");' class='prev'>" + PrevImg +"</a>";
    }

    var strClassOn = "";

    for (var i = startPage; i <= endPage; i++) {

        strClassOn = "";
        if (i == curPage) strClassOn = "class='on'";

        pageUrl += "<a " + strClassOn + " href='javascript:" + funName + "(" + i + ");'>" + i + "</a>";
    }
    if (nextPage <= totalPages) {
        pageUrl += "<a href='javascript:" + funName + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");' class='next'>" + NextImg +"</a>";
    }

    return pageUrl
}

 // send to SNS
function toSNS(sns, strTitle, strURL) {
    var snsArray = new Array();
    var strMsg = strTitle + " " + strURL;
    var image = "이미지경로";

    snsArray['twitter'] = "http://twitter.com/home?status=" + encodeURIComponent(strTitle) + ' ' + encodeURIComponent(strURL);
    snsArray['facebook'] = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(strURL);
    
    snsArray['pinterest'] = "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(strURL) + "&media=" + image + "&description=" + encodeURIComponent(strTitle);
    snsArray['band'] = "http://band.us/plugin/share?body=" + encodeURIComponent(strTitle) + "  " + encodeURIComponent(strURL) + "&route=" + encodeURIComponent(strURL);
    snsArray['blog'] = "http://blog.naver.com/openapi/share?url=" + encodeURIComponent(strURL) + "&title=" + encodeURIComponent(strTitle);
    snsArray['line'] = "http://line.me/R/msg/text/?" + encodeURIComponent(strTitle) + " " + encodeURIComponent(strURL);
    snsArray['pholar'] = "http://www.pholar.co/spi/rephol?url=" + encodeURIComponent(strURL) + "&title=" + encodeURIComponent(strTitle);
    snsArray['google'] = "https://plus.google.com/share?url=" + encodeURIComponent(strURL) + "&t=" + encodeURIComponent(strTitle);
    window.open(snsArray[sns]);
}

//kakao
function sendKakao()
{
    alert("카카오톡 공유는 모바일에서만 사용하실 수 있습니다.");
    return false;
}
