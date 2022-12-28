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
	DB_URI := os.Getenv("DB_URI")
	db, err = sql.Open("postgres", DB_URI)
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
		log.Println(43)
		log.Fatal(err)
	}
}
