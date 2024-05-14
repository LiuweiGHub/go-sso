var $jiazi = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'];

function show() {
    document.getElementById('heading').innerHTML = document.getElementById('FX2').value;
}

var tgdzColor = {
    '甲': 'green',
    '乙': 'green',
    '丙': 'red',
    '丁': 'red',
    '戊': '#995001',
    '己': '#995001',
    '庚': '#FD7C04',
    '辛': '#FD7C04',
    '壬': 'blue',
    '癸': 'blue',
    '寅': 'green',
    '卯': 'green',
    '辰': '#995001',
    '巳': 'red',
    '午': 'red',
    '未': '#995001',
    '申': '#FD7C04',
    '酉': '#FD7C04',
    '戌': '#995001',
    '亥': 'blue',
    '子': 'blue',
    '丑': '#995001',
}
url = 'https://zydx.win/@2.0/';

function createXmlHttp() {
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest()
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
}

let urlbb = new URL(window.location.href);
let para = urlbb.search;
var urls = url + "api.php" + para + "&api=1&bcxx=1";
createXmlHttp();
xmlHttp.onreadystatechange = writeSource;
xmlHttp.open("GET", urls, false);
xmlHttp.send(null);

function writeSource(cs, ms) {
    obg = JSON.parse(ms == null ? xmlHttp.responseText : ms);
    with (obg) {

        document.cookie = 'nz=' + BZ.nz + ';';
        document.cookie = 'rg=' + BZ.rg + ';';
        document.cookie = 'gj=' + deling[5] + ';';
        var BZWZ = BZ.ng + BZ.nz + BZ.yg + BZ.yz + BZ.rg + BZ.rz + BZ.sg + BZ.sz;
        sex = 0;
        if (system.sexx == '男') {
            sex = 1;
        }
        runfen = 1;
        csmode = 1;
        // 紫薇斗数辅助排盘
        // var zwdshxjz = url + 'Homepage.php?SYLX=FZPP&id=ZWNZ&usex=' + sex + '&gl_birthday=' + gl_birthday + '&runfen=' + runfen + '&csmode=' + csmode + '&bz=' + BZWZ;
        // createXmlHttp();
        // xmlHttp.onreadystatechange = zwdshxjzs;
        // xmlHttp.open('GET', zwdshxjz, false);
        // xmlHttp.send(null);

        // function zwdshxjzs() {
        //     obg = JSON.parse(xmlHttp.responseText);
        //     document.getElementById('zwdshxjz').insertAdjacentHTML('afterend', "<div class='pp_box'><div style='padding-bottom:20px;'> <table width='100%' border='1' cellspacing='0' cellpadding='2' align='center' style='line-height:100%; font-size:8px;' id='obgppbox'> <tr> <td width='25%' height='20%' valign='top'>" + obg['pan'][6] + "</td> <td width='25%' valign='top'>" + obg['pan'][7] + "</td> <td width='25%' valign='top'>" + obg['pan'][8] + "</td> <td width='25%' valign='top'>" + obg['pan'][9] + "</td> </tr> <tr> <td height='20%' valign='top'>" + obg['pan'][5] + "</td> <td colspan='2' rowspan='2' valign='top' style='line-height:100%'><br><div align='center'><font color='#993300' style='font-size:12px;'>紫薇斗数辅助排盘</font></div><br>姓名:" + system.name + "&emsp;性别:" + system.sexx + "&emsp;年龄:" + obg['sui'] + "岁<br>阳历:" + obg['glstr'] + "<br>农历:" + obg['nlstr'] + "<br>命四化<font color='red'>[" + obg['sihuaname'] + "]</font><br>命宫在<font color='#800080'>" + obg['minggong'] + "</font>&emsp;身宫在<font color='#800080'>" + obg['shengong'] + "</font><br>子斗在<font color=blue>" + obg['dou']['zd'] + "</font>&emsp;流斗在<font color=blue>" + obg['dou']['dj'] + "</font><br>盘类:天盘<font color='red'>" + obg['juname'] + "</font>&emsp;命主:<font color='#008000'>" + obg['mingzhu'] + "</font>&emsp;身主:<font color='#008000'>" + obg['shenzhu'] + "</font><br><b>命造:<font color=red>" + obg['ygz'] + '&emsp;&emsp;' + obg['mgz'] + '&emsp;&emsp;' + obg['dgz'] + '&emsp;&emsp;' + obg['hgz'] + "</font></b><br>纳音:" + DYNY[BZ.ng + BZ.nz] + '&emsp;' + DYNY[BZ.yg + BZ.yz] + '&emsp;' + DYNY[BZ.rg + BZ.rz] + '&emsp;' + DYNY[BZ.sg + BZ.sz] + "</td> <td height='20%' valign='top'>" + obg['pan'][10] + "</td> </tr> <tr> <td height='20%' valign='top'>" + obg['pan'][4] + "</td> <td valign='top'>" + obg['pan'][11] + "</td> </tr> <tr> <td height='20%' valign='top'>" + obg['pan'][3] + "</td> <td valign='top'>" + obg['pan'][2] + "</td> <td valign='top'>" + obg['pan'][1] + "</td> <td valign='top'>" + obg['pan'][0] + "</td> </tr></table></div></div>");
        // }

        var host = window.location.host;
        if (fanhui == 0) {
            alert('不存在此八字');
        }
        if (vip != 'vip') {
            document.getElementById('wxianyin').disabled = true;
            document.getElementById('xxianyin').disabled = true;
        }
        let G8 = ['Sg', 'mg', 'tg', 'ng', 'yg', 'rg', 'sg', 'Tg', 'Kg'];
        let BQ8 = ['Sbq', 'mbq', 'tbq', 'nbq', 'ybq', 'rbq', 'sbq', 'Tbq', 'Kbq'];
        let Z8 = ['Sz', 'mz', 'tz', 'nz', 'yz', 'rz', 'sz', 'Tz', 'Kz'];
        let Q21 = ['Sbq', 'Szq', 'Syq', 'tbq', 'tzq', 'tyq', 'mbq', 'mzq', 'myq', 'nbq', 'nzq', 'nyq', 'ybq', 'yzq', 'yyq', 'rbq', 'rzq', 'ryq', 'sbq', 'szq', 'syq', 'Tbq', 'Tzq', 'Tyq', 'Kbq', 'Kzq', 'Kyq'];
        document.getElementById('system.XingZuo').innerHTML = system.XingZuo;
        document.getElementById('system.WuHou').innerHTML = "";
        document.getElementById('system.getYueXiang').innerHTML = "";
        document.getElementById('system.getZheng').innerHTML = "";
        document.getElementById('system.sexxx').innerHTML = system.sexx + "&nbsp;&nbsp;胎元:&nbsp;" + BZ["tg"] +  BZ["tz"] + "<font color=\"#006600\">" + "[" + DYNY[BZ['tg'] + BZ['tz']] + "]" + "</font>  &nbsp;&nbsp;命宫:&nbsp;" + BZ["mg"] +  BZ["mz"] + "<font color=\"#006600\">" + "[" + DYNY[BZ['mg'] + BZ['mz']] + "]" + "</font>"
        document.getElementById('system.shengxiao').innerHTML = "";
        var search = window.location.search;
        document.getElementById('system.getXiuSong').innerHTML = "";
        document.getElementById('system.name').innerHTML = system.name;
        document.getElementById('system.xmwx').innerHTML = system.xmwx.split(")").join("), ").slice(0, -2);
        // document.getElementById('system.nylm').innerHTML = "<a onclick=sc('wd','" + system.nylm + "')>" + system.nylm + "</a>";
        document.getElementById('system.nylm').innerHTML = "";
        // document.getElementById("JSFW.zg").innerHTML = "<a onclick=alert('风水喜忌：北:" + JSFW.b + ",东北:" + JSFW.db + ",东:" + JSFW.d + ",东南:" + JSFW.dn + ",南:" + JSFW.n + ",西南:" + JSFW.xn + ",西:" + JSFW.x + ",西北:" + JSFW.xb + "')>" + JSFW.zg + "</a>";
        document.getElementById("JSFW.zg").innerHTML = "";
        ESJQB = '出生当年24节气时间表\\n';
        for (var k in chusheng['QH']) {
            ESJQB += k + '：' + chusheng['QH'][k] + "\\n";
        }
        ESJQB = ESJQB.replace(/\s/g, '');
        document.getElementById("chusheng.QH").innerHTML = "<a onclick=alert('" + ESJQB + "')>" + chusheng.DL2 + ' ' + chusheng.DL1 + ' ' + chusheng.CL2 + ' ' + chusheng.CL1 + "</a>";
        document.getElementById("system.SiLing").innerHTML = "";
        document.getElementById("system.SiLingFangshi").innerHTML = "";
        document.getElementById("system.SCWG").innerHTML = "";
        document.getElementById("chusheng.QY").innerHTML = chusheng.QY;
        document.getElementById("system.PPFS").innerHTML = system.PPFS;
        document.getElementById("system.JYRQ").innerHTML = system.JYRQ;
        document.getElementById("chusheng.HYWS").innerHTML = chusheng.HYWS;
        if (system.ztys == '1') {
            document.getElementById("ZTYS").innerHTML = "<b>真太阳时地区：</b><font color='#993300'>" + system.city + "</font><br><b>真太阳时前日期：</b><font color='#993300'>" + system.Z_QRQ + "</font><br>"
        }
        document.getElementById("chusheng.gongli").innerHTML = chusheng.gongli;
        document.getElementById("chusheng.nongli").innerHTML = system.GNF + '年' + '(生肖' + system.shengxiao + ')' + chusheng.nongli.slice(5);
        document.getElementById("bazixinxi.liujiakongwangluokong").innerHTML = "";
        document.getElementById("bzgj").innerHTML = '八字' + deling[5];
        document.getElementById("keywords").content = BZ.ng + BZ.nz + ',' + BZ.yg + BZ.yz + ',' + BZ.rg + BZ.rz + ',' + BZ.sg + BZ.sz + ',' + system.sexx + ',' + system.XingZuo + ',' + '八字排盘,四柱排盘,八字排盘系统,在线八字排盘,排八字,在线排八字,八字,命理,国学,算卦,排盘,易经,六十四卦,命运,运势,测算,婚姻';
        document.getElementById("Description").content = FX.sanmingtonghui3 + FX.sanmingtonghui4;
        document.getElementById("Descriptiona").innerHTML = BZ.ng + BZ.nz + ' ' + BZ.yg + BZ.yz + ' ' + BZ.rg + BZ.rz + ' ' + BZ.sg + BZ.sz + ' ' + system.sexx + ' ' + system.XingZuo + '-北斋先生';
        tgSS = "";
        mgSS = "";
        SgSS = "";
        NZSS = "";
        YZSS = "";
        RZSS = "";
        SZSS = "";
        TgSS = "";
        KgSS = "";
        for (var i = 0; i < LLSS[BZ.Tg + BZ.Tz].length; i++) {
            TgSS += "<a onclick=sc('wd','" + LLSS[BZ.Tg + BZ.Tz][i] + "')>" + LLSS[BZ.Tg + BZ.Tz][i] + "</a></div><div>"
        }
        for (var i = 0; i < LLSS[BZ.Kg + BZ.Kz].length; i++) {
            KgSS += "<a onclick=sc('wd','" + LLSS[BZ.Kg + BZ.Kz][i] + "')>" + LLSS[BZ.Kg + BZ.Kz][i] + "</a></div><div>"
        }
        for (var i = 0; i < LLSS[BZ.Sg + BZ.Sz].length; i++) {
            SgSS += "<a onclick=sc('wd','" + LLSS[BZ.Sg + BZ.Sz][i] + "')>" + LLSS[BZ.Sg + BZ.Sz][i] + "</a></div><div>"
        }
        for (var i = 0; i < LLSS[BZ.mg + BZ.mz].length; i++) {
            mgSS += "<a onclick=sc('wd','" + LLSS[BZ.mg + BZ.mz][i] + "')>" + LLSS[BZ.mg + BZ.mz][i] + "</a></div><div>"
        }
        for (var i = 0; i < LLSS[BZ.tg + BZ.tz].length; i++) {
            tgSS += "<a onclick=sc('wd','" + LLSS[BZ.tg + BZ.tz][i] + "')>" + LLSS[BZ.tg + BZ.tz][i] + "</a></div><div>"
        }
        for (var i = 0; i < SS.NZSC.length; i++) {
            NZSS += "<a onclick=sc('wd','" + SS.NZSC[i] + "')>" + SS.NZSC[i] + "</a></div><div>"
        }
        for (var i = 0; i < SS.YZSC.length; i++) {
            YZSS += "<a onclick=sc('wd','" + SS.YZSC[i] + "')>" + SS.YZSC[i] + "</a></div><div>"
        }
        for (var i = 0; i < SS.RZSC.length; i++) {
            RZSS += "<a onclick=sc('wd','" + SS.RZSC[i] + "')>" + SS.RZSC[i] + "</a></div><div>"
        }
        for (var i = 0; i < SS.SZSC.length; i++) {
            SZSS += "<a onclick=sc('wd','" + SS.SZSC[i] + "')>" + SS.SZSC[i] + "</a></div><div>"
        }
        document.getElementById("aTgSS").innerHTML = TgSS;
        document.getElementById("aKgSS").innerHTML = KgSS;
        document.getElementById("atgSS").innerHTML = tgSS;
        document.getElementById("amgSS").innerHTML = mgSS;
        document.getElementById("aSgSS").innerHTML = SgSS;
        document.getElementById("aNZSS").innerHTML = NZSS;
        document.getElementById("aYZSS").innerHTML = YZSS;
        document.getElementById("aRZSS").innerHTML = RZSS;
        document.getElementById("aSZSS").innerHTML = SZSS;
        document.getElementById("chusheng.WXWS").innerHTML = chusheng.WXWS;
        document.getElementById("FX.gz").innerHTML = FX.gz + '&nbsp;&nbsp;格局:' + FX.cggj;
        document.getElementById("FX.cgg").innerHTML = "<a onclick=alert('" + FX.cgjs + "')>" + FX.cgg + "</a>";
        document.getElementById("YSCK").innerHTML = deling[0] + '，得' + deling[1] + '强气根，得' + deling[2] + '中气根，得' + deling[3] + '余气根，得' + deling[4] + '势';
        ZNCS = "";
        RZFX = "";
        Arr_XingZuo = "";
        KWCS = "";
        GDLM = "";
        SCWG = "";
        for (var i = 0; i < FX.zncs.length; i++) {
            ZNCS += FX.zncs[i] + "<br>"
        }
        for (var i = 0; i < FX.XingZuo.length; i++) {
            Arr_XingZuo += FX.XingZuo[i] + "<br>"
        }
        for (var i in FX.rizhufenxi) {
            RZFX += i + "：" + FX.rizhufenxi[i] + "<br>";
        }
        for (var i in FX.XingZuo) {
            Arr_XingZuo += i + "：" + FX.XingZuo[i] + "<br>";
        }
        for (var i = 0; i < FX.KWSC2.length; i++) {
            KWCS += FX.KWSC2[i] + "<br>"
        }
        for (var i in FX.GDLM) {
            GDLM += FX.GDLM[i] + "<br>";
        }
        for (var i in FX.SCWG) {
            SCWG += FX.SCWG[i] + "<br>";
        }
        var proData = {
            '隐藏': ['请选择'],
            '调试分析': ['调试分析'],
            '通用参考': ['日主分析', '星座分析', '综合分析', '宫度论命', '三才五格', '喜用神参考', '月日精参'],
            '古籍参考': ['穷通宝鉴', '滴天髓', '三命通会', '八字提要', '神峰通考', '天元巫咸', '五行经纪', '李虚中命书', '鬼谷子两头钳', '格物至言']
        };
        var proDatac = {
            '请选择': '',
            '调试分析': ZNCS,
            '日主分析': RZFX,
            '星座分析': Arr_XingZuo,
            '综合分析': KWCS,
            '宫度论命': GDLM,
            '三才五格': SCWG,
            '喜用神参考': FX.xiyongshencankao1 + "<br>" + FX.xiyongshencankao2,
            '月日精参': FX.YRJPFX,
            '穷通宝鉴': FX.qiongtongbaojian,
            '滴天髓': FX.ditiansui,
            '三命通会': FX.sanmingtonghui1 + "<br>" + FX.sanmingtonghui2 + "<br>" + FX.sanmingtonghui3 + "<br>" + FX.sanmingtonghui4,
            '八字提要': FX.bazitiyao1 + "<br>" + FX.bazitiyao2 + "<br>" + FX.bazitiyao3,
            '神峰通考': FX.shenfengtongkao1 + "<br>" + FX.shenfengtongkao2 + "<br>" + FX.shenfengtongkao3,
            '天元巫咸': FX.tianwuwuxian,
            '五行经纪': FX.wuxingjingji1 + "<br>" + FX.wuxingjingji2 + "<br>" + FX.wuxingjingji3 + "<br>" + FX.wuxingjingji4 + "<br>" + FX.wuxingjingji5 + "<br>" + FX.wuxingjingji6,
            '李虚中命书': FX.lixuzhongmingshu1 + "<br>" + FX.lixuzhongmingshu2,
            '鬼谷子两头钳': FX.liangtoqian,
            '格物至言': FX.gewuzhiyan
        };
        let $tiangan1 = ["癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬"];
        // for (var key in proData) {
        //     demoP = document.getElementById("FX1");
        //     demoP.innerHTML = demoP.innerHTML + "<option value='" + key + "'>" + key + "</option>";
        // }
        // var oSelectPro = document.getElementById('FX1');
        // var oSelectCity = document.getElementById('FX2');
        // oSelectPro.onchange = function () {
        //     var aRrayCity = proData[this.value];
        //     oSelectCity.options.length = 0;
        //     for (var i = 0; i < aRrayCity.length; i++) {
        //         var oOption = document.createElement('option');
        //         oOption.innerHTML = aRrayCity[i];
        //         oOption.value = proDatac[aRrayCity[i]];
        //         oSelectCity.appendChild(oOption)
        //     }
        //     show();
        // }
        document.getElementById("BZBH1").innerHTML = "金" + bazixinxi.zh[0][0] + '个，木' + bazixinxi.zh[0][1] + '个，水' + bazixinxi.zh[0][2] + '个，火' + bazixinxi.zh[0][3] + '个，土' + bazixinxi.zh[0][4] + "个";
        document.getElementById("BZBH2").innerHTML = "阴" + bazixinxi.zh[1][1] + '个，阳' + bazixinxi.zh[1][0] + '个，阴占比' + bazixinxi.zh[2][0] + "％，阳占比" + bazixinxi.zh[2][1] + "％";
        document.getElementById("BZBH3").innerHTML = "金" + bazixinxi.zh[3][0] + '个，木' + bazixinxi.zh[3][1] + '个，水' + bazixinxi.zh[3][2] + '个，火' + bazixinxi.zh[3][3] + '个，土' + bazixinxi.zh[3][4] + "个";
        document.getElementById("BZBH4").innerHTML = "阴" + bazixinxi.zh[4][1] + '个，阳' + bazixinxi.zh[4][0] + '个，阴占比' + bazixinxi.zh[5][0] + "％，阳占比" + bazixinxi.zh[5][1] + "％";
        document.getElementById("BZBH5").innerHTML = bazixinxi.ZaoShi;
        document.getElementById("BZNG").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.ng] + "'>" + BZ.ng + "</span><span class='small'>" + DZSS[BZ.ng]['半'] + "</span>";
        document.getElementById("BZYG").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.yg] + "'>" + BZ.yg + "</span><span class='small'>" + DZSS[BZ.yg]['半'] + "</span>";
        document.getElementById("BZRG").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.rg] + "' id='rigan'>" + BZ.rg + "</span><span class='small'>" + system.sexx + "</span>";
        document.getElementById("BZSG").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.sg] + "'>" + BZ.sg + "</span><span class='small'>" + DZSS[BZ.sg]['半'] + "</span>";
        document.getElementById("BZNZ").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.nz] + "'>" + BZ.nz + "</span><span class='small'>" + DZSS[BZ.nz]['本']['半'] + DZSS[BZ.nz]['中']['半'] + DZSS[BZ.nz]['余']['半'] + "</span>";
        document.getElementById("BZYZ").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.yz] + "'>" + BZ.yz + "</span><span class='small'>" + DZSS[BZ.yz]['本']['半'] + DZSS[BZ.yz]['中']['半'] + DZSS[BZ.yz]['余']['半'] + "</span>";
        document.getElementById("BZRZ").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.rz] + "'>" + BZ.rz + "</span><span class='small'>" + DZSS[BZ.rz]['本']['半'] + DZSS[BZ.rz]['中']['半'] + DZSS[BZ.rz]['余']['半'] + "</span>";
        document.getElementById("BZSZ").innerHTML = "<span class='big' style='align-self: center;color:" + tgdzColor[BZ.sz] + "'>" + BZ.sz + "</span><span class='small'>" + DZSS[BZ.sz]['本']['半'] + DZSS[BZ.sz]['中']['半'] + DZSS[BZ.sz]['余']['半'] + "</span>";
        document.getElementById("DaYunKWa").innerHTML = DYKW[[BZ.ng] + [BZ.nz]];
        document.getElementById("DaYunKWb").innerHTML = DYKW[[BZ.yg] + [BZ.yz]];
        document.getElementById("DaYunKWc").innerHTML = DYKW[[BZ.rg] + [BZ.rz]];
        document.getElementById("DaYunKWd").innerHTML = DYKW[[BZ.sg] + [BZ.sz]];
        // document.getElementById("DYWSnz").innerHTML = "<a onclick=sc('wd','" + DYWS[BZ.nz] + "')>" + DYWS[BZ.nz] + "</a>";
        // document.getElementById("DYWSyz").innerHTML = "<a onclick=sc('wd','" + DYWS[BZ.yz] + "')>" + DYWS[BZ.yz] + "</a>";
        // document.getElementById("DYWSrz").innerHTML = "<a onclick=sc('wd','" + DYWS[BZ.rz] + "')>" + DYWS[BZ.rz] + "</a>";
        // document.getElementById("DYWSsz").innerHTML = "<a onclick=sc('wd','" + DYWS[BZ.sz] + "')>" + DYWS[BZ.sz] + "</a>";
        // document.getElementById("DYZZnz").innerHTML = "<a onclick=sc('wd','" + DYZZ[[BZ.ng] + [BZ.nz]] + "')>" + DYZZ[[BZ.ng] + [BZ.nz]] + "</a>";
        // document.getElementById("DYZZyz").innerHTML = "<a onclick=sc('wd','" + DYZZ[[BZ.yg] + [BZ.yz]] + "')>" + DYZZ[[BZ.yg] + [BZ.yz]] + "</a>";
        // document.getElementById("DYZZrz").innerHTML = "<a onclick=sc('wd','" + DYZZ[[BZ.rg] + [BZ.rz]] + "')>" + DYZZ[[BZ.rg] + [BZ.rz]] + "</a>";
        // document.getElementById("DYZZsz").innerHTML = "<a onclick=sc('wd','" + DYZZ[[BZ.sg] + [BZ.sz]] + "')>" + DYZZ[[BZ.sg] + [BZ.sz]] + "</a>";
        // document.getElementById("DYNYnz").innerHTML = "<a onclick=sc('wd','" + DYNY[[BZ.ng] + [BZ.nz]] + "')>" + DYNY[[BZ.ng] + [BZ.nz]] + "</a>";
        // document.getElementById("DYNYyz").innerHTML = "<a onclick=sc('wd','" + DYNY[[BZ.yg] + [BZ.yz]] + "')>" + DYNY[[BZ.yg] + [BZ.yz]] + "</a>";
        // document.getElementById("DYNYrz").innerHTML = "<a onclick=sc('wd','" + DYNY[[BZ.rg] + [BZ.rz]] + "')>" + DYNY[[BZ.rg] + [BZ.rz]] + "</a>";
        // document.getElementById("DYNYsz").innerHTML = "<a onclick=sc('wd','" + DYNY[[BZ.sg] + [BZ.sz]] + "')>" + DYNY[[BZ.sg] + [BZ.sz]] + "</a>";

        ddssxx = '';

        for (let i = 0; i < 27; i++) {
            ddssxx += "document.getElementById('aBZcolor." + Q21[i] + "ys').style='color:" + tgdzColor[ZGss[Q21[i]]] + "';";
            if (ZGss[Q21[i]] != null) {
                ddssxx += "document.getElementById(\"aZGss." + Q21[i] + "\").innerHTML=\"<front style='color:#333333'>" + ZGss[Q21[i]] + "</front>\";";
            }
            if (i < 9) {
                if (i == 5) {
                    ddssxx += "document.getElementById('aBZcolor." + G8[i] + "ys').style='flex:1;color:blue';";
                } else {
                    ddssxx += "document.getElementById('aBZcolor." + G8[i] + "ys').style='flex:1;color:#333333';";
                }
                ddssxx += "document.getElementById('aBZcolor." + G8[i] + "ysa').style='font-size:24px;font-weight:700;color:" + tgdzColor[BZ[G8[i]]] + "';";
                ddssxx += "document.getElementById('aBZcolor." + BQ8[i] + "ysa').style='font-size:24px;font-weight:700;color:" + tgdzColor[ZGss[BQ8[i]]] + "';";
                ddssxx += "document.getElementById(\"aBZ." + G8[i] + "\").innerHTML=\"<a onclick=sc('wd','" + BZ[G8[i]] + "')>" + BZ[G8[i]] + "</a>\";";
                ddssxx += "document.getElementById(\"aBZ." + Z8[i] + "\").innerHTML=\"<a onclick=sc('wd','" + BZ[Z8[i]] + "')>" + BZ[Z8[i]] + "</a>\";";
                ddssxx += "document.getElementById(\"aDZSS[BZ." + Z8[i] + "]['本']['全']\").innerHTML=\"<a onclick=sc('wd','" + DZSS[BZ[Z8[i]]]['本']['全'] + "')>" + "(" +
                    "<front color='#333333'>" +  DZSS[BZ[Z8[i]]]['本']['全'] + "</front>" + ")" + "</a>\";";
                if (DZSS[BZ[Z8[i]]]['中']['全'] != null) {
                    ddssxx += "document.getElementById(\"aDZSS[BZ." + Z8[i] + "]['中']['全']\").innerHTML=\"<a onclick=sc('wd','" + DZSS[BZ[Z8[i]]]['中']['全'] + "')>" + "(" + DZSS[BZ[Z8[i]]]['中']['全'] + ")" + "</a>\";";
                }
                if (DZSS[BZ[Z8[i]]]['余']['全'] != null) {
                    ddssxx += "document.getElementById(\"aDZSS[BZ." + Z8[i] + "]['余']['全']\").innerHTML=\"<a onclick=sc('wd','" + DZSS[BZ[Z8[i]]]['余']['全'] + "')>" + "(" + DZSS[BZ[Z8[i]]]['余']['全'] + ")" + "</a>\";";
                }
                ddssxx += "document.getElementById(\"aDYNY[BZ." + G8[i] + "+BZ." + Z8[i] + "]\").innerHTML=\"<a onclick=sc('wd','" + DYNY[BZ[G8[i]] + BZ[Z8[i]]] + "')>" + DYNY[BZ[G8[i]] + BZ[Z8[i]]] + "</a>\";";
                // ddssxx += "document.getElementById(\"aDYWS[BZ." + Z8[i] + "]\").innerHTML=\"<a onclick=sc('wd','" + DYWS[BZ[Z8[i]]] + "')>" + "</a>\";";
                // ddssxx += "document.getElementById(\"aDYZZ[BZ." + G8[i] + "+BZ." + Z8[i] + "]\").innerHTML=\"<a onclick=sc('wd','" + DYZZ[BZ[G8[i]] + BZ[Z8[i]]] + "')>" + DYZZ[BZ[G8[i]] + BZ[Z8[i]]] + "</a>\";";
                ddssxx += "document.getElementById(\"aDYKW[BZ." + G8[i] + "+BZ." + Z8[i] + "]\").innerHTML='" + DYKW[BZ[G8[i]] + BZ[Z8[i]]] + "';";
                if (i == 5) {
                    ddssxx += "document.getElementById('asystem.sexx').innerHTML=\"<front color='blue'>元" + system.sexx + "</front>\";";
                } else {
                    ddssxx += "document.getElementById(\"aDZSS[BZ." + G8[i] + "]['全']\").innerHTML=\"<a onclick=sc('wd','" + DZSS[BZ[G8[i]]]['全'] + "')>" +  DZSS[BZ[G8[i]]]['全'] + "</a>\";";
                }
            }
        }
        var $jia = [1204, 1264, 1324, 1384, 1444, 1504, 1564, 1624, 1684, 1744, 1804, 1864, 1924, 1984, 2044, 2104, 2164, 2224, 2284, 2344, 2404, 2464, 2524, 2584, 2644, 2704, 2764, 2824, 2884, 2944];

        function findCloseNum(arr, num) {
            var index = 0;
            var old_value = Number.MAX_VALUE;
            for (var i = 0; i < arr.length; i++) {
                var new_value = Math.abs(arr[i] - num);
                if (new_value <= old_value) {
                    if (new_value === old_value && arr[i] < arr[index]) {
                        continue;
                    }
                    index = i;
                    old_value = new_value;
                }
            }
            return [arr[index - 1], arr[index], arr[index + 1]];
        }

        findClose = findCloseNum($jia, system.GNF);
        liunianSY = 'var dayunliunianData={';
        for (e = 0; e <= 2; e++) {
            for (i = 0; i <= 59; i++) {
                liunianSY += findClose[e] + i;
                liunianSY += ":'" + $jiazi[i] + "'";
                liunianSY += ',';
            }
        }
        liunianSY += '};';

        DYkongwang = liunianSY + "var kongwang={";
        DYshensha = 'var shensha={';
        DYxingyun = 'var xingyun={';
        DYzizuo = 'var zizuo={';
        DYnayin = 'var nayin={';
        dayunliuniancData = "var dayunliuniancData={};";
    
        for (var i in DYKW) {
            DYkongwang += "'" + i + "':\"" + DYKW[i] + "\","
        }
        for (var i in LLSS) {
            DYshensha += "'" + i + "':\"";
            for (var ii in LLSS[i]) {
                DYshensha += "<a onclick=sc('wd','" + LLSS[i][ii] + "')>" + LLSS[i][ii] + "</a> "
            }
            DYshensha += "\","
        }
        for (var i in DYWS) {
            DYxingyun += "'" + i + "':\"<a onclick=sc('wd','" + DYWS[i] + "')>" + DYWS[i] + "</a>\","
        }
        for (var i in DYZZ) {
            DYzizuo += "'" + i + "':\"<a onclick=sc('wd','" + DYZZ[i] + "')>" + DYZZ[i] + "</a>\","
        }
        for (var i in DYNY) {
            DYnayin += "'" + i + "':\"<a onclick=sc('wd','" + DYNY[i] + "')>" + DYNY[i] + "</a>\","
        }
        for (var x = 0; x < 100; x++) {
            d = Number(system.GNF) + Number(x);
            dayunliuniancData += "dayunliuniancData['" + d + "']=\"" + LNXY[d] + "\";"
        }
        let $diZhiVsTianGan= {
            '子': ['癸'],
            '丑': ['己', '癸', '辛'],
            '寅': ['甲', '丙', '戊'],
            '卯': ['乙'],
            '辰': ['戊', '乙', '癸'],
            '巳': ['丙', '戊', '庚'],
            '午': ['丁', '己'],
            '未': ['己', '丁', '乙'],
            '申': ['庚', '壬', '午'],
            '酉': ['辛'],
            '戌': ['戊', '辛', '丁'],
            '亥': ['壬', '甲']
        };
        let liuNianData1 = {
            "1924": "甲子",
            "1925": "乙丑",
            "1926": "丙寅",
            "1927": "丁卯",
            "1928": "戊辰",
            "1929": "己巳",
            "1930": "庚午",
            "1931": "辛未",
            "1932": "壬申",
            "1933": "癸酉",
            "1934": "甲戌",
            "1935": "乙亥",
            "1936": "丙子",
            "1937": "丁丑",
            "1938": "戊寅",
            "1939": "己卯",
            "1940": "庚辰",
            "1941": "辛巳",
            "1942": "壬午",
            "1943": "癸未",
            "1944": "甲申",
            "1945": "乙酉",
            "1946": "丙戌",
            "1947": "丁亥",
            "1948": "戊子",
            "1949": "己丑",
            "1950": "庚寅",
            "1951": "辛卯",
            "1952": "壬辰",
            "1953": "癸巳",
            "1954": "甲午",
            "1955": "乙未",
            "1956": "丙申",
            "1957": "丁酉",
            "1958": "戊戌",
            "1959": "己亥",
            "1960": "庚子",
            "1961": "辛丑",
            "1962": "壬寅",
            "1963": "癸卯",
            "1964": "甲辰",
            "1965": "乙巳",
            "1966": "丙午",
            "1967": "丁未",
            "1968": "戊申",
            "1969": "己酉",
            "1970": "庚戌",
            "1971": "辛亥",
            "1972": "壬子",
            "1973": "癸丑",
            "1974": "甲寅",
            "1975": "乙卯",
            "1976": "丙辰",
            "1977": "丁巳",
            "1978": "戊午",
            "1979": "己未",
            "1980": "庚申",
            "1981": "辛酉",
            "1982": "壬戌",
            "1983": "癸亥",
            "1984": "甲子",
            "1985": "乙丑",
            "1986": "丙寅",
            "1987": "丁卯",
            "1988": "戊辰",
            "1989": "己巳",
            "1990": "庚午",
            "1991": "辛未",
            "1992": "壬申",
            "1993": "癸酉",
            "1994": "甲戌",
            "1995": "乙亥",
            "1996": "丙子",
            "1997": "丁丑",
            "1998": "戊寅",
            "1999": "己卯",
            "2000": "庚辰",
            "2001": "辛巳",
            "2002": "壬午",
            "2003": "癸未",
            "2004": "甲申",
            "2005": "乙酉",
            "2006": "丙戌",
            "2007": "丁亥",
            "2008": "戊子",
            "2009": "己丑",
            "2010": "庚寅",
            "2011": "辛卯",
            "2012": "壬辰",
            "2013": "癸巳",
            "2014": "甲午",
            "2015": "乙未",
            "2016": "丙申",
            "2017": "丁酉",
            "2018": "戊戌",
            "2019": "己亥",
            "2020": "庚子",
            "2021": "辛丑",
            "2022": "壬寅",
            "2023": "癸卯",
            "2024": "甲辰",
            "2025": "乙巳",
            "2026": "丙午",
            "2027": "丁未",
            "2028": "戊申",
            "2029": "己酉",
            "2030": "庚戌",
            "2031": "辛亥",
            "2032": "壬子",
            "2033": "癸丑",
            "2034": "甲寅",
            "2035": "乙卯",
            "2036": "丙辰",
            "2037": "丁巳",
            "2038": "戊午",
            "2039": "己未",
            "2040": "庚申",
            "2041": "辛酉",
            "2042": "壬戌",
            "2043": "癸亥",
            "2044": "甲子",
            "2045": "乙丑",
            "2046": "丙寅",
            "2047": "丁卯",
            "2048": "戊辰",
            "2049": "己巳",
            "2050": "庚午",
            "2051": "辛未",
            "2052": "壬申",
            "2053": "癸酉",
            "2054": "甲戌",
            "2055": "乙亥",
            "2056": "丙子",
            "2057": "丁丑",
            "2058": "戊寅",
            "2059": "己卯",
            "2060": "庚辰",
            "2061": "辛巳",
            "2062": "壬午",
            "2063": "癸未",
            "2064": "甲申",
            "2065": "乙酉",
            "2066": "丙戌",
            "2067": "丁亥",
            "2068": "戊子",
            "2069": "己丑",
            "2070": "庚寅",
            "2071": "辛卯",
            "2072": "壬辰",
            "2073": "癸巳",
            "2074": "甲午",
            "2075": "乙未",
            "2076": "丙申",
            "2077": "丁酉",
            "2078": "戊戌",
            "2079": "己亥",
            "2080": "庚子",
            "2081": "辛丑",
            "2082": "壬寅",
            "2083": "癸卯",
            "2084": "甲辰",
            "2085": "乙巳",
            "2086": "丙午",
            "2087": "丁未",
            "2088": "戊申",
            "2089": "己酉",
            "2090": "庚戌",
            "2091": "辛亥",
            "2092": "壬子",
            "2093": "癸丑",
            "2094": "甲寅",
            "2095": "乙卯",
            "2096": "丙辰",
            "2097": "丁巳",
            "2098": "戊午",
            "2099": "己未",
            "2100": "庚申",
            "2101": "辛酉",
            "2102": "壬戌",
            "2103": "癸亥",
            "2104": "甲子",
            "2105": "乙丑",
            "2106": "丙寅",
            "2107": "丁卯",
            "2108": "戊辰",
            "2109": "己巳",
            "2110": "庚午",
            "2111": "辛未",
            "2112": "壬申",
            "2113": "癸酉",
            "2114": "甲戌",
            "2115": "乙亥",
            "2116": "丙子",
            "2117": "丁丑",
            "2118": "戊寅",
            "2119": "己卯",
            "2120": "庚辰",
            "2121": "辛巳",
            "2122": "壬午",
            "2123": "癸未",
            "2124": "甲申",
            "2125": "乙酉",
            "2126": "丙戌",
            "2127": "丁亥",
            "2128": "戊子",
            "2129": "己丑",
            "2130": "庚寅",
            "2131": "辛卯",
            "2132": "壬辰",
            "2133": "癸巳",
            "2133": "甲午",
            "2134": "乙未",
            "2135": "丙申",
            "2136": "丁酉",
            "2137": "戊戌",
            "2138": "己亥",
            "2139": "庚子",
            "2140": "辛丑",
            "2141": "壬寅",
            "2142": "癸卯",
            "2143": "甲辰",
            "2144": "乙巳",
            "2145": "丙午",
            "2146": "丁未",
            "2147": "戊申",
            "2148": "己酉",
            "2149": "庚戌",
            "2150": "辛亥",
            "2151": "壬子",
            "2152": "癸丑",
            "2153": "甲寅",
            "2154": "乙卯",
            "2155": "丙辰",
            "2156": "丁巳",
            "2157": "戊午",
            "2158": "己未",
            "2159": "庚申",
            "2160": "辛酉",
            "2161": "壬戌",
            "2162": "癸亥"
        }
        LNDYQY = "<td>运年</td>";
        xipandayungz = "<td>大运</td>";
        liunian = "<td  style='white-space:nowrap'>岁<span class=\"kong\">空空</span>年:</td>";
        dayun = "<td  style='white-space:nowrap'>大<span class=\"kong\">空空</span>运:</td>";
        dayunqishi = "<td>大运始于:</td>";
        shishen = "<td>天干十神:</td>"
        shiErChangSheng = "<td>十二长生:</td>"
        dayunzhiyu = "<td>大运止于:</td>"
        dizhishishen = "<td style='vertical-align: -webkit-center'>地支十神:</td>"
        liunian1 = "<td>流<span class=\"kong\">空空</span>年:</td>"
        xiaoYun1 = "<td style='white-space:nowrap'>小<span class=\"kong\">空空</span>运:</td>"
        xiaoYunShiShen1 = "<td>小运十神:</td>"
        xiaoyunage1 = "<td style='white-space:nowrap'></td>"
        xiaoYunLiuNian1 = "<td>流<span class=\"kong\">空空</span>年:</td>"
        for (i = 0; i <= 27;) {
            let age = LNDY[i + 1] - 1
            if (age != 0) {
                LNDYQY += '<td>' + age + '岁<br>' + LNDY[i] + '</td>';
                liunian += '<td>' + age + '岁' + '</td>';
                dayunqishi += '<td>' + LNDY[i] + '</td>';
                xipandayungz += "<td data-age='" + LNDY[i + 1] + "' data-year='" + LNDY[i] + "' data-yearr='" + LNDY[i + 2] + "'>" + LNDY[i + 2] + "</td>";
                dayun += "<td data-age='" + LNDY[i + 1] + "' data-year='" + LNDY[i] + "' data-yearr='" + LNDY[i + 2] + "'>" + "<front style='color: red'>" + LNDY[i + 2] + "</front></td>";
                let w = LNDY[i + 2].slice(0, 1)
                shishen += '<td>' + getShishen($tiangan1.indexOf(w), $tiangan1.indexOf($("#rigan").html())) + '</td>';
                let w1 = LNDY[i + 2].slice(1, 2)
                dizhiTiangan = $diZhiVsTianGan[w1];
                // 地支十神
                dizhishishen += '<td class="item vl" style="vertical-align:text-top">'
                for (j = 0; j < dizhiTiangan.length; j++) {
                    dizhishishen += "<span><front style='color:red'>" + dizhiTiangan[j] + "</front>" + getShishen($tiangan1.indexOf(dizhiTiangan[j]), $tiangan1.indexOf($("#rigan").html()))  + "</span>"
                }
                dizhishishen += '</td>'
                
                // 大运止于
                let t = LNDY[i] + 9
                dayunzhiyu += '<td>' + t + '</td>';
                // var sesx = zdyddtd.slice(1);
                // console.log(zdyddtd)
                // $("#dayun_xingyun").html(xingyun[sesx]);
                year1 = LNDY[i]
                // 十二长生
                shiErChangSheng += "<td>" + DYWS[w1] + "</td>"

                // 流年
                liunian1 += "<td style=\"vertical-align:text-top\"><p>"
                for (var j = 0; j < 10; j++) {
                    if (j < 5) {
                        liunian1 += "<front style='color:blue'>" + liuNianData1[(year1 + j)][0] + "</front>" + liuNianData1[(year1 + j)][1] + "<br>";
                    } else {
                        liunian1 +=  liuNianData1[(year1 + j)][0] + "<front style='color:blue'>" + liuNianData1[(year1 + j)][1] + "</front>" + "<br>";
                    }
                }
                liunian1 += "</p></td>"
            }
            i = i + 3;
        }
        // 小运模块
        xiaoYunNianStart = LNDY[0]
        xiaoYunNianEnd = LNDY[3]
        xiaoyunageStart = LNDY[1] - 1
        for (var j = xiaoYunNianStart; j <= xiaoYunNianEnd; j++) {
            xiaoyunage1 += '<td>' + xiaoyunageStart + '岁<br>'
            var bazi = LNXY[j]
            let w2 = bazi.slice(0, 1)
            xiaoYunShiShen1 += '<td>' + getShishen($tiangan1.indexOf(w2), $tiangan1.indexOf($("#rigan").html())) + '</td>';
            xiaoYun1 += "<td>" + bazi + "</td>"
            xiaoYunLiuNian1 += "<td>" + liuNianData1[j] + "</td>";
            xiaoyunageStart += 1
        }
        document.getElementById("LNDYQY").innerHTML = LNDYQY;
        document.getElementById("liunianage1").innerHTML = liunian;
        document.getElementById("dayunqishi1").innerHTML = dayunqishi;
        document.getElementById("tianganshishen1").innerHTML = shishen;
        document.getElementById("dayun1").innerHTML = dayun;
        document.getElementById("dizhishishen1").innerHTML = dizhishishen;
        document.getElementById("shierchangsheng1").innerHTML = shiErChangSheng;
        document.getElementById("dayunzhiyu1").innerHTML = dayunzhiyu;
        document.getElementById("liunian1").innerHTML = liunian1;
        document.getElementById("xiaoYunShiShen1").innerHTML = xiaoYunShiShen1;
        document.getElementById("xiaoyunage1").innerHTML = xiaoyunage1;
        document.getElementById("xiaoYun1").innerHTML = xiaoYun1;
        document.getElementById("xiaoyunliunian1").innerHTML = xiaoYunLiuNian1;

        // 勿动
        document.getElementById("xipandayungz").innerHTML = xipandayungz;
        document.getElementById("dayunliuniancData").innerHTML = "var liuyi=[['甲己','合土'],['乙庚','合金'],['丙辛','合水'],['丁壬','合木'],['戊癸','合火'],['甲庚','冲'],['乙辛','冲'],['丙壬','冲'],['丁癸','冲'],['巳申','合化水'],['辰酉','合化金'],['卯戌','合化火'],['寅亥','合化木'],['子丑','合化土'],['午未','合化火或土'],['申子辰','合化水'],['寅午戌','合化火'],['亥卯未','合化木'],['巳酉丑','合化金'],['亥子丑','汇聚北方水'],['寅卯辰','汇聚东方木'],['巳午未','汇聚南方火'],['申酉戌','汇聚西方金'],['子卯','为无礼之刑'],['丑未戌','为恃势之刑'],['寅巳申','为无恩之刑'],['辰辰','为自刑'],['午午','为自刑'],['酉酉','为自刑'],['亥亥','为自刑'],['子午','相冲'],['卯酉','相冲'],['寅申','相冲'],['巳亥','相冲'],['辰戌','相冲'],['丑未','相冲'],['子未','相害'],['丑午','相害'],['寅巳','相害'],['卯辰','相害'],['申亥','相害'],['酉戌','相害'],['寅午','暗合土'],['子巳','暗合火'],['巳酉','暗合水'],['卯申','暗合金'],['亥午','暗合木'],['寅丑','暗合'],['子戌','暗合'],['子辰','暗合'],['寅未','暗合'],['子酉','相破'],['寅亥','相破'],['卯午','相破'],['辰丑','相破'],['巳申','相破'],['未戌','相破']];" + ddssxx + dayunliuniancData + DYnayin + "};" + DYzizuo + "};" + DYxingyun + "};" + DYshensha + "};" + DYkongwang + "};function addScriptTag(src){var script=document.createElement('script');script.setAttribute('type','text/javascript');script.src=src;document.body.appendChild(script);}function sc(wd,mm){addScriptTag('" + url + "Homepage.php?yhbh=" + system.yhbh + "&SYLX='+wd+'&id='+mm);}function copyToClipboard(s){if(window.clipboardData){window.clipboardData.setData('text',s);}else{(function(s){document.oncopy=function(e){e.clipboardData.setData('text',s);e.preventDefault();document.oncopy=null;}})(s);document.execCommand('Copy')}alert('已复制到剪贴板！');}DYKSNF=" + LNDY[3] + ";XYKSNF=" + LNDY[0] + ";";
    }

}

var $tiangan = ["癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬"];
var $dizhi = ["亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌"];
var $yuegan1911 = ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"];
var $yibaiesk = {
    "亥": 50,
    "子": 0,
    "丑": 10,
    "寅": 20,
    "卯": 30,
    "辰": 40,
    "巳": 50,
    "午": 0,
    "未": 10,
    "申": 20,
    "酉": 30,
    "戌": 40
};
var $jie = ['立春', '惊蛰', '清明', '立夏', '芒种', '小暑', '立秋', '白露', '寒露', '立冬', '大雪', 'XIAO_HAN', 'LI_CHUN'];
var $ssShorter = {
    '比肩': '比',
    '劫财': '劫',
    '正印': '印',
    '偏印': '枭',
    '正官': '官',
    '七杀': '杀',
    '正财': '财',
    '偏财': '才',
    '伤官': '伤',
    '食神': '食',
};
XYKSNF = dayunliuniancData[XYKSNF];
var $liuri = [[9, 0, 1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], [3, 4, 5, 6, 7, 8, 9, 0, 1, 2], [5, 6, 7, 8, 9, 0, 1, 2, 3, 4], [7, 8, 9, 0, 1, 2, 3, 4, 5, 6], [9, 0, 1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], [3, 4, 5, 6, 7, 8, 9, 0, 1, 2], [5, 6, 7, 8, 9, 0, 1, 2, 3, 4], [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]];

function SZWZ(SZ, ZF) {
    sy = -1;
    for (var i = 0; i < SZ.length; i++) {
        if (SZ[i] == ZF) {
            return i;
        }
    }
}

var currentYear = (new Date()).getFullYear();

function liushiqingkong() {
    for (let i = 1; i < 14; i++) {
        document.getElementById('xiangxiliushi' + i).style.backgroundColor = '';
    }
}

function liukeqingkong() {
    for (let i = 1; i < 11; i++) {
        document.getElementById('xiangxiliuke' + i).style.backgroundColor = '';
    }
}

function liukeshijian(bbb, aaa, ggg, ddd) {
    liukeqingkong();
    document.getElementById(bbb).style.backgroundColor = '#999999';
    $("#liukeshensha").html(shensha[aaa]);
    document.getElementById('lk').value = aaa;
    tiangandizhiliuyi();
    ld = document.getElementById('ld').value;
    ln = document.getElementById('ln').value;
    ly = document.getElementById('ly').value;
    lr = document.getElementById('lr').value;
    ls = document.getElementById('ls').value;
    lk = document.getElementById('lk').value;
}

function liushishijian(bbb, aaa, ccc, ggg, ddd) {
    liushiqingkong();
    document.getElementById(bbb).style.backgroundColor = '#999999';
    $("#liushishensha").html(shensha[aaa + ccc]);
    document.getElementById('ls').value = aaa + ccc;
    $("#liushiage").html(ggg + "-<br>" + ddd + "时");
    $("#liushitg .big").html(aaa).css('color', tgdzColor[aaa]);
    $("#liushidz .big").html(ccc).css('color', tgdzColor[ccc]);
    $("#liushitg .small").html($ssShorter[getShishen($tiangan.indexOf(aaa), $tiangan.indexOf($("#rigan").html()))]);
    $("#liushidz .small").html(getDzSS(ccc, $("#rigan").html()));
    $("#liushi_kongwang").html(kongwang[aaa + ccc]);
    $("#liushi_xingyun").html(xingyun[ccc]);
    $("#liushi_zizuo").html(zizuo[aaa + ccc]);
    $("#liushi_nayin").html(nayin[aaa + ccc]);
    document.getElementById("xiangxiliuke1").innerHTML = "<a onclick=liukeshijian('xiangxiliuke1','" + $jiazi[$yibaiesk[ccc]] + "','23','01')>" + $jiazi[$yibaiesk[ccc]] + "</a>";
    document.getElementById("xiangxiliuke2").innerHTML = "<a onclick=liukeshijian('xiangxiliuke2','" + $jiazi[$yibaiesk[ccc] + 1] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 1] + "</a>";
    document.getElementById("xiangxiliuke3").innerHTML = "<a onclick=liukeshijian('xiangxiliuke3','" + $jiazi[$yibaiesk[ccc] + 2] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 2] + "</a>";
    document.getElementById("xiangxiliuke4").innerHTML = "<a onclick=liukeshijian('xiangxiliuke4','" + $jiazi[$yibaiesk[ccc] + 3] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 3] + "</a>";
    document.getElementById("xiangxiliuke5").innerHTML = "<a onclick=liukeshijian('xiangxiliuke5','" + $jiazi[$yibaiesk[ccc] + 4] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 4] + "</a>";
    document.getElementById("xiangxiliuke6").innerHTML = "<a onclick=liukeshijian('xiangxiliuke6','" + $jiazi[$yibaiesk[ccc] + 5] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 5] + "</a>";
    document.getElementById("xiangxiliuke7").innerHTML = "<a onclick=liukeshijian('xiangxiliuke7','" + $jiazi[$yibaiesk[ccc] + 6] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 6] + "</a>";
    document.getElementById("xiangxiliuke8").innerHTML = "<a onclick=liukeshijian('xiangxiliuke8','" + $jiazi[$yibaiesk[ccc] + 7] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 7] + "</a>";
    document.getElementById("xiangxiliuke9").innerHTML = "<a onclick=liukeshijian('xiangxiliuke9','" + $jiazi[$yibaiesk[ccc] + 8] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 8] + "</a>";
    document.getElementById("xiangxiliuke10").innerHTML = "<a onclick=liukeshijian('xiangxiliuke10','" + $jiazi[$yibaiesk[ccc] + 9] + "','23','01')>" + $jiazi[$yibaiesk[ccc] + 9] + "</a>";
    liukeshijian('xiangxiliuke2', $jiazi[$yibaiesk[ccc] + 1], '23', '01');
}

function tgdzly(tg1, tg2) {
    var tglineArr = tg1;
    for (var item of liuyi) {
        let tmpArr = [...tglineArr], result = '';
        for (let j = 0; j < item[0].length; j++) {
            let iArr = tmpArr.indexOf(item[0][j]);
            if (iArr >= 0)
                result += tmpArr.splice(iArr, 1)[0];
        }
        if (result == item[0])
            document.querySelector(tg2).innerHTML += "<a onclick=sc('wd','" + item[0] + item[1] + "')>" + item[0] + item[1] + "</a>;";
    }
}

function yjxianyin(a) {
    let arr = ['wxianyin', 'xxianyin', 'shenxianyin', 'taixianyin', 'mingxianyin'];
    for (let b of arr) {
        for (let i = 1; i < 11; i++) {
            $("#" + b + i).hide();
        }
    }
    if (a != 'sxianyin') {
        for (let i = 1; i < 11; i++) {
            $("#" + a + i).show();
        }
    }
    $("#bm_tgliuyi").html('');
    $("#bm_dzliuyi").html('');
    $vvttss = $("#bm_tglines .big").map((i, v) => v.innerText).get();
    $vvttsss = $("#bm_dzlines .big").map((i, v) => v.innerText).get()
    acc = [];
    accc = [];
    if (a == 'shenxianyin') {
        acc[0] = $vvttss[0];
        accc[0] = $vvttsss[0];
    }
    if (a == 'mingxianyin') {
        acc[1] = $vvttss[1];
        accc[1] = $vvttsss[1];
    }
    if (a == 'taixianyin') {
        acc[2] = $vvttss[2];
        accc[2] = $vvttsss[2];
    }
    if (a == 'xxianyin') {
        acc[3] = $vvttss[3];
        accc[3] = $vvttsss[3];
    }
    if (a == 'wxianyin') {
        acc[8] = $vvttss[8];
        accc[8] = $vvttsss[8];
    }
    acc[4] = $vvttss[4];
    accc[4] = $vvttsss[4];
    acc[5] = $vvttss[5];
    accc[5] = $vvttsss[5];
    acc[6] = $vvttss[6];
    accc[6] = $vvttsss[6];
    acc[7] = $vvttss[7];
    accc[7] = $vvttsss[7];
    tgdzly(acc, "#bm_tgliuyi");
    tgdzly(accc, "#bm_dzliuyi");
}

yjxianyin('sxianyin');

function tiangandizhiliuyi() {
    $("#tgliuyi").html('');
    $("#dzliuyi").html('');
    $vvttss = $("#tgline .big").map((i, v) => v.innerText).get();
    $vvttsss = $("#dzline .big").map((i, v) => v.innerText).get();
    acc = [];
    accc = [];
    let arr = ['liunianshenshaa', 'dayunshenshaa', 'liuyueshenshaa', 'liurishenshaa', 'liushishenshaa', 'liukeshenshaa', 'dayunliunian', 'xipanliuyue', 'xipanliuri', 'xipanliushi', 'xipanliuyun', 'xipanliuke', 'dayunliunianc', 'dayunage', 'liunianage', 'liuyueage', 'liuriage', 'liushiage', 'dayundzs', 'liuniandzs', 'liuyuedzs', 'liuridzs', 'liushidzs', 'dayun_kongwang', 'liunian_kongwang', 'liuyue_kongwang', 'liuri_kongwang', 'liushi_kongwang', 'dayun_xingyun', 'liunian_xingyun', 'liuyue_xingyun', 'liuri_xingyun', 'liushi_xingyun', 'dayun_zizuo', 'liunian_zizuo', 'liuyue_zizuo', 'liuri_zizuo', 'liushi_zizuo', 'dayun_nayin', 'liunian_nayin', 'liuyue_nayin', 'liuri_nayin', 'liushi_nayin', 'dayuntgs', 'liuniantgs', 'liuyuetgs', 'liuritgs', 'liushitgs', 'liuyunbt', 'liunianbt', 'liuyuebt', 'liuribt', 'liushibt', 'col1', 'col2', 'col3', 'col4', 'col5'];
    for (let b of arr) {
        $("#" + b).hide();
    }
    acc[4] = $vvttss[4];
    accc[4] = $vvttsss[4];
    $("#dayunshenshaa").show();
    $("#xipanliuyun").show();
    $("#dayunage").show();
    $("#dayuntgs").show();
    $("#dayundzs").show();
    $("#dayun_kongwang").show();
    $("#dayun_xingyun").show();
    $("#dayun_zizuo").show();
    $("#dayun_nayin").show();
    $("#liuyunbt").show();
    $("#col1").show();
    if ($("#liuyinian").get(0).checked) {
        acc[3] = $vvttss[3];
        accc[3] = $vvttsss[3];
        $("#liunianshenshaa").show();
        $("#dayunliunian").show();
        $("#liunianage").show();
        $("#liuniantgs").show();
        $("#liuniandzs").show();
        $("#liunian_kongwang").show();
        $("#liunian_xingyun").show();
        $("#liunian_zizuo").show();
        $("#liunian_nayin").show();
        $("#liunianbt").show();
        $("#col2").show();
        $("#dayunliunianc").show();
        document.getElementById("liuyiyue").disabled = false;
    } else {
        document.getElementById('ln').value = '';
        document.getElementById("liuyiyue").checked = false;
        document.getElementById("liuyiyue").disabled = true;
        document.getElementById("liuyiri").checked = false;
        document.getElementById("liuyiri").disabled = true;
        document.getElementById("liuyishi").checked = false;
        document.getElementById("liuyishi").disabled = true;
        document.getElementById("liuyike").checked = false;
        document.getElementById("liuyike").disabled = true;
    }
    if ($("#liuyiyue").get(0).checked) {
        acc[2] = $vvttss[2];
        accc[2] = $vvttsss[2];
        $("#liuyueshenshaa").show();
        $("#xipanliuyue").show();
        $("#liuyueage").show();
        $("#liuyuetgs").show();
        $("#liuyuedzs").show();
        $("#liuyue_kongwang").show();
        $("#liuyue_xingyun").show();
        $("#liuyue_zizuo").show();
        $("#liuyue_nayin").show();
        $("#liuyuebt").show();
        $("#col3").show();
        document.getElementById("liuyiri").disabled = false;
    } else {
        document.getElementById('ly').value = '';
        document.getElementById("liuyiri").checked = false;
        document.getElementById("liuyiri").disabled = true;
        document.getElementById("liuyishi").checked = false;
        document.getElementById("liuyishi").disabled = true;
        document.getElementById("liuyike").checked = false;
        document.getElementById("liuyike").disabled = true;
    }
    if ($("#liuyiri").get(0).checked) {
        acc[1] = $vvttss[1];
        accc[1] = $vvttsss[1];
        $("#liurishenshaa").show();
        $("#xipanliuri").show();
        $("#liuriage").show();
        $("#liuritgs").show();
        $("#liuridzs").show();
        $("#liuri_kongwang").show();
        $("#liuri_xingyun").show();
        $("#liuri_zizuo").show();
        $("#liuri_nayin").show();
        $("#liuribt").show();
        $("#col4").show();
        document.getElementById("liuyishi").disabled = false;
    } else {
        document.getElementById('lr').value = '';
        document.getElementById("liuyishi").checked = false;
        document.getElementById("liuyishi").disabled = true;
        document.getElementById("liuyike").checked = false;
        document.getElementById("liuyike").disabled = true;
    }
    if ($("#liuyishi").get(0).checked) {
        acc[0] = $vvttss[0];
        accc[0] = $vvttsss[0];
        $("#liushishenshaa").show();
        $("#xipanliushi").show();
        $("#liushiage").show();
        $("#liushitgs").show();
        $("#liushidzs").show();
        $("#liushi_kongwang").show();
        $("#liushi_xingyun").show();
        $("#liushi_zizuo").show();
        $("#liushi_nayin").show();
        $("#liushibt").show();
        $("#col5").show();
        $('#liuyike').attr('disabled', false);
    } else {
        document.getElementById('ls').value = '';
        document.getElementById("liuyike").checked = false;
        document.getElementById("liuyike").disabled = true;
    }
    if ($("#liuyike").get(0).checked) {
        $("#liukeshenshaa").show();
        $("#xipanliuke").show();
    } else {
        document.getElementById('lk').value = '';
    }
    acc[5] = $vvttss[5];
    acc[6] = $vvttss[6];
    acc[7] = $vvttss[7];
    acc[8] = $vvttss[8];
    accc[5] = $vvttsss[5];
    accc[6] = $vvttsss[6];
    accc[7] = $vvttsss[7];
    accc[8] = $vvttsss[8];
    tgdzly(acc, "#tgliuyi");
    tgdzly(accc, "#dzliuyi");
}

tgdzly("#bm_tglines .big", "#bm_tgliuyi");
tgdzly("#bm_dzlines .big", "#bm_dzliuyi");
$(".liuri-box").on("click", "span", function (e) {
    $(this).css('backgroundColor', '#999').siblings().css('backgroundColor', '');
    var d = Lunar.fromDate(new Date($(e.target).attr("date")));
    var _tiangan = $(this).html()[0]
    var _dizhi = $(this).html()[1]
    $("#liuritg .big").html(_tiangan).css('color', tgdzColor[_tiangan]);
    $("#liuridz .big").html(_dizhi).css('color', tgdzColor[_dizhi]);
    $("#liuri_kongwang").html(kongwang[_tiangan + _dizhi]);
    $("#liuri_xingyun").html(xingyun[_dizhi]);
    $("#liuri_zizuo").html(zizuo[_tiangan + _dizhi]);
    $("#liuri_nayin").html(nayin[_tiangan + _dizhi]);
    $("#liuritg .small").html($ssShorter[getShishen($tiangan.indexOf(_tiangan), $tiangan.indexOf($("#rigan").html()))]);
    $("#liuridz .small").html(getDzSS(_dizhi, $("#rigan").html()));
    $("#liuriage").html(d.getDayInChinese() + "<br>" + d.getSolar().getDay() + "日");
    $("#liuyueage").html(d.getMonthInChinese() + "月<br>" + Math.abs(d.getSolar().getMonth()) + "月");
    $("#liurishensha").html(shensha[_tiangan + _dizhi]);
    document.getElementById('lr').value = _tiangan + _dizhi;
    document.getElementById("xiangxiliushi1").innerHTML = "<a onclick=liushishijian('xiangxiliushi1','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][0]] + "','子','23','01')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][0]] + '子' + "</a>";
    document.getElementById("xiangxiliushi2").innerHTML = "<a onclick=liushishijian('xiangxiliushi2','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][1]] + "','丑','01','03')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][1]] + '丑' + "</a>";
    document.getElementById("xiangxiliushi3").innerHTML = "<a onclick=liushishijian('xiangxiliushi3','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][2]] + "','寅','03','05')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][2]] + '寅' + "</a>";
    document.getElementById("xiangxiliushi4").innerHTML = "<a onclick=liushishijian('xiangxiliushi4','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][3]] + "','卯','05','07')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][3]] + '卯' + "</a>";
    document.getElementById("xiangxiliushi5").innerHTML = "<a onclick=liushishijian('xiangxiliushi5','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][4]] + "','辰','07','09')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][4]] + '辰' + "</a>";
    document.getElementById("xiangxiliushi6").innerHTML = "<a onclick=liushishijian('xiangxiliushi6','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][5]] + "','巳','09','11')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][5]] + '巳' + "</a>";
    document.getElementById("xiangxiliushi7").innerHTML = "<a onclick=liushishijian('xiangxiliushi7','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][6]] + "','午','11','13')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][6]] + '午' + "</a>";
    document.getElementById("xiangxiliushi8").innerHTML = "<a onclick=liushishijian('xiangxiliushi8','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][7]] + "','未','13','15')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][7]] + '未' + "</a>";
    document.getElementById("xiangxiliushi9").innerHTML = "<a onclick=liushishijian('xiangxiliushi9','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][8]] + "','申','15','17')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][8]] + '申' + "</a>";
    document.getElementById("xiangxiliushi10").innerHTML = "<a onclick=liushishijian('xiangxiliushi10','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][9]] + "','酉','17','19')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][9]] + '酉' + "</a>";
    document.getElementById("xiangxiliushi11").innerHTML = "<a onclick=liushishijian('xiangxiliushi11','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][0]] + "','戌','19','21')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][0]] + '戌' + "</a>";
    document.getElementById("xiangxiliushi12").innerHTML = "<a onclick=liushishijian('xiangxiliushi12','" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][1]] + "','亥','21','23')>" + $tiangan[$liuri[SZWZ($tiangan, _tiangan)][1]] + '亥' + "</a>";
    xiangxiliushi13d = SZWZ($tiangan, _tiangan) == 9 ? SZWZ($tiangan, _tiangan) - 9 : SZWZ($tiangan, _tiangan) + 1;
    document.getElementById("xiangxiliushi13").innerHTML = "<a onclick=liushishijian('xiangxiliushi13','" + $tiangan[$liuri[xiangxiliushi13d][0]] + "','子','23','01')>" + $tiangan[$liuri[xiangxiliushi13d][0]] + '子' + "</a>";
    liushishijian('xiangxiliushi1', $tiangan[$liuri[SZWZ($tiangan, _tiangan)][0]], '子', '23', '01');
})
$("#xipanliuyue tr:eq(1) td").click(function (e) {
    var start = end = ''
    if (!e.target.getAttribute("jieqi-start")) {
        if (!$(e.target).parent().attr("jieqi-start")) {
            return
        }
        start = $(e.target).parent().attr("jieqi-start")
        end = $(e.target).parent().attr("jieqi-end")
        $(e.target).parent().css('backgroundColor', '#999').siblings().css('backgroundColor', '');
    } else {
        start = e.target.getAttribute("jieqi-start")
        end = e.target.getAttribute("jieqi-end")
        $(e.target).css('backgroundColor', '#999').siblings().css('backgroundColor', '');
    }
    var _tiangan = $(this).find('span:eq(0)').html()
    var _dizhi = $(this).find('span:eq(1)').html()
    $("#liuyuetg .big").html(_tiangan).css('color', tgdzColor[_tiangan]);
    $("#liuyuedz .big").html(_dizhi).css('color', tgdzColor[_dizhi]);
    $("#liuyue_kongwang").html(kongwang[_tiangan + _dizhi]);
    $("#liuyue_xingyun").html(xingyun[_dizhi]);
    $("#liuyue_zizuo").html(zizuo[_tiangan + _dizhi]);
    $("#liuyue_nayin").html(nayin[_tiangan + _dizhi]);
    $("#liuyuetg .small").html($ssShorter[getShishen($tiangan.indexOf(_tiangan), $tiangan.indexOf($("#rigan").html()))]);
    $("#liuyuedz .small").html(getDzSS(_dizhi, $("#rigan").html()));
    var d = Lunar.fromDate(new Date(start))
    $("#liuyueage").html(d.getMonthInChinese() + "月<br>" + Math.abs(d.getSolar().getMonth()) + "月");
    $("#liuyueshensha").html(shensha[_tiangan + _dizhi]);
    document.getElementById('ly').value = _tiangan + _dizhi;
    $(".swiper-slide").html("&nbsp;");
    $(".swiper-slide").removeClass("kong");
    var i = 0;
    var dateTime = new Date(start);
    while (dateTime.getTime() < new Date(end).getTime()) {
        var d = Lunar.fromDate(dateTime);
        $(".swiper-slide:eq(" + i + ")").html(d.getDayInGanZhi()).attr("date", d.getSolar().toYmd());
        i++;
        dateTime = new Date(dateTime.setDate(dateTime.getDate() + 1));
    }
    var swiper = new Swiper('.swiper-container', {slidesPerView: 'auto',});
    $(".swiper-wrapper").css("transform", "translate3d(0px,0px,0px)");
    var d = Solar.fromDate(new Date());
    day = $(".liuri-box").find('[date=' + d.toYmd() + ']');
    if (day.length > 0) {
        day.click();
    } else {
        $(".liuri-box").find('span:eq(0)').click();
    }
})
$("#dayunliunian tr:eq(1) td").click(function (e) {
    if (!e.target.getAttribute("year"))
        return;
    $(e.target).css('backgroundColor', '#999').siblings().css('backgroundColor', '');
    $("#liuniantg .big").html(e.target.innerHTML[0]).css('color', tgdzColor[e.target.innerHTML[0]]);
    $("#liuniandz .big").html(e.target.innerHTML[1]).css('color', tgdzColor[e.target.innerHTML[1]]);
    $("#liunian_kongwang").html(kongwang[e.target.innerHTML]);
    var sesx = e.target.innerHTML.slice(1);

    $("#liunian_xingyun").html(xingyun[sesx]);
    $("#liunian_zizuo").html(zizuo[e.target.innerHTML]);
    $("#liunian_nayin").html(nayin[e.target.innerHTML]);
    $("#liuniantg .small").html($ssShorter[getShishen($tiangan.indexOf(e.target.innerHTML[0]), $tiangan.indexOf($("#rigan").html()))]);
    $("#liuniandz .small").html(getDzSS(e.target.innerHTML[1], $("#rigan").html()));
    $("#liunianage").html($(e.target).attr("age") - 1 + "岁<br>" + $(e.target).attr("year"));
    var i = (parseInt($(e.target).attr("year")) - 1911) % 5;
    var yuegan = [];
    yuegan.push(...$yuegan1911.slice(2 * i));
    yuegan.push(...$yuegan1911.slice(0, 2 * i));
    yuegan.push(...yuegan.slice(0, 2));
    $("#liuyuegan").children(":gt(0)").each(function (i, v) {
        $(v).find(".vl span:eq(1)").html(yuegan[i]).css('color', tgdzColor[yuegan[i]]);
        $(v).find(".vl span:eq(0)").html($ssShorter[getShishen($tiangan.indexOf(yuegan[i]), $tiangan.indexOf($("#rigan").html()))]);
    })
    $("#liunianshensha").html(shensha[e.target.innerHTML]);
    document.getElementById('ln').value = e.target.innerHTML;
    var year = parseInt($(e.target).attr("year"));
    var jieqi = Lunar.fromYmd(year, 6, 1).getJieQiTable();
    $("#xipanliuyue tr:eq(1) td:gt(0)").each(function (i, v) {
        var spanTian = $("<span>" + yuegan[i] + "</span>").css('color', tgdzColor[yuegan[i]]);
        if ((i + 3) > 11) {
            var spanDi = $("<span>" + $dizhi[i + 3 - 12] + "</span>").css('color', tgdzColor[$dizhi[i + 3 - 12]]);
        } else {
            var spanDi = $("<span>" + $dizhi[i + 3] + "</span>").css('color', tgdzColor[$dizhi[i + 3]]);
        }
        $("#xipanliuyue tr:eq(1) td:eq(" + (i + 1) + ")").attr('jieqi-start', jieqi[$jie[i]].toYmd()).attr('jieqi-end', jieqi[$jie[i + 1]].toYmd()).empty().append(spanTian).append(spanDi);
    })
    var d = Lunar.fromDate(new Date());
    var oJie = d.getCurrentJie() ? d.getCurrentJie() : d.getPrevJie();
    month = $("#xipanliuyue").find('[jieqi-start=' + oJie.getSolar().toYmd() + ']');
    if (month.length > 0) {
        month.click();
    } else {
        $("#xipanliuyue").find('tr:eq(1) td:eq(1)').click();
    }
})
ggs = 0;
$("#xipandayungz td").click(function (e) {
    if (!e.target.dataset['year'])
        return;
    var year = parseInt(e.target.dataset['year']);
    var yearr = e.target.dataset['yearr'];
    $(this).css('backgroundColor', '#999').siblings().css('backgroundColor', '');
    for (var i = 0; i < 10; i++) {
        $("#dayunliunian tr:eq(0) td:eq(" + (i + 1) + ")").html(year + i);
        $("#dayunliunian tr:eq(1) td:eq(" + (i + 1) + ")").html(dayunliunianData[(year + i)]).attr('year', year + i).attr('age', parseInt(e.target.dataset["age"]) + i);
        $("#dayunliunianc tr:eq(0) td:eq(" + (i + 1) + ")").html(dayunliuniancData[(year + i)]).attr('year', year + i).attr('age', parseInt(e.target.dataset["age"]) + i);
        if (yearr == '小运') {
            ccc = DYKSNF - year;
            if (ccc < i) {
                $("#dayunliunian tr:eq(0) td:eq(" + (i + 1) + ")").html('');
                $("#dayunliunian tr:eq(1) td:eq(" + (i + 1) + ")").html('').attr('year', '').attr('age', '');
                $("#dayunliunianc tr:eq(0) td:eq(" + (i + 1) + ")").html('').attr('year', '').attr('age', '');
            }
        }
    }
    document.getElementById('liuyunbt').innerHTML = '大运';
    zdyddtd = e.target.innerHTML;
    if (yearr == '小运') {
        document.getElementById('liuyunbt').innerHTML = '小运';
        zdyddtd = XYKSNF;
    }
    $("#dayuntg .big").html(zdyddtd[0]).css('color', tgdzColor[zdyddtd[0]]);
    $("#dayundz .big").html(zdyddtd[1]).css('color', tgdzColor[zdyddtd[1]]);
    $("#dayun_kongwang").html(kongwang[zdyddtd]);
    var sesx = zdyddtd.slice(1);
    $("#dayun_xingyun").html(xingyun[sesx]);
    $("#dayun_zizuo").html(zizuo[zdyddtd]);
    $("#dayun_nayin").html(nayin[zdyddtd]);
    $("#dayuntg .small").html($ssShorter[getShishen($tiangan.indexOf(zdyddtd[0]), $tiangan.indexOf($("#rigan").html()))]);
    $("#dayundz .small").html(getDzSS(zdyddtd[1], $("#rigan").html()));
    $("#dayunage").html(e.target.dataset["age"] - 1 + "岁<br>" + e.target.dataset["year"]);
    $("#dayunshensha").html(shensha[zdyddtd]);
    document.getElementById('ld').value = zdyddtd;
    $year = $("#dayunliunian").find('[year=' + currentYear + ']');
    if ($year.length > 0) {
        $year.click();
    } else {
        $s = $("#dayunliunian").find('tr:eq(1) td:eq(1)').click();
    }
}).each(function (i) {
    if (currentYear >= parseInt(this.dataset['year']) && currentYear - parseInt(this.dataset['year']) < 10) {
        this.click();
        ggs = 1;
    } else {
        if (i == 9 && ggs == 0) {
            this.click();
        }
    }
})

function getShishen($tgans, $ritgs) {
    if ($ritgs == 0) $ritgs = 10;
    if ($tgans == 0) $tgans = 10;
    var $cha = $ritgs - $tgans, $str = '';
    if ($cha >= 0) {
        switch ($cha) {
            case 0:
                $str = "比肩";
                break;
            case 1:
                if ($ritgs % 2 == 0) {
                    $str = "劫财";
                } else {
                    $str = "正印";
                }
                break;
            case 2:
                $str = "偏印";
                break;
            case 3:
                if ($ritgs % 2 == 0) {
                    $str = "正印";
                } else {
                    $str = "正官";
                }
                break;
            case 4:
                $str = "七杀";
                break;
            case 5:
                if ($ritgs % 2 == 0) {
                    $str = "正官";
                } else {
                    $str = "正财";
                }
                break;
            case 6:
                $str = "偏财";
                break;
            case 7:
                if ($ritgs % 2 == 0) {
                    $str = "正财";
                } else {
                    $str = "伤官";
                }
                break;
            case 8:
                $str = "食神";
                break;
            case 9:
                $str = "伤官";
                break;
        }
    } else {
        switch (Math.abs($cha)) {
            case 1:
                if ($ritgs % 2 == 1) {
                    $str = "劫财";
                } else {
                    $str = "伤官";
                }
                break;
            case 2:
                $str = "食神";
                break;
            case 3:
                if ($ritgs % 2 == 1) {
                    $str = "伤官";
                } else {
                    $str = "正财";
                }
                break;
            case 4:
                $str = "偏财";
                break;
            case 5:
                if ($ritgs % 2 == 1) {
                    $str = "正财";
                } else {
                    $str = "正官";
                }
                break;
            case 6:
                $str = "七杀";
                break;
            case 7:
                if ($ritgs % 2 == 1) {
                    $str = "正官";
                } else {
                    $str = "正印";
                }
                break;
            case 8:
                $str = "偏印";
                break;
            case 9:
                $str = "正印";
                break;
        }
    }
    return $str;
}

function getDzSS($dz, $rg) {
    var $arr = ["壬甲", "癸", "己癸辛", "甲丙戊", "乙", "戊乙癸", "丙戊庚", "丁己", "己丁乙", "庚壬戊", "辛", "戊辛丁"];
    var $cgs = $arr[$dizhi.indexOf($dz)];
    var $ss = '';
    var $i = 0;
    while (true) {
        var $cg = $cgs[$i++];
        if (!$cg)
            break;
        $ss += $ssShorter[getShishen($tiangan.indexOf($cg), $tiangan.indexOf($rg))];
    }
    return $ss;
}