@echo off
if not exist ..\dist call pack-app.bat

if exist del ..\quiz.zip
..\scripts\7za.exe -tzip a ..\quiz.zip ..\dist\*
