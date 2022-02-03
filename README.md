# Sanity + Github

## Installation

`sanity install github`

## Usage

Declare a field to be `github.gist` in your schema

```javascript
    {
      type: "github.gist",
      name: "gist",
      description: "Reference to a Github Gist",
    }
```

## Content
Here is an example of which data is stored on your document after selecting an asset.

```json
{
    "public_id": "29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x",
    "resource_type": "github.gist",
    "type": "gist",
    "id": "f97ef303ba04cee4975e6fdfc672ac12",
    "file": "kops-cluster.yaml",
    "_version": 1,
    "_type": "github.gist"
  }
```

Note: The `_version` in the data here refers to the schema version of this plugin, should the way it stores the data from Github change in the future.
