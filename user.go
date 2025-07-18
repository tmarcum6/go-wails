package main

import (
	"database/sql"
	"fmt"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
	"os"
)

type User struct {
	ID   int
	Name string
}

func getUsers(db *sql.DB) []User {
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()

	var users []User

	for rows.Next() {
		var user User

		if err := rows.Scan(&user.ID, &user.Name); err != nil {
			fmt.Println("Error scanning row:", err)
		}

		users = append(users, user)
		fmt.Println(user.ID, user.Name)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration:", err)
	}

	return users
}

func add(db *sql.DB, user User) {
	name := user.Name
	db.Exec("INSERT INTO users (name) VALUES ('" + name + "')")
}

func delete(db *sql.DB, user User) {
	name := user.Name
	id := user.ID
	db.Exec("DELETE FROM users WHERE id = ? AND name = ?", id, name)
}

func update(db *sql.DB, user User) {
	id := user.ID
	db.Exec("UPDATE users SET name = ? WHERE id = ?", id)
}
