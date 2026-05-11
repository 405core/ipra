package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"ipra/backend/internal/dbschema"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := dbschema.InitFromEnv(ctx); err != nil {
		log.Fatalf("initialize database schema: %v", err)
	}

	fmt.Println("database schema initialized")
}
