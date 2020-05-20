package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go-sso/models"
	"go-sso/modules/app"
	"go-sso/utils/common"
	"go-sso/utils/handle"
	"go-sso/utils/request"
	"go-sso/utils/response"
	"go-sso/utils/sms"
	"go-sso/utils/validator"
	"strings"
	"time"
)

type UserMobile struct {
	Mobile  string `form:"mobile" json:"mobile" binding:"required"`
	Passwd string `form:"passwd" json:"passwd" binding:"required,max=20,min=6"`
	Code   string `form:"code" json:"code" binding:"required,len=6"`
}
type UserMobileCode struct {
	Mobile  string `form:"mobile" json:"mobile" binding:"required"`
	Code   string `form:"code" json:"code" binding:"required,len=6"`
}

type UserMobilePasswd struct {
	Mobile  string `form:"mobile" json:"mobile" binding:"required"`
	Passwd string `form:"passwd" json:"passwd" binding:"required,max=20,min=6"`
}

type Mobile struct {
	Mobile  string `form:"mobile" json:"mobile" binding:"required"`
}
var MobileTrans = map[string]string{"mobile": "手机号"}

var UserMobileTrans = map[string]string{"Mobile": "手机号", "Passwd": "密码", "Code": "验证码"}


//手机密码
func Login(c *gin.Context) {
	var userMobile UserMobilePasswd
	if err := c.BindJSON(&userMobile); err != nil {
		msg := handle.TransTagName(&UserMobileTrans, err)
		fmt.Println(msg)
		response.ShowValidatorError(c, msg)
		return
	}
	model := models.Users{Mobile: userMobile.Mobile}
	if has := model.GetRow(); !has {
		response.ShowError(c, "mobile_not_exists")
		return
	}
	if common.Sha1En(userMobile.Passwd+model.Salt)!=common.Sha1En(model.Passwd+model.Salt) {
		response.ShowError(c, "login_error")
		return
	}
	err := app.DoLogin(c,model)
	if err != nil {
		fmt.Println(err)
		response.ShowError(c, "fail")
		return
	}
	response.ShowSuccess(c, "success")
	return
}
//手机验证码登录
func LoginByMobileCode(c *gin.Context) {
	var userMobile UserMobileCode
	if err := c.BindJSON(&userMobile); err != nil {
		msg := handle.TransTagName(&UserMobileTrans, err)
		fmt.Println(msg)
		response.ShowValidatorError(c, msg)
		return
	}
	//验证code
	if sms.SmsCheck("code"+userMobile.Mobile,userMobile.Code) {
		response.ShowError(c, "code_error")
		return
	}
	model := models.Users{Mobile: userMobile.Mobile}
	if has := model.GetRow(); !has {
		response.ShowError(c, "mobile_not_exists")
		return
	}
	err := app.DoLogin(c,model)
	if err != nil {
		fmt.Println(err)
		response.ShowError(c, "fail")
		return
	}
	response.ShowSuccess(c, "success")
	return
}
func MobileIsExists(c *gin.Context)  {




}
//发送短信验证码
func SendSms(c *gin.Context) {
	var p Mobile
	if err := c.BindJSON(&p); err != nil {
		msg := handle.TransTagName(&MobileTrans, err)
		response.ShowValidatorError(c, msg)
		return
	}
	if ! validator.CheckMobile(p.Mobile) {
		response.ShowError(c, "mobile_error")
		return
	}
	//生成随机数
	code := common.GetRandomNum(6)
	msg := strings.Replace(sms.SMSTPL, "[code]", code, 1)
	err:=sms.SendSms(p.Mobile,msg)
	if err!=nil {
		response.ShowError(c, "fail")
		return
	}
	response.ShowError(c, "success")
	return

}
//手机号注册
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

	deviceModel := models.Device{Ctime: model.Ctime, Ip: traceModel.Ip,Client:c.GetHeader("User-Agent")}

	_, err := model.Add(&traceModel, &deviceModel)
	if err != nil {
		fmt.Println(err)
		response.ShowError(c, "fail")
		return
	}
	err = app.DoLogin(c,model)
	if err != nil {
		fmt.Println(err)
		response.ShowError(c, "fail")
		return
	}
	response.ShowSuccess(c, "success")
	return
}
