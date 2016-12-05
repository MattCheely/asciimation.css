#!/bin/sh
BASEDIR=$(dirname "$0")
PROJECT_DIR=$(dirname ${BASEDIR})
SITE_DIR=${PROJECT_DIR}/github.io

pushd ${PROJECT_DIR}
git clone git@github.com:MattCheely/MattCheely.github.io.git ${SITE_DIR}
rm -r ${SITE_DIR}/asciimation.css
mkdir ${SITE_DIR}/asciimation.css
gulp
cp -R dist/* ${SITE_DIR}/asciimation.css
pushd ${SITE_DIR}
git add .
git commit -m "Update asciimation.css demo"
git push
popd
rm -rf ${SITE_DIR}
popd
