#!/bin/sh

SITE_DIR=github.io

git clone git@github.com:MattCheely/MattCheely.github.io.git ${SITE_DIR}
rm -r ${SITE_DIR}/asciimation.css
cp -R dist/* ${SITE_DIR}/asciimation.css
cd ${SITE_DIR}
git add .
git commit -m "Update asciimation.css demo"
git push
