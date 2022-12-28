package main

import (
	"log"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/scottjason/go-react/server/database"
	"github.com/scottjason/go-react/server/router"
)

func main() {
	err := godotenv.Load()
	checkError(err)

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
	r.Static("/", "../dist")

	err = r.Run(":" + PORT)
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
