#!/bin/bash

IFS=$'\n'

for name in `find . -maxdepth 1` ; do					# albo z -type f
	mv -i -v "$name" "$(echo "$name" | tr [:upper:] [:lower:])"
done

# IFS=$'\n'; for name in `find . -maxdepth 1`; do mv -i -v "$name" "$(echo "$name" | tr [:upper:] [:lower:])" done
