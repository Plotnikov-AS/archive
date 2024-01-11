create table if not exists documents
(
    id          uuid primary key,
    number      int,
    author      text,
    name        text,
    reg_date    date,
    description text,
    ext         varchar,
    filename    text
);

