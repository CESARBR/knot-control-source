#!/bin/bash
/etc/knot/start.sh knot-fog 3&> /dev/null
/etc/knot/start.sh knot-web 3&> /dev/null
/etc/knot/start.sh knotd 3&> /dev/null
/etc/knot/start.sh nrfd 3&> /dev/null
/etc/knot/start.sh lorad 3&> /dev/null