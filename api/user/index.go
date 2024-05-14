package user

import (
	"fmt"
	"go-sso/models"
	"go-sso/modules/app"
	"go-sso/utils/common"
	"go-sso/utils/handle"
	"go-sso/utils/request"
	"go-sso/utils/response"
	"go-sso/utils/sms"
	"go-sso/utils/verify"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/iancoleman/orderedmap"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var Months = map[string]string{"1": "正月", "2": "二月", "3": "三月", "4": "四月", "5": "五月", "6": "六月", "7": "七月", "8": "八月", "9": "九月", "10": "十月", "11": "冬月", "12": "腊月"}
var RunMonths = map[string]string{"1": "闰正月", "2": "闰二月", "3": "闰三月", "4": "闰四月", "5": "闰五月", "6": "闰六月", "7": "闰七月", "8": "闰八月", "9": "闰九月", "10": "闰十月", "11": "闰冬月", "12": "闰腊月"}
var Dates = map[string]string{"1": "初一", "2": "初二", "3": "初三", "4": "初四", "5": "初五", "6": "初六", "7": "初七", "8": "初八", "9": "初九", "10": "初十", "11": "十一", "12": "十二", "13": "十三", "14": "十四", "15": "十五", "16": "十六", "17": "十七", "18": "十八", "19": "十九", "20": "二十", "21": "廿一", "22": "廿二", "23": "廿三", "24": "廿四", "25": "廿五", "26": "廿六", "27": "廿七", "28": "廿八", "29": "廿九", "30": "三十", "31": "三一"}
var Sex = map[string]string{"0": "男", "1": "女"}
var DateType = map[string]string{"农历": "1", "公历": "0", "八字": "2"}

type UserMobile struct {
	Mobile string `form:"mobile" json:"mobile" binding:"required"`
	Passwd string `form:"passwd" json:"passwd" binding:"required,max=20,min=6"`
	Code   string `form:"code" json:"code" binding:"required,len=6"`
}
type UserMobileCode struct {
	Mobile string `form:"mobile" json:"mobile" binding:"required"`
	Code   string `form:"code" json:"code" binding:"required,len=6"`
}

type UserMobilePasswd struct {
	Mobile string `form:"mob" json:"mob" binding:"required"`
	Passwd string `form:"pwd" json:"pwd" binding:"required,max=20,min=6"`
}

type Mobile struct {
	Mobile string `form:"mob" json:"mob" binding:"required"`
}

var MobileTrans = map[string]string{"mob": "手机号"}

var UserMobileTrans = map[string]string{"Mobile": "手机号", "Passwd": "密码", "Code": "验证码"}

// 手机密码
func Login(c *gin.Context) {
	var userMobile UserMobilePasswd
	mobile, _ := c.GetPostForm("mob")
	password, _ := c.GetPostForm("pwd")
	userMobile.Mobile = mobile
	userMobile.Passwd = password
	model := models.Users{Mobile: userMobile.Mobile}
	if has := model.GetRow(); !has {
		response.ShowError(c, "mobile_not_exists")
		return
	}
	if common.Sha1En(userMobile.Passwd+model.Salt) != model.Passwd {
		response.ShowError(c, "login_error")
		return
	}
	err := app.DoLogin(c, model)
	if err != nil {
		response.ShowError(c, "fail")
		return
	}
	response.ShowSuccess(c, "success")
	return
}

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{"title": "首页"})
}

func Record(c *gin.Context) {

	id := c.Query("id")
	if len(id) > 0 {
		deleteRecord(id)
	}

	cookie := c.Request.Cookies()
	var userId string
	for _, v := range cookie {
		if v.Name == "UserId" {
			userId = v.Value
		}
	}
	name := c.Query("name")
	page := c.DefaultQuery("page", "1")
	pageSize := c.DefaultQuery("pageSize", "10000")
	r := models.Record{
		Name: name,
	}
	p, _ := strconv.Atoi(page)
	s, _ := strconv.Atoi(pageSize)
	list, _ := r.GetRecordByPage(name, userId, p, s)
	for k, v := range list {

		if v["type"] != "八字" {
			splits := strings.Split(v["birthday"], " ")
			date := splits[0]
			nums := strings.Split(date, "-")
			time := splits[1]
			times := strings.Split(time, ":")
			list[k]["birthday"] = nums[0] + "年" + nums[1] + "月" + nums[2] + "日"
			list[k]["year"] = nums[0]
			list[k]["month"] = nums[1]
			list[k]["day"] = nums[2]
			list[k]["hour"] = times[0]
			list[k]["min"] = times[1]
		}
		list[k]["ng"] = v["ng"]
		list[k]["yg"] = v["yg"]
		list[k]["rg"] = v["rg"]
		list[k]["sg"] = v["sg"]
		list[k]["sexNum"] = v["sex"]
		list[k]["sex"] = Sex[v["sex"]]
		list[k]["dateType"] = DateType[v["type"]]
	}
	c.HTML(http.StatusOK, "content.tmpl", map[string]interface{}{
		"list": list,
	})
}

func Edit(c *gin.Context) {
	id := c.Query("id")
	i, _ := strconv.Atoi(id)

	r := models.Record{
		Id: int64(i),
	}
	row, _ := r.GetRowById()
	var isNongLi, isGongLi, isBazi, isNv, isNan bool
	if row.Type == "农历" {
		isNongLi = true
	} else if row.Type == "公历" {
		isGongLi = true
	} else {
		isBazi = true
	}
	if row.Sex == 0 {
		isNan = true
	} else {
		isNv = true
	}
	var years []string
	for i := 1902; i < 2038; i++ {
		y := strconv.Itoa(i)
		years = append(years, y)
	}
	var months []string
	for i := 1; i < 13; i++ {
		m := strconv.Itoa(i)
		months = append(months, m)
	}
	var days []string
	for i := 1; i < 32; i++ {
		d := strconv.Itoa(i)
		days = append(days, d)
	}
	var hours []string
	for i := 0; i < 24; i++ {
		h := strconv.Itoa(i)
		hours = append(hours, h)
	}
	var minutes []string
	for i := 0; i < 60; i++ {
		m := strconv.Itoa(i)
		minutes = append(minutes, m)
	}
	baziNian := orderedmap.New()
	baziNian.Set("1902", "壬寅")
	baziNian.Set("1903", "癸卯")
	baziNian.Set("1904", "甲辰")
	baziNian.Set("1905", "乙巳")
	baziNian.Set("1906", "丙午")
	baziNian.Set("1907", "丁未")
	baziNian.Set("1908", "戊申")
	baziNian.Set("1909", "己酉")
	baziNian.Set("1910", "庚戌")
	baziNian.Set("1911", "辛亥")
	baziNian.Set("1912", "壬子")
	baziNian.Set("1913", "癸丑")
	baziNian.Set("1914", "甲寅")
	baziNian.Set("1915", "乙卯")
	baziNian.Set("1916", "丙辰")
	baziNian.Set("1917", "丁巳")
	baziNian.Set("1918", "戊午")
	baziNian.Set("1919", "己未")
	baziNian.Set("1920", "庚申")
	baziNian.Set("1921", "辛酉")
	baziNian.Set("1922", "壬戌")
	baziNian.Set("1923", "癸亥")
	baziNian.Set("1924", "甲子")
	baziNian.Set("1925", "乙丑")
	baziNian.Set("1926", "丙寅")
	baziNian.Set("1927", "丁卯")
	baziNian.Set("1928", "戊辰")
	baziNian.Set("1929", "己巳")
	baziNian.Set("1930", "庚午")
	baziNian.Set("1931", "辛未")
	baziNian.Set("1932", "壬申")
	baziNian.Set("1933", "癸酉")
	baziNian.Set("1934", "甲戌")
	baziNian.Set("1935", "乙亥")
	baziNian.Set("1936", "丙子")
	baziNian.Set("1937", "丁丑")
	baziNian.Set("1938", "戊寅")
	baziNian.Set("1939", "己卯")
	baziNian.Set("1940", "庚辰")
	baziNian.Set("1941", "辛巳")
	baziNian.Set("1942", "壬午")
	baziNian.Set("1943", "癸未")
	baziNian.Set("1944", "甲申")
	baziNian.Set("1945", "乙酉")
	baziNian.Set("1946", "丙戌")
	baziNian.Set("1947", "丁亥")
	baziNian.Set("1948", "戊子")
	baziNian.Set("1949", "己丑")
	baziNian.Set("1950", "庚寅")
	baziNian.Set("1951", "辛卯")
	baziNian.Set("1952", "壬辰")
	baziNian.Set("1953", "癸巳")
	baziNian.Set("1954", "甲午")
	baziNian.Set("1955", "乙未")
	baziNian.Set("1956", "丙申")
	baziNian.Set("1957", "丁酉")
	baziNian.Set("1958", "戊戌")
	baziNian.Set("1959", "己亥")
	baziNian.Set("1960", "庚子")
	baziNian.Set("1961", "辛丑")
	baziNian.Set("1962", "壬寅")
	baziNian.Set("1963", "癸卯")
	baziNian.Set("1964", "甲辰")
	baziNian.Set("1965", "乙巳")
	baziNian.Set("1966", "丙午")
	baziNian.Set("1967", "丁未")
	baziNian.Set("1968", "戊申")
	baziNian.Set("1969", "己酉")
	baziNian.Set("1970", "庚戌")
	baziNian.Set("1971", "辛亥")
	baziNian.Set("1972", "壬子")
	baziNian.Set("1973", "癸丑")
	baziNian.Set("1974", "甲寅")
	baziNian.Set("1975", "乙卯")
	baziNian.Set("1976", "丙辰")
	baziNian.Set("1977", "丁巳")
	baziNian.Set("1978", "戊午")
	baziNian.Set("1979", "己未")
	baziNian.Set("1980", "庚申")
	baziNian.Set("1981", "辛酉")
	baziNian.Set("1982", "壬戌")
	baziNian.Set("1983", "癸亥")
	baziNian.Set("1984", "甲子")
	baziNian.Set("1985", "乙丑")
	baziNian.Set("1986", "丙寅")
	baziNian.Set("1987", "丁卯")
	baziNian.Set("1988", "戊辰")
	baziNian.Set("1989", "己巳")
	baziNian.Set("1990", "庚午")
	baziNian.Set("1991", "辛未")
	baziNian.Set("1992", "壬申")
	baziNian.Set("1993", "癸酉")
	baziNian.Set("1994", "甲戌")
	baziNian.Set("1995", "乙亥")
	baziNian.Set("1996", "丙子")
	baziNian.Set("1997", "丁丑")
	baziNian.Set("1998", "戊寅")
	baziNian.Set("1999", "己卯")
	baziNian.Set("2000", "庚辰")
	baziNian.Set("2001", "辛巳")
	baziNian.Set("2002", "壬午")
	baziNian.Set("2003", "癸未")
	baziNian.Set("2004", "甲申")
	baziNian.Set("2005", "乙酉")
	baziNian.Set("2006", "丙戌")
	baziNian.Set("2007", "丁亥")
	baziNian.Set("2008", "戊子")
	baziNian.Set("2009", "己丑")
	baziNian.Set("2010", "庚寅")
	baziNian.Set("2011", "辛卯")
	baziNian.Set("2012", "壬辰")
	baziNian.Set("2013", "癸巳")
	baziNian.Set("2014", "甲午")
	baziNian.Set("2015", "乙未")
	baziNian.Set("2016", "丙申")
	baziNian.Set("2017", "丁酉")
	baziNian.Set("2018", "戊戌")
	baziNian.Set("2019", "己亥")
	baziNian.Set("2020", "庚子")
	baziNian.Set("2021", "辛丑")
	baziNian.Set("2022", "壬寅")
	baziNian.Set("2023", "癸卯")
	baziNian.Set("2024", "甲辰")
	baziNian.Set("2025", "乙巳")
	baziNian.Set("2026", "丙午")
	baziNian.Set("2027", "丁未")
	baziNian.Set("2028", "戊申")
	baziNian.Set("2029", "己酉")
	nongLiYue := orderedmap.New()
	nongLiYue.Set("1", "正月")
	nongLiYue.Set("2", "二月")
	nongLiYue.Set("3", "三月")
	nongLiYue.Set("4", "四月")
	nongLiYue.Set("5", "五月")
	nongLiYue.Set("6", "六月")
	nongLiYue.Set("7", "七月")
	nongLiYue.Set("8", "八月")
	nongLiYue.Set("9", "九月")
	nongLiYue.Set("10", "十月")
	nongLiYue.Set("11", "十一月")
	nongLiYue.Set("12", "十二月")
	nongLiDay := orderedmap.New()
	nongLiDay.Set("1", "初一")
	nongLiDay.Set("2", "初二")
	nongLiDay.Set("3", "初三")
	nongLiDay.Set("4", "初四")
	nongLiDay.Set("5", "初五")
	nongLiDay.Set("6", "初六")
	nongLiDay.Set("7", "初七")
	nongLiDay.Set("8", "初八")
	nongLiDay.Set("9", "初九")
	nongLiDay.Set("10", "初十")
	nongLiDay.Set("11", "十一")
	nongLiDay.Set("12", "十二")
	nongLiDay.Set("13", "十三")
	nongLiDay.Set("14", "十四")
	nongLiDay.Set("15", "十五")
	nongLiDay.Set("16", "十六")
	nongLiDay.Set("17", "十七")
	nongLiDay.Set("18", "十八")
	nongLiDay.Set("19", "十九")
	nongLiDay.Set("20", "二十")
	nongLiDay.Set("21", "廿一")
	nongLiDay.Set("22", "廿二")
	nongLiDay.Set("23", "廿三")
	nongLiDay.Set("24", "廿四")
	nongLiDay.Set("25", "廿五")
	nongLiDay.Set("26", "廿六")
	nongLiDay.Set("27", "廿七")
	nongLiDay.Set("28", "廿八")
	nongLiDay.Set("29", "廿九")
	nongLiDay.Set("30", "三十")

	nongLiHour := orderedmap.New()
	nongLiHour.Set("0", "姿势")
	nongLiHour.Set("0", "子时")
	nongLiHour.Set("1", "丑时")
	nongLiHour.Set("2", "丑时")
	nongLiHour.Set("3", "寅时")
	nongLiHour.Set("4", "寅时")
	nongLiHour.Set("5", "卯时")
	nongLiHour.Set("6", "卯时")
	nongLiHour.Set("7", "辰时")
	nongLiHour.Set("8", "辰时")
	nongLiHour.Set("9", "巳时")
	nongLiHour.Set("10", "巳时")
	nongLiHour.Set("11", "午时")
	nongLiHour.Set("12", "午时")
	nongLiHour.Set("13", "未时")
	nongLiHour.Set("14", "未时")
	nongLiHour.Set("15", "申时")
	nongLiHour.Set("16", "申时")
	nongLiHour.Set("17", "酉时")
	nongLiHour.Set("18", "酉时")
	nongLiHour.Set("19", "戌时")
	nongLiHour.Set("20", "戌时")
	nongLiHour.Set("21", "亥时")
	nongLiHour.Set("22", "亥时")
	nongLiHour.Set("23", "子时")
	type Record struct {
		Id         string
		Title      string
		Name       string
		IsNv       bool
		IsNan      bool
		IsGongLi   bool
		IsNongLi   bool
		IsBazi     bool
		Years      []string
		BaziNian   map[string]interface{}
		NongLiYue  map[string]interface{}
		NongLiDay  map[string]interface{}
		NongLiHour map[string]interface{}
		Months     []string
		Days       []string
		Hours      []string
		Minutes    []string
		Year       string
		Month      string
		Day        string
		Hour       string
		Minute     string
		Ng         string
		Yg         string
		Rg         string
		Sg         string
	}
	if isGongLi || isNongLi {
		birthday := row.Birthday
		split := strings.Split(birthday, " ")
		ds := strings.Split(split[0], "-")
		hs := strings.Split(split[1], ":")
		c.HTML(http.StatusOK, "edit.tmpl", Record{
			Id:         id,
			Title:      "修改记录",
			Name:       row.Name,
			IsNv:       isNv,
			IsNan:      isNan,
			IsGongLi:   isGongLi,
			IsNongLi:   isNongLi,
			IsBazi:     isBazi,
			Years:      years,
			BaziNian:   baziNian.Values(),
			NongLiYue:  nongLiYue.Values(),
			NongLiDay:  nongLiDay.Values(),
			NongLiHour: nongLiHour.Values(),
			Months:     months,
			Days:       days,
			Hours:      hours,
			Minutes:    minutes,
			Year:       ds[0],
			Month:      ds[1],
			Day:        ds[2],
			Hour:       hs[0],
			Minute:     hs[1],
		})
	} else {
		c.HTML(http.StatusOK, "edit.tmpl", Record{
			Id:         id,
			Title:      "修改记录",
			Name:       row.Name,
			IsNv:       isNv,
			IsNan:      isNan,
			IsGongLi:   isGongLi,
			IsNongLi:   isNongLi,
			IsBazi:     isBazi,
			Years:      years,
			BaziNian:   baziNian.Values(),
			NongLiYue:  nongLiYue.Values(),
			NongLiDay:  nongLiDay.Values(),
			NongLiHour: nongLiHour.Values(),
			Months:     months,
			Days:       days,
			Hours:      hours,
			Minutes:    minutes,
			Ng:         row.Ng,
			Yg:         row.Yg,
			Rg:         row.Rg,
			Sg:         row.Sg,
		})
	}
}

func deleteRecord(id string) {
	i, _ := strconv.Atoi(id)
	r := models.Record{
		Id: int64(i),
	}
	r.Delete()
}

func LoginIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", gin.H{"title": "登录页"})
}

func Register(c *gin.Context) {
	c.HTML(http.StatusOK, "register.html", gin.H{"title": "注册页"})
}

func ResetPassword(c *gin.Context) {
	c.HTML(http.StatusOK, "repwd.html", gin.H{"title": "重置密码"})
}
func ModifyPassword(c *gin.Context) {
	mob, _ := c.GetPostForm("mob")
	pwd, _ := c.GetPostForm("pwd")
	code, _ := c.GetPostForm("code")
	if !verify.CheckMobile(mob) {
		response.ShowError(c, "mobile_error")
		return
	}
	if !verify.CheckCode(mob, code) {
		response.ShowError(c, "code_error")
		return
	}
	model := models.Users{}
	model.Mobile = mob
	row, _ := model.GetRowByMobile(mob)
	fmt.Println(row)
	if row.Id == 0 {
		response.ShowError(c, "mobile_not_exists")
		return
	}
	model.Passwd = common.Sha1En(pwd + row.Salt)
	model.Update(model)
	response.ShowSuccess(c, "success")
}

func Modify(c *gin.Context) {
	id := c.Query("id")
	name := c.Query("name")
	sex := c.Query("sex")
	ng := c.Query("ng")
	yg := c.Query("yg")
	rg := c.Query("rg")
	sg := c.Query("sg")
	inputDate, t, birthday, dateT := getDate(c)
	// 保存
	isSave := c.Query("save")
	if isSave == "1" {
		i, _ := strconv.Atoi(id)
		s, _ := strconv.Atoi(sex)
		r := models.Record{
			Id:       int64(i),
			Birthday: birthday,
			Sex:      s,
			Type:     t,
			Name:     name,
			Ng:       ng,
			Yg:       yg,
			Sg:       sg,
			Rg:       rg,
		}
		r.Update(r)
	}
	v := url.Values{}
	v.Add("act", "ok")
	v.Add("name", name)
	v.Add("DateType", dateT)
	v.Add("inputdate", inputDate)
	v.Add("ng", ng)
	v.Add("yg", yg)
	v.Add("rg", rg)
	v.Add("sg", sg)
	v.Add("sex", sex)
	v.Add("leixing", "0")
	v.Add("ztys", "0")
	v.Add("city1", "北京")
	v.Add("city2", "北京")
	v.Add("city3", "东城区")
	v.Add("Sect", "1")
	v.Add("Siling", "0")
	v.Add("leixinggg", "on")
	params := v.Encode()
	path := "show?" + params
	c.Redirect(http.StatusFound, path)
}

func getDate(c *gin.Context) (inputDate string, t string, birthday string, dateT string) {
	dateType := c.Query("DateType")
	year := c.Query("year")
	month := c.Query("month")
	date := c.Query("date")
	hour := c.Query("hour")
	minute := c.Query("minute")
	nyear := c.Query("nyear")
	nmonth := c.Query("nmonth")
	ndate := c.Query("ndate")
	nhour := c.Query("nhour")
	ifrun := c.Query("ifrun")
	if dateType == "0" {
		dateT = "5"
		t = "公历"
		birthday = year + "-" + month + "-" + date + " " + hour + ":" + minute
		inputDate = "公历" + year + "年" + month + "月" + date + "日" + " " + hour + "时" + minute + "分"
	} else if dateType == "1" {
		dateT = "5"
		t = "农历"
		birthday = nyear + "-" + nmonth + "-" + ndate + " " + nhour + ":" + "00"
		if ifrun == "1" {
			inputDate = "农历" + nyear + "年" + RunMonths[nmonth] + Dates[ndate] + " " + nhour + "时" + "00分"
		} else {
			inputDate = "农历" + nyear + "年" + Months[nmonth] + Dates[ndate] + " " + nhour + "时" + "00分"
		}
	} else {
		dateT = "4"
		t = "八字"
		inputDate = ""
		birthday = ""
	}
	return inputDate, t, birthday, dateT
}

func PaiPan(c *gin.Context) {
	cookie := c.Request.Cookies()
	var userId string
	for _, v := range cookie {
		if v.Name == "UserId" {
			userId = v.Value
		}
	}
	inputDate, t, birthday, dateType := getDate(c)
	name := c.Query("name")
	sex := c.Query("sex")
	ng := c.Query("ng")
	yg := c.Query("yg")
	rg := c.Query("rg")
	sg := c.Query("sg")
	ifrun := c.Query("ifrun")
	// 保存
	isSave := c.Query("save")
	if isSave == "1" {
		res := Save(name, sex, t, birthday, ifrun, userId, ng, yg, rg, sg)
		if !res {
			response.ShowError(c, "save fail")
		}
	}
	v := url.Values{}
	v.Add("act", "ok")
	v.Add("name", name)
	v.Add("DateType", dateType)
	v.Add("inputdate", inputDate)
	v.Add("ng", ng)
	v.Add("yg", yg)
	v.Add("rg", rg)
	v.Add("sg", sg)
	v.Add("sex", sex)
	v.Add("leixing", "0")
	v.Add("ztys", "0")
	v.Add("city1", "北京")
	v.Add("city2", "北京")
	v.Add("city3", "东城区")
	v.Add("Sect", "1")
	v.Add("Siling", "0")
	v.Add("leixinggg", "on")
	params := v.Encode()
	path := "show?" + params
	c.Redirect(http.StatusFound, path)
}

func PaiPanDetail(c *gin.Context) {
	name, _ := c.GetPostForm("name")
	dateType, _ := c.GetPostForm("DateType")
	year, _ := c.GetPostForm("year")
	month, _ := c.GetPostForm("month")
	date, _ := c.GetPostForm("date")
	hour, _ := c.GetPostForm("hour")
	minute, _ := c.GetPostForm("minute")
	nyear, _ := c.GetPostForm("nyear")
	nmonth, _ := c.GetPostForm("nmonth")
	ndate, _ := c.GetPostForm("ndate")
	nhour, _ := c.GetPostForm("nhour")
	sex, _ := c.GetPostForm("sex")
	ifrun, _ := c.GetPostForm("ifrun")
	inputDate := ""
	dataT := "5"
	if dateType == "0" {
		inputDate = "公历" + year + "年" + month + "月" + date + "日" + " " + hour + "时" + minute + "分"
	} else if dateType == "1" {
		if ifrun == "1" {
			inputDate = "农历" + nyear + "年" + RunMonths[nmonth] + Dates[ndate] + " " + nhour + "时" + minute + "分"
		} else {
			inputDate = "农历" + nyear + "年" + Months[nmonth] + Dates[ndate] + " " + nhour + "时" + minute + "分"
		}
	} else {
		inputDate = ""
		dataT = "4"
	}
	v := url.Values{}
	v.Add("act", "ok")
	v.Add("name", name)
	v.Add("DateType", dataT)
	v.Add("inputdate", inputDate)
	v.Add("ng", "癸巳")
	v.Add("yg", "丙寅")
	v.Add("rg", "庚寅")
	v.Add("sg", "丙子")
	v.Add("sex", sex)
	v.Add("leixing", "0")
	v.Add("ztys", "0")
	v.Add("city1", "北京")
	v.Add("city2", "北京")
	v.Add("city3", "东城区")
	v.Add("Sect", "1")
	v.Add("Siling", "0")
	v.Add("leixinggg", "on")
	params := v.Encode()
	path := "show?" + params
	c.Redirect(http.StatusFound, path)
}

func Show(c *gin.Context) {
	c.HTML(http.StatusOK, "show.html", gin.H{"title": "排盘页"})
}

// 注销登录
func Logout(c *gin.Context) {
	secure := app.IsHttps(c)
	//access_token  refresh_token 加黑名单
	accessToken, has := request.GetParam(c, app.ACCESS_TOKEN)
	if has {
		uid := strconv.FormatInt(c.MustGet("uid").(int64), 10)
		app.AddBlack(uid, accessToken)
	}
	c.SetCookie(app.COOKIE_TOKEN, "", -1, "/", "", secure, true)
	c.SetCookie(app.ACCESS_TOKEN, "", -1, "/", "", secure, true)
	c.SetCookie(app.REFRESH_TOKEN, "", -1, "/", "", secure, true)
	response.ShowSuccess(c, "success")
	return
}

// 修改密码
func ModifyPwd(c *gin.Context) {
	cookie := c.Request.Cookies()
	userId := cookie[2].Value
	pwd, _ := c.GetPostForm("pwd")
	uid, _ := strconv.Atoi(userId)
	model := models.Users{}
	model.Id = int64(uid)
	row, _ := model.GetRowById()
	model.Passwd = common.Sha1En(pwd + row.Salt)
	model.Update(model)
	response.ShowSuccess(c, "success")
	return
}

// 新增或修改备注
func Remark(c *gin.Context) {
	id := c.Query("id")
	type Record struct {
		Id     string
		Remark string
	}
	i, _ := strconv.Atoi(id)
	record := models.Record{
		Id: int64(i),
	}
	row, _ := record.GetRowById()
	c.HTML(http.StatusOK, "remark.tmpl", Record{
		Id:     id,
		Remark: row.Remark,
	})
}

// 新增或修改备注
func SaveRemark(c *gin.Context) {
	id, _ := c.GetPostForm("id")
	i, _ := strconv.Atoi(id)
	model := models.Record{}
	model.Id = int64(i)
	remark, _ := c.GetPostForm("remark")
	model.Remark = remark
	model.Update(model)
	response.ShowSuccess(c, "success")
	return
}

// 手机验证码登录
func LoginByMobileCode(c *gin.Context) {
	var userMobile UserMobileCode
	if err := c.BindJSON(&userMobile); err != nil {
		msg := handle.TransTagName(&UserMobileTrans, err)
		fmt.Println(msg)
		response.ShowValidatorError(c, msg)
		return
	}
	//验证code
	if sms.SmsCheck("code"+userMobile.Mobile, userMobile.Code) {
		response.ShowError(c, "code_error")
		return
	}
	model := models.Users{Mobile: userMobile.Mobile}
	if has := model.GetRow(); !has {
		response.ShowError(c, "mobile_not_exists")
		return
	}
	err := app.DoLogin(c, model)
	if err != nil {
		fmt.Println(err)
		response.ShowError(c, "fail")
		return
	}
	response.ShowSuccess(c, "success")
	return
}
func MobileIsExists(c *gin.Context) {
	var userMobile Mobile
	if err := c.BindJSON(&userMobile); err != nil {
		msg := handle.TransTagName(&UserMobileTrans, err)
		fmt.Println(msg)
		response.ShowValidatorError(c, msg)
		return
	}
	if !verify.CheckMobile(userMobile.Mobile) {
		response.ShowError(c, "mobile_error")
		return
	}
	model := models.Users{Mobile: userMobile.Mobile}
	var data = map[string]bool{"is_exist": true}
	if has := model.GetRow(); !has {
		data["is_exist"] = false
	}
	response.ShowData(c, data)
	return
}

// 发送短信验证码
func SendSms(c *gin.Context) {
	var p Mobile
	p.Mobile = c.Query("mob")
	if !verify.CheckMobile(p.Mobile) {
		response.ShowError(c, "mobile_error")
		return
	}
	//生成随机数
	code := common.GetRandomNum(6)
	fmt.Println(code)
	err := sms.AliSendSms(p.Mobile, code)
	if err != nil {
		response.ShowError(c, "fail")
		return
	}
	// 保存短信内容
	saveSms(p.Mobile, code)
	response.ShowError(c, "success")
	return
}

func saveSms(mobile string, code string) {
	expireTime := time.Now().Add(time.Minute * 5)
	fmt.Println(expireTime)
	model := models.Sms{
		Mobile:     mobile,
		Code:       code,
		ExpireTime: int(expireTime.Unix()),
		Ctime:      int(time.Now().Unix()),
	}
	model.Add()
}

func Save(name string, sex string, dateType string, birthday string, isRun string, userId string, ng string, yg string, rg string, sg string) bool {
	s, _ := strconv.Atoi(sex)
	r, _ := strconv.Atoi(isRun)
	uid, _ := strconv.Atoi(userId)

	model := models.Record{
		Name:     name,
		Uid:      int64(uid),
		Sex:      s,
		Type:     dateType,
		Birthday: birthday,
		IsRun:    r,
		Ctime:    int(time.Now().Unix()),
		Ng:       ng,
		Yg:       yg,
		Rg:       rg,
		Sg:       sg,
	}
	fmt.Println(model)
	_, err := model.Add()
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

// 手机号注册
func SignupByMobile(c *gin.Context) {
	mobile, _ := c.GetPostForm("mob")
	pwd, _ := c.GetPostForm("pwd")
	code, _ := c.GetPostForm("code")
	var userMobile UserMobile
	userMobile.Code = code
	userMobile.Mobile = mobile
	userMobile.Passwd = pwd
	if !verify.CheckMobile(mobile) {
		response.ShowError(c, "mobile_error")
		return
	}
	model := models.Users{Mobile: userMobile.Mobile}
	if has := model.GetRow(); has {
		response.ShowError(c, "mobile_exists")
		return
	}
	//验证code
	if !verify.CheckCode(mobile, code) {
		response.ShowError(c, "code_error")
		return
	}
	model.Salt = common.GetRandomBoth(4)
	model.Passwd = common.Sha1En(userMobile.Passwd + model.Salt)
	model.Ctime = int(time.Now().Unix())
	model.Status = models.UsersStatusOk
	model.Mtime = time.Now()

	traceModel := models.Trace{Ctime: model.Ctime}
	traceModel.Ip = common.IpStringToInt(request.GetClientIp(c))
	traceModel.Type = models.TraceTypeReg

	deviceModel := models.Device{Ctime: model.Ctime, Ip: traceModel.Ip, Client: c.GetHeader("User-Agent")}
	_, err := model.Add(&traceModel, &deviceModel)
	if err != nil {
		fmt.Println(err)
		response.ShowError(c, "fail")
		return
	}
	response.ShowSuccess(c, "success")
	return
}

// access token 续期
func Renewal(c *gin.Context) {
	accessToken, has := request.GetParam(c, app.ACCESS_TOKEN)
	if !has {
		response.ShowValidatorError(c, "access token not found")
		return
	}
	refreshToken, has := request.GetParam(c, app.REFRESH_TOKEN)
	if !has {
		response.ShowError(c, "refresh_token")
		return
	}
	ret, err := app.ParseToken(refreshToken)
	if err != nil {
		response.ShowError(c, "refresh_token")
		return
	}
	//uid := strconv.FormatInt(ret.UserId,10)
	//has=app.CheckBlack(uid,accessToken)
	//if has {
	//	c.Abort()//组织调起其他函数
	//	response.ShowError(c,"nologin")
	//	return
	//}
	//_, err= app.ParseToken(accessToken)
	//if err == nil {
	//	response.ShowError(c, "access_token_ok")
	//	return
	//}
	customClaims := &app.CustomClaims{
		UserId: ret.UserId,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Duration(app.MAXAGE) * time.Second).Unix(), // 过期时间，必须设置
		},
	}
	accessToken, err = customClaims.MakeToken()
	if err != nil {
		response.ShowError(c, "fail")
		return
	}
	customClaims = &app.CustomClaims{
		UserId: ret.UserId,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Duration(app.MAXAGE+1800) * time.Second).Unix(), // 过期时间，必须设置
		},
	}
	refreshToken, err = customClaims.MakeToken()
	if err != nil {
		response.ShowError(c, "fail")
		return
	}
	c.Header(app.ACCESS_TOKEN, accessToken)
	c.Header(app.REFRESH_TOKEN, refreshToken)
	secure := app.IsHttps(c)
	c.SetCookie(app.ACCESS_TOKEN, accessToken, app.MAXAGE, "/", "", secure, true)
	c.SetCookie(app.REFRESH_TOKEN, refreshToken, app.MAXAGE, "/", "", secure, true)
	fmt.Println("ok")
	response.ShowError(c, "success")
	return
}
func Info(c *gin.Context) {
	uid := c.MustGet("uid").(int64)
	model := models.Users{}
	model.Id = uid
	row, err := model.GetRowById()
	if err != nil {
		fmt.Println(err)
		response.ShowValidatorError(c, err)
		return
	}
	fmt.Println(row)
	fmt.Println(row.Name)
	//隐藏手机号中间数字
	s := row.Mobile
	row.Mobile = string([]byte(s)[0:3]) + "****" + string([]byte(s)[6:])
	response.ShowData(c, row)
	return
}
