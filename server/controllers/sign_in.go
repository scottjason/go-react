package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/scottjason/go-react/server/models"

	"github.com/gin-gonic/gin"
)

func SignIn(ctx *gin.Context) {
	// var db *sql.DB
	var u models.Users
	err := json.NewDecoder(ctx.Request.Body).Decode(&u)
	checkError(ctx, err)

	ctx.JSON(http.StatusOK, u)
}
