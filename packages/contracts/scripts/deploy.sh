#!/bin/bash

set -e

network="$1"

usage ()
{
    echo "usage: deploy.sh env"
    exit 1
}

if [ -z "$network" ]
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
        yarn run ts-node "${MIGRATIONS_DIR}/${f}" "${network}"
    done
}

run
