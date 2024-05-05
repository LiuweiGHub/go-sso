package verify

import (
	"go-sso/models"
	"regexp"
)

func CheckMobile(mobile string) bool {
	reg := `^1\d{10}$`
	rgx := regexp.MustCompile(reg)
	return rgx.MatchString(mobile)
}

func CheckCode(mobile string, code string) bool {
	model := models.Sms{
		Mobile: mobile,
	}
	row, _ := model.GetRowByMobile(model)
	if row.Code == code {
		return true
	}
	return false
}
