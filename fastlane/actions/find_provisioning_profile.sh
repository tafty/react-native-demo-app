#!/bin/bash

if [ $# != 1 ] ; then
    echo Usage: $0 \<start of provisioning profile name\>
    exit 1
fi

read -d '' script << 'EOF'
BEGIN {
    e = 1
    pat = "<string>"tolower(prov)
}
{
    cur = tolower($0)
    if (cur ~ pat && prev ~ /<key>name<\\/key>/) {
        print FILENAME
        e = 0
        exit
    }
    if ($0 !~ /^\s*$/) {
        prev = cur
    }
}
END {
 exit e
}
EOF

cd "${HOME}/Library/MobileDevice/Provisioning Profiles/"
awk -v "prov=$1" "$script" *