package main

import (
	"go-sso/api/user"
	"go-sso/conf"
	"go-sso/modules/app"
	"go-sso/utils/common"
	"go-sso/utils/handle"
	"go-sso/utils/request"
	"go-sso/utils/response"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gin-gonic/gin"
)

func main() {

	//初始化数据
	Load()
	gin.SetMode(gin.DebugMode) //开发环境
	// gin.SetMode(gin.ReleaseMode) //线上环境
	r := gin.Default()

	r.LoadHTMLGlob("view/*.html")
	r.Static("/static", "./static")
	r.Static("/images", "./static/images")
	r.GET("/", user.Index)
	r.GET("/index", user.Index)
	r.POST("/userLogin", user.Login)
	r.GET("/resetPassword", user.ResetPassword)
	r.POST("/modifyPassword", user.ModifyPassword)
	r.GET("/register", user.Register)
	r.POST("/doRegister", user.SignupByMobile)
	r.GET("/sendsms", user.SendSms)
	r.GET("/loginIndex", user.LoginIndex)
	r.POST("/login", user.Login)

	r.Use(Auth)

	r.GET("/show", user.Show)
	r.GET("/api/getDetail", user.GetDetail)
	r.GET("/remark", user.Remark)
	r.POST("/saveRemark", user.SaveRemark)
	r.GET("/paiPan", user.PaiPan)
	r.POST("/paiPanDetail", user.PaiPanDetail)
	r.GET("/modify", user.Modify)
	r.GET("/record", user.Record)
	r.GET("/edit", user.Edit)

	r.POST("/renewal", user.Renewal)
	r.POST("/logout", user.Logout)
	r.POST("/modifyPwd", user.ModifyPwd)
	r.POST("/login/mobile", user.LoginByMobileCode)
	r.POST("/signup/mobile", user.SignupByMobile)
	r.POST("/signup/mobile/exist", user.MobileIsExists)
	r.GET("/my/info", user.Info) //用户信息
	r.GET("/pong", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run(":8282") // listen and serve on 0.0.0.0:8080
}
func Load() {
	c := conf.Config{}
	c.Routes = []string{"/ping", "/renewal", "/login", "/login/mobile", "/sendsms", "/signup/mobile", "/signup/mobile/exist"}
	c.OpenJwt = true //开启jwt
	conf.Set(c)
	//初始化数据验证
	handle.InitValidate()
}

func Auth(c *gin.Context) {
	u, err := url.Parse(c.Request.RequestURI)
	if err != nil {
		panic(err)
	}
	if common.InArrayString(u.Path, &conf.Cfg.Routes) {
		c.Next()
		return
	}
	//开启jwt
	if conf.Cfg.OpenJwt {
		accessToken, has := request.GetParam(c, app.ACCESS_TOKEN)
		if !has {
			c.Abort() //组织调起其他函数
			c.Redirect(http.StatusFound, "loginIndex")
			//response.ShowError(c, "nologin")
			return
		}
		ret, err := app.ParseToken(accessToken)
		if err != nil {
			c.Abort()
			response.ShowValidatorError(c, err.Error())
			return
		}
		uid := strconv.FormatInt(ret.UserId, 10)
		has = app.CheckBlack(uid, accessToken)
		if has {
			c.Abort() //组织调起其他函数
			c.Redirect(http.StatusFound, "loginIndex")
			//response.ShowError(c, "nologin")
			return
		}
		c.Set("uid", ret.UserId)
		c.Next()
		return
	}
	//cookie
	_, err = c.Cookie(app.COOKIE_TOKEN)
	if err != nil {
		c.Abort() //组织调起其他函数
		response.ShowError(c, "nologin")
		return
	}
	c.Next()
	return
}
