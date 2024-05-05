package models

import (
	"fmt"
)

type Sms struct {
	Id         int64  `json:"id" xorm:"pk autoincr comment('主键') BIGINT(20)"`
	Code       string `json:"code" xorm:"not null default '' comment('验证码') VARCHAR(50)"`
	Mobile     string `json:"mobile" xorm:"not null default '' comment('手机号') VARCHAR(50)"`
	ExpireTime int    `json:"expireTime" xorm:"not null default 0 comment('过期时间') INT(10)"`
	Ctime      int    `json:"ctime" xorm:"not null default 0 comment('注册时间') INT(10)"`
}

var smsTable = "sms"

func (u *Sms) GetRow() bool {
	has, err := mEngine.Get(u)
	if err == nil && has {
		return true
	}
	return false
}

func (u *Sms) Add() (int64, error) {
	session := mEngine.NewSession()
	defer session.Close()
	// add Begin() before any action
	if err := session.Begin(); err != nil {
		return 0, err
	}
	_, err := session.Insert(u)
	if err != nil {
		return 0, err
	}
	return u.Id, session.Commit()
}

func (u *Sms) Delete() (int64, error) {
	session := mEngine.NewSession()
	defer session.Close()
	// add Begin() before any action
	if err := session.Begin(); err != nil {
		return 0, err
	}
	_, err := session.Delete(u)
	if err != nil {
		return 0, err
	}
	return u.Id, session.Commit()
}

func (u *Sms) GetRecordByPage(name string, page int, pageSize int) ([]map[string]string, error) {
	if page == 0 {
		page = 1
	}
	sql := "select * from sso.record"
	if len(name) > 0 {
		sql += fmt.Sprintf(" where name like '%s' ", name+"%")
	}
	sql += " order by id desc"
	sql += " limit ?,?"
	offset := (page - 1) * pageSize
	return mEngine.SQL(sql, offset, pageSize).QueryString()
}

func (u *Sms) Update(record Record) int64 {
	affected, err := mEngine.Id(record.Id).Update(&record)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Affected rows: %d\n", affected)
	return affected
}

func (u *Sms) GetRowById() (Record, error) {
	var record Record
	_, err := mEngine.Table(recordTable).Where("id=?", u.Id).Get(&record)
	return record, err
}

func (u *Sms) GetRowByMobile(sms Sms) (Sms, error) {
	var record Sms
	_, err := mEngine.Table(smsTable).Where("mobile=?", sms.Mobile).OrderBy("id desc").Limit(1).Get(&record)
	return record, err
}
