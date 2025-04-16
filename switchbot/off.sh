#!/bin/bash

PID=$(ps aux | grep 'main.js' | grep -v grep | awk '{print $2}')

if [ -z "$PIDS" ]; then
	echo "No processes found for main.js"
	exit 1
fi

echo $PIDS | xargs kill
echo "Processes terminated"
