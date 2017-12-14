#!/bin/bash
cp ../knot-service-source/src/knotd ./scripts/knotd
cp ../knot-hal-source/src/nrfd/nrfd ./scripts/nrfd
cp ../knot-hal-source/src/lorad/lorad ./scripts/lorad
docker build -t knot-control .