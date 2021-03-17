@echo off
if not exist ..\dist call pack-app.bat

rd /q /s ..\dist-exe
md ..\dist-exe\quiz

pushd ..\dist-exe

xcopy /e ..\dist quiz\dist\

app --copy-self quiz\app 

pushd quiz\dist
app shortcut -target "C:\Program Files\dotnet\dotnet.exe" ^
  -arguments "%%LocalAppData%%\quiz\app\app.dll %%LocalAppData%%\quiz\dist\app.settings" ^
  -workdir "%%LocalAppData%%\quiz\dist"
popd

..\scripts\7za.exe -tzip a quiz.zip quiz

copy ..\scripts\install.ps1 .

rd /q /s VueDesktop

popd
