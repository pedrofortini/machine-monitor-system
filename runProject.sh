#!/bin/bash

JARNAME="$(ls ../BancoInterTestAPI/target/ | grep \.jar$)"
java -jar ../BancoInterTestAPI/target/"${JARNAME}"