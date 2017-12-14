FROM ubuntu:latest
# configure apt for non standard packages
RUN apt-get update \
    && apt-get install -y \
    curl git apt-transport-https \
    gcc g++ make

# add node 6.x repo
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

# add yarn repo
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee \
    /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
    && apt-get install -y \
    yarn nodejs mongodb
RUN mkdir -p /data/db

# install knot fog and knot web
RUN git clone https://github.com/CESARBR/knot-gateway-webui /usr/local/bin/knot-web-master
RUN cd /usr/local/bin/knot-web-master && npm install && npm run build && npm prune --production

RUN mkdir -p /usr/local/bin/knot-fog-source
RUN git clone https://github.com/CESARBR/knot-cloud-source /usr/local/bin/knot-fog-source
RUN cd /usr/local/bin/knot-fog-source && npm install --production

# install configuration files
RUN mkdir -p /etc/knot
ADD ./config/keys.json /etc/knot/keys.json
ADD ./config/gatewayConfig.json /etc/knot/gatewayConfig.json
ADD ./scripts/start.sh /etc/knot/start.sh
ADD ./scripts/stop.sh /etc/knot/stop.sh
ADD ./scripts/knot-fog /usr/local/bin/knot-fog
ADD ./scripts/knot-web /usr/local/bin/knot-web
ADD ./scripts/knotd /usr/local/bin/knotd
ADD ./scripts/nrfd /usr/local/bin/nrfd
ADD ./scripts/lorad /usr/local/bin/lorad
RUN chmod 777 /etc/knot/keys.json /etc/knot/gatewayConfig.json \
    /etc/knot/start.sh /etc/knot/stop.sh /usr/local/bin/knot-fog \
    /usr/local/bin/knot-web /usr/local/bin/knotd /usr/local/bin/nrfd \
    /usr/local/bin/lorad

ADD ./run.sh ./run.sh
RUN chmod 777 run.sh
CMD ["/bin/bash","-c",". ./run.sh"]