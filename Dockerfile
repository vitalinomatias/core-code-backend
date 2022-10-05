## Build
# docker build -t full-back:0.1.0 .

## Run
# docker run -p 8500:8500 full-back:0.1.0

FROM oraclelinux:8.6

# Oracle Client Install
# https://yum.oracle.com/oracle-instant-client.html
RUN dnf install -y oracle-instantclient-release-el8
RUN dnf install -y oracle-instantclient-basic

# Install Nodejs
RUN dnf install -y @nodejs:16

# Set Variables de entorno
ENV SERVER_PORT="8500" \
    ORACLE_USER="oracledb" \
    ORACLE_PASS="mypass" \
    ORACLE_CONNSTR="localhost:1521/orclpdb"

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]

# opcion de desarrollo

# RUN mkdir -p /app/node_modules
# WORKDIR /app
# COPY package*.json ./
# # USER node
# RUN npm install
# # COPY --chown=node:node . .
# # CMD node app.js

# EXPOSE 8500
