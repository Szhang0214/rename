@echo off
cls
title ����С����
:menu
cls
color 0A
echo.
echo       ==============================
echo        ��ѡ��Ҫ���еĲ�����Ȼ�󰴻س�
echo       ==============================
echo.
echo        1.�޸��˵��ļ���
echo.
echo        2.�޸�ծȯ�ļ���
echo.
echo        3.�޸ľ���ȷ�Ϻ��ļ���
echo.
echo        4.�����˵��ʼ�
echo.
echo        5.����ծȯ�ʼ�
echo.
echo        Q.�˳�
echo.
echo.
:cho
set choice=
set /p choice=          ��ѡ��:
IF NOT "%choice%"=="" SET choice=%choice:~0,1%
if /i "%choice%"=="1" goto rename_zd
if /i "%choice%"=="2" goto rename_zq
if /i "%choice%"=="3" goto rename_jg
if /i "%choice%"=="4" goto mail_zd
if /i "%choice%"=="5" goto mail_zq
if /i "%choice%"=="Q" goto endd
echo ѡ����Ч������������
echo.
goto cho

:rename_zd
node rename.js �˵�
goto cho

:rename_zq
node rename.js ծȨ
goto cho

:rename_jg
node rename.js ����ȷ�Ϻ�
goto cho

:mail_zd
node mail.js �˵�
goto cho

:mail_zq
node mail.js ծȨ
goto cho


