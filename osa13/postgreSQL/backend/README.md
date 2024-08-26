```bash
docker run -d -e POSTGRES_PASSWORD={pw here} -p 5432:5432 --name my_db postgres 

docker exec -it my_db psql -U postgres postgres

```

```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);
```