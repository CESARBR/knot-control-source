#!/bin/bash
#
# Run KNoT Control
#
node /usr/local/bin/knot-control-source/server.js &
PIDFILE=/tmp/knotctl.pid
PID=`cat $PIDFILE`

while [ -e /proc/$PID ]
do
	#Wait
	sleep 1
done