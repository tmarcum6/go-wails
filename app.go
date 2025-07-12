package main

import (
	"context"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) shutdown(ctx context.Context) {
}

func (a *App) AddUser(name string) {
	db, _ := connect()
	add(db, User{Name: name})
	defer db.Close()
}

func (a *App) DeleteUser(id int, name string) {
	db, _ := connect()
	delete(db, User{ID: id, Name: name})
	defer db.Close()
}

func (a *App) GetUsers() []User {
	db, _ := connect()
	users := getUsers(db)
	defer db.Close()
	return users
}

func (a *App) UpdateUser(name string) {
	db, _ := connect()
	update(db, User{Name: name})
	defer db.Close()
}
