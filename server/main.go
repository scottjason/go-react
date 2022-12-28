package main

import (
	"log"
	"os"
	"server/database"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/scottjason/go-react/server/router"
)

func main() {
	var err error
	if os.Getenv("GO_ENV") != "production" {
		log.Println("Loading .env")
		err := godotenv.Load()
		checkError(err)
	} else {
		log.Println("Not loading .env")
	}

	PORT := os.Getenv("PORT")
	SESSION_STORE := os.Getenv("SESSION_STORE")
	SESSION_SECRET := os.Getenv("SESSION_SECRET")
	if PORT == "" {
		PORT = "3000"
	}

	database.Connect()
	r := gin.Default()

	store := cookie.NewStore([]byte(SESSION_SECRET))
	store.Options(sessions.Options{MaxAge: 3600 * 24, HttpOnly: true}) // 24hr
	r.Use(sessions.Sessions(SESSION_STORE, store))

	router.Routes(r)
	r.Static("/", "./dist")
	r.NoRoute(func(c *gin.Context) {
		c.File("./dist/index.html")
	})

	err = r.Run(":" + PORT)
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
