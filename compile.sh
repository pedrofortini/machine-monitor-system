#!/bin/bash

echo "Building project, start generating jar..."

mvn -f ../BancoInterTestAPI/pom.xml clean install -DskipTests=true

echo "Done!"