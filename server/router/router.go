package router

import (
	"github.com/gin-gonic/gin"
	"github.com/scottjason/go-react/server/controllers"
)

func Routes(router *gin.Engine) {
	router.POST("/api/sign-in", controllers.SignIn)
	router.POST("/api/create-account", controllers.CreateAccount)

}
