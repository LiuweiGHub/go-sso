package sms

import (
	"errors"
	"github.com/gomodule/redigo/redis"
	"go-sso/utils/cache"
	"go-sso/utils/verify"
	"io/ioutil"
	"net/http"
	"net/url"
	"unicode/utf8"
)

const (
	SMSTPL = "【解八字】您的验证码为：[code]，请勿泄漏于他人！"
	//账号
	ACCOUNT = "LTAI5tA44PUdU8merJEVS9CR"
	//密码
	PSWD = "oUNnTEmWSbm3BMnp1p3GxrurNaYH7f"
	// 发送url，
	URL = "http://sms.market.alicloudapi.com/singleSendSms?PhoneNumbers=13366746326&SignName=解八字&TemplateCode=SMS_465423974"
	//  curl -i --get --include 'http://sms.market.alicloudapi.com/singleSendSms?PhoneNumbers=13366746326&SignName=解八字&TemplateCode=SMS_465423974'  -H 'Authorization:APPCODE 你自己的AppCode'
)

func SmsCheck(key, code string) bool {
	key = cache.RedisSuf + key
	// 从池里获取连接
	rc := cache.RedisClient.Get()
	// 用完后将连接放回连接池
	defer rc.Close()
	val, err := redis.String(rc.Do("GET", key))
	if err != nil || val != code {
		return false
	}
	return true
}
func SmsSet(key, val string) (err error) {
	key = cache.RedisSuf + key
	// 从池里获取连接
	rc := cache.RedisClient.Get()
	// 用完后将连接放回连接池
	defer rc.Close()
	_, err = rc.Do("Set", key, val, "EX", 600)
	if err != nil {
		return
	}
	return
}

func HttpPostForm(url string, data url.Values) (string, error) {

	resp, err := http.PostForm(url, data)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

// 发送短信
func SendSms(mobile, msg string) error {
	if mobile == "" {
		return errors.New("mobile is not null")
	}
	if !verify.CheckMobile(mobile) {
		return errors.New("mobile is irregular")
	}
	if utf8.RuneCountInString(msg) < 10 {
		return errors.New("Character length is not enough.")
	}
	//不同信道参数可能不同，具体查看其开发文档
	data_send := url.Values{"account": {ACCOUNT}, "pswd": {PSWD}, "mobile": {mobile}, "msg": {msg}}
	_, err := HttpPostForm(URL, data_send)
	return err
}
