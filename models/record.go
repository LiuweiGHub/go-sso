package models

import (
	"fmt"
)

type Record struct {
	Id       int64  `json:"id" xorm:"pk autoincr comment('主键') BIGINT(20)"`
	Uid      int64  `json:"uid" xorm:"not null default 0 comment('用户主键') index(UT) BIGINT(20)"`
	Name     string `json:"name" xorm:"not null default '' comment('姓名') VARCHAR(50)"`
	Type     string `json:"type" xorm:"not null default '' comment('排盘方式') VARCHAR(50)"`
	Sex      int    `json:"sex" xorm:"not null default 0 comment('性别') INT(10)"`
	Birthday string `json:"birthday" xorm:"not null default '' comment('生日') VARCHAR(50)"`
	IsRun    int    `json:"IsRun" xorm:"not null default 0 comment('是否润月') INT(10)"`
	Remark   string `json:"remark" xorm:"not null default '' comment('备注') VARCHAR(50)"`
	Ctime    int    `json:"ctime" xorm:"not null default 0 comment('注册时间') INT(10)"`
}

var recordTable = "record"

func (u *Record) GetRow() bool {
	has, err := mEngine.Get(u)
	if err == nil && has {
		return true
	}
	return false
}

func (u *Record) Add() (int64, error) {
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

func (u *Record) Delete() (int64, error) {
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

func (u *Record) GetRecordByPage(name string, uid string, page int, pageSize int) ([]map[string]string, error) {
	if page == 0 {
		page = 1
	}
	sql := "select * from sso.record "
	// sql := "select * from sso.record where uid = " + uid

	if len(name) > 0 {
		sql += fmt.Sprintf(" where name like '%s' ", name+"%")
	}
	sql += " order by id desc"
	sql += " limit ?,?"
	offset := (page - 1) * pageSize
	return mEngine.SQL(sql, offset, pageSize).QueryString()
}

func (u *Record) Update(record Record) int64 {
	affected, err := mEngine.Id(record.Id).Update(&record)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Affected rows: %d\n", affected)
	return affected
}

func (u *Record) GetRowById() (Record, error) {
	var record Record
	_, err := mEngine.Table(recordTable).Where("id=?", u.Id).Get(&record)
	return record, err
}
