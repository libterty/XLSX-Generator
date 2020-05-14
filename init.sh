#!/bin/bash

echo 'Hello Lib Welcome Back'

migration() {
    cp ./examples/new3.xlsx new3.xlsx
}

if [ $1 = start ]; then
    if [ $2 = env ]; then
        touch .env
        dotenv
        echo Write config success
    else
        echo Fail with Wrong arg input
    fi
else
    echo Fail with Wrong arg input
fi
