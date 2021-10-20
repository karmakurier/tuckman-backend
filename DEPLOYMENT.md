## Deployment

1. Set the settings you wish to set for db and ports in `docker-compose.yml`
2. Rename `ormconfig.prod.json` to `ormconfig.json` to match the correct settings of the future server. These settings should match the settings you prepared for `docker-compose.yml`
3. Build the docker image by running `docker build -t tuckmanBE .`
4. Start the docker compose file using `docker compose up` in this directory.
