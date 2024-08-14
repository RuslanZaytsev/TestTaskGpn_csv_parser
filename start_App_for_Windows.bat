@echo off
echo Создание образа и запуск контейнра Docker
REM
docker-compose up --build -d
echo Приложение запущено!
echo перейдите в браузер на http://localhost:8085
pause
