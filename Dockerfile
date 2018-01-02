FROM solita/ubuntu-systemd:latest

# configure apt for non standard packages
RUN apt-get update \
 && apt-get install -y \
      curl apt-transport-https

# add node 6.x repo
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

# add yarn repo
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# install build tools and dependencies
RUN apt-get update \
 && apt-get install -y \
      nodejs yarn dbus

# install modules
WORKDIR /usr/local/bin/knot-control
COPY package.json .

# install init script
COPY ./docker-knot-control.service /lib/systemd/system/knotctl.service
COPY ./docker-knot-control.sh /usr/local/bin/knotctld
RUN chmod +x /usr/local/bin/knotctld
RUN systemctl enable knotctl

CMD ["/bin/bash", "-c", "exec  /sbin/init --log-target=journal 3>&1"]