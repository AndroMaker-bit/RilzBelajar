$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Set-Location 'D:\project\study-ai'
& npm.cmd run dev -- --host 0.0.0.0 --port 5173
