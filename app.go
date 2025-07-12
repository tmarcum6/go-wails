package main

import (
	"context"
	"database/sql"
	"fmt"
)

type App struct {
	ctx context.Context
	db  *sql.DB
	err error
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.db, a.err = connect()
	if a.err != nil {
		fmt.Println("Error connecting to database:", a.err)
	} else {
		fmt.Println("Database connected successfully")
	}
}

func (a *App) shutdown(ctx context.Context) {
	a.err = a.db.Close()
	if a.err != nil {
		fmt.Println("Error closing database:", a.err)
	} else {
		fmt.Println("Database closed successfully")
	}
}

func (a *App) AddUser(name string) {
	add(a.db, User{Name: name})
}

func (a *App) DeleteUser(id int, name string) {
	delete(a.db, User{ID: id, Name: name})
}

func (a *App) GetUsers() []User {
	users := getUsers(a.db)
	return users
}

func (a *App) UpdateUser(id int) {
	update(a.db, User{ID: id})
}
