package main

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"os"
)

var (
	key []byte
	t   *jwt.Token
	s   string
)

func getSignedKey() (string, error) {
	error := godotenv.Load()
	if error != nil {
		fmt.Println("Error loading .env file")
	}

	key = []byte(os.Getenv("TURSO_DATABASE_URL"))
	t = jwt.New(jwt.SigningMethodHS256)
	s, error = t.SignedString(key)

	return s, error
}
