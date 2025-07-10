package main

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
	"os"
)

func connect() (*sql.DB, error) {
	error := godotenv.Load()
	if error != nil {
		fmt.Println("Error loading .env file")
	}

	var url = os.Getenv("TURSO_DATABASE_URL")
	var token = os.Getenv("TURSO_AUTH_TOKEN")

	if token != "" {
		url += "?authToken=" + token
	}

	db, err := sql.Open("libsql", url)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	return db, err
}
