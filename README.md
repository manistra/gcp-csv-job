# Docker commands
#### docker build:
```
docker build -t gcpCsvJobImage . 
```
#### docker run:
```
docker run --name gcpCsvJob -it -e REGION="inser_region_var_here" -e DATABASE_URL="insert_db_url_here" gcpCsvJobImage
```
