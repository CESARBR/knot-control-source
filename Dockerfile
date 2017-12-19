FROM solita/ubuntu-systemd:latest

# configure apt for non standard packages
RUN apt-get update \
 && apt-get install -y \
      curl apt-transport-https

# add node 6.x repo
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

# install build tools and dependencies
RUN apt-get update \
 && apt-get install -y \
      nodejs dbus

# install modules
WORKDIR /usr/local/bin/knot-control-source
COPY package.json .
COPY src .
RUN npm install --production
COPY org.cesar.knot.control.conf /etc/dbus-1/system.d/org.cesar.knot.control.conf
# install configuration files
RUN mkdir -p /etc/knot
COPY ./config/gatewayConfig.json ./config/keys.json \
     ./scripts/start.sh ./scripts/stop.sh /etc/knot/
RUN chmod 666 /etc/knot/keys.json
RUN chmod 644 /etc/knot/gatewayConfig.json
RUN chmod 755 /etc/knot/start.sh /etc/knot/stop.sh

# setup fake scripts
# knot-fog
COPY ./docker-knot-service.sh /usr/local/bin/knot-fog
RUN sed -i 's/knotctl/knot-fog/g' /usr/local/bin/knot-fog
# knot-web
COPY ./docker-knot-service.sh /usr/local/bin/knot-web
RUN sed -i 's/knotctl/knot-web/g' /usr/local/bin/knot-web
# knotd
COPY ./docker-knot-service.sh /usr/local/bin/knotd
RUN sed -i 's/knotctl/knotd/g' /usr/local/bin/knotd
# nrfd
COPY ./docker-knot-service.sh /usr/local/bin/nrfd
RUN sed -i 's/knotctl/nrfd/g' /usr/local/bin/nrfd

RUN chmod 755 /usr/local/bin/knot-fog \
     /usr/local/bin/knot-web /usr/local/bin/knotd /usr/local/bin/nrfd

# install init script
COPY ./docker-knot-control.service /lib/systemd/system/knotctl.service
COPY ./docker-knot-control.sh /usr/local/bin/knotctld
RUN chmod +x /usr/local/bin/knotctld
RUN systemctl enable knotctl

CMD ["/bin/bash", "-c", "exec  /sbin/init --log-target=journal 3>&1"]