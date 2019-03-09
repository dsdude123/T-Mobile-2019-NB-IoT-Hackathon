# IoT Device API
## T-Mobile IoT Hackathon - Spring 2019

REST API for Chain Check.

------------------

### Entities

- **Device**: An IoT sensor attached to a shipping container or product
- **Checkin**: A status report emitted by an IoT sensor

### Query Structure

The API follows a standard REST structure. Requests to an entity without specifying a record pulls all entities, whereas a postfixed ID pulls up that one item.


```
GET http://localhost/api/v1/device/count
GET http://localhost/api/v1/device
POST http://localhost/api/v1/device
DELETE http://localhost/api/v1/device

GET http://localhost/api/v1/device/:id
GET http://localhost/api/v1/device/:id/shallow
PUT http://localhost/api/v1/device/:id
POST http://localhost/api/v1/device/:id
PATCH http://localhost/api/v1/device/:id
DELETE http://localhost/api/v1/device/:id
```


## Querying
-----------

All the following parameters (sort, skip, limit, query, populate, select and distinct) support the entire mongoose feature set.

> When passing values as objects or arrays in URLs, they must be valid JSON.

### Sort

```
GET /device?sort=name
GET /device?sort=-name
GET /device?sort={"name":1}
GET /device?sort={"name":0}
```

### Skip

```
GET /device?skip=10
```

### Limit

Only overrides `options.limit` if the queried limit is lower.

```
GET /device?limit=10
```

### Query

Supports all operators ($regex, $gt, $gte, $lt, $lte, $ne, etc.) as well as shorthands: ~, >, >=, <, <=, !=

```
GET /device?query={"name":"Bob"}
GET /device?query={"name":{"$regex":"^(Bob)"}}
GET /device?query={"name":"~^(Bob)"}
GET /device?query={"foobar":{"$gt":12}}
GET /device?query={"foobar":">12"}
GET /device?query={"foobar":{"$gte":12}}
GET /device?query={"foobar":">=12"}
GET /device?query={"foobar":{"$lt":12}}
GET /device?query={"foobar":"<12"}
GET /device?query={"foobar":{"$lte":12}}
GET /device?query={"foobar":"<=12"}
GET /device?query={"foobar":{"$ne":12}}
GET /device?query={"foobar":"!=12"}
```

### Populate

[Population](http://mongoosejs.com/docs/populate.html) is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).

```js
restify.serve(router, mongoose.model('Invoice', new mongoose.Schema({
  customer: [{ type: mongoose.Schema.Types.ObjectId }],
  products: [{ type: mongoose.Schema.Types.ObjectId }]
})))
```

Works with create, read and update operations.

```
GET/POST/PUT /device?populate=checkins
GET/POST/PUT /device?populate={"path":"checkins"}
GET/POST/PUT /device?populate=[{"path":"checkins"}]
```

### Select

```
GET /device?select=name
GET /device?select=-name
GET /device?select={"name":1}
GET /device?select={"name":0}
```

### Distinct

Returns the distinct values that exist for a given field.

```
GET /device?distinct=name
```
