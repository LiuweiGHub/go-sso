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

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var Months = map[string]string{"1": "正月", "2": "二月", "3": "三月", "4": "四月", "5": "五月", "6": "六月", "7": "七月", "8": "八月", "9": "九月", "10": "十月", "11": "冬月", "12": "腊月"}
var RunMonths = map[string]string{"1": "闰正月", "2": "闰二月", "3": "闰三月", "4": "闰四月", "5": "闰五月", "6": "闰六月", "7": "闰七月", "8": "闰八月", "9": "闰九月", "10": "闰十月", "11": "闰冬月", "12": "闰腊月"}
var Dates = map[string]string{"1": "初一", "2": "初二", "3": "初三", "4": "初四", "5": "初五", "6": "初六", "7": "初七", "8": "初八", "9": "初九", "10": "初十", "11": "十一", "12": "十二", "13": "十三", "14": "十四", "15": "十五", "16": "十六", "17": "十七", "18": "十八", "19": "十九", "20": "二十", "21": "廿一", "22": "廿二", "23": "廿三", "24": "廿四", "25": "廿五", "26": "廿六", "27": "廿七", "28": "廿八", "29": "廿九", "30": "三十", "31": "三一"}

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
	Mobile string `form:"mobile" json:"mobile" binding:"required"`
	Passwd string `form:"passwd" json:"passwd" binding:"required,max=20,min=6"`
}

type Mobile struct {
	Mobile string `form:"mobile" json:"mobile" binding:"required"`
}

var MobileTrans = map[string]string{"mobile": "手机号"}

var UserMobileTrans = map[string]string{"Mobile": "手机号", "Passwd": "密码", "Code": "验证码"}

// 手机密码
func Login(c *gin.Context) {
	var userMobile UserMobilePasswd
	if err := c.BindJSON(&userMobile); err != nil {
		msg := handle.TransTagName(&UserMobileTrans, err)
		response.ShowValidatorError(c, msg)
		return
	}
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

	c.HTML(http.StatusOK, "record.html", gin.H{"title": "记录页"})
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

func PaiPan(c *gin.Context) {
	name := c.Query("name")
	dateType := c.Query("dateType")
	year := c.Query("year")
	month := c.Query("month")
	date := c.Query("date")
	hour := c.Query("hour")
	minute := c.Query("minute")
	nyear := c.Query("nyear")
	nmonth := c.Query("nmonth")
	ndate := c.Query("ndate")
	nhour := c.Query("nhour")
	sex := c.Query("sex")
	ifrun := c.Query("ifrun")

	inputDate := ""
	t := ""
	if dateType == "0" {
		t = "公历"
		inputDate = "公历" + year + "年" + month + "月" + date + "日" + " " + hour + "时" + minute + "分"
	} else {
		t = "农历"
		if ifrun == "1" {
			inputDate = "农历" + nyear + "年" + RunMonths[nmonth] + Dates[ndate] + " " + nhour + "时" + minute + "分"
		} else {
			inputDate = "农历" + nyear + "年" + Months[nmonth] + Dates[ndate] + " " + nhour + "时" + minute + "分"
		}
	}
	// 保存
	isSave := c.Query("save")
	if isSave == "1" {
		birthday := year + "-" + month + "-" + date + " " + hour + ":" + minute
		res := Save(name, sex, t, birthday)
		if false == res {
			response.ShowError(c, "save fail")
		}
	}
	v := url.Values{}
	v.Add("act", "ok")
	v.Add("name", name)
	v.Add("DateType", "5")
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
	//if sms.SmsCheck("code"+userMobile.Mobile, userMobile.Code) {
	//	response.ShowError(c, "code_error")
	//	return
	//}
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
	if err := c.BindJSON(&p); err != nil {
		msg := handle.TransTagName(&MobileTrans, err)
		response.ShowValidatorError(c, msg)
		return
	}
	if !verify.CheckMobile(p.Mobile) {
		response.ShowError(c, "mobile_error")
		return
	}
	//生成随机数
	code := common.GetRandomNum(6)
	msg := strings.Replace(sms.SMSTPL, "[code]", code, 1)
	err := sms.SendSms(p.Mobile, msg)
	if err != nil {
		response.ShowError(c, "fail")
		return
	}
	response.ShowError(c, "success")
	return

}

func Save(name string, sex string, dateType string, birthday string) bool {
	s, _ := strconv.Atoi(sex)
	model := models.Record{
		Name:     name,
		Sex:      s,
		Type:     dateType,
		Birthday: birthday,
		Ctime:    int(time.Now().Unix()),
	}
	_, err := model.Add()
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true

}

// 手机号注册
func SignupByMobile(c *gin.Context) {
	var userMobile UserMobile
	if err := c.BindJSON(&userMobile); err != nil {
		msg := handle.TransTagName(&UserMobileTrans, err)
		fmt.Println(msg)
		response.ShowValidatorError(c, msg)
		return
	}
	model := models.Users{Mobile: userMobile.Mobile}
	if has := model.GetRow(); has {
		response.ShowError(c, "mobile_exists")
		return
	}
	//验证code
	//if sms.SmsCheck("code"+userMobile.Mobile,userMobile.Code) {
	//	response.ShowError(c, "code_error")
	//	return
	//}

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
	fmt.Println(uid)
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
