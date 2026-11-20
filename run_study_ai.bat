@echo off
title Pelajarin.Free - AAS Study AI
cd /d "D:\project\study-ai"
set "PATH=C:\Program Files\nodejs;%PATH%"
echo Starting Pelajarin.Free Local Server...
start "" "http://localhost:5173"
call npm.cmd run dev -- --host 0.0.0.0 --port 5173
pause
