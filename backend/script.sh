#!/bin/bash

npm start &
PID=$!
sleep 5
kill "$PID"
echo "Process terminated"

