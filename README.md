node-cassandra-webinar
======================

Source files for the nodejs-cassandra webinar

Russell Bradberry <rbradberry@simplereach.com> twitter:@devdazed

Pre-requisites
==============

Run the following CQL commands to set up the keyspace and column family for use with the tutorial

```
CREATE KEYSPACE webinar
  WITH strategy_class=SimpleStrategy
  AND strategy_options:replication_factor=1;

USE webinar;

CREATE COLUMNFAMILY users (email text, first_name text, last_name text, PRIMARY KEY (email));
```