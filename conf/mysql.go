package conf

type DbConfig struct {
	DriverName   string
	Dsn          string
	ShowSql      bool
	ShowExecTime bool
	MaxIdle      int
	MaxOpen      int
}

var Db = map[string]DbConfig{
	"db1": {
		DriverName: "mysql",
		Dsn:        "root:8d7157cd828766d5@tcp(127.0.0.1:3306)/sso?charset=utf8mb4&parseTime=true&loc=Local",
		// Dsn:          "sso:NXkjRBH8i78YDxRL@tcp(127.0.0.1:3306)/sso?charset=utf8mb4&parseTime=true&loc=Local",
		ShowSql:      true,
		ShowExecTime: false,
		MaxIdle:      10,
		MaxOpen:      200,
	},
}
