
# CJMS Database
# FROM mongo as database_stage
FROM mongo:4.2.22-bionic as database_stage


# Main Core CJMS System
# FROM node as build_stage
FROM node:16-slim as build_stage


# Did somone say inefficiency?
COPY --from=database_stage / /
WORKDIR /cjms

# Environemnt Variables
ENV MONGO_INITDB_ROOT_USERNAME=cjms
ENV MONGO_INITDB_ROOT_PASSWORD=cjms
ENV MONGO_INITDB_DATABASE: cjms_database

EXPOSE 3001/tcp
EXPOSE 3001/udp
EXPOSE 2000-3000/tcp
EXPOSE 2000-3000/udp

# Copy CJMS App to the docker image dir /cjms
COPY ./CJMS-Interfaces ./CJMS-Interfaces
COPY ./CJMS-Servers ./CJMS-Servers
COPY ./CJMS-SharedServices ./CJMS-SharedServices
COPY ./package.json ./
COPY ./lerna.json ./
COPY ./yarn.lock ./
COPY ./node_modules ./node_modules
COPY ./docker-start.sh ./
COPY ./docker-create-env.sh ./

# # # Install deps and scripts
RUN apt-get -y update
RUN apt-get install -y net-tools
RUN yarn run build
RUN chmod +x ./docker-create-env.sh
RUN chmod +x ./docker-start.sh

# # Execute docker start script on container start
CMD ["./docker-start.sh"]