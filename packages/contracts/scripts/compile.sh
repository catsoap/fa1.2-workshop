#!/bin/bash

set -e

source="$1"
format="$2"

usage ()
{
    echo "usage: compile.sh counter.ligo"
    exit 1
}

if [ -z "$source" ]
then
    usage
    exit 1
fi

if [ -z "$format" ]
then 
    format="json"
fi

declare -A exts
exts["json"]="json"
exts["text"]="tz"

LIGO_IMAGE=ligolang/ligo:0.6.0
SOURCE_DIR=$(pwd)/src
OUTPUT_DIR=$(pwd)/build

run() {
    if [ ! -d "${OUTPUT_DIR}" ]; 
        then mkdir -p "${OUTPUT_DIR}"; 
    fi ; 

    name=$(basename "$source" | cut -d. -f1)
    output_file="/output/${name}.${exts[${format}]}"

    docker run --rm -u "$(id -u):$(id -g)" -v "${SOURCE_DIR}:/project" -v "${OUTPUT_DIR}:/output" -w /project \
        ${LIGO_IMAGE} compile-contract "${source}" main --michelson-format="${format}" --output-file="${output_file}" 

    echo "[OK] ${output_file}"
}

run
