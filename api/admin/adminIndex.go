package admin

import (
	"fmt"
	"go-sso/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type UserMobile struct {
	Mobile string `form:"mobile" json:"mobile" binding:"required"`
	Passwd string `form:"passwd" json:"passwd" binding:"required,max=20,min=6"`
	Code   string `form:"code" json:"code" binding:"required,len=6"`
}

func parseTime(timeStr string) string {
	parsedTime, err := time.Parse(time.RFC3339, timeStr)
	if err != nil {
		fmt.Println("Error parsing time:", err)
	} else {
		fmt.Println("Parsed Time:", parsedTime)
	}
	return parsedTime.Format("2006-01-02 15:04:05")
}

func Index(c *gin.Context) {
	model := models.Users{}
	todayNewUsersRes, _ := model.GetTodayNewUsers()
	todayActiveUsersRes, _ := model.GetTodayActiveUsers()
	totalUsersRes, _ := model.GetTotalUsers()
	c.HTML(http.StatusOK, "admin.html", map[string]interface{}{
		"todayNewUsers":    todayNewUsersRes[0]["cnt"],
		"todayActiveUsers": todayActiveUsersRes[0]["cnt"],
		"totalUsers":       totalUsersRes[0]["cnt"],
	})
}

func Stats(c *gin.Context) {
	model := models.Users{}
	todayNewUsersRes, _ := model.GetTodayNewUsers()
	todayActiveUsersRes, _ := model.GetTodayActiveUsers()
	totalUsersRes, _ := model.GetTotalUsers()
	c.JSON(http.StatusOK, map[string]interface{}{
		"todayNewUsers":    todayNewUsersRes[0]["cnt"],
		"todayActiveUsers": todayActiveUsersRes[0]["cnt"],
		"totalUsers":       totalUsersRes[0]["cnt"],
	})
}

func Users(c *gin.Context) {
	model := models.Users{}
	page := c.DefaultQuery("page", "1")
	pageSize := c.DefaultQuery("pageSize", "10")
	p, _ := strconv.Atoi(page)
	s, _ := strconv.Atoi(pageSize)
	userList, _ := model.GetUserByPage(p, s)
	for _, v := range userList {
		v["ctime"] = parseTime(v["ctime"])
		v["mtime"] = parseTime(v["mtime"])
	}
	c.JSON(http.StatusOK, userList)
}

func Delete(c *gin.Context) {
	model := models.Users{}
	id := c.Query("userId")
	userId, _ := strconv.Atoi(id)
	model.Id = int64(userId)
	model.Status = 10
	model.Update(model)
	c.JSON(http.StatusOK, id)
}
