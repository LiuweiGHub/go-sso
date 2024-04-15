package models

type Record struct {
	Id       int64  `json:"id" xorm:"pk autoincr comment('主键') BIGINT(20)"`
	Type     string `json:"type" xorm:"not null default '' comment('排盘方式') VARCHAR(50)"`
	Sex      int    `json:"sex" xorm:"not null default 0 comment('性别') INT(10)"`
	Birthday string `json:"birthday" xorm:"not null default '' comment('生日') VARCHAR(50)"`
	Remark   string `json:"remark" xorm:"not null default '' comment('备注') VARCHAR(50)"`
	Ctime    int    `json:"ctime" xorm:"not null default 0 comment('注册时间') INT(10)"`
}
