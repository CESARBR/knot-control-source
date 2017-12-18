#!/bin/sh
#
# Run fake script
#

PIDFILE=/tmp/knotctl.pid
PID=`cat $PIDFILE`

while [ -e /proc/$PID ]
do
	#Wait
	sleep 1
done