#!/bin/bash
#
# Run KNoT Control
#

PIDFILE=/tmp/knotctl.pid
PID=`cat $PIDFILE`

while [ -e /proc/$PID ]
do
	#Wait
	sleep 1
done