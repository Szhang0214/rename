@echo off
cls
title 商务小工具
:menu
cls
color 0A
echo.
echo       ==============================
echo        请选择要进行的操作，然后按回车
echo       ==============================
echo.
echo        1.修改账单文件名
echo.
echo        2.修改债券文件名
echo.
echo        3.发送账单邮件
echo.
echo        4.发送债券邮件
echo.
echo        Q.退出
echo.
echo.
:cho
set choice=
set /p choice=          请选择:
IF NOT "%choice%"=="" SET choice=%choice:~0,1%
if /i "%choice%"=="1" goto rename_zd
if /i "%choice%"=="2" goto rename_zq
if /i "%choice%"=="3" goto mail_zd
if /i "%choice%"=="4" goto mail_zq
if /i "%choice%"=="Q" goto endd
echo 选择无效，请重新输入
echo.
goto cho

:rename_zd
node rename_zd.js
goto cho

:rename_zq
node rename_zq.js
goto cho

:mail_zd
node mail_zd.js
goto cho

:mail_zq
node mail_zq.js
goto cho


