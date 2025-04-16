#!/bin/bash

cd ../backend
npm start &
PID=$!
wait "$PID"
echo "Process terminated"
