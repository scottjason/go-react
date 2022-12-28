package router

import (
	"github.com/scottjason/go-react/server/controllers"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	router.POST("/api/sign-in", controllers.SignIn)
	router.POST("/api/create-account", controllers.CreateAccount)

}
