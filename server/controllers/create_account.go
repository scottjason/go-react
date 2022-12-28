package controllers

import (
	"crypto/aes"
	"crypto/cipher"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
	"server/models"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/twinj/uuid"
)

var bytes = []byte{35, 46, 57, 24, 85, 35, 24, 74, 87, 35, 88, 98, 66, 32, 14, 05}

func CreateAccount(ctx *gin.Context) {

	var db *sql.DB
	session := sessions.Default(ctx)

	DB_USER := os.Getenv("DB_USER")
	DB_PASS := os.Getenv("DB_PASS")
	DB_HOST := os.Getenv("DB_HOST")
	ENCRYPTION_KEY := os.Getenv("ENCRYPTION_KEY")

	psqlconn := "postgres://" + DB_USER + ":" + DB_PASS + DB_HOST
	db, err := sql.Open("postgres", psqlconn)
	checkError(ctx, err)

	defer db.Close()

	decoder := json.NewDecoder(ctx.Request.Body)
	var u models.Users
	err = decoder.Decode(&u)
	checkError(ctx, err)

	encryptedPassword, err := encrypt(u.Password, ENCRYPTION_KEY)
	checkError(ctx, err)

	id := uuid.NewV4()
	created_at := time.Now()

	stmnt := `INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4)`
	_, err = db.Exec(stmnt, id, u.Email, encryptedPassword, created_at)
	checkError(ctx, err)

	session.Set("id", id)
	session.Save()

	ctx.JSON(200, u)
}

func encode(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func encrypt(text string, encryptionKey string) (string, error) {
	block, err := aes.NewCipher([]byte(encryptionKey))
	if err != nil {
		return "", err
	}
	plainText := []byte(text)
	cfb := cipher.NewCFBEncrypter(block, bytes)
	cipherText := make([]byte, len(plainText))
	cfb.XORKeyStream(cipherText, plainText)
	return encode(cipherText), nil
}

func generateErr(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func checkError(ctx *gin.Context, err error) {
	if err != nil {
		ctx.JSON(http.StatusBadRequest, generateErr(err))
	}
}
