package database

import (
	"database/sql"

	"log"
	"os"

	_ "github.com/lib/pq"
)

func Connect() {
	var db *sql.DB
	var err error

	DB_USER := os.Getenv("DB_USER")
	DB_PASS := os.Getenv("DB_PASS")
	DB_HOST := os.Getenv("DB_HOST")

	psqlconn := "postgres://" + DB_USER + ":" + DB_PASS + DB_HOST
	db, err = sql.Open("postgres", psqlconn)
	checkError(err)

	defer db.Close()

	stmt := "CREATE TABLE IF NOT EXISTS users ( id uuid UNIQUE NOT NULL, email varchar(40) UNIQUE NOT NULL, password text NOT NULL, created_at varchar(40) NOT NULL )"
	_, err = db.Exec(stmt)
	checkError(err)

	err = db.Ping()
	checkError(err)
	log.Println("Database connected!")
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
