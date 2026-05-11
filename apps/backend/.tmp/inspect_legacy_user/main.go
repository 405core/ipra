package main

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/config"
)

type columnInfo struct {
	ColumnName string
	DataType   string
}

type dependencyInfo struct {
	ConstraintName string
	TableName      string
	ColumnName     string
}

type countRow struct {
	Count int64
}

type legacyUserRow struct {
	ID     uint64
	WorkID string
	Name   string
	Role   string
}

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	db, err := gorm.Open(postgres.Open(cfg.Database.DSN()), &gorm.Config{})
	if err != nil {
		log.Fatalf("connect database: %v", err)
	}

	var columns []columnInfo
	if err := db.Raw(
		`SELECT column_name, data_type
		FROM information_schema.columns
		WHERE table_schema = current_schema()
		  AND table_name = 'user'
		ORDER BY ordinal_position`,
	).Scan(&columns).Error; err != nil {
		log.Fatalf("query columns: %v", err)
	}

	fmt.Println("--- user columns ---")
	for _, column := range columns {
		fmt.Printf("%s %s\n", column.ColumnName, column.DataType)
	}

	var rowCount countRow
	if err := db.Raw(`SELECT COUNT(*) AS count FROM "user"`).Scan(&rowCount).Error; err != nil {
		log.Fatalf("count rows: %v", err)
	}
	fmt.Printf("--- user row count ---\n%d\n", rowCount.Count)

	var rows []legacyUserRow
	if err := db.Raw(
		`SELECT id, work_id, name, role
		FROM "user"
		ORDER BY id
		LIMIT 10`,
	).Scan(&rows).Error; err != nil {
		log.Fatalf("query user rows: %v", err)
	}

	fmt.Println("--- user rows ---")
	for _, row := range rows {
		fmt.Printf("%d\t%s\t%s\t%s\n", row.ID, row.WorkID, row.Name, row.Role)
	}

	var outboundDeps []dependencyInfo
	if err := db.Raw(
		`SELECT
			tc.constraint_name,
			kcu.table_name,
			kcu.column_name
		FROM information_schema.table_constraints tc
		JOIN information_schema.key_column_usage kcu
		  ON tc.constraint_name = kcu.constraint_name
		 AND tc.table_schema = kcu.table_schema
		WHERE tc.constraint_type = 'FOREIGN KEY'
		  AND tc.table_schema = current_schema()
		  AND tc.table_name = 'user'
		ORDER BY tc.constraint_name, kcu.ordinal_position`,
	).Scan(&outboundDeps).Error; err != nil {
		log.Fatalf("query outbound foreign keys: %v", err)
	}

	fmt.Println("--- user outbound foreign keys ---")
	if len(outboundDeps) == 0 {
		fmt.Println("(none)")
	} else {
		for _, dep := range outboundDeps {
			fmt.Printf("%s\t%s\t%s\n", dep.ConstraintName, dep.TableName, dep.ColumnName)
		}
	}

	var inboundDeps []dependencyInfo
	if err := db.Raw(
		`SELECT
			tc.constraint_name,
			kcu.table_name,
			kcu.column_name
		FROM information_schema.table_constraints tc
		JOIN information_schema.key_column_usage kcu
		  ON tc.constraint_name = kcu.constraint_name
		 AND tc.table_schema = kcu.table_schema
		JOIN information_schema.constraint_column_usage ccu
		  ON tc.constraint_name = ccu.constraint_name
		 AND tc.table_schema = ccu.table_schema
		WHERE tc.constraint_type = 'FOREIGN KEY'
		  AND tc.table_schema = current_schema()
		  AND ccu.table_name = 'user'
		ORDER BY tc.constraint_name, kcu.ordinal_position`,
	).Scan(&inboundDeps).Error; err != nil {
		log.Fatalf("query inbound foreign keys: %v", err)
	}

	fmt.Println("--- tables referencing user ---")
	if len(inboundDeps) == 0 {
		fmt.Println("(none)")
	} else {
		for _, dep := range inboundDeps {
			fmt.Printf("%s\t%s\t%s\n", dep.ConstraintName, dep.TableName, dep.ColumnName)
		}
	}
}
