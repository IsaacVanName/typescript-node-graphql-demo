#!/bin/bash

cd /docker-entrypoint-initdb.d

mysql -uroot -proot < records.sql
