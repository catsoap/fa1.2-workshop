#!/bin/bash

set -e

env="$1"

usage ()
{
    echo "usage: deploy.sh env"
    exit 1
}

if [ -z "$env" ]
then
    usage
    exit 1
fi

MIGRATIONS_DIR=./migrations

run() {

    migrations=$(find "${MIGRATIONS_DIR}" -type f | sort)

    for file in $migrations; do
        f=$(basename "$file")
        echo "$f"
        yarn ts-node "${MIGRATIONS_DIR}/${f}" "${env}"
    done
}

run
