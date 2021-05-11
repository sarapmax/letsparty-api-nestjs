FRONT_URL=http://ras-frontend-dev-alb-1274002644.ap-southeast-1.elb.amazonaws.com
colon := :
ras-network:
	docker network create ras-net
db:
    docker run -d --name ras-database \
    --network=ras-net \
    -p 5432:5432 \
    -e "POSTGRES_USER=admin" \
    -e "POSTGRES_DB=ras" \
    -e "POSTGRES_PASSWORD=admin" \
    postgres:13-alpine
build:
    docker build -t ras-api . \
    --build-arg DB_HOSTNAME=localhost \
    --build-arg DB_USERNAME=admin \
    --build-arg DB_PASSWORD=admin \
    --build-arg JWTKEY=?D(GKbPdSgVkYp3s6v9yXB*E)H@McQfT \
    --build-arg API_URL=$(FRONT_URL)
run:
    docker run -d --name ras-api --network=ras-net -p 3000$(colon)3000 ras-api$(colon)latest
build-long:
    docker build -t ras-api . --build-arg DB_HOSTNAME=ras-database --build-arg DB_USERNAME=admin --build-arg DB_PASSWORD=admin --build-arg JWTKEY=?D(GKbPdSgVkYp3s6v9yXBxE)H@McQfT --build-arg FRONT_URL=$(FRONT_URL)